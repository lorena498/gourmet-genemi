import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";

// This function is the Vercel Serverless Function handler
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Only allow POST requests for this endpoint
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  const { foodName } = req.body;

  // Basic validation
  if (!foodName || typeof foodName !== 'string') {
    return res.status(400).json({ error: 'foodName is required and must be a string' });
  }

  try {
    // Securely access the API key from environment variables on the server
    if (!process.env.API_KEY) {
      console.error("API_KEY environment variable not set on the server");
      // Don't leak implementation details to the client
      return res.status(500).json({ error: 'Server configuration error' });
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

    let text = response.text?.trim();

    // If Gemini returns an empty response, provide a default
    if (!text) {
        text = `An exquisite ${foodName} prepared with the freshest ingredients, offering a delightful experience.`
    }
    
    // Clean up potential markdown-like characters that might slip through
    const description = text.replace(/[*#_]/g, '');

    // Send the successful response back to the client
    return res.status(200).json({ description });

  } catch (error) {
    console.error("Error in generate function:", error);
    const fallbackDescription = `An exquisite ${foodName} prepared with the freshest ingredients, offering a delightful experience with every bite.`;
    // Send a fallback description on error to ensure a good user experience
    return res.status(500).json({ description: fallbackDescription, error: "Failed to generate description due to an internal error." });
  }
}
