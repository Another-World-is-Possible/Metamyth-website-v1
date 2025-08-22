import { useEffect, useState } from 'react';

export default function CursorDiagnostic() {
  const [diagnostics, setDiagnostics] = useState<string[]>([]);

  useEffect(() => {
    const updateDiagnostics = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Get computed cursor style
      const computedStyle = getComputedStyle(target);
      const cursor = computedStyle.getPropertyValue('cursor');
      
      // Get inline styles
      const inlineStyle = target.style.cursor;
      
      // Check element type and location
      const isInNav = target.closest('nav') !== null;
      const isButton = target.tagName === 'BUTTON' || target.closest('button') !== null;
      
      // Check for specific cursor override styles
      const hasInherit = cursor.includes('inherit');
      const hasUrl = cursor.includes('url');
      
      setDiagnostics([
        `Element: ${target.tagName.toLowerCase()}${target.className ? '.' + target.className.split(' ').join('.') : ''}`,
        `Computed cursor: ${cursor}`,
        `Inline cursor: ${inlineStyle || 'none'}`,
        `In nav: ${isInNav}`,
        `Is button: ${isButton}`,
        `Has inherit: ${hasInherit}`,
        `Has URL: ${hasUrl}`,
        `Z-index: ${computedStyle.zIndex}`,
        `Pointer events: ${computedStyle.pointerEvents}`
      ]);
    };

    document.addEventListener('mousemove', updateDiagnostics);
    return () => document.removeEventListener('mousemove', updateDiagnostics);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '10px',
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '10px',
      fontSize: '11px',
      zIndex: 10000,
      maxWidth: '300px',
      borderRadius: '4px'
    }}>
      <h4 style={{ margin: '0 0 8px 0' }}>Cursor Diagnostic:</h4>
      {diagnostics.map((diag, i) => (
        <div key={i} style={{ marginBottom: '2px' }}>{diag}</div>
      ))}
    </div>
  );
}