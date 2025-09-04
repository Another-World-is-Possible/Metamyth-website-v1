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

    // --- UPDATED LOGIC: Rewrite ALL relative paths to be absolute ---
    const origin = window.location.origin; // Gets "http://localhost:5173"
    
    // 1. Fix standard HTML attributes like <script src="/..."> and <link href="/...">
    let rewrittenHtml = storedHtml.replace(/(src|href)="\//g, `$1="${origin}/`);
    
    // 2. Fix CSS url() paths like url('/attached_assets/font.otf')
    // This regex looks for url( followed by an optional quote and a slash
    rewrittenHtml = rewrittenHtml.replace(/(url\s*\(\s*['"]?)\//g, `$1${origin}/`);
    
    // --- Create the Blob URL using the FULLY REWRITTEN HTML ---
    const blob = new Blob([rewrittenHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setIframeSrc(url);

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'iframeResize') {
        setIframeHeight(event.data.height + 20);
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
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