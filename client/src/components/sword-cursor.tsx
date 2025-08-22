import { useEffect } from 'react';
import swordImg from "@assets/sword-01.png";

export default function SwordCursor() {
  useEffect(() => {
    const createSwordCursor = (color: string, rotation: number, size: number, glow: boolean = false) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Canvas not available'));
            return;
          }
          
          canvas.width = size;
          canvas.height = size;
          
          // Clear canvas
          ctx.clearRect(0, 0, size, size);
          
          // Save context and apply rotation
          ctx.save();
          ctx.translate(size / 2, size / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.translate(-size / 2, -size / 2);
          
          // Draw the sword image
          ctx.drawImage(img, 0, 0, size, size);
          
          // Apply color transformation
          ctx.globalCompositeOperation = 'source-atop';
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, size, size);
          
          ctx.restore();
          
          // Add glow effect if needed
          if (glow) {
            const glowCanvas = document.createElement('canvas');
            const glowCtx = glowCanvas.getContext('2d')!;
            glowCanvas.width = size + 6;
            glowCanvas.height = size + 6;
            
            // Create glow
            glowCtx.save();
            glowCtx.shadowColor = color;
            glowCtx.shadowBlur = 3;
            glowCtx.drawImage(canvas, 3, 3);
            glowCtx.globalCompositeOperation = 'source-over';
            glowCtx.drawImage(canvas, 3, 3);
            glowCtx.restore();
            
            resolve(glowCanvas.toDataURL('image/png'));
          } else {
            resolve(canvas.toDataURL('image/png'));
          }
        };
        
        img.onerror = () => reject(new Error('Failed to load sword image'));
        img.src = swordImg;
      });
    };

    const setupCursors = async () => {
      try {
        // Create default cursor: gold sword rotated -45 degrees
        const defaultCursor = await createSwordCursor('#d4af37', -45, 24, false);
        
        // Create hover cursor: white sword upright with glow
        const hoverCursor = await createSwordCursor('#ffffff', 0, 28, true);
        
        // Apply cursors
        document.body.style.cursor = `url("${defaultCursor}") 12 12, auto`;
        
        // Create hover styles
        const style = document.createElement('style');
        style.textContent = `
          button:hover, a:hover, [role="button"]:hover, .cursor-pointer:hover {
            cursor: url("${hoverCursor}") 14 14, pointer !important;
          }
        `;
        document.head.appendChild(style);
        
        // Cleanup function
        return () => {
          if (document.head.contains(style)) {
            document.head.removeChild(style);
          }
        };
      } catch (error) {
        console.error('Failed to setup sword cursors:', error);
        // Fallback to default cursor
        document.body.style.cursor = 'auto';
      }
    };

    setupCursors();
  }, []);

  return null;
}