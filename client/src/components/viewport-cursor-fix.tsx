import { useEffect } from 'react';

export default function ViewportCursorFix() {
  useEffect(() => {
    // Create invisible overlay to catch cursor issues in top viewport area
    const overlay = document.createElement('div');
    overlay.id = 'viewport-cursor-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 200px;
      pointer-events: none;
      z-index: -1;
      background: transparent;
    `;

    // Get current sword cursor
    const getSwordCursor = () => {
      const cursorStyle = document.getElementById('cursor-animation-style');
      if (cursorStyle && cursorStyle.textContent) {
        const urlMatch = cursorStyle.textContent.match(/url\("[^"]+"\)\s+\d+\s+\d+,\s*[^;]+/);
        return urlMatch ? urlMatch[0] : null;
      }
      return null;
    };

    // Force cursor on viewport and body when mouse is in top area
    const handleTopAreaMouse = (e: MouseEvent) => {
      if (e.clientY < 200) {
        const cursorUrl = getSwordCursor();
        if (cursorUrl) {
          // Force cursor on document elements
          document.documentElement.style.setProperty('cursor', cursorUrl, 'important');
          document.body.style.setProperty('cursor', cursorUrl, 'important');
          
          // Force cursor on all elements in top area
          const topElements = document.elementsFromPoint(e.clientX, e.clientY);
          topElements.forEach(el => {
            (el as HTMLElement).style.setProperty('cursor', cursorUrl, 'important');
          });
        }
      }
    };

    document.body.appendChild(overlay);
    document.addEventListener('mousemove', handleTopAreaMouse, true);

    return () => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      document.removeEventListener('mousemove', handleTopAreaMouse, true);
    };
  }, []);

  return null;
}