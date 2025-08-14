
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFoodDescription = async (foodName: string): Promise<string> => {
  try {
    const prompt = `Generate a short, single-paragraph, mouth-watering, and highly appealing promotional description for a dish called "${foodName}". Focus on sensory details like aroma, texture, and taste. Keep it under 50 words. Do not use markdown or titles.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.95,
        topK: 40,
        thinkingConfig: { thinkingBudget: 0 } // For faster response
      },
    });

    const text = response.text.trim();
    if (!text) {
        return `An exquisite ${foodName} prepared with the freshest ingredients, offering a delightful experience.`
    }
    // Clean up potential markdown-like characters that might slip through
    return text.replace(/[*#_]/g, '');

  } catch (error) {
    console.error("Error generating food description:", error);
    // Provide a graceful fallback description
    return `An exquisite ${foodName} prepared with the freshest ingredients, offering a delightful experience with every bite.`;
  }
};
