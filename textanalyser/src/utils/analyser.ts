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
    static readonly regex = {
      alphabets: /[a-zA-Z]/g,
      numbers: /\d/g,
      punctuations: new RegExp(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g),
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
   * @property {string} CountNumbers - Operation to count the total number of numeric characters in the text.
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
    CountNumbers = "numcount",
    CountAlphanumeric = "alphanumericcount",
  }

  /** @type AnalyserBuiltInOptions and BuiltInOptions */
  type AnalyserBuiltInOptions = Partial<Record<Operations, boolean>>;
  type BuiltInOptions = keyof typeof Operations;

  /**
   * @class Analyser
   * @summary A class to analyze and manipulate strings based on user-provided options.
   *
   * @property {string} [raw_text] - The input text to be analyzed and manipulated.
   * @property {number} count - Stores the result of character for counting operations.
   * @property {number} alphacount - Stores the count of alphabets during alphanumeric or alphabetic counting.
   * @property {number} numericcount - Stores the count of numeric characters during alphanumeric counting.
   * @property {string} url - Stores the extracted urls while extracting.
   * @property {string[]} operations - List of operations performed on the input string.
   *
   * ---
   *
   * @param {string} raw_text - The input text to process.
   * @param {AnalyserOptions} options - The options object defining the builtin operations to perform.
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
   * @param {boolean} [options.numcount] - Counts numeric characters in the text if true.
   * @param {boolean} [options.alphanumericcount] - Counts alphanumeric characters if true.
   */
  export class Analyser {
    public raw_text: string; // Declaring raw_text consistently as 'public'
    public count: number = 0;
    public alphacount: number = 0;
    public numericcount: number = 0;
    public url: string = "";
    public operations: string[] = [];
    private customOperations: { [key: string]: () => Promise<void> } = {};
    private builtInOptions: AnalyserBuiltInOptions = {};

    constructor(raw_text: string, options: AnalyserBuiltInOptions = {}) {
      // Ensure raw_text is set properly
      this.raw_text = raw_text || ""; // Fallback to empty string if raw_text is undefined or null
      this.builtInOptions = options;
    }

    /** @summary Fetching available operations.
     */
    public get availableOperations() {
      return {
        ...Operations,
        ...Object.keys(this.customOperations),
      };
    }

    /** @summary Gets the option constructor */
    public get options() {
      return this.builtInOptions;
    }

    /** Publicly sets the new options appended with externally registered commands. */
    public set options(newOptions: Partial<Record<string, boolean>>) {
      this.builtInOptions = newOptions as AnalyserBuiltInOptions;
    }

    /**
     * @description It is a private class for operation handlers.
     */
    private operationHandlers: Record<string, () => Promise<void>> = {
      [Operations.RemovePunctuations]: this.removePunctuations.bind(this),
      [Operations.RemoveNumbers]: this.removeNumbers.bind(this),
      [Operations.RemoveAlphabets]: this.removeAlphabets.bind(this),
      [Operations.RemoveSpecialChars]: this.removeSpecialCharacters.bind(this),
      [Operations.RemoveNewlines]: this.newLineRemover.bind(this),
      [Operations.RemoveExtraSpaces]: this.extraSpaceRemover.bind(this),
      [Operations.ExtractUrls]: this.extractURL.bind(this),
      [Operations.ConvertToUppercase]: this.toFullUppercase.bind(this),
      [Operations.ConvertToLowercase]: this.toFullLowercase.bind(this),
      [Operations.CountCharacters]: this.countCharacters.bind(this),
      [Operations.CountAlphabets]: this.countAlphas.bind(this),
      [Operations.CountNumbers]: this.countNums.bind(this),
      [Operations.CountAlphanumeric]: this.countAlphaNumeric.bind(this),
    };

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
        .replace(ToolsConstant.regex.newlines, " ")
        .trim();
      this.logOperation("Removed New Line Characters");
    }

    /**
     * @private
     * @async
     * @function extractURL
     * @summary Extracts all URLs from the input text and joins them with a comma.
     */
    private async extractURL(): Promise<void> {
      const urls = this.raw_text.match(ToolsConstant.regex.urls) || [];
      this.url = urls.join(", ");
      this.logOperation("Extracted URLs");
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
     * @function countCharacters
     * @summary Counts the number of non-whitespace characters in the input text.
     */
    private async countCharacters(): Promise<void> {
      this.count = this.raw_text.replace(
        ToolsConstant.regex.character,
        ""
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
     * @param {string} commandName - The name of the custom operation to be registered.
     * @param {string} logName - The logging name of the custom operation to be registered.
     * @param {(text: string) => string} operation - A function that performs the custom operation on the text.
     *        It takes the current text as input and returns the modified text.
     *
     * @returns {Promise<void>} Resolves when the custom operation is successfully added.
     *
     * @example
     * const analyserEngine = new Tools.Analyser("Sample Text");
     * await analyserEngine.addCustomOperation("reverseText", "Reverse Text", (text) => text.split("").reverse().join(""), true); // Passing true to enable the command.
     * // By default the commands added are disabled.So without passing the third param {boolean} would not hamper the programme.
     * console.log(analyserEngine.raw_text); // Output: "txeT elpmaS"
     */
    public async addCustomOperation(
      commandName: string,
      logName: string,
      operation: (text: string) => string,
      isEnabled: boolean = false
    ): Promise<void> {
      if (Operations[commandName as BuiltInOptions]) {
        throw new Error(
          `Command "${commandName}" already exists in Operations.`
        );
      }
      this.customOperations[commandName] = async () => {
        this.raw_text = operation(this.raw_text);
        this.logOperation(`Performed Custom Operation: ${logName}`);
      };
      this.options[commandName] = isEnabled;
    }

    /**
     * @function toggleOperation
     * @summary Toggled an added custom text operation to the analyser dynamically.
     *
     * @description This method allows you to toggle (`enable` or `disable`) the operations the were added using `addCustomOperation` function.
     *
     * @param {string} commandName - The name of the custom operation to be registered.
     * @param {boolean} isEnabled - Whether to enable the function or not.
     *
     * @returns {Promise<void>} Resolves when the custom operation is successfully enabled or disabled..
     *
     * @example
     * const analyserEngine = new Tools.Analyser("Sample Text");
     * await analyserEngine.addCustomOperation("reverseText", "Reverse Text", (text) => text.split("").reverse().join(""));
     * await analyserEngine.toggleOperation("reverseText", true); // Toggles the custom operation
     * console.log(analyserEngine.raw_text); // Output: "txeT elpmaS"
     */
    public async toggleOperation(
      commandName: string,
      isEnabled: boolean
    ): Promise<void> {
      if (!(commandName in this.options)) {
        throw new Error(
          `Custom operation "${commandName}" not found. Please add it first.`
        );
      }

      // Prevent unnecessary state changes
      if (this.options[commandName] === isEnabled) {
        throw new Error(
          `Operation "${commandName}" is already ${
            isEnabled ? "enabled" : "disabled"
          }.`
        );
        return;
      }

      this.options[commandName] = isEnabled;
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
          alphabetCount: this.alphacount,
          numericCount: this.numericcount,
          url: this.url,
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
      for (const [operation, enabled] of Object.entries(this.options)) {
        if (enabled) {
          const handler =
            this.operationHandlers[operation] ||
            this.customOperations[operation];
          if (handler) await handler();
        }
      }

      return this.get_results();
    }
  }
}
