import { useEffect } from 'react';
import swordImg from "@assets/sword-01.png";

export default function SwordCursor() {
  useEffect(() => {
    let currentFrame = 0;
    let isAnimating = false;
    let animationDirection = 1; // 1 for hover, -1 for unhover
    let animationId: ReturnType<typeof setTimeout> | null = null;
    const totalFrames = 20; // More frames for smoother 2-second animation
    const animationDuration = 2000; // 2 seconds
    const frameInterval = animationDuration / totalFrames;
    
    const createSwordCursor = (baseColor: string, rotation: number, size: number, glowStrength: number = 0) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          // Use larger canvas to prevent clipping during rotation
          const canvasSize = size + 20;
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
            glowCanvas.width = canvasSize + 20;
            glowCanvas.height = canvasSize + 20;
            
            // Create enhanced white glow around the golden sword
            glowCtx.save();
            
            // Multiple glow layers with intensity based on glowStrength
            const glowLayers = [
              { color: '#ffffff', blur: 12, opacity: 1.0 * glowStrength },
              { color: '#ffffff', blur: 18, opacity: 0.8 * glowStrength },
              { color: '#ffffff', blur: 24, opacity: 0.6 * glowStrength },
              { color: '#ffffff', blur: 30, opacity: 0.4 * glowStrength }
            ];
            
            glowLayers.forEach(layer => {
              glowCtx.shadowColor = layer.color;
              glowCtx.shadowBlur = layer.blur;
              glowCtx.shadowOffsetX = 0;
              glowCtx.shadowOffsetY = 0;
              glowCtx.globalAlpha = layer.opacity;
              glowCtx.drawImage(canvas, 10, 10);
            });
            
            // Draw the golden sword on top for crisp edges
            glowCtx.globalCompositeOperation = 'source-over';
            glowCtx.shadowBlur = 0;
            glowCtx.globalAlpha = 1;
            glowCtx.drawImage(canvas, 10, 10);
            
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

    const generateAnimationFrames = async () => {
      const frames = [];
      for (let i = 0; i <= totalFrames; i++) {
        const progress = i / totalFrames;
        const rotation = -45 + (45 * progress); // From -45° to 0°
        const glowStrength = progress; // From 0 to 1
        
        const frame = await createSwordCursor('#d4af37', rotation, 28, glowStrength);
        frames.push(frame);
      }
      return frames;
    };

    const updateCursor = (frameIndex: number) => {
      const hotspotX = 20;
      const hotspotY = 20;
      
      if (animationFrames[frameIndex]) {
        document.body.style.cursor = `url("${animationFrames[frameIndex]}") ${hotspotX} ${hotspotY}, auto`;
        
        // Update hover styles for interactive elements
        const hoverElements = document.querySelectorAll('button:hover, a:hover, [role="button"]:hover, .cursor-pointer:hover');
        hoverElements.forEach((el: any) => {
          el.style.cursor = `url("${animationFrames[frameIndex]}") ${hotspotX} ${hotspotY}, pointer`;
        });
      }
    };

    const animate = () => {
      if (!isAnimating) return;
      
      currentFrame += animationDirection;
      
      // Clamp frame within bounds
      if (currentFrame < 0) {
        currentFrame = 0;
        isAnimating = false;
      } else if (currentFrame > totalFrames) {
        currentFrame = totalFrames;
        isAnimating = false;
      }
      
      updateCursor(currentFrame);
      
      if (isAnimating) {
        animationId = setTimeout(animate, frameInterval);
      }
    };

    const startAnimation = (direction: number) => {
      if (animationId) {
        clearTimeout(animationId);
      }
      
      animationDirection = direction;
      isAnimating = true;
      animate();
    };

    let animationFrames: string[] = [];

    const setupCursors = async () => {
      try {
        // Generate all animation frames
        animationFrames = await generateAnimationFrames();
        
        // Set initial cursor (frame 0)
        updateCursor(0);
        
        // Create hover event listeners for interactive elements
        const addHoverListeners = () => {
          const interactiveElements = document.querySelectorAll('button, a, [role="button"], .cursor-pointer');
          
          interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
              startAnimation(1); // Animate to hover state
            });
            
            element.addEventListener('mouseleave', () => {
              startAnimation(-1); // Animate back to default state
            });
          });
        };

        // Initial setup
        addHoverListeners();
        
        // Re-setup listeners when new elements are added (for dynamic content)
        const observer = new MutationObserver(() => {
          addHoverListeners();
        });
        
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        
        // Enhanced element hover effects
        const style = document.createElement('style');
        style.textContent = `
          button:hover, a:hover, [role="button"]:hover, .cursor-pointer:hover {
            transform: translateY(-1px);
            filter: drop-shadow(0 4px 8px rgba(212, 175, 55, 0.3));
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `;
        document.head.appendChild(style);
        
        // Cleanup function
        return () => {
          if (animationId) clearTimeout(animationId);
          observer.disconnect();
          if (document.head.contains(style)) {
            document.head.removeChild(style);
          }
        };
      } catch (error) {
        console.error('Failed to setup sword cursors:', error);
        document.body.style.cursor = 'auto';
      }
    };

    setupCursors();
  }, []);

  return null;
}