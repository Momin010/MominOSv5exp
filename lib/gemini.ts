import { GoogleGenAI } from "@google/genai";

// --- GEMINI AI SETUP ---
export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
