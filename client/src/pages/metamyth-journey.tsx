import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import PageLayout from '@/components/layouts/page-layout';

// This Vite-specific import gets the final, correct URL of your stylesheet,
// which is crucial for finding the compiled CSS.
import cssUrl from '@/index.css?url';

export default function MetamythJourneyPage() {
  const [, navigate] = useLocation();
  const [iframeContent, setIframeContent] = useState<string | null>(null);

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
          console.log('[MetamythJourney] HTML length:', htmlTemplate.length);
          console.log('[MetamythJourney] First 200 chars:', htmlTemplate.substring(0, 200));
        } else {
          console.log('[MetamythJourney] 🔧 DEV MODE - Loading from /metamyth.html');
          const response = await fetch('/metamyth.html');
          if (!response.ok) throw new Error('Failed to fetch /metamyth.html in dev mode.');
          htmlTemplate = await response.text();
          console.log('[MetamythJourney] ✅ Loaded HTML from dev server');
        }

        // Step 2: Fetch the CONTENT of all required assets in parallel.
        // Use BASE_URL to handle GitHub Pages subdirectory deployments
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
          fetch(cssUrl), // Main app CSS (compiled index.css)
          fetch(`${baseUrl}metamyth-journey.css`), // Metamyth-specific CSS
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
        
        console.log('[MetamythJourney] 📄 Metamyth CSS length:', metamythCss.length);
        console.log('[MetamythJourney] 📄 First 300 chars of CSS:', metamythCss.substring(0, 300));
        console.log('[MetamythJourney] 🔍 Looking for font URLs in CSS...');
        const fontUrlMatches = metamythCss.match(/url\([^)]*attached_assets[^)]*\)/g);
        console.log('[MetamythJourney] Found font URLs:', fontUrlMatches);
        
        // Fix absolute font paths in metamyth CSS to work with base URL
        const originalCss = metamythCss;
        metamythCss = metamythCss.replace(/url\(['"]?\/attached_assets\//g, `url('${baseUrl}attached_assets/`);
        const pathsFixed = originalCss !== metamythCss;
        console.log('[MetamythJourney] CSS font paths fixed?', pathsFixed);
        console.log('[MetamythJourney] BASE_URL:', baseUrl);
        if (pathsFixed) {
          console.log('[MetamythJourney] ✅ Example fixed path:', metamythCss.match(/url\([^)]*attached_assets[^)]*\)/)?.[0]);
        }

        // Step 3: Assemble the final, self-contained HTML string.

        // Check the environment variable. It defaults to false.
        const showResonance = import.meta.env.VITE_METAMYTH_USE_LLM === 'true';
        // Create a script to inject this value into the iframe's window.
        const resonanceScript = `<script>window.SHOW_RESONANCE = ${showResonance};</script>`;

        // A <base> tag is crucial for any relative paths (like fonts) inside the iframe.
        // Include the base pathname to handle GitHub Pages subdirectory deployments
        const baseHref = `${window.location.origin}${baseUrl}`;
        const baseTag = `<base href="${baseHref}">`;

        // Create inline <style> tags for both CSS files
        const styleTag = `<style>${mainCss}</style><style>${metamythCss}</style>`;

        // Inject JSON configuration data into window object so metamyth-journey.js can access it
        const configScript = `<script>
          window.METAMYTH_VALIDATION_CONFIG = ${validationJson};
          window.METAMYTH_JOURNEY_DATA = ${journeyJson};
        </script>`;

        // Create an inline <script> tag with the combined JS content. This is the most reliable injection method.
        const combinedScripts = `<script>${chatbotJs}\n\n${journeyJs}</script>`;

        // Inject all pieces into the fetched HTML template.
        const cssLinkRemoved = htmlTemplate.match(/<link[^>]*metamyth-journey\.css[^>]*>/g);
        console.log('[MetamythJourney] Removed CSS link tag?', cssLinkRemoved ? 'Yes' : 'No (not found)');
        
        // Strategy: Inject custom CSS at the END of <head> to ensure it comes after Tailwind CDN's runtime-generated styles
        // Tailwind CDN script runs and injects styles dynamically, so we need our CSS to be last in the head
        const finalHtml = htmlTemplate
          .replace(/<link[^>]*metamyth-journey\.css[^>]*>/g, '') // Remove the external CSS link
          .replace('<head>', `<head>${baseTag}`) // Add base tag at beginning
          .replace('</head>', `${styleTag}</head>`) // Inject CSS at END of head (last styles win)
          .replace('</body>', `${configScript}${resonanceScript}${combinedScripts}</body>`);
        
        console.log('[MetamythJourney] 💡 Injected custom CSS at end of <head> for proper cascade');

        console.log('[MetamythJourney] ✅ Final HTML assembled, length:', finalHtml.length);
        console.log('[MetamythJourney] Contains gold color (#D4AF37)?', finalHtml.includes('#D4AF37') || finalHtml.includes('--accent-gold'));
        
        // Create a Blob URL from this complete document. This is more reliable than srcDoc for complex scripts.
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

    // Cleanup function to revoke the blob URL when the component unmounts
    return () => {
      if (iframeContent) {
        URL.revokeObjectURL(iframeContent);
      }
    };
  }, [navigate]);

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
      <iframe
        src={iframeContent}
        title="Metamyth Journey"
        style={{
          width: '100%',
          height: '100%',
          flexGrow: 1,
          border: 'none',
          display: 'block'
        }}
      ></iframe>
    </PageLayout>
  );
}