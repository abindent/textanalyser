import os from "os";


/** 
 * @author Sinchan Maitra
 * @summary `Tools` is a typescript module that is heart of the textanalysing component.
 * @description It provides the logic behid twelve different operations:
 * 
 *  - 1. `removepunc` function helps to remove punctuations from the given String.
 * 
 *  - 2. `removenum` function helps to remove numbers from the given String.
 * 
 *  - 3. `removealpha` function removes the alphabets from the given string.
 * 
 *  - 4. `removespecialchar` function removes special characters from the given string.
 * 
 *  - 5. `newlineremover` function strips off the new lines.
 * 
 *  - 6. `extraspaceremover` function strips off the extra spaces.
 * 
 *  - 7. `extractUrls` function extracts the url (using ```regex```) from the given string.
 * 
 *  - 8. `fullcaps` function transfroms all of the lowercaps letters to uppercaps.
 * 
 *  - 9. `lowercaps` function transfroms the uppercaps letters to lowercaps.
 * 
 *  - 10. `charcount` function calculates the length of the given string.
 * 
 *  - 11. `alphacount` function counts the no of alphabets in the given string.
 * 
 *  - 12. `alphanumericcount` function counts the no of alphabets and numbers in the given string.
 * 
 * @namespace
 * @property {class}   ToolsConstant     - Provides the constant values neccessary for the analysing component.
 * @property {class}   Analyser          - The function that reduces, filters, updates the provided string as per to the request.
 * 
 */
declare module Tools {

  /**
   * @summary The constant class to provide constant elements required for analysing the given string.
   * @readonly
   * @property {string} punctuations
   */
  export class ToolsConstant {
    static readonly punctuations: string = `!()-[]{};:'"\\,<>./?@#$%^&*_~`;
    static readonly alphabets: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static readonly specialCharacters: string = ` !"#$%&'()*+,-./:‸⁁⎀;‱©†¤©‡(ɔ)<=>?@[\\]^_\`{|}~⟨⟩⁂±¶®℗™∴`;
    static readonly numbers: string = "0123456789";
  }

  export class Analyser {
    raw_text?: string;
    count: number = 0;
    _count: number = 0;
    operations: string[] = [];
    output: string = "";

    constructor(public raw_text: string = "", public options: Partial<{
      removepunc: boolean,
      removenum: boolean,
      removealpha: boolean,
      removespecialchar: boolean,
      newlineremover: boolean,
      extraspaceremover: boolean,
      extractUrls: boolean,
      fullcaps: boolean,
      lowercaps: boolean,
      charcount: boolean,
      alphacount: boolean,
      alphanumericcount: boolean,
    }> = {}) {}

    async removeAlphabets(): Promise<void> {
      this.raw_text = this.raw_text.replace(/[a-zA-Z]/g, "");
      this.logOperation("Removed Alphabets");
    }

    async removeNumbers(): Promise<void> {
      this.raw_text = this.raw_text.replace(/\d/g, "");
      this.logOperation("Removed Numbers");
    }

    async removePunctuations(): Promise<void> {
      const punctuationRegex = new RegExp(`[${ToolsConstant.punctuations}]`, "g");
      this.raw_text = this.raw_text.replace(punctuationRegex, "");
      this.logOperation("Removed Punctuations");
    }

    async removeSpecialCharacters(): Promise<void> {
      const specialCharRegex = new RegExp(`[^a-zA-Z0-9\s]`, "g");
      this.raw_text = this.raw_text.replace(specialCharRegex, "");
      this.logOperation("Removed Special Characters");
    }

    async extraSpaceRemover(): Promise<void> {
      this.raw_text = this.raw_text.replace(/ +/g, " ").trim();
      this.logOperation("Removed Extra Spaces");
    }

    async newLineRemover(): Promise<void> {
      this.raw_text = this.raw_text.replace(/\r?\n|\r/g, " ").trim();
      this.logOperation("Removed New Line Characters");
    }

    async extractURL(): Promise<void> {
      const urls = this.raw_text.match(/https?:\/\/\S+/gi) || [];
      this.raw_text = urls.join(", ");
      this.logOperation("Extracted URLs");
    }

    async toFullUppercase(): Promise<void> {
      this.raw_text = this.raw_text.toUpperCase();
      this.logOperation("Changed to Uppercase");
    }

    async toFullLowercase(): Promise<void> {
      this.raw_text = this.raw_text.toLowerCase();
      this.logOperation("Changed to Lowercase");
    }

    async countCharacters(): Promise<void> {
      this.count = this.raw_text.replace(/\s/g, "").length;
      this.logOperation("Counted Characters");
    }

    async countAlphas(): Promise<void> {
      this.count = (this.raw_text.match(/[a-zA-Z]/g) || []).length;
      this.logOperation("Counted Alphabets");
    }

    async countAlphaNumeric(): Promise<void> {
      this.count = (this.raw_text.match(/[a-zA-Z]/g) || []).length;
      this._count = (this.raw_text.match(/\d/g) || []).length;
      this.logOperation("Counted Alphanumeric Characters");
    }

    private logOperation(operation: string): void {
      this.operations.push(operation);
    }

    async get_results(): Promise<{ purpose: string; output: string }> {
      return {
        purpose: this.operations.join(", "),
        output: this.raw_text,
      };
    }

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
