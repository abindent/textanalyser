/**
 * @class SentimentAnalyzer
 * @summary A utility class for analyzing text sentiment
 */
export class SentimentAnalyzer {
  private positiveWords: Set<string>;
  private negativeWords: Set<string>;

  constructor() {
    // Initialize with basic sentiment lexicons
    this.positiveWords = new Set([
      "good",
      "great",
      "excellent",
      "amazing",
      "awesome",
      "wonderful",
      "happy",
      "joy",
      "love",
      "positive",
      "beautiful",
      "nice",
      "perfect",
      "best",
      "fantastic",
      "delightful",
      "pleased",
      "glad",
      "superb",
    ]);

    this.negativeWords = new Set([
      "bad",
      "terrible",
      "awful",
      "horrible",
      "poor",
      "negative",
      "sad",
      "angry",
      "hate",
      "dislike",
      "worst",
      "disappointing",
      "frustrated",
      "annoyed",
      "miserable",
      "unhappy",
      "awful",
      "dreadful",
    ]);
  }

  /**
   * @function analyze
   * @summary Analyzes the sentiment of the provided text
   * @param {string} text - The text to analyze
   * @returns {SentimentResult} Object containing sentiment score and classification
   */
  public analyze(text: string): SentimentResult {
    if (!text || typeof text !== "string") {
      throw new Error("Input must be a non-empty string");
    }

    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    let positiveCount = 0;
    let negativeCount = 0;

    words.forEach((word) => {
      if (this.positiveWords.has(word)) positiveCount++;
      if (this.negativeWords.has(word)) negativeCount++;
    });

    const score = (positiveCount - negativeCount) / words.length;

    return {
      score,
      positiveWordCount: positiveCount,
      negativeWordCount: negativeCount,
      totalWords: words.length,
      classification: this.classifySentiment(score),
    };
  }

  /**
   * @private
   * @function classifySentiment
   * @summary Classifies sentiment based on score
   * @param {number} score - The sentiment score
   * @returns {SentimentClassification} The classification of sentiment
   */
  private classifySentiment(score: number): SentimentClassification {
    if (score > 0.15) return "positive";
    if (score < -0.05) return "negative";
    return "neutral";
  }

  /**
   * @function addCustomLexicon
   * @summary Adds custom words to the sentiment lexicons
   * @param {Object} lexicon - Object containing positive and negative word arrays
   * @param {string[]} lexicon.positive - Array of positive words
   * @param {string[]} lexicon.negative - Array of negative words
   */
  public addCustomLexicon(lexicon: {
    positive?: string[];
    negative?: string[];
  }): void {
    if (lexicon.positive && Array.isArray(lexicon.positive)) {
      lexicon.positive.forEach((word) =>
        this.positiveWords.add(word.toLowerCase())
      );
    }

    if (lexicon.negative && Array.isArray(lexicon.negative)) {
      lexicon.negative.forEach((word) =>
        this.negativeWords.add(word.toLowerCase())
      );
    }
  }
}

/**
 * @interface SentimentResult
 * @summary Result of sentiment analysis
 */
export interface SentimentResult {
  score: number;
  positiveWordCount: number;
  negativeWordCount: number;
  totalWords: number;
  classification: SentimentClassification;
}

/**
 * @type SentimentClassification
 * @summary Classifications for sentiment analysis
 */
export type SentimentClassification = "positive" | "negative" | "neutral";

/**
 * @class TextSummarizer
 * @summary A utility class for summarizing text
 */
export class TextSummarizer {
  private stopWords: Set<string>;

  constructor() {
    // Initialize with common English stop words
    this.stopWords = new Set([
      "a",
      "an",
      "the",
      "and",
      "or",
      "but",
      "if",
      "because",
      "as",
      "what",
      "which",
      "this",
      "that",
      "these",
      "those",
      "then",
      "just",
      "so",
      "than",
      "such",
      "when",
      "while",
      "to",
      "of",
      "at",
      "by",
      "for",
      "with",
      "about",
      "against",
      "between",
      "into",
      "through",
      "during",
      "before",
      "after",
      "above",
      "below",
      "from",
      "up",
      "down",
      "in",
      "out",
      "on",
      "off",
      "over",
      "under",
      "again",
      "further",
      "then",
      "once",
      "here",
      "there",
      "all",
      "any",
      "both",
      "each",
      "few",
      "more",
      "most",
      "other",
      "some",
      "such",
      "no",
      "nor",
      "not",
      "only",
      "own",
      "same",
      "so",
      "than",
      "too",
      "very",
      "can",
      "will",
    ]);
  }

  /**
   * @function extractiveSummarize
   * @summary Generates an extractive summary of the text
   * @param {string} text - The text to summarize
   * @param {number} [sentenceCount=3] - Number of sentences in the summary
   * @returns {string} Summarized text
   */
  public extractiveSummarize(text: string, sentenceCount: number = 3): string {
    if (!text || typeof text !== "string") {
      throw new Error("Input must be a non-empty string");
    }

    // Split into sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];

    if (sentences.length <= sentenceCount) {
      return text; // Return original if it's already shorter than requested summary
    }

    // Calculate word frequency
    const wordFrequency = this.calculateWordFrequency(text);

    // Score sentences based on word importance
    const sentenceScores = sentences.map((sentence) => {
      const words = sentence.toLowerCase().match(/\b\w+\b/g) || [];
      const score = words.reduce((total, word) => {
        if (!this.stopWords.has(word)) {
          return total + (wordFrequency[word] || 0);
        }
        return total;
      }, 0);
      return score / Math.max(words.length, 1);
    });

    // Get highest scoring sentences
    const indexScorePairs = sentenceScores.map((score, index) => ({
      index,
      score,
    }));
    const topSentences = indexScorePairs
      .sort((a, b) => b.score - a.score)
      .slice(0, sentenceCount)
      .sort((a, b) => a.index - b.index); // Maintain original order

    // Build summary
    return topSentences.map((pair) => sentences[pair.index].trim()).join(" ");
  }

  /**
   * @private
   * @function calculateWordFrequency
   * @summary Calculates frequency of each word in text
   * @param {string} text - Input text
   * @returns {Record<string, number>} Word frequency map
   */
  private calculateWordFrequency(text: string): Record<string, number> {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const frequency: Record<string, number> = {};

    words.forEach((word) => {
      if (!this.stopWords.has(word)) {
        frequency[word] = (frequency[word] || 0) + 1;
      }
    });

    return frequency;
  }

  /**
   * @function addStopWords
   * @summary Adds custom stop words to the analyzer
   * @param {string[]} words - Array of stop words to add
   */
  public addStopWords(words: string[]): void {
    if (!Array.isArray(words)) {
      throw new Error("Words must be an array of strings");
    }

    words.forEach((word) => this.stopWords.add(word.toLowerCase()));
  }
}

/**
 * @class TextStatistics
 * @summary A utility class for computing readability metrics
 */
export class TextStatistics {
  /**
   * @function fleschKincaidReadability
   * @summary Calculate Flesch-Kincaid readability score
   * @param {string} text - Text to analyze
   * @returns {ReadabilityResult} Readability scores and metrics
   */
  public fleschKincaidReadability(text: string): ReadabilityResult {
    if (!text || typeof text !== "string") {
      throw new Error("Input must be a non-empty string");
    }

    const words = text.match(/\b\w+\b/g) || [];
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const syllables = this.countSyllables(text);

    const wordCount = words.length;
    const sentenceCount = sentences.length;

    // Prevent division by zero
    if (wordCount === 0 || sentenceCount === 0) {
      return {
        readabilityScore: 0,
        gradeLevel: 0,
        wordCount,
        sentenceCount,
        syllableCount: syllables,
        avgWordsPerSentence: 0,
        avgSyllablesPerWord: 0,
        complexity: "unknown",
      };
    }

    const avgWordsPerSentence = wordCount / sentenceCount;
    const avgSyllablesPerWord = syllables / wordCount;

    // Flesch Reading Ease score
    const readabilityScore =
      206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;

    // Flesch-Kincaid Grade Level
    const gradeLevel =
      0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;

    return {
      readabilityScore: Math.round(readabilityScore * 10) / 10,
      gradeLevel: Math.round(gradeLevel * 10) / 10,
      wordCount,
      sentenceCount,
      syllableCount: syllables,
      avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
      avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
      complexity: this.getComplexityLabel(readabilityScore),
    };
  }

  /**
   * @private
   * @function countSyllables
   * @summary Estimates syllable count in text
   * @param {string} text - Input text
   * @returns {number} Estimated syllable count
   */
  private countSyllables(text: string): number {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];

    return words.reduce((count, word) => {
      // Basic syllable counting heuristics
      // This is a simplified approach - a comprehensive implementation would be more complex
      return count + this.estimateSyllablesInWord(word);
    }, 0);
  }

  /**
   * @private
   * @function estimateSyllablesInWord
   * @summary Estimates syllables in a word using heuristics
   * @param {string} word - Word to analyze
   * @returns {number} Estimated syllable count
   */
  private estimateSyllablesInWord(word: string): number {
    // Remove trailing e
    word = word.replace(/e$/, "");

    // Count vowel groups
    const vowelGroups = word.match(/[aeiouy]+/g);

    if (!vowelGroups) return 1; // Minimum one syllable
    return vowelGroups.length;
  }

  /**
   * @private
   * @function getComplexityLabel
   * @summary Get descriptive label for readability score
   * @param {number} score - Flesch readability score
   * @returns {string} Descriptive complexity label
   */
  private getComplexityLabel(score: number): string {
    if (score >= 90) return "very easy";
    if (score >= 80) return "easy";
    if (score >= 70) return "fairly easy";
    if (score >= 60) return "standard";
    if (score >= 50) return "fairly difficult";
    if (score >= 30) return "difficult";
    return "very difficult";
  }
}

/**
 * @interface ReadabilityResult
 * @summary Result of readability analysis
 */
export interface ReadabilityResult {
  readabilityScore: number;
  gradeLevel: number;
  wordCount: number;
  sentenceCount: number;
  syllableCount: number;
  avgWordsPerSentence: number;
  avgSyllablesPerWord: number;
  complexity: string;
}

/**
 * @class LanguageDetector
 * @summary Detects probable language of text
 */
export class LanguageDetector {
  private languageProfiles: Map<string, Map<string, number>>;

  constructor() {
    this.languageProfiles = new Map();
    this.initializeLanguageProfiles();
  }

  /**
   * @private
   * @function initializeLanguageProfiles
   * @summary Initialize frequency profiles for common languages
   */
  private initializeLanguageProfiles(): void {
    // English profile (common trigrams)
    const englishProfile = new Map<string, number>();
    englishProfile.set("the", 1.0);
    englishProfile.set("and", 0.95);
    englishProfile.set("ing", 0.94);
    englishProfile.set("ion", 0.92);
    englishProfile.set("ent", 0.9);
    englishProfile.set("her", 0.89);
    englishProfile.set("tha", 0.88);
    englishProfile.set("for", 0.87);
    englishProfile.set("ere", 0.85);
    englishProfile.set("tio", 0.84);

    // Spanish profile (common trigrams)
    const spanishProfile = new Map<string, number>();
    spanishProfile.set("que", 1.0);
    spanishProfile.set("ent", 0.96);
    spanishProfile.set("ade", 0.94);
    spanishProfile.set("cion", 0.93);
    spanishProfile.set("esta", 0.92);
    spanishProfile.set("para", 0.9);
    spanishProfile.set("los", 0.88);
    spanishProfile.set("por", 0.86);
    spanishProfile.set("as", 0.84);
    spanishProfile.set("es", 0.82);

    // French profile (common trigrams)
    const frenchProfile = new Map<string, number>();
    frenchProfile.set("les", 1.0);
    frenchProfile.set("ent", 0.96);
    frenchProfile.set("que", 0.94);
    frenchProfile.set("tion", 0.92);
    frenchProfile.set("pour", 0.9);
    frenchProfile.set("dans", 0.88);
    frenchProfile.set("une", 0.86);
    frenchProfile.set("des", 0.85);
    frenchProfile.set("par", 0.84);
    frenchProfile.set("est", 0.82);

    // German profile (common trigrams)
    const germanProfile = new Map<string, number>();
    germanProfile.set("der", 1.0);
    germanProfile.set("die", 0.97);
    germanProfile.set("und", 0.95);
    germanProfile.set("sch", 0.93);
    germanProfile.set("ein", 0.92);
    germanProfile.set("ich", 0.9);
    germanProfile.set("den", 0.88);
    germanProfile.set("zu", 0.86);
    germanProfile.set("das", 0.84);
    germanProfile.set("gen", 0.82);

    this.languageProfiles.set("english", englishProfile);
    this.languageProfiles.set("spanish", spanishProfile);
    this.languageProfiles.set("french", frenchProfile);
    this.languageProfiles.set("german", germanProfile);
  }

  /**
   * @function detect
   * @summary Detects the most likely language of the text
   * @param {string} text - The text to analyze
   * @returns {LanguageDetectionResult} The detected language and confidence scores
   */
  public detect(text: string): LanguageDetectionResult {
    if (!text || typeof text !== "string") {
      throw new Error("Input must be a non-empty string");
    }

    const textProfile = this.createTextProfile(text);
    const scores = new Map<string, number>();

    // Calculate similarity scores for each language
    this.languageProfiles.forEach((langProfile, language) => {
      const score = this.calculateSimilarity(textProfile, langProfile);
      scores.set(language, score);
    });

    // Find best match
    let bestLanguage = "unknown";
    let highestScore = -1;

    scores.forEach((score, language) => {
      if (score > highestScore) {
        highestScore = score;
        bestLanguage = language;
      }
    });

    // Create result object with all scores
    const result: LanguageDetectionResult = {
      detectedLanguage: bestLanguage,
      confidence: highestScore,
      scores: {},
    };

    scores.forEach((score, language) => {
      result.scores[language] = Math.round(score * 100) / 100;
    });

    return result;
  }

  /**
   * @private
   * @function createTextProfile
   * @summary Creates a profile of ngrams for the input text
   * @param {string} text - Input text
   * @returns {Map<string, number>} Frequency map of ngrams
   */
  private createTextProfile(text: string): Map<string, number> {
    const profile = new Map<string, number>();
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];

    // Count word frequencies
    words.forEach((word) => {
      if (word.length >= 2) {
        profile.set(word, (profile.get(word) || 0) + 1);
      }

      // Also count trigrams for more accuracy
      if (word.length >= 3) {
        for (let i = 0; i <= word.length - 3; i++) {
          const trigram = word.substring(i, i + 3);
          profile.set(trigram, (profile.get(trigram) || 0) + 1);
        }
      }
    });

    return profile;
  }

  /**
   * @private
   * @function calculateSimilarity
   * @summary Calculates similarity between two profiles
   * @param {Map<string, number>} textProfile - Profile of analyzed text
   * @param {Map<string, number>} langProfile - Profile of reference language
   * @returns {number} Similarity score (0-1)
   */
  private calculateSimilarity(
    textProfile: Map<string, number>,
    langProfile: Map<string, number>
  ): number {
    let matches = 0;
    let total = 0;

    langProfile.forEach((value, key) => {
      if (textProfile.has(key)) {
        matches += value * (textProfile.get(key) || 0);
      }
      total += value;
    });

    return matches / total;
  }

  /**
   * @function addCustomLanguage
   * @summary Adds a new language profile
   * @param {string} language - Name of the language
   * @param {Record<string, number>} profile - Language profile as object
   */
  public addCustomLanguage(
    language: string,
    profile: Record<string, number>
  ): void {
    if (!language || typeof language !== "string") {
      throw new Error("Language name must be a non-empty string");
    }

    const languageProfile = new Map<string, number>();

    Object.entries(profile).forEach(([key, value]) => {
      languageProfile.set(key, value);
    });

    this.languageProfiles.set(language.toLowerCase(), languageProfile);
  }
}

/**
 * @interface LanguageDetectionResult
 * @summary Result of language detection
 */
export interface LanguageDetectionResult {
  detectedLanguage: string;
  confidence: number;
  scores: Record<string, number>;
}

/**
 * @class TextDiff
 * @summary Compare text and generate difference information
 */
export class TextDiff {
  /**
   * @function compare
   * @summary Compare two texts and calculate their similarity
   * @param {string} text1 - First text to compare
   * @param {string} text2 - Second text to compare
   * @returns {TextDiffResult} Comparison results
   */
  public compare(text1: string, text2: string): TextDiffResult {
    if (typeof text1 !== "string" || typeof text2 !== "string") {
      throw new Error("Both inputs must be strings");
    }

    // Calculate Levenshtein distance
    const distance = this.levenshteinDistance(text1, text2);

    // Calculate similarity percentage
    const maxLength = Math.max(text1.length, text2.length);
    const similarity =
      maxLength === 0 ? 100 : ((maxLength - distance) / maxLength) * 100;

    // Find common substrings
    const commonSubstrings = this.findCommonSubstrings(text1, text2);

    // Count added/removed words
    const words1 = text1.split(/\s+/).filter((w) => w.length > 0);
    const words2 = text2.split(/\s+/).filter((w) => w.length > 0);
    const wordDiff = this.getWordDifference(words1, words2);

    return {
      similarity: Math.round(similarity * 100) / 100,
      editDistance: distance,
      commonSubstrings: commonSubstrings.slice(0, 5), // Return top 5 common substrings
      wordDifference: {
        added: wordDiff.added,
        removed: wordDiff.removed,
        unchanged: wordDiff.unchanged,
        addedCount: wordDiff.added.length,
        removedCount: wordDiff.removed.length,
        unchangedCount: wordDiff.unchanged.length,
      },
    };
  }

  /**
   * @private
   * @function levenshteinDistance
   * @summary Calculate Levenshtein distance between two strings
   * @param {string} s1 - First string
   * @param {string} s2 - Second string
   * @returns {number} Edit distance
   */
  private levenshteinDistance(s1: string, s2: string): number {
    const m = s1.length;
    const n = s2.length;

    // Create matrix
    const dp: number[][] = [];
    for (let i = 0; i <= m; i++) {
      dp[i] = [];
      dp[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }

    // Fill matrix
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // deletion
          dp[i][j - 1] + 1, // insertion
          dp[i - 1][j - 1] + cost // substitution
        );
      }
    }

    return dp[m][n];
  }

  /**
   * @private
   * @function findCommonSubstrings
   * @summary Find common substrings between two texts
   * @param {string} s1 - First string
   * @param {string} s2 - Second string
   * @returns {Array<{substring: string, length: number}>} Common substrings
   */
  private findCommonSubstrings(
    s1: string,
    s2: string
  ): Array<{ substring: string; length: number }> {
    const result: Array<{ substring: string; length: number }> = [];
    const minLength = 4; // Minimum length for common substring

    for (let i = 0; i < s1.length; i++) {
      for (let j = 0; j < s2.length; j++) {
        let k = 0;

        // Find length of common substring
        while (
          i + k < s1.length &&
          j + k < s2.length &&
          s1[i + k] === s2[j + k]
        ) {
          k++;
        }

        if (k >= minLength) {
          const substring = s1.substring(i, i + k);
          result.push({
            substring,
            length: k,
          });
        }
      }
    }

    // Sort by length descending
    return result.sort((a, b) => b.length - a.length);
  }

  /**
   * @private
   * @function getWordDifference
   * @summary Compare word arrays and find differences
   * @param {string[]} words1 - First array of words
   * @param {string[]} words2 - Second array of words
   * @returns {Object} Word difference analysis
   */
  private getWordDifference(
    words1: string[],
    words2: string[]
  ): {
    added: string[];
    removed: string[];
    unchanged: string[];
  } {
    const added: string[] = [];
    const removed: string[] = [];
    const unchanged: string[] = [];

    // Count occurrences of each word
    const countWords = (words: string[]): Map<string, number> => {
      const counts = new Map<string, number>();
      words.forEach((word) => {
        counts.set(word, (counts.get(word) || 0) + 1);
      });
      return counts;
    };

    const counts1 = countWords(words1);
    const counts2 = countWords(words2);

    // Find unchanged words
    counts1.forEach((count, word) => {
      const count2 = counts2.get(word) || 0;
      const minCount = Math.min(count, count2);

      for (let i = 0; i < minCount; i++) {
        unchanged.push(word);
      }

      if (count > count2) {
        for (let i = 0; i < count - count2; i++) {
          removed.push(word);
        }
      }
    });

    // Find added words
    counts2.forEach((count, word) => {
      const count1 = counts1.get(word) || 0;

      if (count > count1) {
        for (let i = 0; i < count - count1; i++) {
          added.push(word);
        }
      }
    });

    return { added, removed, unchanged };
  }
}

/**
 * @interface TextDiffResult
 * @summary Result of text comparison
 */
export interface TextDiffResult {
  similarity: number;
  editDistance: number;
  commonSubstrings: Array<{ substring: string; length: number }>;
  wordDifference: {
    added: string[];
    removed: string[];
    unchanged: string[];
    addedCount: number;
    removedCount: number;
    unchangedCount: number;
  };
}
