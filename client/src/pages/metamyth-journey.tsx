import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '@/components/layouts/page-layout';
import AuthDialog from '@/components/auth-dialog';
import { Cloud, CloudOff, Loader2 } from 'lucide-react';
import cssUrl from '@/index.css?url';

type JourneyProgress = {
  lastStageId?: string;
  journeyData?: Record<string, any>;
  formInputs?: Record<string, any>;
  llmResponses?: Record<string, any>;
  feedbackContents?: Record<string, any>;
};

export default function MetamythJourneyPage() {
  const [, navigate] = useLocation();
  const { user, loading: authLoading, signOut } = useAuth();
  const { toast } = useToast();
  const [iframeContent, setIframeContent] = useState<string | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'local-only'>('idle');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [hasShownAuthPrompt, setHasShownAuthPrompt] = useState(false);

  // Show auth dialog for anonymous users on first visit
  useEffect(() => {
    if (!authLoading && !user && !hasShownAuthPrompt && iframeContent) {
      const timer = setTimeout(() => {
        setAuthDialogOpen(true);
        setHasShownAuthPrompt(true);
      }, 1500); // Wait 1.5s for journey to load first
      return () => clearTimeout(timer);
    }
  }, [authLoading, user, hasShownAuthPrompt, iframeContent]);

  // Load progress from Supabase when user logs in
  useEffect(() => {
    if (!user || !iframeRef.current?.contentWindow || progressLoaded) return;

    const loadProgress = async () => {
      try {
        const { data, error } = await supabase
          .from('journey_progress')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
          throw error;
        }

        const iframe = iframeRef.current;
        if (!iframe?.contentWindow) return;

        if (data) {
          // Send progress to iframe
          const progress: JourneyProgress = {
            lastStageId: data.last_stage_id || undefined,
            journeyData: data.journey_data || {},
            llmResponses: data.llm_responses || {},
            formInputs: data.journey_data || {},
            feedbackContents: data.llm_responses || {},
          };
          
          iframe.contentWindow.postMessage({
            type: 'LOAD_PROGRESS',
            data: progress
          }, '*');
          
          console.log('[MetamythJourney] ✅ Loaded progress from Supabase');
          setSyncStatus('synced');
          setProgressLoaded(true);
        } else {
          // Check if localStorage has data and offer migration
          iframe.contentWindow.postMessage({
            type: 'CHECK_LOCAL_PROGRESS'
          }, '*');
          setProgressLoaded(true);
        }
      } catch (error) {
        console.error('[MetamythJourney] Failed to load progress:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to load progress',
          description: 'Using local storage instead.',
        });
        setSyncStatus('local-only');
        setProgressLoaded(true);
      }
    };

    loadProgress();
  }, [user, iframeRef.current, progressLoaded, toast]);

  // Listen for messages from iframe
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      // Security: validate that message is from our iframe
      // Blob URLs have opaque origin ("null"), so check event.source instead
      if (event.source !== iframeRef.current?.contentWindow) {
        return;
      }

      const { type, data } = event.data;

      switch (type) {
        case 'SAVE_PROGRESS':
          if (user) {
            // Save to Supabase
            setSyncStatus('syncing');
            try {
              const { error } = await supabase
                .from('journey_progress')
                .upsert({
                  user_id: user.id,
                  journey_data: data.journeyData || data.formInputs || {},
                  llm_responses: data.llmResponses || data.feedbackContents || {},
                  last_stage_id: data.lastStageId,
                  updated_at: new Date().toISOString(),
                });

              if (error) throw error;
              
              setSyncStatus('synced');
            } catch (error) {
              console.error('[MetamythJourney] Save to Supabase failed:', error);
              
              // Fallback to localStorage
              iframeRef.current?.contentWindow?.postMessage({
                type: 'SAVE_TO_LOCAL',
                data
              }, '*');
              
              setSyncStatus('local-only');
              toast({
                variant: 'destructive',
                title: 'Cloud sync failed',
                description: 'Progress saved locally only.',
              });
            }
          }
          // For anonymous users, iframe handles localStorage directly
          break;

        case 'LOCAL_PROGRESS_EXISTS':
          if (user && data.hasProgress) {
            // Offer migration
            toast({
              title: 'Import existing progress?',
              description: 'We found progress saved on this device. Click the button to import to your account.',
            });
            // Send migration command automatically
            iframeRef.current?.contentWindow?.postMessage({
              type: 'MIGRATE_TO_CLOUD'
            }, '*');
          }
          break;

        case 'MIGRATE_DATA':
          if (user && data.progress) {
            try {
              const { error } = await supabase
                .from('journey_progress')
                .upsert({
                  user_id: user.id,
                  journey_data: data.progress.journeyData || data.progress.formInputs || {},
                  llm_responses: data.progress.llmResponses || data.progress.feedbackContents || {},
                  last_stage_id: data.progress.lastStageId,
                  updated_at: new Date().toISOString(),
                });

              if (error) throw error;

              toast({
                title: 'Progress imported!',
                description: 'Your journey is now synced to your account.',
              });
              
              // Tell iframe to clear localStorage
              iframeRef.current?.contentWindow?.postMessage({
                type: 'CLEAR_LOCAL_STORAGE'
              }, '*');
              
              setSyncStatus('synced');
            } catch (error) {
              console.error('[MetamythJourney] Migration failed:', error);
              toast({
                variant: 'destructive',
                title: 'Import failed',
                description: 'Could not import your progress. It remains saved locally.',
              });
            }
          }
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [user, toast]);

  useEffect(() => {
    const loadAndBuildJourney = async () => {
      try {
        let htmlTemplate: string;

        // Step 1: Fetch the base HTML template from Supabase or the dev server.
        if (import.meta.env.PROD) {
          console.log('[MetamythJourney] 🌐 PRODUCTION MODE - Loading from Supabase');
          const storedHtml = sessionStorage.getItem('metamythHTML');
          if (!storedHtml) {
            console.error('[MetamythJourney] ❌ No HTML in sessionStorage, redirecting to /begin');
            navigate('/begin', { replace: true });
            return;
          }
          htmlTemplate = storedHtml;
          console.log('[MetamythJourney] ✅ Loaded HTML from sessionStorage');
        } else {
          console.log('[MetamythJourney] 🔧 DEV MODE - Loading from /metamyth.html');
          const response = await fetch('/metamyth.html');
          if (!response.ok) throw new Error('Failed to fetch /metamyth.html in dev mode.');
          htmlTemplate = await response.text();
          console.log('[MetamythJourney] ✅ Loaded HTML from dev server');
        }

        // Step 2: Fetch the CONTENT of all required assets in parallel.
        const baseUrl = import.meta.env.BASE_URL || '/';
        const [
          chatbotJsRes,
          journeyJsRes,
          cssRes,
          metamythCssRes,
          validationJsonRes,
          journeyJsonRes
        ] = await Promise.all([
          fetch(`${baseUrl}chatbot.js`),
          fetch(`${baseUrl}metamyth-journey.js`),
          fetch(cssUrl),
          fetch(`${baseUrl}metamyth-journey.css`),
          fetch(`${baseUrl}metamyth-stage-validation.json`),
          fetch(`${baseUrl}metamyth-journey.json`)
        ]);

        if (!chatbotJsRes.ok || !journeyJsRes.ok || !cssRes.ok || !metamythCssRes.ok || !validationJsonRes.ok || !journeyJsonRes.ok) {
          throw new Error('Failed to fetch one or more required journey assets.');
        }

        const chatbotJs = await chatbotJsRes.text();
        const journeyJs = await journeyJsRes.text();
        const mainCss = await cssRes.text();
        let metamythCss = await metamythCssRes.text();
        const validationJson = await validationJsonRes.text();
        const journeyJson = await journeyJsonRes.text();
        
        // Fix absolute font paths in metamyth CSS to work with base URL
        metamythCss = metamythCss.replace(/url\(['"]?\/attached_assets\//g, `url('${baseUrl}attached_assets/`);

        // Step 3: Assemble the final, self-contained HTML string.
        const showResonance = import.meta.env.VITE_METAMYTH_USE_LLM === 'true';
        const resonanceScript = `<script>window.SHOW_RESONANCE = ${showResonance};</script>`;
        
        const baseHref = `${window.location.origin}${baseUrl}`;
        const baseTag = `<base href="${baseHref}">`;
        const styleTag = `<style>${mainCss}</style><style>${metamythCss}</style>`;

        // Inject JSON configuration data
        const configScript = `<script>
          window.METAMYTH_VALIDATION_CONFIG = ${validationJson};
          window.METAMYTH_JOURNEY_DATA = ${journeyJson};
        </script>`;

        // Create postMessage bridge script
        const bridgeScript = `<script>
          // postMessage bridge for parent-iframe communication
          window.PARENT_HANDLES_STORAGE = ${!!user};
          
          // Override localStorage setItem to send to parent when user is logged in
          if (window.PARENT_HANDLES_STORAGE) {
            const originalSetItem = localStorage.setItem.bind(localStorage);
            const originalGetItem = localStorage.getItem.bind(localStorage);
            
            window.__pendingProgress = null;
            
            localStorage.setItem = function(key, value) {
              if (key === 'metamythProgress') {
                const progress = JSON.parse(value);
                window.__pendingProgress = progress;
                window.parent.postMessage({ type: 'SAVE_PROGRESS', data: progress }, '*');
              }
              // Still save locally as backup
              originalSetItem(key, value);
            };
          }
          
          // Listen for messages from parent
          window.addEventListener('message', (event) => {
            const { type, data } = event.data;
            
            if (type === 'LOAD_PROGRESS') {
              localStorage.setItem('metamythProgress', JSON.stringify(data));
              location.reload(); // Reload to apply loaded progress
            } else if (type === 'CHECK_LOCAL_PROGRESS') {
              const hasProgress = !!localStorage.getItem('metamythProgress');
              window.parent.postMessage({ type: 'LOCAL_PROGRESS_EXISTS', data: { hasProgress } }, '*');
            } else if (type === 'MIGRATE_TO_CLOUD') {
              const progress = localStorage.getItem('metamythProgress');
              if (progress) {
                window.parent.postMessage({ type: 'MIGRATE_DATA', data: { progress: JSON.parse(progress) } }, '*');
              }
            } else if (type === 'CLEAR_LOCAL_STORAGE') {
              localStorage.removeItem('metamythProgress');
            } else if (type === 'SAVE_TO_LOCAL') {
              localStorage.setItem('metamythProgress', JSON.stringify(data));
            }
          });
        </script>`;

        const combinedScripts = `<script>${chatbotJs}\n\n${journeyJs}</script>`;

        const finalHtml = htmlTemplate
          .replace(/<link[^>]*metamyth-journey\.css[^>]*>/g, '')
          .replace('<head>', `<head>${baseTag}`)
          .replace(/<\/body\s*>/i, `${styleTag}${configScript}${resonanceScript}${bridgeScript}${combinedScripts}</body>`);
        
        console.log('[MetamythJourney] 💡 Injected custom CSS, config, and postMessage bridge');
        console.log('[MetamythJourney] ✅ Final HTML assembled, length:', finalHtml.length);
        
        const blob = new Blob([finalHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        setIframeContent(url);
        console.log('[MetamythJourney] 🎬 Blob URL created:', url);

      } catch (error) {
        console.error("Error preparing Metamyth Journey:", error);
        navigate('/begin', { replace: true });
      }
    };

    loadAndBuildJourney();

    return () => {
      if (iframeContent) {
        URL.revokeObjectURL(iframeContent);
      }
    };
  }, [navigate, user]);

  if (authLoading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      </PageLayout>
    );
  }

  if (!iframeContent) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg">Assembling Your Metamyth Journey...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout hideFooter>
      {/* Sync Status Indicator (only when logged in) */}
      {user && (
        <div className="absolute top-20 right-4 z-50 flex items-center gap-2">
          {syncStatus === 'syncing' && (
            <div className="flex items-center gap-2 text-sm text-yellow-400 bg-black/50 backdrop-blur-sm border border-yellow-400/30 rounded-full px-3 py-1">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Syncing...</span>
            </div>
          )}
          {syncStatus === 'synced' && (
            <div className="flex items-center gap-2 text-sm text-green-400 bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-full px-3 py-1">
              <Cloud className="h-4 w-4" />
              <span>Synced</span>
            </div>
          )}
          {syncStatus === 'local-only' && (
            <div className="flex items-center gap-2 text-sm text-orange-400 bg-black/50 backdrop-blur-sm border border-orange-400/30 rounded-full px-3 py-1">
              <CloudOff className="h-4 w-4" />
              <span>Local only</span>
            </div>
          )}
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={iframeContent}
        title="Metamyth Journey"
        style={{
          width: '100%',
          height: '100%',
          flexGrow: 1,
          border: 'none',
          display: 'block'
        }}
        data-testid="iframe-journey"
      />

      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onAuthSuccess={() => {
          toast({
            title: 'Welcome!',
            description: 'Your progress will now be synced to the cloud.',
          });
          setSyncStatus('idle');
          setProgressLoaded(false);
        }}
      />
    </PageLayout>
  );
}
