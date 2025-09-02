import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import PageLayout from '@/components/layouts/page-layout'; // 1. Import PageLayout

export default function MetamythJourneyPage() {
  const [, navigate] = useLocation();
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedHtml = sessionStorage.getItem('metamythHTML');
    if (!storedHtml) {
      navigate('/begin', { replace: true });
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(storedHtml, 'text/html');
    const bodyContent = doc.body.innerHTML;
    setHtmlContent(bodyContent);
  }, [navigate]);

  useEffect(() => {
    if (!htmlContent || !containerRef.current) return;

    const container = containerRef.current;
    const scripts = Array.from(container.querySelectorAll("script"));
    const loadedScripts: HTMLScriptElement[] = [];

    scripts.forEach(script => {
      const newScript = document.createElement("script");
      script.getAttributeNames().forEach(attr => {
        newScript.setAttribute(attr, script.getAttribute(attr) || '');
      });
      newScript.innerHTML = script.innerHTML;
      document.body.appendChild(newScript);
      loadedScripts.push(newScript);
    });

    return () => {
      loadedScripts.forEach(script => {
        // Check if the script is still in the body before trying to remove it
        if (script.parentNode === document.body) {
          document.body.removeChild(script);
        }
      });
    };
  }, [htmlContent]);

  if (!htmlContent) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          {/* Optional: Add a loading spinner here */}
        </div>
      </PageLayout>
    );
  }

  // 2. Wrap the dynamic content in PageLayout
  return (
    <PageLayout>
      <div 
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />
    </PageLayout>
  );
}