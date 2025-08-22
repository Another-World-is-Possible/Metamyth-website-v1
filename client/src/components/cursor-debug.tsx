import { useEffect, useState } from 'react';

export default function CursorDebug() {
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [hoveredElement, setHoveredElement] = useState<string>('');
  const [swordCursorStatus, setSwordCursorStatus] = useState<string>('');

  useEffect(() => {
    // Check SwordCursor initialization
    const checkSwordCursor = () => {
      const cursorStyle = document.getElementById('cursor-animation-style');
      const htmlCursor = getComputedStyle(document.documentElement).cursor;
      const bodyCursor = getComputedStyle(document.body).cursor;
      
      setSwordCursorStatus(`Style: ${!!cursorStyle} | HTML: ${htmlCursor.slice(0, 20)}... | Body: ${bodyCursor.slice(0, 20)}...`);
    };
    
    checkSwordCursor();
    const interval = setInterval(checkSwordCursor, 2000);

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const computed = getComputedStyle(target);
      
      // Check if we're in navigation area
      const isInNav = target.closest('nav') !== null;
      const isNavButton = target.closest('nav button') !== null;
      
      if (isInNav) {
        // Check parent chain for cursor inheritance
        let parent = target.parentElement;
        let parentCursors = [];
        while (parent && parentCursors.length < 3) {
          const parentCursor = getComputedStyle(parent).cursor;
          parentCursors.push(`${parent.tagName}: ${parentCursor.slice(0, 15)}`);
          parent = parent.parentElement;
        }
        
        const info = [
          `Element: ${target.tagName.toLowerCase()}${target.className ? '.' + target.className.split(' ').slice(0, 2).join('.') : ''}`,
          `Computed cursor: ${computed.cursor}`,
          `Has custom cursor: ${computed.cursor.includes('url')}`,
          `In nav button: ${isNavButton}`,
          `Pointer events: ${computed.pointerEvents}`,
          `Parent cursors: ${parentCursors.join(' → ')}`
        ];
        
        setDebugInfo(info);
        setHoveredElement(`${target.tagName}: ${target.textContent?.slice(0, 20) || 'no text'}`);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '70px',
      right: '10px',
      background: 'rgba(0,0,0,0.9)',
      color: '#d4af37',
      padding: '12px',
      fontSize: '11px',
      fontFamily: 'monospace',
      maxWidth: '400px',
      zIndex: 9999,
      border: '1px solid #333',
      borderRadius: '4px'
    }}>
      <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Nav Cursor Debug:</div>
      <div style={{ color: '#4ade80', fontSize: '9px', marginBottom: '6px' }}>
        SwordCursor: {swordCursorStatus}
      </div>
      <div style={{ color: '#fff', marginBottom: '6px' }}>{hoveredElement}</div>
      {debugInfo.map((info, i) => (
        <div key={i} style={{ 
          margin: '2px 0', 
          fontSize: '10px',
          color: info.includes('Has custom cursor: true') ? '#4ade80' : '#d4af37'
        }}>
          {info}
        </div>
      ))}
    </div>
  );
}