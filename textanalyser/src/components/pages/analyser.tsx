"use client";
// REACT
import * as React from "react";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Switch from "@mui/material/Switch";

// ICONS
import { DoneIcon } from "@/icon";

// ANALYSER
import { Tools } from "@/utils/analyser";

// Showcase code
import ShowCaseCode from "./code";

// PRISM Wrapper

// PRISMJS
import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/components/prism-typescript";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/autolinker/prism-autolinker";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import PRISMWrapper from "@/utils/prismwrapper";

// MAIN COMPONENT
export default function AnalyserPage() {
  /** THE PRESETS **/

  // MUI TABS
  const [tabNo, setTabNo] = React.useState<string>("1");

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

  // DATA INTERFACE
  interface Data {
    removealpha: boolean;
    removenum: boolean;
    removepunc: boolean;
    removespecialchar: boolean;
    fullcaps: boolean;
    lowercaps: boolean;
    extraspaceremover: boolean;
    newlineremover: boolean;
    extractUrls: boolean;
    charcount: boolean;
    alphacount: boolean;
    numcount: boolean;
    alphanumericcount: boolean;
  }

  // OPERATIONS
  const [data, setData] = React.useState<Data>({
    removealpha: false,
    removenum: false,
    removepunc: false,
    removespecialchar: false,
    fullcaps: false,
    lowercaps: false,
    extraspaceremover: false,
    newlineremover: false,
    extractUrls: false,
    charcount: false,
    alphacount: false,
    numcount: false,
    alphanumericcount: false,
  });

  // HANDLERS
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setExamString(e.target.value);
  };

  const operationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, checked } = e.target;
    if (name === "extractUrls" && checked) {
      // If extractUrls is toggled on, disable other options
      setData({
        removealpha: false,
        removenum: false,
        removepunc: false,
        removespecialchar: false,
        fullcaps: false,
        lowercaps: false,
        extraspaceremover: false,
        newlineremover: false,
        extractUrls: true,
        charcount: false,
        alphacount: false,
        numcount: false,
        alphanumericcount: false,
      });
    } else {
      // Otherwise, update the specific option
      setData({ ...data, [name]: checked });
    }
  };
  const tabHandler = (event: React.SyntheticEvent, newValue: string) => {
    setTabNo(newValue);
  };

  const wrapText = (text: string) => {
    const wrapped_text: string = Array.from(examString)
      .map((char) => `{'${char}'}`)
      .join("");
    return wrapped_text;
  };
  // MAIN ANALYSER FUNCTION
  const Examine = async () => {

    /** BASIC ENGINE */
    const AnalyserEngine = new Tools.Analyser(examString, {
      removealpha: data.removealpha,
      removenum: data.removenum,
      removepunc: data.removepunc,
      removespecialchar: data.removespecialchar,
      fullcaps: data.fullcaps,
      lowercaps: data.lowercaps,
      extraspaceremover: data.extraspaceremover,
      newlineremover: data.newlineremover,
      extractUrls: data.extractUrls,
      charcount: data.charcount,
      alphacount: data.alphacount,
      numcount: data.numcount,
      alphanumericcount: data.alphanumericcount,
    });

    /** CUSTOM OPERATIONS */
    AnalyserEngine.addCustomOperation("wrapText", "Wrapped Text", (text)=> wrapText(text))
    AnalyserEngine.toggleOperation("wrapText", true);

    /** RESULT */
    const _res = await AnalyserEngine.main();
    setOutput(_res["output"]);
    setPurpose(_res["purpose"]);
    setOutputCharacaterCount(_res["metadata"]["characterCount"]);
    setOutputAlphabetCount(_res["metadata"]["alphabetCount"]);
    setOutputNumericCount(_res["metadata"]["numericCount"]);
    setOutputURL(_res["metadata"]["url"]);
  };

  React.useEffect(() => {
    Prism.highlightAll();
  }, [
    output,
    outputurl,
    outputalphabetCount,
    outputcharacterCount,
    outputnumericCount,
  ]);

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
            multiline
          />

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={tabNo}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={tabHandler}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    icon={
                      <Chip
                        size={"small"}
                        color="primary"
                        label="Beta Phase (TBA)"
                      />
                    }
                    iconPosition="end"
                    label="Basic Operations"
                    value="1"
                    wrapped
                  />
                  <Tab
                    icon={
                      <Chip
                        icon={<DoneIcon />}
                        color="secondary"
                        label="Verified"
                      />
                    }
                    iconPosition="end"
                    label="Counting Characters"
                    value="2"
                  />
                  <Tab
                    icon={
                      <Chip
                        icon={<DoneIcon />}
                        color="secondary"
                        label="Verified"
                      />
                    }
                    iconPosition="end"
                    label="Change Caps"
                    value="3"
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <FormControl component="fieldset" variant="standard">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={data.removealpha}
                          onChange={operationHandler}
                          name="removealpha"
                          disabled={data.extractUrls}
                        />
                      }
                      label="Remove Alphabets"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={data.removenum}
                          onChange={operationHandler}
                          name="removenum"
                          disabled={data.extractUrls}
                        />
                      }
                      label="Remove Numbers"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={data.removepunc}
                          onChange={operationHandler}
                          name="removepunc"
                          disabled={data.extractUrls}
                        />
                      }
                      label="Remove Punctuations"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={data.removespecialchar}
                          onChange={operationHandler}
                          name="removespecialchar"
                          disabled={data.extractUrls}
                        />
                      }
                      label="Remove Special Characters"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={data.newlineremover}
                          onChange={operationHandler}
                          name="newlineremover"
                          disabled={data.extractUrls}
                        />
                      }
                      label="Remove Extra Lines"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={data.extraspaceremover}
                          onChange={operationHandler}
                          name="extraspaceremover"
                          disabled={data.extractUrls}
                        />
                      }
                      label="Remove Extra Spaces"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={data.extractUrls}
                          onChange={operationHandler}
                          name="extractUrls"
                        />
                      }
                      label="Extract URLs"
                    />
                  </FormGroup>
                </FormControl>
              </TabPanel>
              <TabPanel value="2">
                <FormControl component="fieldset" variant="standard">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={data.charcount}
                          onChange={operationHandler}
                          name="charcount"
                          disabled={data.extractUrls}
                        />
                      }
                      label="Count Characters"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={data.alphacount}
                          onChange={operationHandler}
                          name="alphacount"
                          disabled={data.extractUrls}
                        />
                      }
                      label="Count Alphabets"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={data.numcount}
                          onChange={operationHandler}
                          name="numcount"
                          disabled={data.extractUrls}
                        />
                      }
                      label="Count Numbers"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={data.alphanumericcount}
                          onChange={operationHandler}
                          name="alphanumericcount"
                          disabled={data.extractUrls}
                        />
                      }
                      label="Count Alphabets and Numbers"
                    />
                  </FormGroup>
                </FormControl>
              </TabPanel>
              <TabPanel value="3">
                <FormControl component="fieldset" variant="standard">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={data.fullcaps}
                          onChange={operationHandler}
                          name="fullcaps"
                          disabled={data.extractUrls}
                        />
                      }
                      label="Turn to Uppercase"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={data.lowercaps}
                          onChange={operationHandler}
                          name="lowercaps"
                          disabled={data.extractUrls}
                        />
                      }
                      label="Turn to Lowercase"
                    />
                  </FormGroup>
                </FormControl>
              </TabPanel>
            </TabContext>
          </Box>
          <Button variant="contained" onClick={Examine}>
            Analyse
          </Button>

          {output && (
            <>
              <h2>Output:</h2>
              <p>
                <b>Operations Performed:</b> {purpose}
              </p>
              <pre className="language-c line-numbers">
                <code>{output}</code>
              </pre>
            </>
          )}
          <br />
          {outputurl && (
            <div>
              <p>
                <b>Extracted URL:</b>
              </p>
              <pre className="language-c line-numbers">
                <code>{`🔗: ${outputurl}`}</code>
              </pre>
            </div>
          )}
          <br />
          <PRISMWrapper key={"output"}>
            <h5>Source Code:</h5>
            <ShowCaseCode />
          </PRISMWrapper>
        </Box>
      </Container>
    </div>
  );
}
