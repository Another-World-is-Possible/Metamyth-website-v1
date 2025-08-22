import { useEffect } from 'react';

export default function RootCursorFix() {
  useEffect(() => {
    // Target the root cause: browser viewport cursor inheritance
    const fixRootCursor = () => {
      // Method 1: Force cursor at document level using setAttribute
      const updateDocumentCursor = () => {
        const cursorStyle = document.getElementById('cursor-animation-style');
        if (cursorStyle?.textContent) {
          const match = cursorStyle.textContent.match(/url\("[^"]+"\)\s+\d+\s+\d+,\s*[^;]+/);
          if (match) {
            const cursorValue = match[0];
            
            // Force using setAttribute instead of style property
            document.documentElement.setAttribute('style', `cursor: ${cursorValue} !important;`);
            document.body.setAttribute('style', `cursor: ${cursorValue} !important;`);
            
            // Also force via direct style object manipulation
            (document.documentElement as any).style.cssText = `cursor: ${cursorValue} !important;`;
            (document.body as any).style.cssText = `cursor: ${cursorValue} !important;`;
          }
        }
      };

      // Method 2: Create a document-level event listener that forces cursor
      const forceDocumentCursor = (e: MouseEvent) => {
        if (e.clientY <= 35) {
          const cursorStyle = document.getElementById('cursor-animation-style');
          if (cursorStyle?.textContent) {
            const match = cursorStyle.textContent.match(/url\("[^"]+"\)\s+\d+\s+\d+,\s*[^;]+/);
            if (match) {
              // Force cursor on the document itself
              document.documentElement.style.setProperty('cursor', match[0], 'important');
              // Also force it via CSS text
              document.documentElement.style.cssText += `; cursor: ${match[0]} !important`;
            }
          }
        }
      };

      // Method 3: Override browser defaults via CSS injection at head level
      const injectRootCSS = () => {
        // Remove any existing override
        const existing = document.getElementById('root-cursor-override');
        if (existing) existing.remove();

        const style = document.createElement('style');
        style.id = 'root-cursor-override';
        style.setAttribute('type', 'text/css');
        
        const cursorStyle = document.getElementById('cursor-animation-style');
        if (cursorStyle?.textContent) {
          const match = cursorStyle.textContent.match(/url\("[^"]+"\)\s+\d+\s+\d+,\s*[^;]+/);
          if (match) {
            style.textContent = `
              :root {
                cursor: ${match[0]} !important;
              }
              
              html {
                cursor: ${match[0]} !important;
              }
              
              html:hover {
                cursor: ${match[0]} !important;
              }
              
              html * {
                cursor: inherit !important;
              }
              
              /* Force inheritance chain */
              html > body {
                cursor: inherit !important;
              }
              
              /* Override any user agent styles */
              html, body {
                cursor: ${match[0]} !important;
              }
            `;
          }
        }
        
        // Insert at the very beginning of head to ensure it's loaded first
        const firstChild = document.head.firstChild;
        if (firstChild) {
          document.head.insertBefore(style, firstChild);
        } else {
          document.head.appendChild(style);
        }
      };

      // Run all methods
      updateDocumentCursor();
      injectRootCSS();
      
      // Set up continuous updates
      const interval = setInterval(() => {
        updateDocumentCursor();
        injectRootCSS();
      }, 100);

      // Add event listeners
      document.addEventListener('mousemove', forceDocumentCursor, { capture: true, passive: true });
      document.addEventListener('mouseenter', forceDocumentCursor, { capture: true, passive: true });

      return () => {
        clearInterval(interval);
        document.removeEventListener('mousemove', forceDocumentCursor, { capture: true });
        document.removeEventListener('mouseenter', forceDocumentCursor, { capture: true });
        const style = document.getElementById('root-cursor-override');
        if (style) style.remove();
      };
    };

    const cleanup = fixRootCursor();
    return cleanup;
  }, []);

  return null;
}