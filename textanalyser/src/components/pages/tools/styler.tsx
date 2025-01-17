"use client";
// REACT
import * as React from "react";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// ICONS
import { ContentCopyIcon } from "@/icon";

// Toolkit
import { crazyWithFlourishOrSymbols, forward } from "@/utils/styler/styler";

/** MAIN COMPONENT **/
const StylerPage: React.FC = () => {
  /* STATE VARIABLES */
  const [inputText, setInputText] = React.useState<string>("Preview Text");
  const [fancyTexts, setFancyTexts] = React.useState<string[]>([]);
  const [count, setCount] = React.useState<number>(89);
  const [copied, setCopied] = React.useState<boolean>(false);

  /* GLOBAL FUNCTIONS AND HANDLERS */

  // FUNCTIONS
  const generateFancy = (text: string) => {
    const result = forward(text);
    const finalRes = result.split("\n\n");

    const updatedFancyTexts = finalRes.map((res, index) => res);
    for (let k = 89; k < count; k++) {
      updatedFancyTexts.push(crazyWithFlourishOrSymbols(text));
    }

    setFancyTexts(updatedFancyTexts);
  };
  const loadMore = () => {
    const newTexts: string[] = [];
    for (let i = 1; i <= 10; i++) {
      newTexts.push(crazyWithFlourishOrSymbols(inputText));
    }

    setFancyTexts((prev) => [...prev, ...newTexts]);
    setCount((prev) => prev + 10);
  };

  // HANDLERs
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const text = value === "" ? "Preview Text" : value;
    setInputText(text);
    generateFancy(text);
  };

  return (
    <div></div>
    <div className="container items-center justify-center px-12">
      {/* Input Field */}
      <input
        type="text"
        className="fancytext bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type your text here"
      />

      {/* Fancy Text Outputs */}
      <div id="result">
        {fancyTexts.map((fancyText, index) => (
          <div className="input flex mb-2" key={index}>
            <input
              type="text"
              className={`bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed text-${index}`}
              value={fancyText}
              readOnly
            />
            <button
              type="button"
              className="copybutton text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ml-2"
              onClick={() => handleCopy(fancyText)}
            >
              <i className="fas fa-copy">&nbsp;</i>Copy
            </button>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <button
        type="button"
        className="loadmore text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
        onClick={loadMore}
      >
        Load More
      </button>
    </div>
  );
};


export default StylerPage;