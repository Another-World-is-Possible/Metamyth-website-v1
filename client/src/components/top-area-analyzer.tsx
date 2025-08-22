import { useEffect, useState } from 'react';

export default function TopAreaAnalyzer() {
  const [analysis, setAnalysis] = useState<string[]>([]);

  useEffect(() => {
    // Analyze the top 33px area structure
    const analyzeTopArea = () => {
      const findings: string[] = [];
      
      // Check for elements at specific Y positions in top area
      for (let y = 0; y <= 33; y += 5) {
        const elements = document.elementsFromPoint(window.innerWidth / 2, y);
        if (elements.length > 0) {
          const topElement = elements[0];
          const computed = getComputedStyle(topElement);
          
          findings.push(`Y=${y}: ${topElement.tagName.toLowerCase()}${
            topElement.className ? '.' + topElement.className.split(' ')[0] : ''
          } | cursor: ${computed.cursor} | z-index: ${computed.zIndex} | position: ${computed.position}`);
        }
      }
      
      // Check navigation positioning
      const nav = document.querySelector('nav');
      if (nav) {
        const navRect = nav.getBoundingClientRect();
        const navComputed = getComputedStyle(nav);
        findings.push(`NAV: top=${navRect.top} height=${navRect.height} position=${navComputed.position} z-index=${navComputed.zIndex}`);
      }
      
      // Check for fixed/sticky elements
      const fixedElements = Array.from(document.querySelectorAll('*')).filter(el => {
        const style = getComputedStyle(el);
        return style.position === 'fixed' || style.position === 'sticky';
      });
      
      fixedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 33) {
          findings.push(`FIXED: ${el.tagName.toLowerCase()} top=${rect.top} height=${rect.height}`);
        }
      });
      
      setAnalysis(findings);
    };

    analyzeTopArea();
    const interval = setInterval(analyzeTopArea, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.9)',
      color: '#00ff00',
      padding: '10px',
      fontSize: '10px',
      fontFamily: 'monospace',
      maxWidth: '500px',
      maxHeight: '300px',
      overflow: 'auto',
      zIndex: 10002,
      border: '1px solid #333'
    }}>
      <div style={{ color: '#ff6b6b', marginBottom: '8px' }}>Top 33px Area Analysis:</div>
      {analysis.map((finding, i) => (
        <div key={i} style={{ margin: '2px 0', fontSize: '9px' }}>
          {finding}
        </div>
      ))}
    </div>
  );
}