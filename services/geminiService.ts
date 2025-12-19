
import { GoogleGenAI } from "@google/genai";

// Fix: Initializing GoogleGenAI strictly using process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAiResponse = async (userPrompt: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are the AI Concierge for 'Performates', an exclusive networking event for performance media professionals in Melbourne. 
        Event Details: 
        - Name: Performates Melbourne
        - Date: First Thursday of every month (Next: Sept 5th, 6 PM)
        - Location: Arbory Afloat (Summer) / The Emerson (Winter), Melbourne
        - Audience: Media buyers, SEOs, Analytics specialists, Growth hackers.
        - Cost: Free entry (limited spots).
        - Vibe: Data-driven, high-energy, no-ego networking.
        - Mission: Help Melbourne performance marketers connect and share alpha.
        
        Keep your responses short, professional, and slightly edgy/confident like a high-performing media buyer. Use Melbourne-specific references if possible.`,
        temperature: 0.7,
      },
    });

    // Fix: Using the .text property directly instead of a method call or deep path
    return response.text || "I'm having a bit of trouble connecting to the ad server. Try again in a second!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong. Let's just say my ROAS is currently 0.0.";
  }
};
