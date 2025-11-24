import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
// Note: In a real production app, API keys should be handled securely on the backend.
// For this demo, we use the injected process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCordonResponse = async (userQuery: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: `You are the AI engine for "Cordon", an enterprise data platform. 
        
        Your Capabilities:
        1. You ingest email logs, Slack chats, PDF contracts, and sales calls.
        2. You provide citation-backed answers.
        
        Task:
        Answer the user's query as if you are searching through their internal company database. 
        - Adopt a professional, concise, and helpful tone.
        - Invent plausible internal data points (e.g., "Found in Q3 Report.pdf", "Email from Sarah Jenkins on Oct 12").
        - Keep the answer under 100 words.
        - If the user asks what Cordon is, explain the product value proposition (capturing and structuring data for enterprise AI).
        `,
        temperature: 0.7,
      }
    });

    return response.text || "I processed your request but could not generate a textual response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently unable to access the knowledge base. Please check your connection or API configuration.";
  }
};