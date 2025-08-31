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
    if (password && password.toString().trim().toLowerCase() === 'autopoiesis') {
      res.sendFile(path.join(process.cwd(), 'metamyth.html'));
    } else {
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
        
        .frosted-glass {
            background: rgba(29, 66, 65, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(220, 38, 38, 0.3);
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(220, 38, 38, 0.1);
        }
        
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
            background: linear-gradient(135deg, #1a0000 0%, #8b0000 25%, #8b0000 50%, #8b0000 75%, #1a0000 100%) !important;
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
    </style>
</head>
<body class="crimson-portal">
    <div class="frosted-glass p-8 max-w-md w-full mx-4">
        <h1 class="text-3xl font-bold text-center mb-6">METAMYTH Portal</h1>
        <h2 class="text-lg text-center mb-8 text-gray-300">Access Required</h2>
        
        <form onsubmit="handleSubmit(event)" class="space-y-6">
            <div>
                <label for="password" class="block text-sm font-medium mb-2">Enter Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    placeholder="Password required..."
                    required
                />
            </div>
            
            <button type="submit" class="cta-button-base w-full">
                ENTER PORTAL
            </button>
        </form>
        
        <p class="text-center text-sm text-gray-400 mt-6">
            This is a private portal for authorized users only.
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
    
    if (password && password.toString().trim().toLowerCase() === 'autopoiesis') {
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
