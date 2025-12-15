"use server";

import { Analyser, Operations, AnalyserResult } from "textanalysis-tool";

/**
 * @interface Data
 * @description Configuration interface for text analysis operations.
 * Defines all available text transformation and analysis options that can be applied
 * to the input text through the Analyser engine.
 * 
 * @property {boolean} removealpha - Remove all alphabetic characters from text
 * @property {boolean} removenum - Remove all numeric characters from text
 * @property {boolean} removepunc - Remove punctuation marks from text
 * @property {boolean} removespecialchar - Remove special characters from text
 * @property {boolean} fullcaps - Convert entire text to UPPERCASE
 * @property {boolean} titlecaps - Convert text to Title Case format
 * @property {boolean} lowercaps - Convert entire text to lowercase
 * @property {boolean} extraspaceremover - Remove redundant whitespace from text
 * @property {boolean} newlineremover - Remove all line breaks from text
 * @property {boolean} extractUrls - Extract and list all URLs found in text
 * @property {boolean} charcount - Count total number of characters
 * @property {boolean} alphacount - Count only alphabetic characters
 * @property {boolean} numcount - Count only numeric characters
 * @property {boolean} alphanumericcount - Count alphanumeric characters
 * @property {boolean} wordcount - Count total number of words
 * @property {boolean} sentencecount - Count total number of sentences
 * @property {boolean} reverseText - Reverse the order of the entire text
 * @property {boolean} extractEmojis - Extract and analyze emoji usage
 * @property {boolean} extractMentions - Extract all @mentions from text
 * @property {boolean} extractEmail - Extract all email addresses
 * @property {boolean} extractHashTag - Extract all #hashtags
 * @property {boolean} extractPhoneNo - Extract all phone numbers
 * @property {boolean} analyzeSentiment - Perform sentiment analysis (positive/negative/neutral)
 * @property {boolean} summarizeText - Generate a concise summary of the text
 * @property {boolean} calculateReadability - Calculate readability scores (Flesch-Kincaid, etc.)
 * @property {boolean} detectLanguage - Detect the language of the input text
 * @property {boolean} compareTexts - Compare input text with another text
 * @property {boolean} extractKeywords - Extract key terms and phrases
 * @property {boolean} useGeminiAi - Enable Gemini AI for advanced processing
 * @property {boolean} geminiSentiment - Use Gemini AI for sentiment analysis
 * @property {boolean} geminiSummarization - Use Gemini AI for text summarization
 * @property {boolean} geminiKeywords - Use Gemini AI for keyword extraction
 */
interface Data {
  removealpha: boolean;
  removenum: boolean;
  removepunc: boolean;
  removespecialchar: boolean;
  fullcaps: boolean;
  titlecaps: boolean;
  lowercaps: boolean;
  extraspaceremover: boolean;
  newlineremover: boolean;
  extractUrls: boolean;
  charcount: boolean;
  alphacount: boolean;
  numcount: boolean;
  alphanumericcount: boolean;
  wordcount: boolean;
  sentencecount: boolean;
  reverseText: boolean;
  extractEmojis: boolean;
  extractMentions: boolean;
  extractEmail: boolean;
  extractHashTag: boolean;
  extractPhoneNo: boolean;
  analyzeSentiment: boolean;
  calculateReadability: boolean;
  detectLanguage: boolean;
  compareTexts: boolean;
  extractKeywords: boolean;
  useGeminiAi: boolean;
  geminiSentiment: boolean;
  geminiSummarization: boolean;
  geminiKeywords: boolean;
}

/**
 * @function Analyse
 * @async
 * @description Main text analysis function that processes input text through multiple
 * analysis operations based on the provided configuration options. Returns comprehensive
 * analysis results including transformations, extractions, counts, and AI-powered insights.
 * 
 * @param {string} input - The primary text string to be analyzed
 * @param {string} [compareText=""] - Optional secondary text for comparison operations
 * @param {Data} data - Configuration object specifying which analysis operations to perform
 * 
 * @returns {Promise<AnalyserResult>} A promise that resolves to the complete analysis results
 * containing all requested transformations, extractions, and analytical data
 * 
 * @throws {Error} May throw errors if the analysis engine encounters invalid input or configuration
 * 
 * @example
 * // Basic word count and sentiment analysis
 * const result = await Analyse(
 *   "This is a sample text with #hashtag and great sentiment!",
 *   "",
 *   { 
 *     wordcount: true, 
 *     analyzeSentiment: true,
 *     extractHashTag: true 
 *   }
 * );
 * 
 * @example
 * // Text comparison with multiple operations
 * const result = await Analyse(
 *   "First text to compare",
 *   "Second text for comparison",
 *   { 
 *     compareTexts: true,
 *     wordcount: true,
 *     charcount: true 
 *   }
 * );
 * 
 * @author Sinchan Maitra
 * @version 1.1.1
 * @since 2025
 */
export async function Analyse(
  input: string,
  compareText: string = "",
  data: Data,
): Promise<AnalyserResult> {
  const AnalyserEngine = new Analyser(input, {
    [Operations.RemoveAlphabets]: data.removealpha,
    [Operations.RemoveNumbers]: data.removenum,
    [Operations.RemovePunctuations]: data.removepunc,
    [Operations.RemoveSpecialChars]: data.removespecialchar,
    [Operations.ConvertToUppercase]: data.fullcaps,
    [Operations.ConvertToTitleCase]: data.titlecaps,
    [Operations.ConvertToLowercase]: data.lowercaps,
    [Operations.RemoveExtraSpaces]: data.extraspaceremover,
    [Operations.RemoveNewlines]: data.newlineremover,
    [Operations.ExtractUrls]: data.extractUrls,
    [Operations.CountCharacters]: data.charcount,
    [Operations.CountAlphabets]: data.alphacount,
    [Operations.CountNumbers]: data.numcount,
    [Operations.CountAlphanumeric]: data.alphanumericcount,
    [Operations.CountWords]: data.wordcount,
    [Operations.CountSentences]: data.sentencecount,
    [Operations.ReverseText]: data.reverseText,
    [Operations.ExtractMentions]: data.extractMentions,
    [Operations.ExtractEmails]: data.extractEmail,
    [Operations.ExtractHashtags]: data.extractHashTag,
    [Operations.ExtractPhoneNumbers]: data.extractPhoneNo,
    [Operations.AnalyzeSentiment]: data.analyzeSentiment,
    [Operations.CalculateReadability]: data.calculateReadability,
    [Operations.DetectLanguage]: data.detectLanguage,
    [Operations.CompareTexts]: data.compareTexts
      ? { compareWith: compareText }
      : false,
    [Operations.ExtractKeywords]: data.extractKeywords
      ? { topN: 10 }
      : false,
  } as any, {
    blacklist: ["sco"]
  });

  // Custom emoji operation
  try {
    await AnalyserEngine.addCustomOperation(
      "extractEmojis",
      "Extracted Emojis",
      {
        operation: (text: string) => {
          const emojiRegex =
            /[\u{1F300}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
          const emojis = text.match(emojiRegex) || [];
          return text;
        },
        metadata: { analysisType: "emoji-detection" },
        metadataExtractor: (text: string) => {
          const emojiRegex =
            /[\u{1F300}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
          const emojis = text.match(emojiRegex) || [];
          const uniqueEmojis = [...new Set(emojis)];
          const emojiCategories = {
            nature: emojis.filter((emoji) =>
              /[\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}]/u.test(emoji),
            ),
            objects: emojis.filter((emoji) =>
              /[\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}]/u.test(emoji),
            ),
            symbols: emojis.filter((emoji) =>
              /[\u{2600}-\u{26FF}]/u.test(emoji),
            ),
          };
          return {
            totalEmojis: emojis.length,
            uniqueEmojis,
            uniqueEmojiCount: uniqueEmojis.length,
            emojiCategories: {
              nature: emojiCategories.nature.length,
              objects: emojiCategories.objects.length,
              symbols: emojiCategories.symbols.length,
            },
            emojiDensity: (emojis.length / (text.length || 1)) * 100,
          };
        },
        isEnabled: data.extractEmojis,
      } as any,
    );
  } catch (err) {
    try {
      await (AnalyserEngine as any).addCustomOperation(
        "extractEmojis",
        "Extracted Emojis",
        (text: string) => text,
        data.extractEmojis,
      );
    } catch (e) {
      // ignore
    }
  }
  const result = await AnalyserEngine.main();
  return result;
}