// src/pages/metamyth-journey.tsx

import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import PageLayout from '@/components/layouts/page-layout';

export default function MetamythJourneyPage() {
  const [, navigate] = useLocation();
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);

  useEffect(() => {
    const loadJourneyAssets = async () => {
      let storedHtml: string | null;

      if (import.meta.env.DEV) {
        try {
          const response = await fetch('/metamyth.html');
          if (!response.ok) {
            console.error('Failed to fetch /metamyth.html. Is it being served correctly?');
            navigate('/begin', { replace: true });
            return;
          }
          storedHtml = await response.text();
        } catch (error) {
          console.error("Error fetching /metamyth.html:", error);
          navigate('/begin', { replace: true });
          return;
        }
      } else {
        storedHtml = sessionStorage.getItem('metamythHTML');
        if (!storedHtml) {
          navigate('/begin', { replace: true });
          return;
        }
      }

      try {
        const [
          chatbotRes, 
          journeyRes
        ] = await Promise.all([
          fetch('/chatbot.js'),
          fetch('/metamyth-journey.js')
        ]);

        if (!chatbotRes.ok || !journeyRes.ok) {
          throw new Error('Failed to fetch required JavaScript assets.');
        }

        const chatbotJs = await chatbotRes.text();
        const journeyJs = await journeyRes.text();

        const isLlmEnabled = import.meta.env.VITE_METAMYTH_USE_LLM === 'true';
        const featureScript = `window.METAMYTH_USE_LLM = ${isLlmEnabled};`;

        const combinedScripts = `
          <script>${featureScript}</script>
          <script>${chatbotJs}</script>
          <script>${journeyJs}</script>
        `;

        let finalHtml = storedHtml;

        const mainScriptRegex = /(<script>\n\/\/ Main Application Logic[\s\S]*?<\/script>)/;
        const mainScriptMatch = finalHtml.match(mainScriptRegex);

        if (mainScriptMatch) {
            const mainScriptHtml = mainScriptMatch[0];
            finalHtml = finalHtml.replace(mainScriptHtml, '');
            finalHtml = finalHtml.replace('</body>', `${mainScriptHtml}</body>`);
        }

        finalHtml = finalHtml.replace('</body>', `${combinedScripts}</body>`);
        
        const origin = window.location.origin;
        finalHtml = finalHtml.replace('<head>', `<head><base href="${origin}">`);
        finalHtml = finalHtml.replace('fetch(\`\${window.location.origin}/metamyth-journey.json\`)', "fetch('/metamyth-journey.json')");

        const blob = new Blob([finalHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        setIframeSrc(url);

      } catch (error) {
        console.error("Error preparing Metamyth Journey:", error);
      }
    };

    loadJourneyAssets();

    return () => {
      // Clean up the blob URL when the component unmounts
      if (iframeSrc) URL.revokeObjectURL(iframeSrc);
    };
  }, [navigate]);

  if (!iframeSrc) {
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
        src={iframeSrc}
        title="Metamyth Journey"
        scrolling="auto"
        style={{
          width: '100%',
          flexGrow: 1,
          border: 'none',
          display: 'block'
        }}
      ></iframe>
    </PageLayout>
  );
}