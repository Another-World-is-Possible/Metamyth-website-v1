import { useEffect, useState } from 'react';

export default function CursorDebugger() {
  const [analysis, setAnalysis] = useState<string[]>([]);

  useEffect(() => {
    const analyzeNavigation = () => {
      const navElement = document.querySelector('nav');
      if (!navElement) return;

      const results: string[] = [];
      
      // Check nav element itself
      const navStyles = getComputedStyle(navElement);
      results.push(`Nav cursor: ${navStyles.cursor}`);
      results.push(`Nav z-index: ${navStyles.zIndex}`);
      
      // Check navigation buttons
      const navButtons = navElement.querySelectorAll('button');
      navButtons.forEach((button, index) => {
        const buttonStyles = getComputedStyle(button);
        const buttonRect = button.getBoundingClientRect();
        
        results.push(`\nButton ${index + 1}:`);
        results.push(`  Computed cursor: ${buttonStyles.cursor}`);
        results.push(`  Inline cursor: ${(button as HTMLElement).style.cursor}`);
        results.push(`  Pointer events: ${buttonStyles.pointerEvents}`);
        results.push(`  Position: ${buttonStyles.position}`);
        results.push(`  Z-index: ${buttonStyles.zIndex}`);
        results.push(`  Bounds: ${Math.round(buttonRect.width)}x${Math.round(buttonRect.height)}`);
        
        // Check children
        const spans = button.querySelectorAll('span');
        spans.forEach((span, spanIndex) => {
          const spanStyles = getComputedStyle(span);
          results.push(`    Span ${spanIndex + 1} cursor: ${spanStyles.cursor}`);
          results.push(`    Span ${spanIndex + 1} pointer-events: ${spanStyles.pointerEvents}`);
        });
        
        // Check SVG icons
        const svgs = button.querySelectorAll('svg');
        svgs.forEach((svg, svgIndex) => {
          const svgStyles = getComputedStyle(svg);
          results.push(`    SVG ${svgIndex + 1} cursor: ${svgStyles.cursor}`);
          results.push(`    SVG ${svgIndex + 1} pointer-events: ${svgStyles.pointerEvents}`);
        });
      });
      
      // Check if there are any overlapping elements
      const allFixedElements = document.querySelectorAll('[style*="position: fixed"], .fixed');
      results.push(`\nFixed elements count: ${allFixedElements.length}`);
      
      // Check cursor style injection
      const cursorStyle = document.getElementById('cursor-animation-style');
      results.push(`\nCursor style element exists: ${!!cursorStyle}`);
      if (cursorStyle) {
        results.push(`Style content length: ${cursorStyle.textContent?.length || 0}`);
      }

      setAnalysis(results);
    };

    // Run analysis immediately and on mouse events
    analyzeNavigation();
    
    const interval = setInterval(analyzeNavigation, 2000);
    return () => clearInterval(interval);
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
      fontFamily: 'monospace',
      maxWidth: '400px',
      maxHeight: '600px',
      overflow: 'auto',
      zIndex: 10000,
      border: '1px solid #333'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#d4af37' }}>Cursor Debug Analysis:</h4>
      {analysis.map((line, i) => (
        <div key={i} style={{ margin: '2px 0', whiteSpace: 'pre-wrap' }}>
          {line}
        </div>
      ))}
    </div>
  );
}