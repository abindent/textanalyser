"use client";
// REACT
import * as React from "react";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

// ICONS
import { ContentCopyIcon } from "@/icon";

// Toolkit
import { crazyWithFlourishOrSymbols, forward } from "@/utils/styler/styler";

/** MAIN COMPONENT */
const StylerPage: React.FC = () => {
  /* STATE VARIABLES */
  const [debouncedInputText, setDebouncedInputText] =
    React.useState<string>("Preview Text");
  const [fancyTexts, setFancyTexts] = React.useState<string[]>([]);
  const [copiedStates, setCopiedStates] = React.useState<Set<number>>(
    new Set()
  ); // Array to track "Copied" state for each text
  const [count, setCount] = React.useState<number>(0);

  /* GLOBAL FUNCTIONS AND HANDLERS */

  /* FUNCTIONS */
  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const generateFancy = (text: string) => {
    if (!text.trim()) {
      setFancyTexts([]);
      return;
    }

    const result = forward(text);
    const finalRes = result.split("\n\n");

    const updatedFancyTexts = finalRes.map((res) => res);
    for (let k = 1; k < count; k++) {
      updatedFancyTexts.push(crazyWithFlourishOrSymbols(text));
    }

    setFancyTexts(updatedFancyTexts);
    setCopiedStates(new Set()); // Reset copied states.
  };

  const debouncedGenerateFancy = React.useCallback(
    debounce((text: string) => generateFancy(text), 300),
    []
  );

  const loadMore = () => {
    const newTexts: string[] = [];
    for (let i = 1; i <= 10; i++) {
      newTexts.push(crazyWithFlourishOrSymbols(debouncedInputText));
    }

    setFancyTexts((prev) => [...prev, ...newTexts]);
    setCount((prev) => prev + 10);
  };

  const handleCopy = (textIndex: number) => {
    navigator.clipboard
      .writeText(fancyTexts[textIndex])
      .then(() => {
        setCopiedStates((prevStates) => {
          const updatedStates = new Set(prevStates);
          updatedStates.add(textIndex);
          return updatedStates;
        });

        // Reset the "Copied" state after 3 seconds
        setTimeout(() => {
          setCopiedStates((prevStates) => {
            const updatedStates = new Set(prevStates);
            updatedStates.delete(textIndex);
            return updatedStates;
          });
        }, 1700);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDebouncedInputText(value); // Update the input value immediately
    debouncedGenerateFancy(value); // Generate fancy texts with debounce
  };

  /* COMPONENTS */
  const FancyTextOutput: React.FC<{
    text: string;
    index: number;
    isCopied: boolean;
    onCopy: (index: number) => void;
  }> = ({ text, index, isCopied, onCopy }) => (
    <div style={{ marginTop: "1.5rem" }} key={index}>
      <TextField
        variant="filled"
        value={text}
        sx={{ width: "89%" }}
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />
      <Button
        variant="contained"
        startIcon={isCopied ? <></> : <ContentCopyIcon />}
        onClick={() => onCopy(index)}
        disabled={isCopied}
      >
        {isCopied ? "Copied!" : "Copy"}
      </Button>
    </div>
  );
  /* USEEFFECT */
  React.useEffect(() => {
    if (debouncedInputText === "Preview Text") {
      generateFancy(debouncedInputText);
    }
  }, [debouncedInputText]);

  /* JSX RENDER */
  return (
    <Container
      sx={(theme) => ({
        width: "100%",
        height: "100%",
        marginTop: theme.spacing(12),
        marginBottom: theme.spacing(12),
      })}
    >
      <TextField
        required
        fullWidth
        id="fancytext"
        value={debouncedInputText}
        onChange={handleInputChange}
        onChangeCapture={handleInputChange}
        label="Your Text"
      />
      {/* Fancy Text Outputs */}
      <div id="result">
        <Box
          sx={{
            width: "89%",
            justifyContent: "center",
          }}
          component="form"
          noValidate
        >
          {fancyTexts.map((fancyText, index) => (
            <FancyTextOutput
              key={index}
              text={fancyText}
              index={index}
              isCopied={copiedStates.has(index)}
              onCopy={handleCopy}
            />
          ))}
        </Box>
      </div>
      <Box sx={{ marginTop: "2rem" }}>
        <Button
          variant="contained"
          onClick={loadMore}
          disabled={count >= 100} // Disable when count reaches or exceeds limit
        >
          {count >= 100
            ? `No More to Load.`
            : `Load More (${fancyTexts.length} generated)`}
        </Button>
      </Box>
    </Container>
  );
};

export default StylerPage;
