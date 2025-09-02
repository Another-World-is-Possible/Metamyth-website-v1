import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
// import { storage } from "./storage";
// import { insertQuestionnaireResponseSchema } from "@shared/schema";
// import { z } from "zod";

// Qualification logic based on responses
function determineQualification(responses: Record<number, any>): "calendar" | "discord" {
  // Question 5 about investment capacity
  const investmentResponse = responses[5];
  
  // High-value prospects get calendar link
  if (investmentResponse?.includes("$15K-50K+") || 
      investmentResponse?.includes("$5K-15K") ||
      investmentResponse?.includes("$1K-5K")) {
    return "calendar";
  }
  
  // Question 1 - those actively writing their story
  const storyResponse = responses[1];
  if (storyResponse?.includes("I'm actively writing my story")) {
    return "calendar";
  }
  
  // Question 2 - those who feel electric about their role
  const bodyResponse = responses[2];
  if (bodyResponse?.includes("I feel electric")) {
    return "calendar";  
  }
  
  // Everyone else gets discord community
  return "discord";
}

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Password-protected METAMYTH Interactive Portal
  app.get('/begin', (req, res) => {
    const password = req.query.password;
    console.log('Password received:', password); // Debug log
    
    // Check password (case insensitive, trim whitespace)
    if (password && password.toString().trim().toLowerCase() === 'artifiction') {
      res.sendFile(path.join(process.cwd(), 'metamyth.html'));
    } else {
      // Prevent caching
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      // Send password-protected page with frosted glass effect
      res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Sacred Threshold</title>
    <style>
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
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            background: #000000;
        }
        
        .cosmic-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('/attached_assets/_light_possibility_space-__prompt-_extreme_close-up_inside_pure_light_refracting_through_gold_and_t_32nctb21dgsvksda74nb_3_1756779584780.png');
            background-size: cover;
            background-position: center;
            opacity: 0;
            transition: opacity 4s ease-in-out;
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
            opacity: 0;
            transition: opacity 4s ease-in-out;
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
            opacity: 0;
            color: #E8E8FF;
            text-shadow: 
                0 0 10px rgba(232, 232, 255, 0.8),
                0 0 20px rgba(147, 51, 234, 0.6),
                0 0 30px rgba(147, 51, 234, 0.4);
            font-family: 'AngleFairy2024', serif, Georgia, 'Times New Roman', serif;
            transition: opacity 2s ease-out;
        }
        
        .portal-interface {
            opacity: 0;
            transform: translateY(20px);
            transition: all 2s ease-out;
            background: rgba(20, 20, 40, 0.8);
            border: 2px solid #9333EA;
            border-radius: 20px;
            padding: 2rem;
            backdrop-filter: blur(15px);
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
        
        @keyframes shimmer {
            0% { opacity: 0; transform: translateY(10px); }
            50% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0.9; transform: translateY(0); }
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
            opacity: 0;
            color: #B8B8D4;
            font-size: 0.9rem;
            margin-top: 1.5rem;
            text-shadow: 0 0 8px rgba(184, 184, 212, 0.6);
            animation: gentleGlow 3s ease-in-out infinite;
            transition: opacity 1s ease-out;
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
            pointer-events: none;
            z-index: 3;
        }
        
        .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(147, 51, 234, 0.8);
            border-radius: 50%;
            animation: drift 15s linear infinite;
        }
        
        @keyframes drift {
            0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) translateX(100px); opacity: 0; }
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
    </style>
</head>
<body>
    <div class="threshold-container">
        <div class="cosmic-background"></div>
        <div class="cosmic-overlay"></div>
        
        <!-- Floating particles -->
        <div class="particles">
            <div class="particle" style="left: 10%; animation-delay: 0s;"></div>
            <div class="particle" style="left: 20%; animation-delay: 3s;"></div>
            <div class="particle" style="left: 30%; animation-delay: 6s;"></div>
            <div class="particle" style="left: 40%; animation-delay: 9s;"></div>
            <div class="particle" style="left: 50%; animation-delay: 12s;"></div>
            <div class="particle" style="left: 60%; animation-delay: 2s;"></div>
            <div class="particle" style="left: 70%; animation-delay: 5s;"></div>
            <div class="particle" style="left: 80%; animation-delay: 8s;"></div>
            <div class="particle" style="left: 90%; animation-delay: 11s;"></div>
        </div>
        
        <div class="content">
            <div id="text1" class="mystical-text" style="opacity: 0.3;">You stand at the threshold between stories...</div>
            <div id="text2" class="mystical-text" style="opacity: 0;">Beyond this portal lies the most ancient technology—</div>
            <div id="text3" class="mystical-text" style="opacity: 0;">The conscious rewriting of your life's story...</div>
            <div id="text4" class="mystical-text" style="opacity: 0;">Only those committed to becoming authors of reality may proceed.</div>
            
            <div id="portal" class="portal-interface">
                <form onsubmit="handleSubmit(event)">
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        class="portal-input"
                        placeholder="Speak the word of power..."
                        required
                    />
                    <button type="submit" class="sacred-button">
                        Begin Your Journey
                    </button>
                </form>
            </div>
            
            <div id="finalText" class="final-text">
                Speak the word of power to cross the threshold...
            </div>
        </div>
    </div>
    
    <script>
        let currentStep = 0;
        
        function typeText(element, text, speed = 60, callback) {
            try {
                console.log('Typing text:', text);
                let i = 0;
                element.style.opacity = '1';
                element.textContent = '';
                
                function typeChar() {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeChar, speed);
                    } else if (callback) {
                        setTimeout(callback, 800);
                    }
                }
                typeChar();
            } catch (error) {
                console.error('Error in typeText:', error);
                element.style.opacity = '1';
                element.textContent = text;
                if (callback) callback();
            }
        }
        
        function showNextStep() {
            try {
                console.log('showNextStep called, currentStep:', currentStep);
                
                if (currentStep === 0) {
                    typeText(document.getElementById('text1'), "You stand at the threshold between stories...", 80, showNextStep);
                } else if (currentStep === 1) {
                    typeText(document.getElementById('text2'), "Beyond this portal lies the most ancient technology—", 80, showNextStep);
                } else if (currentStep === 2) {
                    typeText(document.getElementById('text3'), "The conscious rewriting of your life's story...", 80, showNextStep);
                } else if (currentStep === 3) {
                    typeText(document.getElementById('text4'), "Only those committed to becoming authors of reality may proceed.", 80, showNextStep);
                } else if (currentStep === 4) {
                    // Fade in background
                    console.log('Fading in background...');
                    document.querySelector('.cosmic-background').style.opacity = '0.7';
                    document.querySelector('.cosmic-overlay').style.opacity = '1';
                    setTimeout(showNextStep, 2000);
                } else if (currentStep === 5) {
                    // Show portal interface
                    console.log('Showing portal interface...');
                    const portal = document.getElementById('portal');
                    portal.style.opacity = '1';
                    portal.style.transform = 'translateY(0)';
                    setTimeout(showNextStep, 1500);
                } else if (currentStep === 6) {
                    // Show final text
                    console.log('Showing final text...');
                    document.getElementById('finalText').style.opacity = '1';
                }
                currentStep++;
            } catch (error) {
                console.error('Error in showNextStep:', error);
                // Fallback: show everything immediately
                document.getElementById('text1').style.opacity = '1';
                document.getElementById('text2').style.opacity = '1';
                document.getElementById('text3').style.opacity = '1';
                document.getElementById('text4').style.opacity = '1';
                document.querySelector('.cosmic-background').style.opacity = '0.7';
                document.querySelector('.cosmic-overlay').style.opacity = '1';
                document.getElementById('portal').style.opacity = '1';
                document.getElementById('finalText').style.opacity = '1';
            }
        }
        
        function handleSubmit(event) {
            event.preventDefault();
            const password = document.getElementById('password').value;
            const portal = document.getElementById('portal');
            
            if (password.toLowerCase().trim() === 'artifiction') {
                // Success - pulse and redirect
                portal.classList.add('success-pulse');
                setTimeout(() => {
                    window.location.href = '/begin?password=' + encodeURIComponent(password);
                }, 2000);
            } else {
                // Error - flicker
                portal.classList.add('error-flicker');
                document.getElementById('password').value = '';
                document.getElementById('password').placeholder = 'The ancient words elude you...';
                setTimeout(() => {
                    portal.classList.remove('error-flicker');
                    document.getElementById('password').placeholder = 'Speak the word of power...';
                }, 1000);
            }
        }
        
        // Start the sequence after page load with debugging
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Sacred Threshold DOM loaded, starting sequence...');
            setTimeout(() => {
                console.log('Starting first step...');
                showNextStep();
            }, 500);
        });
    </script>
</body>
</html>
      `);
    }
  });

  // POST route for password submission (more secure)
  app.post('/begin', (req, res) => {
    const password = req.body.password;
    console.log('Password received via POST:', password); // Debug log
    
    if (password && password.toString().trim().toLowerCase() === 'artifiction') {
      res.sendFile(path.join(process.cwd(), 'metamyth.html'));
    } else {
      // Redirect back to GET route to show login form with error
      res.redirect('/begin?error=invalid');
    }
  });

  // Questionnaire submission endpoint (commented out - requires storage and schema setup)
  /*
  app.post('/api/questionnaire/submit', async (req, res) => {
    try {
      const body = insertQuestionnaireResponseSchema.parse({
        email: req.body.email,
        phone: req.body.phone,
        responses: req.body.responses,
        qualified: determineQualification(req.body.responses)
      });

      const response = await storage.createQuestionnaireResponse(body);

      res.json({ 
        id: response.id, 
        qualified: response.qualified,
        message: "Questionnaire submitted successfully" 
      });
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Invalid data', details: error.errors });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });
  */

  const httpServer = createServer(app);

  return httpServer;
}
