import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { storage } from "./storage";
import { insertQuestionnaireResponseSchema } from "@shared/schema";
import { z } from "zod";

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
    <title>METAMYTH Portal - Access Required</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @font-face {
            font-family: 'AngleFairy2024';
            src: url('/attached_assets/Angle & Fairy_1755895085623.otf?v=2024') format('opentype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'GrillagesBold2024';
            src: url('/attached_assets/GrillagesBold_1756520423796.ttf?v=2024') format('truetype');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
        }
        
        body {
            background-color: #1D4241;
            color: #E0E0E0;
            font-family: 'GrillagesBold2024', serif;
            font-weight: 700;
        }
        
        h1, h2 {
            font-family: 'AngleFairy2024', serif !important;
            color: #D4AF37;
            letter-spacing: 0.05em;
            font-weight: normal !important;
        }
        
        /* Frosted glass styles removed - using inline styles only */
        
        .cta-button-base {
            position: relative;
            padding: 12px 24px;
            background: linear-gradient(90deg, #f39c12, #f1c40f, #f4d03f);
            color: #2c3e50;
            font-family: 'AngleFairy2024', serif;
            font-weight: bold;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 8px;
            border-radius: 16px;
            box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.1);
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.9), 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .cta-button-base:hover {
            transform: translateY(-2px);
            box-shadow: 
                0 0 30px rgba(241, 196, 15, 0.8),
                0 0 60px rgba(241, 196, 15, 0.8),
                0 0 90px rgba(241, 196, 15, 0.8),
                inset 0 0 30px rgba(255, 255, 255, 0.2);
        }
        
        body.crimson-portal {
            background-image: url('/attached_assets/_light_possibility_space-__prompt-_extreme_close-up_inside_pure_light_refracting_through_gold_and_t_32nctb21dgsvksda74nb_3_1756779584780.png') !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            background-attachment: fixed !important;
            min-height: 100vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
        
        /* Override any Tailwind purple classes */
        .bg-gradient-to-br { background: none !important; }
        .from-slate-900 { background: none !important; }
        .via-purple-900 { background: none !important; }
        .to-slate-900 { background: none !important; }
        
        .glow-input {
            background-color: rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        }
        
        .glow-input:focus {
            border: 1px solid rgba(255, 255, 255, 0.5) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
    </style>
</head>
<body class="crimson-portal">
    <div style="padding: 2rem; max-width: 28rem; width: 100%; margin: 0 1rem; background-color: #4a0000; border: 2px solid #14b8a6; border-radius: 16px; box-shadow: 0 0 15px rgba(20, 184, 166, 0.6), 0 0 30px rgba(20, 184, 166, 0.4), inset 0 0 20px rgba(74, 0, 0, 0.8); backdrop-filter: blur(10px);">
        <h1 style="font-size: 1.875rem; font-weight: bold; text-align: center; margin-bottom: 1.5rem; color: #D4AF37; font-family: 'AngleFairy2024', serif; text-shadow: 0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6), 0 0 30px rgba(212, 175, 55, 0.4);">METAMYTH PORTAL</h1>
        <h2 style="font-size: 1.125rem; text-align: center; margin-bottom: 2rem; color: #d1d5db;">Where Stories Become Reality</h2>
        
        <form onsubmit="handleSubmit(event)" style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div>
                <label for="password" style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem; color: white;">Your Quest Key:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    style="background-color: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 8px; padding: 0.75rem 1rem; width: 100%; outline: none; color: white; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);"
                    placeholder="Enter passkey..."
                    required
                />
            </div>
            
            <button type="submit" style="position: relative; padding: 12px 24px; background: linear-gradient(90deg, #f39c12, #f1c40f, #f4d03f); color: #2c3e50; font-family: 'AngleFairy2024', serif; font-weight: bold; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; border: none; cursor: pointer; transition: all 0.3s ease; margin: 8px; border-radius: 16px; box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.1); text-shadow: 0 0 8px rgba(255, 255, 255, 0.9), 0 2px 4px rgba(0, 0, 0, 0.3); width: 100%;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 0 30px rgba(241, 196, 15, 0.8), 0 0 60px rgba(241, 196, 15, 0.8), 0 0 90px rgba(241, 196, 15, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.2)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='inset 0 0 20px rgba(255, 255, 255, 0.1)';">
                Begin Your Journey
            </button>
        </form>
        
        <p style="text-align: center; font-size: 0.875rem; color: #d1d5db; margin-top: 1.5rem; line-height: 1.6;">
            You stand at the threshold between who you are and who you're meant to become. This sacred space transforms lives. Enter only if you're prepared for the adventure of becoming your truest self.
        </p>
    </div>
    
    <script>
        function handleSubmit(event) {
            event.preventDefault();
            const password = document.getElementById('password').value;
            window.location.href = '/begin?password=' + encodeURIComponent(password);
        }
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

  // Questionnaire submission endpoint
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

  const httpServer = createServer(app);

  return httpServer;
}
