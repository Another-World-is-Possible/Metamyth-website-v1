import { useEffect } from 'react';
import swordImg from "@assets/sword-01.png";

export default function SwordCursor() {
  useEffect(() => {
    let currentFrame = 0;
    let isAnimating = false;
    let animationDirection = 1; // 1 for hover, -1 for unhover
    let animationId: ReturnType<typeof setTimeout> | null = null;
    const totalFrames = 10; // Frames for smoother 0.75-second animation
    const animationDuration = 750; // 0.75 seconds
    const frameInterval = animationDuration / totalFrames;
    
    const createSwordCursor = (baseColor: string, rotation: number, size: number, glowStrength: number = 0) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          // Use consistent canvas size for all frames to prevent jumping
          const fixedCanvasSize = 68; // Fixed size that accommodates rotation + glow
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Canvas not available'));
            return;
          }
          
          canvas.width = fixedCanvasSize;
          canvas.height = fixedCanvasSize;
          
          // Clear canvas
          ctx.clearRect(0, 0, fixedCanvasSize, fixedCanvasSize);
          
          // Save context and apply rotation from center
          ctx.save();
          ctx.translate(fixedCanvasSize / 2, fixedCanvasSize / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.translate(-size / 2, -size / 2);
          
          // Draw the sword image
          ctx.drawImage(img, 0, 0, size, size);
          
          // Apply base color transformation
          ctx.globalCompositeOperation = 'source-atop';
          ctx.fillStyle = baseColor;
          ctx.fillRect(0, 0, size, size);
          
          ctx.restore();
          
          // Always create final canvas with glow (even if glow strength is 0)
          const finalCanvas = document.createElement('canvas');
          const finalCtx = finalCanvas.getContext('2d')!;
          finalCanvas.width = fixedCanvasSize;
          finalCanvas.height = fixedCanvasSize;
          
          // Create glow effect based on glow strength (0 to 1)
          finalCtx.save();
          
          // Multiple glow layers with intensity based on glowStrength
          if (glowStrength > 0) {
            const glowLayers = [
              { color: '#ffffff', blur: 12, opacity: 1.0 * glowStrength },
              { color: '#ffffff', blur: 18, opacity: 0.8 * glowStrength },
              { color: '#ffffff', blur: 24, opacity: 0.6 * glowStrength },
              { color: '#ffffff', blur: 30, opacity: 0.4 * glowStrength }
            ];
            
            glowLayers.forEach(layer => {
              finalCtx.shadowColor = layer.color;
              finalCtx.shadowBlur = layer.blur;
              finalCtx.shadowOffsetX = 0;
              finalCtx.shadowOffsetY = 0;
              finalCtx.globalAlpha = layer.opacity;
              finalCtx.drawImage(canvas, 0, 0);
            });
          }
          
          // Draw the golden sword on top for crisp edges
          finalCtx.globalCompositeOperation = 'source-over';
          finalCtx.shadowBlur = 0;
          finalCtx.globalAlpha = 1;
          finalCtx.drawImage(canvas, 0, 0);
          
          finalCtx.restore();
          
          resolve(finalCanvas.toDataURL('image/png'));
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
      // Use consistent hotspot at exact center of fixed canvas
      const hotspotX = 34; // Center of 68px fixed canvas
      const hotspotY = 34; // Center of 68px fixed canvas
      
      if (animationFrames[frameIndex]) {
        const cursorUrl = `url("${animationFrames[frameIndex]}") ${hotspotX} ${hotspotY}, pointer`;
        
        // Apply custom cursor globally to everything
        const style = document.getElementById('cursor-animation-style');
        if (style) {
          style.textContent = `
            /* Apply custom cursor to absolutely everything */
            *, *::before, *::after, 
            html, body, div, span, button, a, nav, header, main, section, article, aside,
            h1, h2, h3, h4, h5, h6, p, ul, li, img, svg, path {
              cursor: ${cursorUrl} !important;
            }
            
            /* Ensure all interactive elements get the cursor */
            button, a, [role="button"], .cursor-pointer,
            a[href], input[type="button"], input[type="submit"], input[type="reset"] {
              cursor: ${cursorUrl} !important;
            }
            
            /* All children of interactive elements */
            button *, a *, [role="button"] *, .cursor-pointer *,
            a[href] *, input[type="button"] *, input[type="submit"] *, input[type="reset"] * {
              cursor: ${cursorUrl} !important;
            }
            
            /* Special cases that might override */
            nav *, header *, .navigation *, .nav *, .menu * {
              cursor: ${cursorUrl} !important;
            }
          `;
        }
        
        // Also set body cursor as fallback
        document.body.style.cursor = cursorUrl.replace(', pointer', ', auto');
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
          // More comprehensive selector for interactive elements
          const interactiveElements = document.querySelectorAll(`
            button, 
            a[href], 
            [role="button"], 
            [role="link"], 
            .cursor-pointer,
            input[type="button"],
            input[type="submit"],
            input[type="reset"],
            [onclick],
            [tabindex]:not([tabindex="-1"])
          `);
          
          interactiveElements.forEach(element => {
            // Remove existing listeners to prevent duplicates
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            
            // Add fresh listeners
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
          });
        };

        const handleMouseEnter = (e: Event) => {
          const target = e.target as HTMLElement;
          // Only animate if it's actually an interactive element
          if (target.matches('button, a[href], [role="button"], [role="link"], .cursor-pointer, input[type="button"], input[type="submit"], input[type="reset"], [onclick]')) {
            startAnimation(1); // Animate to hover state
          }
        };

        const handleMouseLeave = () => {
          startAnimation(-1); // Animate back to default state
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
        
        // Create dynamic cursor style element for consistent hotspots
        const cursorStyle = document.createElement('style');
        cursorStyle.id = 'cursor-animation-style';
        document.head.appendChild(cursorStyle);
        
        // Enhanced element hover effects
        const hoverStyle = document.createElement('style');
        hoverStyle.textContent = `
          button:hover, a:hover, [role="button"]:hover, .cursor-pointer:hover {
            transform: translateY(-1px);
            filter: drop-shadow(0 4px 8px rgba(212, 175, 55, 0.3));
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          /* Ensure consistent cursor inheritance */
          button, a, [role="button"], .cursor-pointer {
            cursor: inherit !important;
          }
          
          /* Disable pointer events on text inside interactive elements */
          button span, button *, a span, a *,
          [role="button"] span, [role="button"] *,
          .cursor-pointer span, .cursor-pointer * {
            pointer-events: none !important;
          }
          
          /* Hide system text cursor on text elements */
          input, textarea, [contenteditable] {
            cursor: text !important;
          }
        `;
        document.head.appendChild(hoverStyle);
        
        // Cleanup function
        return () => {
          if (animationId) clearTimeout(animationId);
          observer.disconnect();
          const cursorStyleEl = document.getElementById('cursor-animation-style');
          if (cursorStyleEl) document.head.removeChild(cursorStyleEl);
          if (document.head.contains(hoverStyle)) {
            document.head.removeChild(hoverStyle);
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