import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export const geminiModel = genAI.getGenerativeModel({
    model: "models/gemini-2.0-flash",
    systemInstruction: "You are an intelligent shopping assistant for users in Nigeria."
});
