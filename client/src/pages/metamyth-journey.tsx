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

    // --- CORRECTED DEV MODE LOGIC ---
    
    // 1. Explicitly check if the Vite environment variable is set to 'true'.
    const isLlmEnabled = import.meta.env.VITE_METAMYTH_USE_LLM === 'true';
    
    // 2. Create the script that will be injected into the iframe's HTML.
    //    This sets the global variable that the journey's JavaScript will check.
    const featureScript = `<script>window.METAMYTH_USE_LLM = ${isLlmEnabled};</script>`;
    
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
        // Add a small buffer to prevent scrollbars
        setIframeHeight(event.data.height + 50);
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