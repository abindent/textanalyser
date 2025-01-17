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

/** MAIN COMPONENT **/
const StylerPage: React.FC = () => {
  /* STATE VARIABLES */
  const [inputText, setInputText] = React.useState<string>("Preview Text");
  const [fancyTexts, setFancyTexts] = React.useState<string[]>([]);
  const [copiedStates, setCopiedStates] = React.useState<boolean[]>([]); // Array to track "Copied" state for each text
  const [count, setCount] = React.useState<number>(89);

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
    setCopiedStates(new Array(updatedFancyTexts.length).fill(false)); // Initialize copied states
  };
  const loadMore = () => {
    const newTexts: string[] = [];
    for (let i = 1; i <= 10; i++) {
      newTexts.push(crazyWithFlourishOrSymbols(inputText));
    }

    setFancyTexts((prev) => {
      const updatedTexts = [...prev, ...newTexts];
      setCopiedStates((prevStates) => [
        ...prevStates,
        ...new Array(newTexts.length).fill(false),
      ]); // Update copied states
      return updatedTexts;
    });

    setCount((prev) => prev + 10);
  };

  // HANDLERs
  const handleCopy = (textIndex: number) => {
    navigator.clipboard
      .writeText(fancyTexts[textIndex])
      .then(() => {
        setCopiedStates((prevStates) => {
          const updatedStates = [...prevStates];
          updatedStates[textIndex] = true;
          return updatedStates;
        });

        // Reset the "Copied" state after 3 seconds
        setTimeout(() => {
          setCopiedStates((prevStates) => {
            const updatedStates = [...prevStates];
            updatedStates[textIndex] = false;
            return updatedStates;
          });
        }, 1700);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const text = value;
    setInputText(text);
    generateFancy(text);
  };

  React.useEffect(() => {
    if (inputText === "Preview Text") {
      generateFancy(inputText);
    }
  }, [inputText]);

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
        id="examString"
        value={inputText}
        onChange={handleInputChange}
        onInputCapture={handleInputChange}
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
          {fancyTexts.map((fancyText, index) => {
            return (
              <div style={{ marginTop: "10px" }} key={index}>
                <TextField
                  variant="filled"
                  value={fancyText}
                  sx={{ width: "89%" }}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => handleCopy(index)} // Use index to update copied state
                  disabled={copiedStates[index]} // Prevent repeated clicks during timeout
                >
                  {copiedStates[index] ? "Copied!" : "Copy"}
                </Button>
              </div>
            );
          })}
        </Box>
      </div>
      <Box sx={{ marginTop: "2rem" }}>
        <Button variant="contained" onClick={loadMore}>
          Load More
        </Button>
      </Box>
      <br />
    </Container>
  );
};

export default StylerPage;
