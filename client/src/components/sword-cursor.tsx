import { useEffect } from 'react';
import swordImg from "@assets/sword-01.png";

export default function SwordCursor() {
  useEffect(() => {
    const createSwordCursor = (baseColor: string, rotation: number, size: number, glow: boolean = false) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          // Use larger canvas to prevent clipping during rotation
          const canvasSize = size + 8;
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Canvas not available'));
            return;
          }
          
          canvas.width = canvasSize;
          canvas.height = canvasSize;
          
          // Clear canvas
          ctx.clearRect(0, 0, canvasSize, canvasSize);
          
          // Save context and apply rotation from center
          ctx.save();
          ctx.translate(canvasSize / 2, canvasSize / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.translate(-size / 2, -size / 2);
          
          // Draw the sword image
          ctx.drawImage(img, 0, 0, size, size);
          
          // Apply base color transformation
          ctx.globalCompositeOperation = 'source-atop';
          ctx.fillStyle = baseColor;
          ctx.fillRect(0, 0, size, size);
          
          ctx.restore();
          
          // Add glow effect if needed (white glow around golden sword)
          if (glow) {
            const glowCanvas = document.createElement('canvas');
            const glowCtx = glowCanvas.getContext('2d')!;
            glowCanvas.width = canvasSize + 6;
            glowCanvas.height = canvasSize + 6;
            
            // Create white glow around the golden sword
            glowCtx.save();
            glowCtx.shadowColor = '#ffffff';
            glowCtx.shadowBlur = 4;
            glowCtx.shadowOffsetX = 0;
            glowCtx.shadowOffsetY = 0;
            
            // Draw the golden sword with white glow
            glowCtx.drawImage(canvas, 3, 3);
            
            // Draw the sword again on top for crisp edges
            glowCtx.globalCompositeOperation = 'source-over';
            glowCtx.shadowBlur = 0;
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
        
        // Create hover cursor: gold sword upright with white glow
        const hoverCursor = await createSwordCursor('#d4af37', 0, 28, true);
        
        // Apply cursors with hotspot at sword tip (top center)
        document.body.style.cursor = `url("${defaultCursor}") 16 8, auto`;
        
        // Create hover styles
        const style = document.createElement('style');
        style.textContent = `
          button:hover, a:hover, [role="button"]:hover, .cursor-pointer:hover {
            cursor: url("${hoverCursor}") 17 5, pointer !important;
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