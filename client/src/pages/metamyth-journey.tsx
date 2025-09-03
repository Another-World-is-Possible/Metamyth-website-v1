import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import PageLayout from '@/components/layouts/page-layout';

export default function MetamythJourneyPage() {
  const [, navigate] = useLocation();
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(800); // A default starting height

  useEffect(() => {
    // --- Create the Blob URL for the iframe source ---
    const storedHtml = sessionStorage.getItem('metamythHTML');
    if (!storedHtml) {
      navigate('/begin', { replace: true });
      return;
    }
    const blob = new Blob([storedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setIframeSrc(url);

    // --- Listen for messages from the iframe ---
    const handleMessage = (event: MessageEvent) => {
      // We only care about messages of type 'iframeResize' from our iframe
      if (event.source === window && event.data && event.data.type === 'iframeResize') {
        // Add a little extra padding to avoid scrollbars appearing unexpectedly
        setIframeHeight(event.data.height + 20);
      }
    };

    window.addEventListener('message', handleMessage);

    // --- Cleanup function ---
    return () => {
      URL.revokeObjectURL(url);
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  if (!iframeSrc) {
    return (
      <PageLayout>
        <div className="min-h-screen flex flex-col items-center justify-center">
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
        scrolling="no" // Disable the iframe's own scrollbar
        style={{
          width: '100%',
          height: `${iframeHeight}px`, // Dynamically set the height from state
          border: 'none',
          display: 'block' // Helps prevent extra space below the iframe
        }}
      ></iframe>
    </PageLayout>
  );
}