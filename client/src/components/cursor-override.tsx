import { useEffect } from 'react';

export default function CursorOverride() {
  useEffect(() => {
    // Nuclear option: override cursor at browser level
    const preventSystemCursor = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('nav')) {
        // Force browser to use custom cursor by setting it directly on target
        const cursorStyle = document.getElementById('cursor-animation-style');
        if (cursorStyle && cursorStyle.textContent) {
          const urlMatch = cursorStyle.textContent.match(/url\("[^"]+"\)\s+\d+\s+\d+,\s*[^;]+/);
          if (urlMatch) {
            target.style.setProperty('cursor', urlMatch[0], 'important');
            // Also set on document.body to force browser override
            document.body.style.setProperty('cursor', urlMatch[0], 'important');
          }
        }
      }
    };

    // Capture mouse events at document level before they reach elements
    document.addEventListener('mouseover', preventSystemCursor, true);
    document.addEventListener('mouseenter', preventSystemCursor, true);
    document.addEventListener('mousemove', preventSystemCursor, true);

    return () => {
      document.removeEventListener('mouseover', preventSystemCursor, true);
      document.removeEventListener('mouseenter', preventSystemCursor, true);
      document.removeEventListener('mousemove', preventSystemCursor, true);
    };
  }, []);

  return null;
}