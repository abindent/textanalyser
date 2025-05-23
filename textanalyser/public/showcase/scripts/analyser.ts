import esrever from "esrever";
import {
  type SentimentResult,
  type ReadabilityResult,
  type TextDiffResult,
  type LanguageDetectionResult,
  SentimentAnalyzer,
  TextSummarizer,
  TextStatistics,
  LanguageDetector,
  TextDiff,
} from "./extensions";
/**
 * @namespace Tools
 * @description A TypeScript module providing text analysis functionalities through various operations like removing punctuations, numbers, alphabets, special characters, extracting URLs, and performing case transformations. It also includes functions for character and alphanumeric counting.
 */

export namespace Tools {
  /**
   * @class ToolsConstant
   * @summary A collection of regular expressions for different character patterns.
   * @readonly
   * @property {Object} regex - An object containing regex patterns.
   * @property {RegExp} regex.alphabets - Matches all alphabetical characters (both uppercase and lowercase).
   * @property {RegExp} regex.numbers - Matches all numeric digits (0-9).
   * @property {RegExp} regex.punctuations - Matches common punctuation characters.
   * @property {RegExp} regex.specialCharacters - Matches any special characters that are not alphanumeric or common punctuation.
   * @property {RegExp} regex.urls - Matches URLs that start with "http" or "https".
   * @property {RegExp} regex.newlines - Matches empty lines (newlines with only whitespace).
   * @property {RegExp} regex.extraSpaces - Matches multiple consecutive spaces.
   * @property {RegExp} regex.character - Matches whitespace characters.
   */
  export class ToolsConstant {
    static readonly regex = {
      alphabets: /[a-zA-Z]/g,
      numbers: /\d/g,
      punctuations: /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, // Simplified syntax
      specialCharacters: /[^a-zA-Z0-9\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g,
      urls: /https?:\/\/\S+/gi,
      newlines: /^\s*$(?:\r\n?|\n)/gm,
      extraSpaces: / +/g,
      character: /[^\s\p{Cf}]/gu,
      // Enhanced patterns
      email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      phoneNumber: /(?:\+\d{1,3}[-\s]?)?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}/g,
      hashtags: /#[a-zA-Z0-9_]+/g,
      mentions: /@[a-zA-Z0-9_]+/g,
    };
  }

  /**
   * @enum {string} Operations
   * @description Enum representing various text analysis and manipulation operations. Each operation corresponds to a specific functionality within the `Analyser` class.
   */
  export enum Operations {
    RemovePunctuations = "removepunc",
    RemoveNumbers = "removenum",
    RemoveAlphabets = "removealpha",
    RemoveSpecialChars = "removespecialchar",
    RemoveNewlines = "newlineremover",
    RemoveExtraSpaces = "extraspaceremover",
    ExtractUrls = "extractUrls",
    ExtractEmails = "extractEmails",
    ExtractPhoneNumbers = "extractPhoneNumbers",
    ExtractHashtags = "extractHashtags",
    ExtractMentions = "extractMentions",
    ConvertToUppercase = "fullcaps",
    ConvertToLowercase = "lowercaps",
    ConvertToTitleCase = "titlecase",
    CountCharacters = "charcount",
    CountAlphabets = "alphacount",
    CountNumbers = "numcount",
    CountAlphanumeric = "alphanumericcount",
    CountWords = "wordcount",
    CountSentences = "sentencecount",
    ReverseText = "reversetext",
    Truncate = "truncate",
    AnalyzeSentiment = "analyzeSentiment",
    SummarizeText = "summarizeText",
    CalculateReadability = "calculateReadability",
    DetectLanguage = "detectLanguage",
    CompareTexts = "compareTexts",
  }

  /** Types for Analyser options and built-in operations */
  export type AnalyserBuiltInOptions = Partial<
    Record<Operations | string, boolean | any>
  >;
  type BuiltInOptions = keyof typeof Operations;

  /** Type for operation results */
  export interface AnalyserResult {
    purpose: string;
    output: string;
    metadata: {
      counts: {
        characterCount: number;
        alphabetCount: number;
        numericCount: number;
        wordCount?: number;
        sentenceCount?: number;
      };
      urls?: string[];
      emails?: string[];
      phoneNumbers?: string[];
      hashtags?: string[];
      mentions?: string[];
      custom?: {
        [key: string]: any;
      };
    };
    [key: string]: any;
    operations: string[];
    builtInOperations: string[];
    customOperations: string[];
    executionTime?: number;
  }
  export interface AnalyserExtendedResult extends AnalyserResult {
    sentiment?: SentimentResult;
    summary?: string;
    readability?: ReadabilityResult;
    languageDetection?: LanguageDetectionResult;
    textComparison?: TextDiffResult;
  }

  /** Configuration type for Truncate operation */
  export interface TruncateConfig {
    maxLength: number;
    suffix?: string;
  }

  /**
   * @class Analyser
   * @summary A class to analyze and manipulate strings based on user-provided options.
   */
  export class Analyser {
    public raw_text: string;
    public count: number = 0;
    public alphacount: number = 0;
    public numericcount: number = 0;
    public wordCount: number = 0;
    public sentenceCount: number = 0;

    // Enhanced extraction features
    public urls: string[] = [];
    public emails: string[] = [];
    public phoneNumbers: string[] = [];
    public hashtags: string[] = [];
    public mentions: string[] = [];
    private metadata: { [key: string]: { [key: string]: any } } = {};

    public operations: string[] = [];
    public customOperationsList: string[] = [];
    public builtInOperationsList: string[] = [];
    private executionStartTime: number = 0;
    private executionEndTime: number = 0;

    private customOperations: { [key: string]: () => Promise<void> } = {};
    private builtInOptions: AnalyserBuiltInOptions = {};

    /**
     * @constructor
     * @param {string} raw_text - The input text to process.
     * @param {AnalyserBuiltInOptions} options - The options object defining operations to perform.
     * @throws {Error} If raw_text is not a string
     */
    constructor(raw_text: string, options: AnalyserBuiltInOptions = {}) {
      if (typeof raw_text !== "string") {
        throw new Error("Input text must be a string");
      }

      this.raw_text = raw_text || ""; // Fallback to empty string if raw_text is empty
      this.builtInOptions = options;
    }

    /** @summary Get all available operations */
    public get availableOperations(): Record<string, string> {
      const customOps = Object.keys(this.customOperations).reduce(
        (acc, key) => ({ ...acc, [key]: key }),
        {}
      );

      return {
        ...Operations,
        ...customOps,
      };
    }

    /** @summary Get current options */
    public get options(): AnalyserBuiltInOptions {
      return this.builtInOptions;
    }

    /** @summary Set new options */
    public set options(newOptions: AnalyserBuiltInOptions) {
      this.builtInOptions = { ...this.builtInOptions, ...newOptions };
    }

    /**
     * @description Operation handlers mapping
     * @private
     */
    private get operationHandlers(): Record<string, () => Promise<void>> {
      return {
        [Operations.RemovePunctuations]: this.removePunctuations.bind(this),
        [Operations.RemoveNumbers]: this.removeNumbers.bind(this),
        [Operations.RemoveAlphabets]: this.removeAlphabets.bind(this),
        [Operations.RemoveSpecialChars]:
          this.removeSpecialCharacters.bind(this),
        [Operations.RemoveNewlines]: this.newLineRemover.bind(this),
        [Operations.RemoveExtraSpaces]: this.extraSpaceRemover.bind(this),
        [Operations.ExtractUrls]: this.extractURL.bind(this),
        [Operations.ExtractEmails]: this.extractEmails.bind(this),
        [Operations.ExtractPhoneNumbers]: this.extractPhoneNumbers.bind(this),
        [Operations.ExtractHashtags]: this.extractHashtags.bind(this),
        [Operations.ExtractMentions]: this.extractMentions.bind(this),
        [Operations.ConvertToUppercase]: this.toFullUppercase.bind(this),
        [Operations.ConvertToLowercase]: this.toFullLowercase.bind(this),
        [Operations.ConvertToTitleCase]: this.toTitleCase.bind(this),
        [Operations.CountCharacters]: this.countCharacters.bind(this),
        [Operations.CountAlphabets]: this.countAlphas.bind(this),
        [Operations.CountNumbers]: this.countNums.bind(this),
        [Operations.CountAlphanumeric]: this.countAlphaNumeric.bind(this),
        [Operations.CountWords]: this.countWords.bind(this),
        [Operations.CountSentences]: this.countSentences.bind(this),
        [Operations.ReverseText]: this.reverseText.bind(this),
        [Operations.Truncate]: this.truncateText.bind(this),
        [Operations.AnalyzeSentiment]: this.analyzeSentiment.bind(this),
        [Operations.SummarizeText]: this.summarizeText.bind(this),
        [Operations.CalculateReadability]: this.calculateReadability.bind(this),
        [Operations.DetectLanguage]: this.detectLanguage.bind(this),
        [Operations.CompareTexts]: this.compareTexts.bind(this),
        ...this.customOperations,
      };
    }

    /**
     * @private
     * @async
     * @function removeAlphabets
     * @summary Removes all alphabetic characters from the input text.
     */
    private async removeAlphabets(): Promise<void> {
      this.raw_text = this.raw_text.replace(ToolsConstant.regex.alphabets, "");
      this.logOperation("Removed Alphabets");
    }

    /**
     * @private
     * @async
     * @function removeNumbers
     * @summary Removes all numeric characters from the input text.
     */
    private async removeNumbers(): Promise<void> {
      this.raw_text = this.raw_text.replace(ToolsConstant.regex.numbers, "");
      this.logOperation("Removed Numbers");
    }

    /**
     * @private
     * @async
     * @function removePunctuations
     * @summary Removes all punctuation characters from the input text.
     */
    private async removePunctuations(): Promise<void> {
      this.raw_text = this.raw_text.replace(
        ToolsConstant.regex.punctuations,
        ""
      );
      this.logOperation("Removed Punctuations");
    }

    /**
     * @private
     * @async
     * @function removeSpecialCharacters
     * @summary Removes all special characters from the input text.
     */
    private async removeSpecialCharacters(): Promise<void> {
      this.raw_text = this.raw_text.replace(
        ToolsConstant.regex.specialCharacters,
        ""
      );
      this.logOperation("Removed Special Characters");
    }

    /**
     * @private
     * @async
     * @function extraSpaceRemover
     * @summary Removes extra spaces and trims the input text.
     */
    private async extraSpaceRemover(): Promise<void> {
      this.raw_text = this.raw_text
        .replace(ToolsConstant.regex.extraSpaces, " ")
        .trim();
      this.logOperation("Removed Extra Spaces");
    }

    /**
     * @private
     * @async
     * @function newLineRemover
     * @summary Removes newline characters from the input text.
     */
    private async newLineRemover(): Promise<void> {
      this.raw_text = this.raw_text
        .replace(ToolsConstant.regex.newlines, "\n")
        .trim();
      this.logOperation("Removed New Line Characters");
    }

    /**
     * @private
     * @async
     * @function extractURL
     * @summary Extracts all URLs from the input text.
     */
    private async extractURL(): Promise<void> {
      this.urls = this.raw_text.match(ToolsConstant.regex.urls) || [];
      this.logOperation("Extracted URLs");
    }

    /**
     * @private
     * @async
     * @function extractEmails
     * @summary Extracts all email addresses from the input text.
     */
    private async extractEmails(): Promise<void> {
      this.emails = this.raw_text.match(ToolsConstant.regex.email) || [];
      this.logOperation("Extracted Emails");
    }

    /**
     * @private
     * @async
     * @function extractPhoneNumbers
     * @summary Extracts all phone numbers from the input text.
     */
    private async extractPhoneNumbers(): Promise<void> {
      this.phoneNumbers =
        this.raw_text.match(ToolsConstant.regex.phoneNumber) || [];
      this.logOperation("Extracted Phone Numbers");
    }

    /**
     * @private
     * @async
     * @function extractHashtags
     * @summary Extracts all hashtags from the input text.
     */
    private async extractHashtags(): Promise<void> {
      this.hashtags = this.raw_text.match(ToolsConstant.regex.hashtags) || [];
      this.logOperation("Extracted Hashtags");
    }

    /**
     * @private
     * @async
     * @function extractMentions
     * @summary Extracts all mentions from the input text.
     */
    private async extractMentions(): Promise<void> {
      this.mentions = this.raw_text.match(ToolsConstant.regex.mentions) || [];
      this.logOperation("Extracted Mentions");
    }

    /**
     * @private
     * @async
     * @function toFullUppercase
     * @summary Converts all characters in the input text to uppercase.
     */
    private async toFullUppercase(): Promise<void> {
      this.raw_text = this.raw_text.toUpperCase();
      this.logOperation("Changed to Uppercase");
    }

    /**
     * @private
     * @async
     * @function toFullLowercase
     * @summary Converts all characters in the input text to lowercase.
     */
    private async toFullLowercase(): Promise<void> {
      this.raw_text = this.raw_text.toLowerCase();
      this.logOperation("Changed to Lowercase");
    }

    /**
     * @private
     * @async
     * @function toTitleCase
     * @summary Converts the input text to title case (first letter of each word capitalized).
     */
    private async toTitleCase(): Promise<void> {
      this.raw_text = this.raw_text.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      });
      this.logOperation("Changed to Title Case");
    }

    /**
     * @private
     * @async
     * @function countCharacters
     * @summary Counts the number of non-whitespace characters in the input text.
     */
    private async countCharacters(): Promise<void> {
      this.count = (
        this.raw_text.match(ToolsConstant.regex.character) ?? []
      ).length;
      this.logOperation("Counted Characters");
    }

    /**
     * @private
     * @async
     * @function countAlphas
     * @summary Counts the number of alphabets in the input text.
     */
    private async countAlphas(): Promise<void> {
      this.alphacount = (
        this.raw_text.match(ToolsConstant.regex.alphabets) || []
      ).length;
      this.logOperation("Counted Alphabets");
    }

    /**
     * @private
     * @async
     * @function countNums
     * @summary Counts the number of numeric characters in the input text.
     */
    private async countNums(): Promise<void> {
      this.numericcount = (
        this.raw_text.match(ToolsConstant.regex.numbers) || []
      ).length;
      this.logOperation("Counted Numbers");
    }

    /**
     * @private
     * @async
     * @function countAlphaNumeric
     * @summary Counts the number of alphabetic and numeric characters in the input text.
     */
    private async countAlphaNumeric(): Promise<void> {
      this.alphacount = (
        this.raw_text.match(ToolsConstant.regex.alphabets) || []
      ).length;
      this.numericcount = (
        this.raw_text.match(ToolsConstant.regex.numbers) || []
      ).length;
      this.logOperation("Counted Alphabets and Numbers");
    }

    /**
     * @private
     * @async
     * @function countWords
     * @summary Counts the number of words in the input text.
     */
    private async countWords(): Promise<void> {
      // Count words by splitting on whitespace and filtering out empty strings
      const words = this.raw_text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      this.wordCount = words.length;
      this.logOperation("Counted Words");
    }

    /**
     * @private
     * @async
     * @function countSentences
     * @summary Counts the number of sentences in the input text.
     */
    private async countSentences(): Promise<void> {
      // Count sentences by splitting on period, exclamation, or question mark followed by whitespace
      const sentences = this.raw_text
        .split(/[.!?]+\s+/)
        .filter((sentence) => sentence.length > 0);
      this.sentenceCount = sentences.length > 0 ? sentences.length : 0;

      // If text ends with a sentence-ending punctuation but no trailing space, count the last sentence
      if (/[.!?]$/.test(this.raw_text.trim())) {
        this.sentenceCount += 1;
      }

      this.logOperation("Counted Sentences");
    }

    /**
     * @private
     * @async
     * @function reverseText
     * @summary Reverses the input text.
     */
    private async reverseText(): Promise<void> {
      this.raw_text = esrever.reverse(this.raw_text);
      this.logOperation("Reversed Text");
    }

    /**
     * @private
     * @async
     * @function truncateText
     * @summary Truncates the input text to a specified length.
     */
    private async truncateText(): Promise<void> {
      const config = this.builtInOptions[Operations.Truncate] as TruncateConfig;

      if (!config || typeof config !== "object" || !config.maxLength) {
        throw new Error(
          "Truncate operation requires a valid configuration with maxLength"
        );
      }

      const { maxLength, suffix = "..." } = config;

      if (this.raw_text.length <= maxLength) {
        return; // No truncation needed
      }

      this.raw_text = this.raw_text.substring(0, maxLength) + suffix;
      this.logOperation(`Truncated Text to ${maxLength} characters`);
    }

    /**
     * @private
     * @async
     * @function analyzeSentiment
     * @summary Analyzes the sentiment of the input text.
     */
    private async analyzeSentiment(): Promise<void> {
      const analyzer = new SentimentAnalyzer();
      // Apply custom lexicon if provided in options
      const lexiconOption = this.builtInOptions[Operations.AnalyzeSentiment];
      if (
        lexiconOption &&
        typeof lexiconOption === "object" &&
        ("positive" in lexiconOption || "negative" in lexiconOption)
      ) {
        analyzer.addCustomLexicon(
          lexiconOption as { positive?: string[]; negative?: string[] }
        );
      }

      const result = analyzer.analyze(this.raw_text);

      // Store in metadata
      if (!this.metadata.sentiment) {
        this.metadata.sentiment = {};
      }
      this.metadata.sentiment = result;

      this.logOperation("Analyzed Sentiment");
    }

    /**
     * @private
     * @async
     * @function summarizeText
     * @summary Summarizes the input text.
     */
    private async summarizeText(): Promise<void> {
      const summarizer = new TextSummarizer();

      // Get configuration options
      const summaryOptions = this.builtInOptions[Operations.SummarizeText];
      let sentenceCount = 3; // Default sentence count

      // Apply custom options if provided
      if (summaryOptions && typeof summaryOptions === "object") {
        if (
          "sentenceCount" in summaryOptions &&
          typeof summaryOptions.sentenceCount === "number"
        ) {
          sentenceCount = summaryOptions.sentenceCount;
        }

        if (
          "stopWords" in summaryOptions &&
          Array.isArray(summaryOptions.stopWords)
        ) {
          summarizer.addStopWords(summaryOptions.stopWords);
        }
      }

      const summary = summarizer.extractiveSummarize(
        this.raw_text,
        sentenceCount
      );

      // Store in metadata
      if (!this.metadata.summary) {
        this.metadata.summary = {};
      }
      this.metadata.summary = {
        text: summary,
        originalLength: this.raw_text.length,
        summaryLength: summary.length,
        compressionRatio: summary.length / Math.max(this.raw_text.length, 1),
      };

      this.logOperation(`Summarized Text (${sentenceCount} sentences)`);
    }

    /**
     * @private
     * @async
     * @function calculateReadability
     * @summary Calculates the readability of the input text.
     */
    private async calculateReadability(): Promise<void> {
      const textStats = new TextStatistics();
      const readabilityResult = textStats.fleschKincaidReadability(
        this.raw_text
      );

      // Store in metadata
      if (!this.metadata.readability) {
        this.metadata.readability = {};
      }
      this.metadata.readability = readabilityResult;

      this.logOperation("Calculated Readability Metrics");
    }

    /**
     * @private
     * @async
     * @function detectLanguage
     * @summary Detects the language of the input text.
     */
    private async detectLanguage(): Promise<void> {
      const languageDetector = new LanguageDetector();

      // Apply custom language profiles if provided
      const languageOptions = this.builtInOptions[Operations.DetectLanguage];
      if (
        languageOptions &&
        typeof languageOptions === "object" &&
        "customLanguages" in languageOptions
      ) {
        const customLanguages = languageOptions.customLanguages;
        if (customLanguages && typeof customLanguages === "object") {
          for (const [language, profile] of Object.entries(customLanguages)) {
            if (typeof profile === "object") {
              languageDetector.addCustomLanguage(
                language,
                profile as Record<string, number>
              );
            }
          }
        }
      }

      const detectionResult = languageDetector.detect(this.raw_text);

      // Store in metadata
      if (!this.metadata.language) {
        this.metadata.language = {};
      }
      this.metadata.language = detectionResult;

      this.logOperation(
        `Detected Language: ${detectionResult.detectedLanguage}`
      );
    }

    /**
     * @private
     * @async
     * @function compareTexts
     * @summary Compares two texts and returns the differences.
     */
    private async compareTexts(): Promise<void> {
      const textDiff = new TextDiff();

      // Get comparison text from options
      const compareOptions = this.builtInOptions[Operations.CompareTexts];
      if (
        !compareOptions ||
        typeof compareOptions !== "object" ||
        !("compareWith" in compareOptions)
      ) {
        throw new Error(
          "CompareTexts operation requires a 'compareWith' text to compare against"
        );
      }

      const compareWith = compareOptions.compareWith as string;
      if (typeof compareWith !== "string") {
        throw new Error("The 'compareWith' option must be a string");
      }

      const comparisonResult = textDiff.compare(this.raw_text, compareWith);

      // Store in metadata
      if (!this.metadata.comparison) {
        this.metadata.comparison = {};
      }
      this.metadata.comparison = comparisonResult;

      this.logOperation(
        `Compared Texts (${comparisonResult.similarity.toFixed(2)}% similarity)`
      );
    }

    /**
     * @function addCustomOperation
     * @summary Adds a custom text operation to the analyser dynamically.
     * @param {string} commandName - The name of the custom operation to be registered.
     * @param {string} logName - The logging name of the custom operation to be registered.
     * @param {(text: string) => string} operation - A function that performs the custom operation on the text.
     * @param {Object} config - Configuration object for the custom operation.
     * @param {(text: string) => string} config.operation - A function that performs the custom operation on the text.
     * @param {boolean} [config.isEnabled=false] - Whether to enable the operation immediately.
     * @param {Object} [config.metadata] - Optional metadata to be added to the result.
     * @param {(text: string) => any} [config.metadataExtractor] - Optional function to extract additional metadata.
     *
     * @returns {Promise<void>} Resolves when the custom operation is successfully added.
     * @throws {Error} If the commandName already exists or if parameters are invalid.
     */
    public async addCustomOperation(
      commandName: string,
      logName: string,
      config: {
        operation: (text: string) => string;
        isEnabled?: boolean;
        metadata?: { [key: string]: any };
        metadataExtractor?: (text: string) => any;
      }
    ): Promise<void> {
      if (!commandName || typeof commandName !== "string") {
        throw new Error("Command name must be a non-empty string");
      }

      if (!logName || typeof logName !== "string") {
        throw new Error("Log name must be a non-empty string");
      }

      if (typeof config.operation !== "function") {
        throw new Error("Operation must be a function");
      }

      // Check if command already exists
      if (
        Operations[commandName as BuiltInOptions] ||
        this.customOperations[commandName]
      ) {
        throw new Error(`Operation "${commandName}" already exists`);
      }

      // Add the custom operation
      this.customOperations[commandName] = async () => {
        try {
          // Store the original text to potentially use in metadata extraction
          const originalText = this.raw_text;

          // Apply the operation
          this.raw_text = config.operation(this.raw_text);

          // Log the operation
          this.logOperation(`${logName}`, true);

          // Initialize custom metadata if not exists
          if (!this.metadata.custom) {
            this.metadata = {};
          }

          // If metadata is provided, add it to the custom metadata
          if (config.metadata) {
            this.metadata[commandName] = {
              ...(this.metadata[commandName] || {}), // Preserve existing metadata
              ...config.metadata, // Add new metadata
            };
          }
          // If a metadata extractor is provided, extract and add metadata
          if (config.metadataExtractor) {
            const extractedMetadata = config.metadataExtractor(originalText);
            this.metadata[commandName] = {
              ...(this.metadata[commandName] || {}), // Preserve existing metadata
              ...extractedMetadata, // Add extracted metadata
            };
          }
        } catch (error) {
          this.logOperation(
            `Error in Custom Operation: ${logName} - ${error}`,
            true
          );
          throw error;
        }
      };

      // Enable the operation if requested
      this.builtInOptions[commandName] = config.isEnabled || false;
    }

    /**
     * @function toggleOperation
     * @summary Toggles an operation on or off.
     * @param {string} commandName - The name of the operation to toggle.
     * @param {boolean} isEnabled - Whether to enable the operation.
     * @returns {Promise<void>} Resolves when the operation is successfully toggled.
     * @throws {Error} If the operation does not exist or is already in the requested state.
     */
    public async toggleOperation(
      commandName: string,
      isEnabled: boolean
    ): Promise<void> {
      // Check if operation exists
      if (
        !(commandName in this.builtInOptions) &&
        !(commandName in Operations) &&
        !(commandName in this.customOperations)
      ) {
        throw new Error(
          `Operation "${commandName}" not found. Please add it first.`
        );
      }

      // Check if already in requested state
      if (this.builtInOptions[commandName] === isEnabled) {
        return; // Operation is already in the requested state, do nothing
      }

      // Toggle the operation
      this.builtInOptions[commandName] = isEnabled;
    }

    /**
     * @function enableAllOperations
     * @summary Enables all available operations.
     * @returns {Promise<void>} Resolves when all operations are enabled.
     */
    public async enableAllOperations(): Promise<void> {
      // Enable all built-in operations
      for (const operation in Operations) {
        if (isNaN(Number(operation))) {
          // Skip numeric enum keys
          this.builtInOptions[Operations[operation as BuiltInOptions]] = true;
        }
      }

      // Enable all custom operations
      for (const operation in this.customOperations) {
        this.builtInOptions[operation] = true;
      }
    }

    /**
     * @function disableAllOperations
     * @summary Disables all operations.
     * @returns {Promise<void>} Resolves when all operations are disabled.
     */
    public async disableAllOperations(): Promise<void> {
      for (const operation in this.builtInOptions) {
        this.builtInOptions[operation] = false;
      }
    }

    /**
     * @function resetText
     * @summary Resets the text to the original value or a new value.
     * @param {string} [newText] - Optional new text to set.
     * @returns {Promise<void>} Resolves when the text is reset.
     */
    public async resetText(newText?: string): Promise<void> {
      if (newText !== undefined) {
        if (typeof newText !== "string") {
          throw new Error("New text must be a string");
        }
        this.raw_text = newText;
      }

      // Reset all counters and extracted data
      this.count = 0;
      this.alphacount = 0;
      this.numericcount = 0;
      this.wordCount = 0;
      this.sentenceCount = 0;
      this.urls = [];
      this.emails = [];
      this.phoneNumbers = [];
      this.hashtags = [];
      this.mentions = [];

      // Reset operations log
      this.operations = [];

      this.logOperation("Text Reset");
    }

    /**
     * @private
     * @function logOperation
     * @summary Logs the performed operation.
     * @param {string} operation - The operation performed on the text.
     * @param {string} isCustom - Whether the operation is a custom function.
     */
    private logOperation(operation: string, isCustom: boolean = false): void {
      this.operations.push(operation);
      if (isCustom) {
        this.customOperationsList.push(operation);
      } else {
        this.builtInOperationsList.push(operation);
      }
    }

    /**
     * @private
     * @async
     * @function getResults
     * @summary Retrieves the results of the operations performed on the text.
     * @returns {Promise<AnalyserResult>} An object containing the results of the analysis.
     */
    private async getResults(): Promise<AnalyserExtendedResult> {
      const executionTime = this.executionEndTime - this.executionStartTime;

      const result: AnalyserExtendedResult = {
        purpose: this.operations.join(","),
        output: this.raw_text,
        operations: [...this.operations],
        builtInOperations: [...this.builtInOperationsList],
        customOperations: [...this.customOperationsList],
        executionTime,
        metadata: {
          counts: {
            characterCount: this.count,
            alphabetCount: this.alphacount,
            numericCount: this.numericcount,
            wordCount: this.wordCount,
            sentenceCount: this.sentenceCount,
          },
          urls: this.urls,
          emails: this.emails,
          phoneNumbers: this.phoneNumbers,
          hashtags: this.hashtags,
          mentions: this.mentions,
          custom: { ...this.metadata },
        },
      };
      if (this.metadata.sentiment) {
        result.sentiment = this.metadata.sentiment as SentimentResult;
      }

      if (this.metadata.summary) {
        result.summary = (this.metadata.summary as any).text as string;
      }

      if (this.metadata.readability) {
        result.readability = this.metadata.readability as ReadabilityResult;
      }

      if (this.metadata.language) {
        result.languageDetection = this.metadata
          .language as LanguageDetectionResult;
      }

      if (this.metadata.comparison) {
        result.textComparison = this.metadata.comparison as TextDiffResult;
      }

      return result;
    }

    /**
     * @async
     * @function main
     * @summary Executes the text analysis operations based on the provided options.
     * @returns {Promise<AnalyserResult>} An object containing the analysis results.
     * @throws {Error} If an operation fails.
     */
    public async main(): Promise<AnalyserResult> {
      this.executionStartTime = performance.now();

      try {
        for (const [operation, enabled] of Object.entries(
          this.builtInOptions
        )) {
          if (enabled) {
            const handler = this.operationHandlers[operation];

            if (handler) {
              await handler();
            } else {
              console.warn(`No handler found for operation: ${operation}`);
            }
          }
        }
      } catch (error) {
        this.logOperation(
          `Error: ${error instanceof Error ? error.message : String(error)}`
        );
        throw error;
      } finally {
        this.executionEndTime = performance.now();
      }

      return this.getResults();
    }

    /**
     * @static
     * @function createWithEnabledOperations
     * @summary Factory method to create an Analyser instance with specific operations enabled.
     * @param {string} text - The text to analyze.
     * @param {(keyof typeof Operations)[]} operations - The operations to enable.
     * @returns {Analyser} A new Analyser instance with the specified operations enabled.
     */
    public static createWithEnabledOperations(
      text: string,
      operations: (keyof typeof Operations)[]
    ): Analyser {
      const options: AnalyserBuiltInOptions = {};

      for (const operation of operations) {
        if (Operations[operation]) {
          options[Operations[operation]] = true;
        }
      }

      return new Analyser(text, options);
    }

    /**
     * @static
     * @function batch
     * @summary Process multiple strings with the same operations.
     * @param {string[]} texts - Array of strings to process.
     * @param {AnalyserBuiltInOptions} options - Operations to apply to all texts.
     * @returns {Promise<AnalyserResult[]>} Array of results for each text.
     */
    public static async batch(
      texts: string[],
      options: AnalyserBuiltInOptions
    ): Promise<AnalyserResult[]> {
      if (!Array.isArray(texts)) {
        throw new Error("Texts must be an array of strings");
      }

      const results: AnalyserResult[] = [];

      for (const text of texts) {
        const analyser = new Analyser(text, options);
        const result = await analyser.main();
        results.push(result);
      }

      return results;
    }
  }
}
