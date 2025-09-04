// src/pages/metamyth-journey.tsx

import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import PageLayout from '@/components/layouts/page-layout';

export default function MetamythJourneyPage() {
  const [, navigate] = useLocation();
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(800);

  useEffect(() => {
    const storedHtml = sessionStorage.getItem('metamythHTML');
    if (!storedHtml) {
      navigate('/begin', { replace: true });
      return;
    }

    // --- NEW LOGIC: Read env variable and inject it into the HTML ---
    
    // 1. Read the environment variable from Vite. Default to 'false' (LLM mode) if not set.
    const isLlmMode = import.meta.env.VITE_METAMYTH_USE_LLM !== 'true';

    // 2. Create a script string to set a global variable inside the iframe.
    const featureScript = `<script>window.METAMYTH_USE_LLM = ${isLlmMode};</script>`;
    
    // 3. Inject this script into the <head> of the HTML string.
    let finalHtml = storedHtml.replace('</head>', `${featureScript}</head>`);
    
    // --- Path rewriting logic remains the same ---
    const origin = window.location.origin;
    finalHtml = finalHtml.replace(/(src|href)="\//g, `$1="${origin}/`);
    finalHtml = finalHtml.replace(/(url\s*\(\s*['"]?)\//g, `$1${origin}/`);
    
    // --- Create the Blob URL using the fully modified HTML ---
    const blob = new Blob([finalHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setIframeSrc(url);

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'iframeResize') {
        setIframeHeight(event.data.height + 20);
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      if (url) URL.revokeObjectURL(url);
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  if (!iframeSrc) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg">Loading Your Metamyth Journey...</p>
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