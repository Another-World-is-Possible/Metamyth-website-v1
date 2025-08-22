import { useEffect, useState } from 'react';

export default function CursorRegionDebug() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [elementStack, setElementStack] = useState<string[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      
      // Get all elements at cursor position
      const elementsAtPoint = document.elementsFromPoint(e.clientX, e.clientY);
      
      // Focus specifically on problematic top 33px area
      if (e.clientY < 35) {
        const stack = elementsAtPoint.map((el, index) => {
          const computed = getComputedStyle(el);
          const hasCustomCursor = computed.cursor.includes('url');
          const zIndex = computed.zIndex;
          const pointerEvents = computed.pointerEvents;
          
          return `${index}: ${el.tagName.toLowerCase()}${el.className ? '.' + el.className.split(' ')[0] : ''} | cursor:${hasCustomCursor ? 'CUSTOM' : 'SYSTEM'} | z:${zIndex} | pe:${pointerEvents}`;
        });
        setElementStack(stack);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '70px',
      right: '10px',
      background: 'rgba(0,0,0,0.9)',
      color: '#fff',
      padding: '10px',
      fontSize: '10px',
      fontFamily: 'monospace',
      maxWidth: '350px',
      zIndex: 10001,
      border: '1px solid #555'
    }}>
      <div style={{ color: '#ff6b6b', marginBottom: '8px' }}>Top 33px Elements at ({coords.x}, {coords.y}):</div>
      {elementStack.map((element, i) => (
        <div key={i} style={{ 
          margin: '2px 0', 
          color: element.includes('CUSTOM') ? '#4ade80' : '#fbbf24',
          borderLeft: i === 0 ? '2px solid #ff6b6b' : 'none',
          paddingLeft: i === 0 ? '4px' : '0'
        }}>
          {element}
        </div>
      ))}
    </div>
  );
}