import { useEffect } from 'react';

export default function DevToolsCursorFix() {
  useEffect(() => {
    // Target DevTools elements that might be interfering
    const fixDevToolsInterference = () => {
      // Method 1: Hide/Remove DevTools elements that interfere with cursor
      const removeInterferingElements = () => {
        // Look for DevTools elements
        const interferingElements = document.querySelectorAll('.__chobitsu-hide__, [class*="chobitsu"], [class*="devtools"]');
        interferingElements.forEach(el => {
          (el as HTMLElement).style.setProperty('display', 'none', 'important');
          (el as HTMLElement).style.setProperty('pointer-events', 'none', 'important');
          (el as HTMLElement).style.setProperty('visibility', 'hidden', 'important');
        });
      };

      // Method 2: Force cursor on all visible elements in top area
      const forceCursorTopArea = () => {
        const cursorStyle = document.getElementById('cursor-animation-style');
        if (cursorStyle?.textContent) {
          const match = cursorStyle.textContent.match(/url\("[^"]+"\)\s+\d+\s+\d+,\s*[^;]+/);
          if (match) {
            const cursorValue = match[0];
            
            // Get all elements in top 33px
            const topElements = Array.from(document.querySelectorAll('*')).filter(el => {
              const rect = el.getBoundingClientRect();
              return rect.top <= 33 && rect.bottom >= 0;
            });

            topElements.forEach(el => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.setProperty('cursor', cursorValue, 'important');
            });

            // Also force on viewport itself
            document.documentElement.style.setProperty('cursor', cursorValue, 'important');
            document.body.style.setProperty('cursor', cursorValue, 'important');
          }
        }
      };

      // Method 3: Override any auto cursor declarations
      const overrideAutoCursor = () => {
        const style = document.createElement('style');
        style.id = 'auto-cursor-override';
        
        const cursorStyle = document.getElementById('cursor-animation-style');
        if (cursorStyle?.textContent) {
          const match = cursorStyle.textContent.match(/url\("[^"]+"\)\s+\d+\s+\d+,\s*[^;]+/);
          if (match) {
            style.textContent = `
              /* Override all auto cursors */
              [style*="cursor: auto"], 
              *[cursor="auto"] {
                cursor: ${match[0]} !important;
              }
              
              /* Target specific problematic classes */
              .__chobitsu-hide__,
              [class*="chobitsu"] {
                cursor: ${match[0]} !important;
                display: none !important;
                pointer-events: none !important;
              }
              
              /* Force cursor on all elements */
              html, body, * {
                cursor: ${match[0]} !important;
              }
              
              /* Specific targeting for top viewport area */
              html:hover, body:hover {
                cursor: ${match[0]} !important;
              }
            `;
          }
        }

        // Remove existing override
        const existing = document.getElementById('auto-cursor-override');
        if (existing) existing.remove();

        document.head.appendChild(style);
      };

      // Run all methods
      removeInterferingElements();
      forceCursorTopArea();
      overrideAutoCursor();
    };

    // Run immediately and continuously
    fixDevToolsInterference();
    const interval = setInterval(fixDevToolsInterference, 100);

    // Also run on DOM mutations
    const observer = new MutationObserver(() => {
      fixDevToolsInterference();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
      const style = document.getElementById('auto-cursor-override');
      if (style) style.remove();
    };
  }, []);

  return null;
}