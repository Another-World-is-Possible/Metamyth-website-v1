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
        
        // Apply custom cursor with aggressive enforcement
        const style = document.getElementById('cursor-animation-style');
        if (style) {
          style.textContent = `
            /* Force cursor on root elements */
            html, body {
              cursor: ${cursorUrl} !important;
            }
            
            /* Nuclear option: force cursor on ALL elements */
            *, *:before, *:after,
            div, span, button, a, nav, header, main, section, article, aside,
            h1, h2, h3, h4, h5, h6, p, ul, li, img, svg, path, g, rect, circle,
            form, input, textarea, select, option, label, fieldset, legend,
            .cursor-auto, .cursor-default, .cursor-pointer, .cursor-text {
              cursor: ${cursorUrl} !important;
            }
            
            /* Specifically target all header-related elements */
            [class*="header"], [class*="Header"], [data-sidebar="header"],
            [role="banner"], [role="navigation"], .nav, .navigation, .navbar,
            .sheet-header, .dialog-header, .alert-dialog-header, .drawer-header, .sidebar-header {
              cursor: ${cursorUrl} !important;
            }
            
            /* Target all possible UI component patterns */
            [class*="Sheet"], [class*="Dialog"], [class*="Alert"], [class*="Drawer"], [class*="Sidebar"],
            [data-testid*="header"], [data-testid*="button"], [data-testid*="nav"] {
              cursor: ${cursorUrl} !important;
            }
            
            /* Pseudo states and dynamic elements */
            *:hover, *:focus, *:active, *:visited, *:link, *:target {
              cursor: ${cursorUrl} !important;
            }
            
            /* All flex layouts and positioning classes */
            .fixed, .absolute, .relative, .sticky, .flex, .inline-flex, .grid, .inline-grid,
            .block, .inline-block, .inline, .contents, .list-item, .hidden {
              cursor: ${cursorUrl} !important;
            }
            
            /* Every child of every element */
            * > *, * > * > *, * > * > * > * {
              cursor: ${cursorUrl} !important;
            }
          `;
        }
        
        // Set body and html cursors
        document.body.style.cursor = cursorUrl.replace(', pointer', ', auto');
        document.documentElement.style.cursor = cursorUrl.replace(', pointer', ', auto');
        
        // Force cursor on document itself with maximum priority
        if (document.documentElement) {
          document.documentElement.style.setProperty('cursor', cursorUrl.replace(', pointer', ', auto'), 'important');
        }
        
        // Enhanced debugging: Log specific elements with system cursors
        if (frameIndex === 0) {
          setTimeout(() => {
            // Target navigation specifically
            const navElements = document.querySelectorAll('nav, nav *, button, [role="button"], a');
            navElements.forEach((el) => {
              const computedStyle = window.getComputedStyle(el);
              const cursor = computedStyle.cursor;
              if (cursor && cursor !== 'inherit' && !cursor.includes('url(')) {
                console.warn('Nav element with system cursor:', {
                  element: el,
                  tagName: el.tagName,
                  className: el.className,
                  cursor: cursor,
                  textContent: el.textContent?.slice(0, 50)
                });
                (el as HTMLElement).style.setProperty('cursor', cursorUrl, 'important');
              }
            });
            
            // Also check for any problematic elements
            const allElements = document.querySelectorAll('*');
            let systemCursorCount = 0;
            allElements.forEach((el) => {
              const computedStyle = window.getComputedStyle(el);
              const cursor = computedStyle.cursor;
              if (cursor && cursor !== 'inherit' && !cursor.includes('url(')) {
                systemCursorCount++;
                if (systemCursorCount <= 5) { // Limit spam
                  console.warn('System cursor element:', {
                    tag: el.tagName,
                    class: el.className,
                    cursor: cursor
                  });
                }
                (el as HTMLElement).style.setProperty('cursor', cursorUrl, 'important');
              }
            });
          }, 100);
        }
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