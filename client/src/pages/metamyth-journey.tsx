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
          htmlTemplate = sessionStorage.getItem('metamythHTML');
          if (!htmlTemplate) {
            navigate('/begin', { replace: true });
            return;
          }
        } else {
          const response = await fetch('/metamyth.html');
          if (!response.ok) throw new Error('Failed to fetch /metamyth.html in dev mode.');
          htmlTemplate = await response.text();
        }

        // Step 2: Fetch the CONTENT of all required assets in parallel.
        const [
          chatbotJsRes,
          journeyJsRes,
          cssRes
        ] = await Promise.all([
          fetch('/chatbot.js'),
          fetch('/metamyth-journey.js'),
          fetch(cssUrl) // Use the imported URL to fetch the final CSS content.
        ]);

        if (!chatbotJsRes.ok || !journeyJsRes.ok || !cssRes.ok) {
          throw new Error('Failed to fetch one or more required journey assets.');
        }

        const chatbotJs = await chatbotJsRes.text();
        const journeyJs = await journeyJsRes.text();
        const mainCss = await cssRes.text();

        // Step 3: Assemble the final, self-contained HTML string.

        // Check the environment variable. It defaults to false.
        const showResonance = import.meta.env.VITE_METAMYTH_USE_LLM === 'true';
        // Create a script to inject this value into the iframe's window.
        const resonanceScript = `<script>window.SHOW_RESONANCE = ${showResonance};</script>`;

        // A <base> tag is crucial for any relative paths (like fonts) inside the iframe.
        const baseTag = `<base href="${window.location.origin}">`;

        // Create an inline <style> tag containing the entire content of your compiled index.css.
        const styleTag = `<style>${mainCss}</style>`;

        // Create an inline <script> tag with the combined JS content. This is the most reliable injection method.
        const combinedScripts = `<script>${chatbotJs}\n\n${journeyJs}</script>`;

        // Inject all pieces into the fetched HTML template.
        const finalHtml = htmlTemplate
          .replace('<head>', `<head>${baseTag}${styleTag}`)
          .replace('</body>', `${resonanceScript}${combinedScripts}</body>`);

        // Create a Blob URL from this complete document. This is more reliable than srcDoc for complex scripts.
        const blob = new Blob([finalHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        setIframeContent(url);

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