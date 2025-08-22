import { useEffect } from 'react';

export default function ViewportCursorEnforcer() {
  useEffect(() => {
    // Create absolute viewport cursor enforcement
    const enforceViewportCursor = () => {
      // Method 1: Complete CSS Override System
      const cssOverlay = document.createElement('style');
      cssOverlay.id = 'absolute-cursor-enforcer';
      cssOverlay.textContent = `
        /* Nuclear cursor override at all levels */
        html {
          cursor: var(--enforced-cursor) !important;
        }
        
        body {
          cursor: var(--enforced-cursor) !important;
        }
        
        body::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 33px;
          z-index: 2147483647;
          pointer-events: none;
          cursor: var(--enforced-cursor) !important;
          background: rgba(255,0,0,0.01);
        }
        
        /* Override every possible element */
        *, *::before, *::after {
          cursor: var(--enforced-cursor) !important;
        }
        
        /* Specific targeting for problematic elements */
        nav, nav *, 
        [style*="position"], [style*="z-index"],
        .fixed, .absolute, .relative, .sticky {
          cursor: var(--enforced-cursor) !important;
        }
      `;
      document.head.appendChild(cssOverlay);

      // Method 2: Direct viewport manipulation
      let viewportCursor = '';
      const updateViewportCursor = () => {
        const cursorStyle = document.getElementById('cursor-animation-style');
        if (cursorStyle?.textContent) {
          const match = cursorStyle.textContent.match(/url\("[^"]+"\)\s+\d+\s+\d+,\s*[^;]+/);
          if (match && match[0] !== viewportCursor) {
            viewportCursor = match[0];
            
            // Force at multiple document levels
            document.documentElement.style.setProperty('cursor', viewportCursor, 'important');
            document.body.style.setProperty('cursor', viewportCursor, 'important');
            
            // Update CSS variable for global override
            document.documentElement.style.setProperty('--enforced-cursor', viewportCursor);
            
            // Force on all existing elements
            const allElements = document.querySelectorAll('*');
            allElements.forEach(el => {
              (el as HTMLElement).style.setProperty('cursor', viewportCursor, 'important');
            });
          }
        }
      };

      // Method 3: Mouse event interception
      const interceptMouse = (e: MouseEvent) => {
        if (e.clientY <= 33) {
          // Force cursor style on current target
          const target = e.target as HTMLElement;
          if (target && viewportCursor) {
            target.style.setProperty('cursor', viewportCursor, 'important');
            document.body.style.setProperty('cursor', viewportCursor, 'important');
          }
        }
      };

      // Update cursor every animation frame
      updateViewportCursor();
      const animationInterval = setInterval(updateViewportCursor, 16); // ~60fps
      
      // Add mouse interceptor
      document.addEventListener('mousemove', interceptMouse, { capture: true, passive: true });
      document.addEventListener('mouseenter', interceptMouse, { capture: true, passive: true });

      return () => {
        clearInterval(animationInterval);
        document.removeEventListener('mousemove', interceptMouse, { capture: true });
        document.removeEventListener('mouseenter', interceptMouse, { capture: true });
        if (cssOverlay.parentNode) {
          cssOverlay.parentNode.removeChild(cssOverlay);
        }
      };
    };

    const cleanup = enforceViewportCursor();
    return cleanup;
  }, []);

  return null;
}