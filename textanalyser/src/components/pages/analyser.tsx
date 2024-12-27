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

// PRISMJS
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/autolinker/prism-autolinker";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";

// ANALYSER
import { Tools } from "@/utils/analyser";

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
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  const tabHandler = (event: React.SyntheticEvent, newValue: string) => {
    setTabNo(newValue);
  };

  // MAIN ANALYSER FUNCTION
  const Examine = async () => {
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
    const _res = await AnalyserEngine.main();
    setPurpose(_res["purpose"]);
    setOutput(_res["output"]);
    setOutputCharacaterCount(_res["metadata"]["characterCount"]);
    setOutputAlphabetCount(_res["metadata"]["alphabetCount"]);
    setOutputNumericCount(_res["metadata"]["numericCount"]);
    setOutputURL(_res["metadata"]["url"]);
  };

  React.useEffect(() => {
    Prism.highlightAll();
  }, [output]);

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
          <h5>Output:</h5>
          <pre className="line-numbers autolinker">
            <code className="language-c">
              {output}
            </code>
          </pre>
          <br />
          {outputurl && <><h5>Extracted URL:</h5><pre className="autolinker"><code className="language-c">{outputurl}</code></pre></>}
        </Box>
      </Container>
    </div>
  );
}
