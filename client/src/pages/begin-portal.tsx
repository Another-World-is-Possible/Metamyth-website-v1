import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";

export default function BeginPortal() {
  const [, navigate] = useLocation();
  const [passwordInput, setPasswordInput] = useState("");
  const [errorState, setErrorState] = useState(false);
  const [successState, setSuccessState] = useState(false);
  const [typedText, setTypedText] = useState(["", "", "", "", ""]);
  const [elementOpacities, setElementOpacities] = useState({
    cosmicBackground: 0,
    cosmicOverlay: 0,
    portal: 0,
    finalText: 0,
  });
  const [portalTransform, setPortalTransform] = useState("translateY(20px)");
  
  // --- NEW: Add a ref for the canvas element ---
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mysticalMessages = [
    "You stand at the threshold between stories...",
    "Beyond this portal lies the most ancient technology—",
    "The conscious rewriting of your life's story...",
    "Only those committed to becoming",
    "authors of reality may proceed.",
  ];

  const timeoutRef = useRef<NodeJS.Timeout>();

  // Typewriter animation useEffect
  useEffect(() => {
    const typeMessage = (messageIndex: number, callback: () => void) => {
      const text = mysticalMessages[messageIndex];
      let i = 0;
      const intervalId = setInterval(() => {
        setTypedText(prev => {
          const newTypedText = [...prev];
          newTypedText[messageIndex] = text.substring(0, i);
          return newTypedText;
        });
        i++;
        if (i > text.length) {
          clearInterval(intervalId);
          if (callback) callback();
        }
      }, 30);
    };

    const runSequence = (index = 0) => {
      if (index < mysticalMessages.length) {
        typeMessage(index, () => runSequence(index + 1));
      } else {
        timeoutRef.current = setTimeout(() => {
          setElementOpacities(prev => ({ ...prev, cosmicBackground: 0.7, cosmicOverlay: 1 }));
        }, 400);

        timeoutRef.current = setTimeout(() => {
          setElementOpacities(prev => ({ ...prev, portal: 1 }));
          setPortalTransform('translateY(0px)');
        }, 1000);

        timeoutRef.current = setTimeout(() => {
          setElementOpacities(prev => ({ ...prev, finalText: 1 }));
        }, 1400);
      }
    };

    timeoutRef.current = setTimeout(runSequence, 200);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  
  // --- NEW: useEffect for the canvas particle animation ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; radius: number; speedY: number; opacity: number }[] = [];

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          speedY: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y -= p.speedY;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${p.opacity})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    
    const handleResize = () => {
        setCanvasSize();
        createParticles();
    };

    setCanvasSize();
    createParticles();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.functions.invoke('validate-portal-password', {
        body: { password: passwordInput },
      });

      if (error) throw error;

      if (data.htmlContent) {
        setSuccessState(true);
        setErrorState(false);
        sessionStorage.setItem('metamythHTML', data.htmlContent);
        setTimeout(() => navigate('/metamyth-journey'), 2000);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      setErrorState(true);
      setSuccessState(false);
      setPasswordInput('');
      setTimeout(() => setErrorState(false), 1000);
    }
  };

  return (
    <div className="threshold-container">
      <style>
        {`
        .cosmic-background, .cosmic-overlay { transition: opacity 2s ease-in-out; }
        .portal-interface { transition: opacity 1.5s ease-out, transform 1.5s ease-out; }
        .final-text { transition: opacity 1s ease-out; }

        @font-face {
            font-family: 'AngleFairy2024';
            src: url('/attached_assets/Angle & Fairy_1755895085623.otf?v=2024') format('opentype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'AngleFairy2024', serif, Georgia, 'Times New Roman', serif;
            background: #000000;
            color: white;
            min-height: 100vh;
            overflow-y: auto; 
            position: relative;
        }
        
        .threshold-container {
            position: relative;
            min-height: 100vh; 
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start; 
            padding: 1rem;
            background: #000000;
            overflow-x: hidden;
        }
        
        .cosmic-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('/attached_assets/_light_through_gold.png');
            background-size: cover;
            background-position: center;
            z-index: 1;
        }
        
        .cosmic-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, 
                rgba(30, 58, 138, 0.4) 0%,
                rgba(147, 51, 234, 0.3) 25%,
                rgba(239, 68, 68, 0.4) 50%,
                rgba(34, 197, 94, 0.3) 75%,
                rgba(251, 191, 36, 0.4) 100%);
            z-index: 2;
        }
        
        .content {
            position: relative;
            z-index: 10;
            text-align: center;
            max-width: 800px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 2rem; 
        }

        .mystical-text-wrapper {
            margin-bottom: 2.5rem; 
            flex-shrink: 0; 
        }
        
        .mystical-text {
            font-size: 1.75rem;
            line-height: 1.4;
            margin-bottom: 0.5rem;
            min-height: 2.5rem; 
            color: #E8E8FF;
            text-shadow: 
                0 0 10px rgba(232, 232, 255, 0.8),
                0 0 20px rgba(147, 51, 234, 0.6),
                0 0 30px rgba(147, 51, 234, 0.4);
            font-family: 'AngleFairy2024', serif, Georgia, 'Times New Roman', serif;
            text-rendering: geometricPrecision; 
        }
        
        .portal-animation-wrapper {
            animation: breathing 4s ease-in-out infinite;
            will-change: transform;
        }

        .portal-interface {
            background: rgba(20, 20, 40, 0.8);
            border: 2px solid #9333EA;
            border-radius: 20px;
            padding: 1rem 1.5rem; 
            max-width: 320px; 
            backdrop-filter: blur(10px);
            box-shadow: 
                0 0 30px rgba(147, 51, 234, 0.6),
                0 0 60px rgba(147, 51, 234, 0.4),
                inset 0 0 30px rgba(147, 51, 234, 0.1);
            flex-shrink: 0;
        }
        
        @keyframes breathing {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
        }
        
        .portal-input {
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(147, 51, 234, 0.6);
            border-radius: 12px;
            padding: 0.75rem; 
            width: 100%;
            color: #E8E8FF;
            font-family: 'AngleFairy2024', serif;
            font-size: 0.9rem; 
            text-align: center;
            outline: none;
            box-shadow: inset 0 0 20px rgba(147, 51, 234, 0.3);
            transition: all 0.3s ease;
        }
        
        .portal-input:focus {
            border-color: #9333EA;
            box-shadow: 
                inset 0 0 30px rgba(147, 51, 234, 0.6),
                0 0 20px rgba(147, 51, 234, 0.8);
        }
        
        .sacred-button {
            background: linear-gradient(135deg, #9333EA, #7C3AED, #8B5CF6);
            border: none;
            border-radius: 16px;
            padding: 0.75rem 1.5rem; 
            color: white;
            font-family: 'AngleFairy2024', serif;
            font-size: 0.9rem; 
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            cursor: pointer;
            transition: all 0.4s ease;
            margin-top: 1.5rem;
            width: 100%;
            position: relative;
            overflow: hidden;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }
        
        .sacred-button:hover {
            transform: translateY(-3px);
            box-shadow: 
                0 0 40px rgba(147, 51, 234, 0.9),
                0 0 80px rgba(147, 51, 234, 0.7),
                0 0 120px rgba(147, 51, 234, 0.5);
            text-shadow: 0 0 20px rgba(255, 255, 255, 1);
        }
        
        .final-text {
            color: #FFD700;
            font-size: 0.9rem; 
            margin-top: 1.5rem;
            text-shadow: 0 0 4px black, 0 0 8px #FFD700, 0 0 12px #FFD700;
            animation: gentleGlow 3s ease-in-out infinite;
        }
        
        @keyframes gentleGlow {
            0%, 100% { text-shadow: 0 0 4px black, 0 0 8px #FFD700; }
            50% { text-shadow: 0 0 6px black, 0 0 15px #FFD700; }
        }
        
        /* --- NEW: CSS for the canvas element --- */
        .particles-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 5;
            pointer-events: none; /* Make sure it's not clickable */
        }

        .error-flicker {
            animation: errorFlicker 1s ease-out;
        }
        
        @keyframes errorFlicker {
            0%, 100% { opacity: 1; }
            25%, 75% { opacity: 0.3; }
            50% { opacity: 0.1; }
        }
        
        .success-pulse {
            animation: successPulse 2s ease-out;
        }
        
        @keyframes successPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1.1); opacity: 0; }
        }
        `}
      </style>

      <div className="cosmic-background" style={{ opacity: elementOpacities.cosmicBackground }}></div>
      <div className="cosmic-overlay" style={{ opacity: elementOpacities.cosmicOverlay }}></div>
      
      {/* --- NEW: The canvas element for the new particle effect --- */}
      <canvas ref={canvasRef} className="particles-canvas"></canvas>
      
      <div className="content">
        <div className="mystical-text-wrapper">
          {mysticalMessages.map((_, index) => (
            <div
              key={index}
              className="mystical-text"
            >
              {typedText[index]}
            </div>
          ))}
        </div>
        
        <div className="portal-animation-wrapper">
          <div 
            id="portal" 
            className={`portal-interface ${errorState ? 'error-flicker' : ''} ${successState ? 'success-pulse' : ''}`}
            style={{ opacity: elementOpacities.portal, transform: portalTransform }}
          >
            <form onSubmit={handleSubmit}>
              <input 
                type="password" 
                id="password" 
                name="password"
                className="portal-input"
                placeholder={errorState ? "The ancient words elude you..." : "Speak the word of power..."}
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <button type="submit" className="sacred-button">
                Begin Your Journey
              </button>
            </form>
          </div>
        </div>
        
        <div 
          id="finalText" 
          className="final-text" 
          style={{ opacity: elementOpacities.finalText }}
        >
          Speak the word of power to cross the threshold...
        </div>
      </div>
    </div>
  );
}