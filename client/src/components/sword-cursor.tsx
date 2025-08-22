import { useEffect } from 'react';
import swordImg from "@assets/sword-01.png";

export default function SwordCursor() {
  useEffect(() => {
    // Create canvas to generate colored cursor images
    const createColoredCursor = (color: string, rotation: number, size: number = 24) => {
      return new Promise<string>((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          
          canvas.width = size;
          canvas.height = size;
          
          // Clear canvas
          ctx.clearRect(0, 0, size, size);
          
          // Apply rotation
          ctx.save();
          ctx.translate(size / 2, size / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.translate(-size / 2, -size / 2);
          
          // Draw sword
          ctx.drawImage(img, 0, 0, size, size);
          
          // Apply color overlay using composite operation
          ctx.globalCompositeOperation = 'source-atop';
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, size, size);
          
          ctx.restore();
          
          // Convert to data URL
          const dataUrl = canvas.toDataURL('image/png');
          resolve(dataUrl);
        };
        img.src = swordImg;
      });
    };

    // Create cursors
    const setupCursors = async () => {
      try {
        // Default cursor: rotated gold sword
        const defaultCursor = await createColoredCursor('#d4af37', -45, 24);
        
        // Hover cursor: upright white/gold sword  
        const hoverCursor = await createColoredCursor('#ffffff', 0, 28);
        
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
        
        // Cleanup function
        return () => {
          document.head.removeChild(style);
        };
      } catch (error) {
        console.warn('Failed to load sword cursor:', error);
        // Fallback to default cursor
        document.body.style.cursor = 'auto';
      }
    };

    setupCursors();
  }, []);

  return null; // This component doesn't render anything
}