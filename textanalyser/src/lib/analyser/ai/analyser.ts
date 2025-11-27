'use server';

import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
}

const genAI = new GoogleGenAI({
    apiKey: apiKey,
});
/**
 * @function geminiSummarize
 * @summary Uses Gemini AI to generate an advanced summary of text
 * @param {string} text - The text to summarize
 * @returns {Promise<string>} AI-generated summary
 */
export async function geminiSummarize(text: string): Promise<string> {
    if (!text || text.trim().length === 0) {
        return "No text provided for summarization. ";
    }

    try {
        const prompt = `Provide a concise 2-3 sentence summary of the following text that captures the main points:

${text}

Summary:`;

        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        return result.text || "Unable to generate summary";
    } catch (error) {
        console.error("Gemini summarization error:", error);
        throw new Error("Failed to summarize text with Gemini AI");
    }
}

/**
 * @function geminiAdvancedSentiment
 * @summary Uses Gemini AI for advanced sentiment analysis
 * @param {string} text - The text to analyze
 * @returns {Promise<{classification: string, explanation: string, confidence: number}>} AI sentiment analysis
 */
export async function geminiAdvancedSentiment(
    text: string
): Promise<{ classification: string; explanation: string; confidence: number }> {
    if (!text || text.trim().length === 0) {
        return {
            classification: "neutral",
            explanation: "No text provided for analysis",
            confidence: 0,
        };
    }

    try {
        const prompt = `Analyze the sentiment of the following text and respond in JSON format with:
- classification: "positive", "negative", "neutral", or "mixed"
- explanation: 1-2 sentence explanation
- confidence: number between 0-1

Text: "${text}"

Response (JSON only):`;

        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        const responseText = result.text as string;

        // Parse JSON response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return {
            classification: "neutral",
            explanation: responseText,
            confidence: 0.5,
        };
    } catch (error) {
        console.error("Gemini sentiment analysis error:", error);
        throw new Error("Failed to analyze sentiment with Gemini AI");
    }
}

/**
 * @function geminiKeywordExtraction
 * @summary Uses Gemini AI to extract key topics and keywords
 * @param {string} text - The text to analyze
 * @returns {Promise<{keywords: string[], topics: string[]}>} Extracted keywords and topics
 */
export async function geminiKeywordExtraction(
    text: string
): Promise<{ keywords: string[]; topics: string[] }> {
    if (!text || text.trim().length === 0) {
        return { keywords: [], topics: [] };
    }

    try {
        const prompt = `Extract 5 key topics and 10 keywords from the following text.  Respond in JSON format:

{"keywords": ["keyword1", "keyword2", ... ], "topics": ["topic1", "topic2", ...]}

Text: "${text}"

Response (JSON only):`;

        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        const responseText = result.text as string;

        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return { keywords: [], topics: [] };
    } catch (error) {
        console.error("Gemini keyword extraction error:", error);
        return { keywords: [], topics: [] };
    }
}

/**
 * @function geminiCustomPrompt
 * @summary Executes a custom user-defined prompt against the provided text using Gemini AI
 * @param {Object} input - Configuration object
 * @param {string} input.prompt - The custom user prompt/instruction
 * @param {string} input.text - The text to analyze
 * @returns {Promise<string>} AI-generated response
 */
export async function geminiCustomPrompt(input: {
    prompt: string;
    text: string;
}): Promise<string> {
    if (!input.prompt || !input.text) {
        throw new Error("Both prompt and text are required");
    }

    try {
        const fullPrompt = `User Instruction:\n${input.prompt}\n\n---TEXT TO ANALYZE---\n${input.text}\n\n---END TEXT---\n\nProvide your analysis:`;

        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: fullPrompt
        });
        const response = result.text;

        if (!response) {
            throw new Error("Empty response from Gemini API");
        }

        return response;
    } catch (error) {
        console.error("Gemini custom prompt error:", error);
        throw new Error(
            `Failed to process custom prompt: ${error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
}