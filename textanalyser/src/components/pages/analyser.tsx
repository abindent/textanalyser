"use client";
// REACT
import * as React from "react";

// MUI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

// ANALYSER
import { Tools } from "@/utils/analyser";

// TEST
export default function AnalyserPage() {
  /** THE PRESETS **/

  // INPUT AND OUTPUT
  const [examString, setExamString] = React.useState<string>("Hello World");
  const [output, setOutput] = React.useState<string | undefined | null>("");
  const [purpose, setPurpose] = React.useState<string | undefined | null>("");
  const [outputcharacterCount, setOutputCharacaterCount] = React.useState<
    number | undefined | null
  >(0);
  const [outputalphabetCount, setOutputAlphabetCount] = React.useState<
    number | undefined | null
  >(0);
  const [outputnumericCount, setOutputNumericCount] = React.useState<
    number | undefined | null
  >(0);
  const [outputurl, setOutputURL] = React.useState<string | undefined | null>(
    ""
  );

  // OPERATIONS
  const [removealpha, setRemoveAlpha] = React.useState<boolean>(false);
  const [removenum, setRemoveNum] = React.useState<boolean>(false);
  const [removepunc, setRemovePunc] = React.useState<boolean>(false);
  const [removespecialchar, setRemoveSpecialChar] =
    React.useState<boolean>(false);
  const [fullcaps, setFullCaps] = React.useState<boolean>(false);
  const [lowercaps, setLowerCaps] = React.useState<boolean>(false);
  const [extraspaceremover, setExtraSpaceRemover] =
    React.useState<boolean>(false);
  const [newlineremover, setNewLineRemover] = React.useState<boolean>(false);
  const [extractUrls, setExtractUrls] = React.useState<boolean>(false);
  const [charcount, setCharCount] = React.useState<boolean>(false);
  const [alphacount, setAlphaCount] = React.useState<boolean>(false);
  const [numcount, setNumCount] = React.useState<boolean>(false);
  const [alphanumericcount, setAlphaNumericCount] =
    React.useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setExamString(e.target.value);
  };

  const Examine = async (text: string) => {
    const AnalyserEngine = new Tools.Analyser(text, {
      removealpha: removealpha,
      removenum: removenum,
      removepunc: removepunc,
      removespecialchar: removespecialchar,
      fullcaps: fullcaps,
      lowercaps: lowercaps,
      extraspaceremover: extraspaceremover,
      newlineremover: newlineremover,
      extractUrls: extractUrls,
      charcount: charcount,
      alphacount: alphacount,
      numcount: numcount,
      alphanumericcount: alphanumericcount,
    });
    const _res = await AnalyserEngine.main();
    setOutput(_res["output"]);
  };

  return (
    <div>
      <Container
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          marginTop: theme.spacing(12),
          backgroundImage:
            theme.palette.mode === "light"
              ? "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)"
              : `radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)`,
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
        })}
      >
        <Box component="form" noValidate>
          <TextField
            required
            fullWidth
            id="examString"
            value={examString}
            onChange={changeHandler}
            onInputCapture={changeHandler}
            label="Your Text"
            rows={"12"}
            maxRows={"20"}
            multiline
          />
        </Box>
      </Container>
    </div>
  );
}
