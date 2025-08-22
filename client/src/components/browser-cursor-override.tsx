import { useEffect } from 'react';

export default function BrowserCursorOverride() {
  useEffect(() => {
    // Create invisible overlay specifically for top 33px to force browser cursor behavior
    const createTopAreaOverlay = () => {
      // Remove any existing overlay
      const existingOverlay = document.getElementById('top-cursor-overlay');
      if (existingOverlay) {
        existingOverlay.remove();
      }

      const overlay = document.createElement('div');
      overlay.id = 'top-cursor-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 33px;
        pointer-events: auto;
        z-index: 999999;
        background: transparent;
        cursor: inherit;
      `;

      // Add event listeners to capture and re-dispatch events
      overlay.addEventListener('mousemove', (e) => {
        // Get the element behind the overlay
        overlay.style.pointerEvents = 'none';
        const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
        overlay.style.pointerEvents = 'auto';
        
        if (elementBelow) {
          // Force cursor update on the element below
          const cursorStyle = document.getElementById('cursor-animation-style');
          if (cursorStyle && cursorStyle.textContent) {
            const urlMatch = cursorStyle.textContent.match(/url\("[^"]+"\)\s+\d+\s+\d+,\s*[^;]+/);
            if (urlMatch) {
              overlay.style.cursor = urlMatch[0];
            }
          }
        }
      });

      overlay.addEventListener('click', (e) => {
        // Pass through click events
        overlay.style.pointerEvents = 'none';
        const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
        if (elementBelow && 'click' in elementBelow) {
          (elementBelow as HTMLElement).click();
        }
        overlay.style.pointerEvents = 'auto';
      });

      document.body.appendChild(overlay);
      return overlay;
    };

    // Alternative approach: Force cursor through CSS custom properties
    const createCursorCSSOverride = () => {
      const style = document.createElement('style');
      style.id = 'top-area-cursor-override';
      style.textContent = `
        /* Force cursor in top viewport area */
        html {
          --custom-cursor: inherit;
        }
        
        @media screen {
          /* Target elements in top area specifically */
          body > *:first-child,
          nav,
          nav *,
          [style*="position: fixed"],
          [style*="position: sticky"] {
            cursor: var(--custom-cursor) !important;
          }
          
          /* Force cursor on viewport level */
          html:hover,
          body:hover {
            cursor: var(--custom-cursor) !important;
          }
        }
      `;
      document.head.appendChild(style);

      // Update CSS custom property when cursor changes
      const updateCursorProperty = () => {
        const cursorStyle = document.getElementById('cursor-animation-style');
        if (cursorStyle && cursorStyle.textContent) {
          const urlMatch = cursorStyle.textContent.match(/url\("[^"]+"\)\s+\d+\s+\d+,\s*[^;]+/);
          if (urlMatch) {
            document.documentElement.style.setProperty('--custom-cursor', urlMatch[0]);
          }
        }
      };

      updateCursorProperty();
      const interval = setInterval(updateCursorProperty, 100);
      return () => clearInterval(interval);
    };

    // Try both approaches
    const overlay = createTopAreaOverlay();
    const cleanupCSS = createCursorCSSOverride();

    return () => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      const cssOverride = document.getElementById('top-area-cursor-override');
      if (cssOverride) {
        cssOverride.remove();
      }
      if (cleanupCSS) {
        cleanupCSS();
      }
    };
  }, []);

  return null;
}