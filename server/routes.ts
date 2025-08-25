import type { Express } from "express";
import { createServer, type Server } from "http";
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
