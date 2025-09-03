import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import PageLayout from '@/components/layouts/page-layout';

export default function MetamythJourneyPage() {
  const [, navigate] = useLocation();
  // State to hold the full HTML string and just the body content for rendering
  const [fullHtml, setFullHtml] = useState<string | null>(null);
  const [bodyContent, setBodyContent] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedHtml = sessionStorage.getItem('metamythHTML');
    if (!storedHtml) {
      navigate('/begin', { replace: true });
      return;
    }
    
    setFullHtml(storedHtml);

    // Use the browser's DOM parser to safely extract the body's content
    const parser = new DOMParser();
    const doc = parser.parseFromString(storedHtml, 'text/html');
    setBodyContent(doc.body.innerHTML);
    
  }, [navigate]);

  useEffect(() => {
    // This effect runs after the HTML is rendered to find and execute scripts
    if (!fullHtml || !containerRef.current) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(fullHtml, 'text/html');
    
    const scripts = Array.from(doc.querySelectorAll("script"));
    const loadedScripts: HTMLScriptElement[] = [];

    scripts.forEach(script => {
      const newScript = document.createElement("script");
      
      // Copy all attributes (like src) from the original script tag
      script.getAttributeNames().forEach(attr => {
        newScript.setAttribute(attr, script.getAttribute(attr) || '');
      });
      
      // Copy the inline script content
      newScript.textContent = script.textContent;
      
      // Append the new script to the document's body to execute it
      document.body.appendChild(newScript);
      loadedScripts.push(newScript);
    });

    // Cleanup function: remove the dynamically added scripts when the component unmounts
    return () => {
      loadedScripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [fullHtml]); // Rerun this logic if the HTML content changes

  if (!bodyContent) {
    // A better loading state while parsing the HTML
    return (
      <PageLayout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-lg">Loading Your Metamyth Journey...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* This div will expand to the full height of its content, 
        pushing the footer down naturally and creating a single scrollbar.
      */}
      <div 
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: bodyContent }} 
      />
    </PageLayout>
  );
}