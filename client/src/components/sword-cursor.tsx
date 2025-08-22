import { useEffect } from 'react';
import swordImg from "@assets/sword-01.png";

export default function SwordCursor() {
  useEffect(() => {
    const createSwordCursor = (baseColor: string, rotation: number, size: number, glowStrength: number = 0) => {
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
          
          // Add enhanced glow effect based on glow strength (0 to 1)
          if (glowStrength > 0) {
            const glowCanvas = document.createElement('canvas');
            const glowCtx = glowCanvas.getContext('2d')!;
            glowCanvas.width = canvasSize + 16;
            glowCanvas.height = canvasSize + 16;
            
            // Create enhanced white glow around the golden sword
            glowCtx.save();
            
            // Multiple glow layers with intensity based on glowStrength
            const glowLayers = [
              { color: '#ffffff', blur: 10, opacity: 0.9 * glowStrength },
              { color: '#ffffff', blur: 15, opacity: 0.7 * glowStrength },
              { color: '#ffffff', blur: 20, opacity: 0.5 * glowStrength },
              { color: '#ffffff', blur: 25, opacity: 0.3 * glowStrength }
            ];
            
            glowLayers.forEach(layer => {
              glowCtx.shadowColor = layer.color;
              glowCtx.shadowBlur = layer.blur;
              glowCtx.shadowOffsetX = 0;
              glowCtx.shadowOffsetY = 0;
              glowCtx.globalAlpha = layer.opacity;
              glowCtx.drawImage(canvas, 8, 8);
            });
            
            // Draw the golden sword on top for crisp edges
            glowCtx.globalCompositeOperation = 'source-over';
            glowCtx.shadowBlur = 0;
            glowCtx.globalAlpha = 1;
            glowCtx.drawImage(canvas, 8, 8);
            
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
        // Create default cursor: gold sword rotated -45 degrees (larger size)
        const defaultCursor = await createSwordCursor('#d4af37', -45, 28, 0);
        
        // Create hover cursor: gold sword upright with enhanced white glow
        const hoverCursor = await createSwordCursor('#d4af37', 0, 28, 1);
        
        // Use consistent hotspot to avoid jarring jumps - center point works for both orientations
        const hotspotX = 18; // Center-ish X for both rotated and upright
        const hotspotY = 14; // Center-ish Y that works for both orientations
        
        document.body.style.cursor = `url("${defaultCursor}") ${hotspotX} ${hotspotY}, auto`;
        
        // Create hover styles with smooth CSS transitions
        const style = document.createElement('style');
        style.textContent = `
          /* Smooth cursor transitions */
          * {
            cursor: url("${defaultCursor}") ${hotspotX} ${hotspotY}, auto;
            transition: cursor 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          button:hover, a:hover, [role="button"]:hover, .cursor-pointer:hover {
            cursor: url("${hoverCursor}") ${hotspotX} ${hotspotY}, pointer !important;
          }
          
          /* Enhanced element hover transitions */
          button, a, [role="button"], .cursor-pointer {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          button:hover, a:hover, [role="button"]:hover, .cursor-pointer:hover {
            transform: translateY(-1px);
            filter: drop-shadow(0 4px 8px rgba(212, 175, 55, 0.3));
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