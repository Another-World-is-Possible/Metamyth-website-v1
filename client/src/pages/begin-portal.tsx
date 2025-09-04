import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";

export default function BeginPortal() {
  const [, navigate] = useLocation();
  const [passwordInput, setPasswordInput] = useState("");
  const [errorState, setErrorState] = useState(false);
  const [successState, setSuccessState] = useState(false);
  const [typedText, setTypedText] = useState(["", "", "", ""]);
  const [elementOpacities, setElementOpacities] = useState({
    cosmicBackground: 0,
    cosmicOverlay: 0,
    portal: 0,
    finalText: 0,
  });
  const [portalTransform, setPortalTransform] = useState("translateY(20px)");

  const mysticalMessages = [
    "You stand at the threshold between stories...",
    "Beyond this portal lies the most ancient technology—",
    "The conscious rewriting of your life's story...",
    "Only those committed to becoming authors of reality may proceed.",
  ];

  const timeoutRef = useRef<NodeJS.Timeout>();

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
            overflow-x: hidden;
            position: relative;
        }
        
        .threshold-container {
            position: relative;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            background: #000000;
            overflow: hidden;
        }
        
        .cosmic-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('/attached_assets/_minimal_starry_void-__prompt-_deep_black_void_of_space_with_minimal_scattered_starlight_pure_black_9xt8d5ztxhjl6e9myq3b_3_1757022381529.png');
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
            max-width: 600px;
        }
        
        .mystical-text {
            font-size: 1.5rem;
            line-height: 1.8;
            margin-bottom: 2rem;
            color: #E8E8FF;
            text-shadow: 
                0 0 10px rgba(232, 232, 255, 0.8),
                0 0 20px rgba(147, 51, 234, 0.6),
                0 0 30px rgba(147, 51, 234, 0.4);
            font-family: 'AngleFairy2024', serif, Georgia, 'Times New Roman', serif;
            min-height: 5.4rem;
        }
        
        .portal-interface {
            background: rgba(20, 20, 40, 0.8);
            border: 2px solid #9333EA;
            border-radius: 20px;
            padding: 2rem;
            backdrop-filter: blur(10px);
            box-shadow: 
                0 0 30px rgba(147, 51, 234, 0.6),
                0 0 60px rgba(147, 51, 234, 0.4),
                inset 0 0 30px rgba(147, 51, 234, 0.1);
            animation: breathing 4s ease-in-out infinite;
        }
        
        @keyframes breathing {
            0%, 100% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.02) translateY(-2px); }
        }
        
        .portal-input {
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(147, 51, 234, 0.6);
            border-radius: 12px;
            padding: 1rem;
            width: 100%;
            color: #E8E8FF;
            font-family: 'AngleFairy2024', serif;
            font-size: 1rem;
            text-align: center;
            outline: none;
            box-shadow: inset 0 0 20px rgba(147, 51, 234, 0.3);
            transition: all 0.3s ease;
            animation: portalPulse 3s ease-in-out infinite;
        }
        
        @keyframes portalPulse {
            0%, 100% { box-shadow: inset 0 0 20px rgba(147, 51, 234, 0.3); }
            50% { box-shadow: inset 0 0 25px rgba(147, 51, 234, 0.5); }
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
            padding: 1rem 2rem;
            color: white;
            font-family: 'AngleFairy2024', serif;
            font-size: 1rem;
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
            color: #B8B8D4;
            font-size: 0.9rem;
            margin-top: 1.5rem;
            text-shadow: 0 0 8px rgba(184, 184, 212, 0.6);
            animation: gentleGlow 3s ease-in-out infinite;
        }
        
        @keyframes gentleGlow {
            0%, 100% { text-shadow: 0 0 8px rgba(184, 184, 212, 0.6); }
            50% { text-shadow: 0 0 15px rgba(184, 184, 212, 0.9); }
        }
        
        .particles {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }

        .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(147, 51, 234, 0.8);
            border-radius: 50%;
            animation: drift 10s linear infinite;
        }
        
        @keyframes drift {
            0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
            20% { opacity: 0.6; }
            80% { opacity: 0.6; }
            100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
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
      
      <div className="particles">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="particle" style={{ left: `${20 + i * 20}%`, animationDelay: `${i * 2}s` }}></div>
        ))}
      </div>
      
      <div className="content">
        {mysticalMessages.map((_, index) => (
          <div
            key={index}
            className="mystical-text"
          >
            {typedText[index]}
          </div>
        ))}
        
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