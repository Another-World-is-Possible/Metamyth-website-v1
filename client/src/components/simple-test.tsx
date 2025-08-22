import { useEffect, useState } from 'react';

export default function SimpleTest() {
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    const runTests = () => {
      const results: string[] = [];
      
      // Test 1: Check what cursor value is actually applied
      const htmlStyle = getComputedStyle(document.documentElement);
      const bodyStyle = getComputedStyle(document.body);
      results.push(`HTML computed cursor: ${htmlStyle.cursor}`);
      results.push(`BODY computed cursor: ${bodyStyle.cursor}`);
      
      // Test 2: Check if there are any elements with fixed position at top
      const fixedElements = Array.from(document.querySelectorAll('*')).filter(el => {
        const style = getComputedStyle(el);
        return style.position === 'fixed' && el.getBoundingClientRect().top <= 33;
      });
      results.push(`Fixed elements in top 33px: ${fixedElements.length}`);
      
      // Test 3: Check what cursor is shown when we force it directly
      document.body.style.cursor = 'crosshair';
      setTimeout(() => {
        const newBodyStyle = getComputedStyle(document.body);
        results.push(`After forcing crosshair: ${newBodyStyle.cursor}`);
        
        // Reset
        document.body.style.cursor = '';
        setTestResults([...results]);
      }, 100);
    };

    runTests();
    const interval = setInterval(runTests, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: '300px',
      right: '10px',
      background: 'rgba(0,0,0,0.9)',
      color: '#00ff00',
      padding: '10px',
      fontSize: '10px',
      fontFamily: 'monospace',
      maxWidth: '300px',
      zIndex: 10003,
      border: '1px solid #333'
    }}>
      <div style={{ color: '#ff6b6b', marginBottom: '8px' }}>Cursor Tests:</div>
      {testResults.map((result, i) => (
        <div key={i} style={{ margin: '2px 0', fontSize: '9px' }}>
          {result}
        </div>
      ))}
    </div>
  );
}