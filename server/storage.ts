import { type User, type InsertUser, type QuestionnaireResponse, type InsertQuestionnaireResponse } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createQuestionnaireResponse(response: InsertQuestionnaireResponse): Promise<QuestionnaireResponse>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private questionnaireResponses: Map<string, QuestionnaireResponse>;

  constructor() {
    this.users = new Map();
    this.questionnaireResponses = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createQuestionnaireResponse(insertResponse: InsertQuestionnaireResponse): Promise<QuestionnaireResponse> {
    const id = randomUUID();
    const response: QuestionnaireResponse = { 
      ...insertResponse, 
      id, 
      phone: insertResponse.phone || null,
      createdAt: new Date() 
    };
    this.questionnaireResponses.set(id, response);
    return response;
  }
}

export const storage = new MemStorage();
