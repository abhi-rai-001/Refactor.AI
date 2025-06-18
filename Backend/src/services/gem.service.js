import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });

export default async function main(code) {
  const fullPrompt = `You are an expert software engineer and code reviewer.

Your task is to:
1. Carefully analyze the provided code.
2. Identify and explain any syntax errors, logical bugs, or inefficiencies.
3. Clearly explain *why* those issues are problematic.
4. Provide a fully corrected and optimized version of the code.
5. Suggest any best practices or improvements for readability, performance, or maintainability.
6. If applicable, mention time/space complexity or edge case concerns.
7. Response should be well-structured, well spaced, proper line-height, with clear sections for each part of the analysis.
8. If the code is already correct, simply state that it is correct and provide any potential improvements.
9. If the code is actually a prompt or a request for help, provide a detailed explanation of how to approach the problem, including any relevant algorithms or design patterns.
Be detailed, professional, and educational in your response. Your goal is to help the developer understand *what went wrong*, *how to fix it*, and *how to improve* as a coder.

Here is the code to review:

\`\`\`
${code}
\`\`\`

Please provide a comprehensive analysis following the guidelines above.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: fullPrompt
  });
  
  return response.text;
}