// src/pages/metamyth-journey.tsx

import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import PageLayout from '@/components/layouts/page-layout';

export default function MetamythJourneyPage() {
  const [, navigate] = useLocation();
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(800);

  useEffect(() => {
    const loadJourneyAssets = async () => {
      const storedHtml = sessionStorage.getItem('metamythHTML');
      if (!storedHtml) {
        navigate('/begin', { replace: true });
        return;
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

        // This logic correctly enables the LLM feature only when the env var is 'true'
        const isLlmEnabled = import.meta.env.VITE_METAMYTH_USE_LLM === 'true';
        const featureScript = `window.METAMYTH_USE_LLM = ${isLlmEnabled};`;

        const combinedScripts = `
          <script>${featureScript}</script>
          <script>${chatbotJs}</script>
          <script>${journeyJs}</script>
        `;

        let finalHtml = storedHtml.replace('</body>', `${combinedScripts}</body>`);
        
        const origin = window.location.origin;
        finalHtml = finalHtml.replace(/(src|href)="\//g, `$1="${origin}/`);
        finalHtml = finalHtml.replace(/(url\s*\(\s*['"]?)\//g, `$1${origin}/`);
        
        const blob = new Blob([finalHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        setIframeSrc(url);

      } catch (error) {
        console.error("Error preparing Metamyth Journey:", error);
      }
    };

    loadJourneyAssets();

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'iframeResize') {
        setIframeHeight(event.data.height + 50);
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      if (iframeSrc) URL.revokeObjectURL(iframeSrc);
      window.removeEventListener('message', handleMessage);
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
    <PageLayout>
      <iframe
        src={iframeSrc}
        title="Metamyth Journey"
        scrolling="no"
        style={{
          width: '100%',
          height: `${iframeHeight}px`,
          border: 'none',
          display: 'block'
        }}
      ></iframe>
    </PageLayout>
  );
}