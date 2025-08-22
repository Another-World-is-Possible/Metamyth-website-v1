import { useEffect } from 'react';
import swordImg from "@assets/sword-01.png";

export default function SwordCursor() {
  useEffect(() => {
    // Create canvas to generate colored cursor images
    const createColoredCursor = (color: string, rotation: number, size: number = 24, glow: boolean = false) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
          }
          
          canvas.width = size;
          canvas.height = size;
          
          // Clear canvas
          ctx.clearRect(0, 0, size, size);
          
          // Apply rotation
          ctx.save();
          ctx.translate(size / 2, size / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.translate(-size / 2, -size / 2);
          
          // Draw sword first
          ctx.drawImage(img, 0, 0, size, size);
          
          // Apply color transformation - this recolors the black sword to the desired color
          ctx.globalCompositeOperation = 'source-atop';
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, size, size);
          
          // Add glow effect for hover state
          if (glow) {
            ctx.globalCompositeOperation = 'destination-over';
            ctx.shadowColor = color;
            ctx.shadowBlur = 3;
            ctx.fillStyle = color;
            ctx.fillRect(-1, -1, size + 2, size + 2);
          }
          
          ctx.restore();
          
          // Convert to data URL
          const dataUrl = canvas.toDataURL('image/png');
          console.log('Generated cursor for color:', color, 'rotation:', rotation, 'dataUrl length:', dataUrl.length);
          resolve(dataUrl);
        };
        
        img.onerror = () => {
          console.error('Failed to load sword image:', swordImg);
          reject(new Error('Failed to load sword image'));
        };
        
        // Add cache busting to ensure fresh image load
        img.src = swordImg + '?v=' + Date.now();
      });
    };

    // Create cursors
    const setupCursors = async () => {
      try {
        console.log('Setting up sword cursors using:', swordImg);
        
        // Default cursor: rotated gold sword from sword-01.png
        const defaultCursor = await createColoredCursor('#d4af37', -45, 24, false);
        
        // Hover cursor: upright glowing white sword from sword-01.png
        const hoverCursor = await createColoredCursor('#ffffff', 0, 28, true);
        
        console.log('Cursors generated successfully');
        
        // Apply default cursor to body
        document.body.style.cursor = `url("${defaultCursor}") 12 12, auto`;
        
        // Create hover style
        const style = document.createElement('style');
        style.textContent = `
          button:hover, a:hover, [role="button"]:hover, .cursor-pointer:hover {
            cursor: url("${hoverCursor}") 14 14, pointer !important;
          }
        `;
        document.head.appendChild(style);
        
        console.log('Sword cursors applied successfully');
        
        // Cleanup function
        return () => {
          if (document.head.contains(style)) {
            document.head.removeChild(style);
          }
        };
      } catch (error) {
        console.error('Failed to load sword cursor:', error);
        // Fallback to default cursor
        document.body.style.cursor = 'auto';
      }
    };

    setupCursors();
  }, []);

  return null; // This component doesn't render anything
}