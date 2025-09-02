import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import PageLayout from '@/components/layouts/page-layout'; // 1. Import PageLayout

export default function MetamythJourneyPage() {
  const [, navigate] = useLocation();
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [iframeSrc, setIframeSrc] = useState<string | null>(null);

  useEffect(() => {
    const storedHtml = sessionStorage.getItem('metamythHTML');
    if (!storedHtml) {
      navigate('/begin', { replace: true });
      return;
    }

    // Create a Blob from the HTML content
    const blob = new Blob([storedHtml], { type: 'text/html' });
    // Create an object URL for the Blob
    const url = URL.createObjectURL(blob);
    setIframeSrc(url);

    // Clean up the object URL when the component unmounts or storedHtml changes
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [navigate]); // Depend on navigate to ensure it's stable

  if (!iframeSrc) {
    return (
      <PageLayout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-lg">Loading Your Metamyth Journey...</p>
          <p className="text-sm text-gray-400">Please wait while we prepare your experience.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <iframe
        src={iframeSrc}
        title="Metamyth Journey"
        style={{ width: '100%', height: '100vh', border: 'none' }} // Adjust height as needed
        sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
      ></iframe>
    </PageLayout>
  );
}