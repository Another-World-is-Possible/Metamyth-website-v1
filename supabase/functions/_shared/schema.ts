import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

export const insertQuestionnaireResponseSchema = z.object({
  email: z.string().email({ message: "A valid email is required." }),
  phone: z.string().optional(),
  // The `responses` object from the frontend questionnaire.
  // Keys are question numbers (as strings), values are the answers.
  responses: z.record(z.string(), z.unknown()),
  qualified: z.enum(["calendar", "discord"]),
});