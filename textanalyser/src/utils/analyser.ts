/**
 * @namespace Tools
 * @description A TypeScript module providing text analysis functionalities through various operations like removing punctuations, numbers, alphabets, special characters, extracting URLs, and performing case transformations. It also includes functions for character and alphanumeric counting.
 */

export namespace Tools {
  /**
   * @class ToolsConstant
   * @summary Provides constant values required for string analysis operations.
   * @property {string} punctuations - A string containing all punctuation characters.
   * @property {string} alphabets - A string containing all uppercase and lowercase alphabets.
   * @property {string} specialCharacters - A string containing all special characters.
   * @property {string} numbers - A string containing numeric digits from 0 to 9.
   */
  export class ToolsConstant {
    static readonly punctuations: string = `!()-[]{};:'"\\,<>./?@#$%^&*_~`;
    static readonly alphabets: string =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static readonly specialCharacters: string = ` !"#$%&'()*+,-./:‸⁁⎀;‱©†¤©‡(ɔ)<=>?@[\\]^_\`{|}~⟨⟩⁂±¶®℗™∴`;
    static readonly numbers: string = "0123456789";
    static readonly regex = {
      alphabets: /[a-zA-Z]/g,
      numbers: /\d/g,
      punctuations: new RegExp(`[${this.punctuations}]`, "g"),
      specialCharacters: /[^a-zA-Z0-9\s]/g,
      urls: /https?:\/\/\S+/gi,
      newlines: /\r?\n|\r/g,
      extraSpaces: / +/g,
      character: /\s/g,
    };
  }

  /**
   * @enum {string} Operations
   * @description Enum representing various text analysis and manipulation operations. Each operation corresponds to a specific functionality within the `Analyser` class.
   *
   * @property {string} RemovePunctuations - Operation to remove all punctuation characters from the text.
   * @property {string} RemoveNumbers - Operation to remove all numeric characters from the text.
   * @property {string} RemoveAlphabets - Operation to remove all alphabetic characters from the text.
   * @property {string} RemoveSpecialChars - Operation to remove all special characters from the text.
   * @property {string} RemoveNewlines - Operation to remove newline characters from the text.
   * @property {string} RemoveExtraSpaces - Operation to remove extra spaces and trim the text.
   * @property {string} ExtractUrls - Operation to extract all URLs from the text.
   * @property {string} ConvertToUppercase - Operation to convert all text to uppercase.
   * @property {string} ConvertToLowercase - Operation to convert all text to lowercase.
   * @property {string} CountCharacters - Operation to count the total number of non-whitespace characters in the text.
   * @property {string} CountAlphabets - Operation to count the total number of alphabetic characters in the text.
   * @property {string} CountAlphanumeric - Operation to count the total number of alphanumeric (alphabetic and numeric) characters in the text.
   */
  export enum Operations {
    RemovePunctuations = "removepunc",
    RemoveNumbers = "removenum",
    RemoveAlphabets = "removealpha",
    RemoveSpecialChars = "removespecialchar",
    RemoveNewlines = "newlineremover",
    RemoveExtraSpaces = "extraspaceremover",
    ExtractUrls = "extractUrls",
    ConvertToUppercase = "fullcaps",
    ConvertToLowercase = "lowercaps",
    CountCharacters = "charcount",
    CountAlphabets = "alphacount",
    CountAlphanumeric = "alphanumericcount",
  }

  /** @type AnalyserOption */
  type AnalyserOptions = Partial<Record<Operations | string, boolean>>;

  /**
   * @class Analyser
   * @summary A class to analyze and manipulate strings based on user-provided options.
   *
   * @property {string} [raw_text] - The input text to be analyzed and manipulated.
   * @property {number} count - Stores the result of character or alphabet counting operations.
   * @property {number} _count - Stores the count of numeric characters during alphanumeric counting.
   * @property {string[]} operations - List of operations performed on the input string.
   * @property {string} output - The final processed output string.
   *
   * @param {string} raw_text - The input text to process.
   * @param {AnalyserOptions} options - The options object defining the operations to perform.
   * @param {boolean} [options.removepunc] - Removes punctuations if true.
   * @param {boolean} [options.removenum] - Removes numbers if true.
   * @param {boolean} [options.removealpha] - Removes alphabets if true.
   * @param {boolean} [options.removespecialchar] - Removes special characters if true.
   * @param {boolean} [options.newlineremover] - Removes newlines if true.
   * @param {boolean} [options.extraspaceremover] - Removes extra spaces if true.
   * @param {boolean} [options.extractUrls] - Extracts URLs from the text if true.
   * @param {boolean} [options.fullcaps] - Converts text to uppercase if true.
   * @param {boolean} [options.lowercaps] - Converts text to lowercase if true.
   * @param {boolean} [options.charcount] - Counts characters in the text if true.
   * @param {boolean} [options.alphacount] - Counts alphabets in the text if true.
   * @param {boolean} [options.alphanumericcount] - Counts alphanumeric characters if true.
   */
  export class Analyser {
    public raw_text: string; // Declaring raw_text consistently as 'public'
    public count: number = 0;
    public _count: number = 0;
    public operations: string[] = [];
    public output: string = "";
    public customOperations: { [key: string]: () => Promise<void> } = {};

    constructor(raw_text: string, public options: AnalyserOptions = {}) {
      // Ensure raw_text is set properly
      this.raw_text = raw_text || ""; // Fallback to empty string if raw_text is undefined or null
    }

    /**
     * @async
     * @function removeAlphabets
     * @summary Removes all alphabetic characters from the input text.
     */
    async removeAlphabets(): Promise<void> {
      this.raw_text = this.raw_text.replace(ToolsConstant.regex.alphabets, "");
      this.logOperation("Removed Alphabets");
    }

    /**
     * @async
     * @function removeNumbers
     * @summary Removes all numeric characters from the input text.
     */
    async removeNumbers(): Promise<void> {
      this.raw_text = this.raw_text.replace(ToolsConstant.regex.numbers, "");
      this.logOperation("Removed Numbers");
    }

    /**
     * @async
     * @function removePunctuations
     * @summary Removes all punctuation characters from the input text.
     */
    async removePunctuations(): Promise<void> {
      this.raw_text = this.raw_text.replace(
        ToolsConstant.regex.punctuations,
        ""
      );
      this.logOperation("Removed Punctuations");
    }

    /**
     * @async
     * @function removeSpecialCharacters
     * @summary Removes all special characters from the input text.
     */
    async removeSpecialCharacters(): Promise<void> {
      this.raw_text = this.raw_text.replace(
        ToolsConstant.regex.specialCharacters,
        ""
      );
      this.logOperation("Removed Special Characters");
    }

    /**
     * @async
     * @function extraSpaceRemover
     * @summary Removes extra spaces and trims the input text.
     */
    async extraSpaceRemover(): Promise<void> {
      this.raw_text = this.raw_text
        .replace(ToolsConstant.regex.extraSpaces, " ")
        .trim();
      this.logOperation("Removed Extra Spaces");
    }

    /**
     * @async
     * @function newLineRemover
     * @summary Removes newline characters from the input text.
     */
    async newLineRemover(): Promise<void> {
      this.raw_text = this.raw_text
        .replace(ToolsConstant.regex.newlines, " ")
        .trim();
      this.logOperation("Removed New Line Characters");
    }

    /**
     * @async
     * @function extractURL
     * @summary Extracts all URLs from the input text and joins them with a comma.
     */
    async extractURL(): Promise<void> {
      const urls = this.raw_text.match(ToolsConstant.regex.urls) || [];
      this.raw_text = urls.join(", ");
      this.logOperation("Extracted URLs");
    }

    /**
     * @async
     * @function toFullUppercase
     * @summary Converts all characters in the input text to uppercase.
     */
    async toFullUppercase(): Promise<void> {
      this.raw_text = this.raw_text.toUpperCase();
      this.logOperation("Changed to Uppercase");
    }

    /**
     * @async
     * @function toFullLowercase
     * @summary Converts all characters in the input text to lowercase.
     */
    async toFullLowercase(): Promise<void> {
      this.raw_text = this.raw_text.toLowerCase();
      this.logOperation("Changed to Lowercase");
    }

    /**
     * @async
     * @function countCharacters
     * @summary Counts the number of non-whitespace characters in the input text.
     */
    async countCharacters(): Promise<void> {
      this.count = this.raw_text.replace(
        ToolsConstant.regex.character,
        ""
      ).length;
      this.logOperation("Counted Characters");
    }

    /**
     * @async
     * @function countAlphas
     * @summary Counts the number of alphabetic characters in the input text.
     */
    async countAlphas(): Promise<void> {
      this.count = (
        this.raw_text.match(ToolsConstant.regex.alphabets) || []
      ).length;
      this.logOperation("Counted Alphabets");
    }
    /**
     * @async
     * @function countAlphaNumeric
     * @summary Counts the number of alphabetic and numeric characters in the input text.
     */
    async countAlphaNumeric(): Promise<void> {
      this.count = (
        this.raw_text.match(ToolsConstant.regex.alphabets) || []
      ).length;
      this._count = (
        this.raw_text.match(ToolsConstant.regex.numbers) || []
      ).length;
      this.logOperation("Counted Alphabets and Numbers.");
    }

    /**
     * @function addCustomOperation
     * @summary Adds a custom text operation to the analyser dynamically.
     *
     * @description This method allows you to define and register a custom text manipulation operation.
     * The custom operation is applied to the current `raw_text` of the analyser instance.
     * Once the operation is executed, the `raw_text` is updated and logged with the operation name.
     *
     * @param {string} name - The name of the custom operation to be registered.
     * @param {(text: string) => string} operation - A function that performs the custom operation on the text.
     *        It takes the current text as input and returns the modified text.
     *
     * @returns {Promise<void>} Resolves when the custom operation is successfully added.
     *
     * @example
     * const analyserEngine = new Tools.Analyser("Sample Text");
     * await analyserEngine.addCustomOperation("reverseText", (text) => text.split("").reverse().join(""));
     * await analyserEngine.reverseText(); // Executes the custom operation
     * console.log(analyserEngine.raw_text); // Output: "txeT elpmaS"
     */
    public async addCustomOperation(
      name: string,
      operation: (text: string) => string
    ): Promise<void> {
      this.customOperations[name] = async () => {
        this.raw_text = operation(this.raw_text);
        this.logOperation(`Performed Custom Operation: ${name}`);
      };
      this.options[name] = true;
    }

    /**
     * @private
     * @function logOperation
     * @summary Logs the performed operation.
     * @param {string} operation - The operation performed on the text.
     */

    private logOperation(operation: string): void {
      this.operations.push(operation);
    }

    /**
     * @private
     * @async
     * @function get_results
     * @summary Retrieves the results of the operations performed on the text.
     * @returns {Promise<{ purpose: string; output: string }>} An object containing the purpose (list of operations performed) and the final output string.
     */

    private async get_results(): Promise<{
      purpose: string;
      output: string;
      metadata: { [key: string]: any }; // Include counts, URLs, etc.
    }> {
      return {
        purpose: this.operations.join(", "),
        output: this.raw_text,
        metadata: {
          characterCount: this.count,
          numericCount: this._count,
        },
      };
    }

    /**
     * @async
     * @function main
     * @summary Executes the text analysis operations based on the options provided in the constructor.
     * @description Processes the input text through various operations such as removing punctuations, numbers, or special characters, extracting URLs, converting case, counting characters, and more.
     * @returns {Promise<{ purpose: string; output: string, metadata: { [key: string]: any }; }>} An object containing the purpose of the operations,the resulting output string and metadatas.
     */
    async main(): Promise<{
      purpose: string;
      output: string;
      metadata: { [key: string]: any };
    }> {
      const operationHandlers: Record<
        Operations | string,
        () => Promise<void>
      > = {
        [Operations.RemovePunctuations]: this.removePunctuations.bind(this),
        [Operations.RemoveNumbers]: this.removeNumbers.bind(this),
        [Operations.RemoveAlphabets]: this.removeAlphabets.bind(this),
        [Operations.RemoveSpecialChars]:
          this.removeSpecialCharacters.bind(this),
        [Operations.RemoveNewlines]: this.newLineRemover.bind(this),
        [Operations.RemoveExtraSpaces]: this.extraSpaceRemover.bind(this),
        [Operations.ExtractUrls]: this.extractURL.bind(this),
        [Operations.ConvertToUppercase]: this.toFullUppercase.bind(this),
        [Operations.ConvertToLowercase]: this.toFullLowercase.bind(this),
        [Operations.CountCharacters]: this.countCharacters.bind(this),
        [Operations.CountAlphabets]: this.countAlphas.bind(this),
        [Operations.CountAlphanumeric]: this.countAlphaNumeric.bind(this),
        ...this.customOperations, // Include custom operations dynamically
      };

      for (const [operation, enabled] of Object.entries(this.options)) {
        if (enabled && operationHandlers[operation]) {
          await operationHandlers[operation]();
        }
      }

      return this.get_results();
    }
  }
}
