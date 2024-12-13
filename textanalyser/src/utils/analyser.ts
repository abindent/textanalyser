import os from "os";

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
  }

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
   * @param {Object} options - The options object defining the operations to perform.
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

    constructor(
      raw_text: string,
      public options: Partial<{
        removepunc: boolean;
        removenum: boolean;
        removealpha: boolean;
        removespecialchar: boolean;
        newlineremover: boolean;
        extraspaceremover: boolean;
        extractUrls: boolean;
        fullcaps: boolean;
        lowercaps: boolean;
        charcount: boolean;
        alphacount: boolean;
        alphanumericcount: boolean;
      }> = {}
    ) {
      // Ensure raw_text is set properly
      this.raw_text = raw_text || ""; // Fallback to empty string if raw_text is undefined or null
    }

    /**
     * @async
     * @function removeAlphabets
     * @summary Removes all alphabetic characters from the input text.
     */
    async removeAlphabets(): Promise<void> {
      this.raw_text = this.raw_text.replace(/[a-zA-Z]/g, "");
      this.logOperation("Removed Alphabets");
    }

    /**
     * @async
     * @function removeNumbers
     * @summary Removes all numeric characters from the input text.
     */
    async removeNumbers(): Promise<void> {
      this.raw_text = this.raw_text.replace(/\d/g, "");
      this.logOperation("Removed Numbers");
    }

    /**
     * @async
     * @function removePunctuations
     * @summary Removes all punctuation characters from the input text.
     */
    async removePunctuations(): Promise<void> {
      const punctuationRegex = new RegExp(
        `[${ToolsConstant.punctuations}]`,
        "g"
      );
      this.raw_text = this.raw_text.replace(punctuationRegex, "");
      this.logOperation("Removed Punctuations");
    }

    /**
     * @async
     * @function removeSpecialCharacters
     * @summary Removes all special characters from the input text.
     */
    async removeSpecialCharacters(): Promise<void> {
      const specialCharRegex = new RegExp(`[^a-zA-Z0-9\s]`, "g");
      this.raw_text = this.raw_text.replace(specialCharRegex, "");
      this.logOperation("Removed Special Characters");
    }

    /**
     * @async
     * @function extraSpaceRemover
     * @summary Removes extra spaces and trims the input text.
     */
    async extraSpaceRemover(): Promise<void> {
      this.raw_text = this.raw_text.replace(/ +/g, " ").trim();
      this.logOperation("Removed Extra Spaces");
    }

    /**
     * @async
     * @function newLineRemover
     * @summary Removes newline characters from the input text.
     */
    async newLineRemover(): Promise<void> {
      this.raw_text = this.raw_text.replace(/\r?\n|\r/g, " ").trim();
      this.logOperation("Removed New Line Characters");
    }

    /**
     * @async
     * @function extractURL
     * @summary Extracts all URLs from the input text and joins them with a comma.
     */
    async extractURL(): Promise<void> {
      const urls = this.raw_text.match(/https?:\/\/\S+/gi) || [];
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
      this.count = this.raw_text.replace(/\s/g, "").length;
      this.logOperation("Counted Characters");
    }

    /**
     * @async
     * @function countAlphas
     * @summary Counts the number of alphabetic characters in the input text.
     */
    async countAlphas(): Promise<void> {
      this.count = (this.raw_text.match(/[a-zA-Z]/g) || []).length;
      this.logOperation("Counted Alphabets");
    }
    /**
     * @async
     * @function countAlphaNumeric
     * @summary Counts the number of alphabetic and numeric characters in the input text.
     */
    async countAlphaNumeric(): Promise<void> {
      this.count = (this.raw_text.match(/[a-zA-Z]/g) || []).length;
      this._count = (this.raw_text.match(/\d/g) || []).length;
      this.logOperation("Counted Alphanumeric Characters");
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

    private async get_results(): Promise<{ purpose: string; output: string }> {
      return {
        purpose: this.operations.join(", "),
        output: this.raw_text,
      };
    }

    /**
     * @async
     * @function main
     * @summary Executes the text analysis operations based on the options provided in the constructor.
     * @description Processes the input text through various operations such as removing punctuations, numbers, or special characters, extracting URLs, converting case, counting characters, and more.
     * @returns {Promise<{ purpose: string; output: string }>} An object containing the purpose of the operations and the resulting output string.
     */
    async main(): Promise<{ purpose: string; output: string }> {
      const {
        removepunc,
        removenum,
        removealpha,
        removespecialchar,
        newlineremover,
        extraspaceremover,
        extractUrls,
        fullcaps,
        lowercaps,
        charcount,
        alphacount,
        alphanumericcount,
      } = this.options;

      if (removepunc) await this.removePunctuations();
      if (removenum) await this.removeNumbers();
      if (removealpha) await this.removeAlphabets();
      if (removespecialchar) await this.removeSpecialCharacters();
      if (newlineremover) await this.newLineRemover();
      if (extraspaceremover) await this.extraSpaceRemover();
      if (extractUrls) await this.extractURL();
      if (fullcaps) await this.toFullUppercase();
      if (lowercaps) await this.toFullLowercase();
      if (charcount) await this.countCharacters();
      if (alphacount) await this.countAlphas();
      if (alphanumericcount) {
        await this.countAlphaNumeric();
        return {
          purpose: "Counted Alphanumeric Characters",
          output: `Alphabets: ${this.count}, Numbers: ${this._count}`,
        };
      }

      return this.get_results();
    }
  }
}
