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
          
          // Add enhanced glow effect if needed (white glow around golden sword)
          if (glow) {
            const glowCanvas = document.createElement('canvas');
            const glowCtx = glowCanvas.getContext('2d')!;
            glowCanvas.width = canvasSize + 12;
            glowCanvas.height = canvasSize + 12;
            
            // Create enhanced white glow around the golden sword
            glowCtx.save();
            
            // Multiple glow layers for stronger effect
            const glowLayers = [
              { color: '#ffffff', blur: 8, opacity: 0.8 },
              { color: '#ffffff', blur: 12, opacity: 0.6 },
              { color: '#ffffff', blur: 16, opacity: 0.4 }
            ];
            
            glowLayers.forEach(layer => {
              glowCtx.shadowColor = layer.color;
              glowCtx.shadowBlur = layer.blur;
              glowCtx.shadowOffsetX = 0;
              glowCtx.shadowOffsetY = 0;
              glowCtx.globalAlpha = layer.opacity;
              glowCtx.drawImage(canvas, 6, 6);
            });
            
            // Draw the golden sword on top for crisp edges
            glowCtx.globalCompositeOperation = 'source-over';
            glowCtx.shadowBlur = 0;
            glowCtx.globalAlpha = 1;
            glowCtx.drawImage(canvas, 6, 6);
            
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
        const defaultCursor = await createSwordCursor('#d4af37', -45, 28, false);
        
        // Create hover cursor: gold sword upright with enhanced white glow
        const hoverCursor = await createSwordCursor('#d4af37', 0, 28, true);
        
        // Use consistent hotspot to avoid jarring jumps - center point works for both orientations
        const hotspotX = 18; // Center-ish X for both rotated and upright
        const hotspotY = 14; // Center-ish Y that works for both orientations
        
        document.body.style.cursor = `url("${defaultCursor}") ${hotspotX} ${hotspotY}, auto`;
        
        // Create hover styles with same hotspot for smooth transition
        const style = document.createElement('style');
        style.textContent = `
          button:hover, a:hover, [role="button"]:hover, .cursor-pointer:hover {
            cursor: url("${hoverCursor}") ${hotspotX} ${hotspotY}, pointer !important;
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