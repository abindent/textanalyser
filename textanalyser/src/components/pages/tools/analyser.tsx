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
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";

// ICONS
import { BiotechIcon, DoneIcon } from "@/icon";

// ANALYSER
import { Tools } from "@/utils/analyser";

// PRISM Wrapper

// PRISMJS
import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/components/prism-typescript";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/autolinker/prism-autolinker";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";

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
    wrapText: boolean;
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
    wrapText: false,
  });

  // BUTTON STATE
  const isButtonDisabled = !Object.values(data).some((value) => value);

  // TABPANELS
  const FormatData = {
    basicoperations: {
      removealpha: {
        label: "Remove Alphabets",
        checked: data.removealpha,
        name: "removealpha",
        disabled: data.extractUrls,
      },
      removenum: {
        label: "Remove Numbers",
        checked: data.removenum,
        name: "removenum",
        disabled: data.extractUrls,
      },
      removepunc: {
        label: "Remove Punctuations",
        checked: data.removepunc,
        name: "removepunc",
        disabled: data.extractUrls,
      },
      removespecialchar: {
        label: "Remove Special Characters",
        checked: data.removespecialchar,
        name: "removespecialchar",
        disabled: data.extractUrls,
      },
      newlineremover: {
        label: "Remove Extra Lines",
        checked: data.newlineremover,
        name: "newlineremover",
        disabled: data.extractUrls,
      },
      extraspaceremover: {
        label: "Remove Extra Spaces",
        checked: data.extraspaceremover,
        name: "extraspaceremover",
        disabled: data.extractUrls,
      },
      extractUrls: {
        label: "Extract URLs",
        checked: data.extractUrls,
        name: "extractUrls",
        disabled: false,
      },
      wrapText: {
        label:
          "Wrap Text (wrap codes for enabling them to be used as a text node.)",
        checked: data.wrapText,
        name: "wrapText",
        disabled: data.extractUrls,
      },
    },
    countchar: {
      charcount: {
        label: "Count Characters",
        checked: data.charcount,
        name: "charcount",
        disabled: data.extractUrls,
      },
      alphacount: {
        label: "Count Alphabets",
        checked: data.alphacount,
        name: "alphacount",
        disabled: data.extractUrls,
      },
      numcount: {
        label: "Count Numbers",
        checked: data.numcount,
        name: "numcount",
        disabled: data.extractUrls,
      },
      alphanumericcount: {
        label: "Count Alphabets and Numbers",
        checked: data.alphanumericcount,
        name: "alphanumericcount",
        disabled: data.extractUrls,
      },
    },
    changecap: {
      fullcaps: {
        label: "Turn to Uppercase",
        checked: data.fullcaps,
        name: "fullcaps",
        disabled: data.extractUrls,
      },
      lowercaps: {
        label: "Turn to Lowercase",
        checked: data.lowercaps,
        name: "lowercaps",
        disabled: data.extractUrls,
      },
    },
  };

  const renderSwitches = (data: any) => {
    return (
      <FormGroup>
        {Object.keys(data).map((key) => {
          const { label, checked, name, disabled } = data[key];
          return (
            <FormControlLabel
              key={name}
              control={
                <Switch
                  checked={checked}
                  onChange={operationHandler}
                  name={name}
                  disabled={disabled}
                />
              }
              label={label}
            />
          );
        })}
      </FormGroup>
    );
  };

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
        wrapText: false,
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
    const wrapped_text: string = Array.from(text)
      .map((char) => (char === "'" ? `{"'"}` : `{'${char}'}`))
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
    await AnalyserEngine.addCustomOperation(
      "wrapText",
      "Wrapped Text",
      (text) => wrapText(text)
    );
    if (data.wrapText) {
      await AnalyserEngine.toggleOperation("wrapText", data.wrapText);
    }

    /** RESULT */
    const _res = await AnalyserEngine.main();
    if (_res["output"].length > 0) {
      setOutput(_res["output"]);
    } else {
      setOutput("Null Output");
    }
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
              : "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
          borderRadius: theme.shape.borderRadius,
          transition: "all 0.3s ease-in-out",
        })}
      >
        <Typography
          variant="h3"
          align="center"
          fontWeight={"250"}
          justifyContent={"center"}
          marginBottom={"1.75rem"}
        >
          Text Analyser
        </Typography>
        <Box component="form" noValidate>
          <TextField
            required
            fullWidth
            id="examString"
            value={examString}
            onChange={changeHandler}
            onInputCapture={changeHandler}
            label="Your Text"
            slotProps={{
              inputLabel: {
                sx: {
                  marginTop: { sm: "6px", md: "4px" },
                },
              },
            }}
            rows={"12"}
            multiline
          />

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={tabNo}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={tabHandler}
                  aria-label="lab API tabs example"
                  variant="scrollable"
                  selectionFollowsFocus
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
                  {renderSwitches(FormatData["basicoperations"])}
                </FormControl>
              </TabPanel>
              <TabPanel value="2">
                <FormControl component="fieldset" variant="standard">
                  {renderSwitches(FormatData["countchar"])}
                </FormControl>
              </TabPanel>
              <TabPanel value="3">
                <FormControl component="fieldset" variant="standard">
                  {renderSwitches(FormatData["changecap"])}
                </FormControl>
              </TabPanel>
            </TabContext>
          </Box>
          <Button
            variant="contained"
            onClick={Examine}
            startIcon={<BiotechIcon />}
            disabled={isButtonDisabled}
          >
            Analyse
          </Button>

          {output && (
            <div>
              <Typography variant="h4" fontWeight={"300"}>Output:</Typography>
              <Typography variant="inherit"  fontWeight={"500"} marginBottom={"0.75rem"}>
                Operations Performed:
              </Typography>
              <Typography variant="kbd" marginBottom={"0.75rem"}>{purpose}</Typography>
              <pre className="language-c line-numbers">
                <code>{output}</code>
              </pre>
            </div>
          )}
          <br />
          {outputurl && (
            <div>
              <Typography variant="inherit" marginBottom={"0.75rem"} fontWeight={"500"}>Extracted URL:</Typography>
              <pre className="language-c line-numbers">
                <code>{`🔗: ${outputurl}`}</code>
              </pre>
            </div>
          )}
        </Box>
      </Container>
    </div>
  );
}
