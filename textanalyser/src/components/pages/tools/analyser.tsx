"use client";
// REACT
import * as React from "react";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid2";
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
import esrever from "esrever";
import { Tools } from "@/utils/analyser";

// PRISM Wrapper

// PRISMJS
import Prism from "prismjs";
import "prismjs/components/prism-c";
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
  const [analysis, setAnalysis] = React.useState<AnalysisData>({
    output: "",
    purpose: "",
    stats: {
      count: {
        characters: 0,
        alphabets: 0,
        numbers: 0,
      },
      url: "",
    },
  });

  const [typingTest, setTypingTest] = React.useState<TypingStats>({
    startTime: null,
    endTime: null,
    wpm: 0,
  });

  const [additionalData, setAdditionalData] = React.useState<AdditionalData>({
    readTime: "Not Calculated",
    word_count: examString.split(/\s+/).filter(Boolean).length,
  });

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
    reverseText: boolean;
  }

  interface AnalysisData {
    output: string;
    purpose: string;
    stats: {
      count: {
        characters: number;
        alphabets: number;
        numbers: number;
      };
      url: string;
    };
  }

  interface AdditionalData {
    readTime: string;
    word_count: number;
  }

  interface TypingStats {
    startTime: number | null;
    endTime: number | null;
    wpm: number;
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
    reverseText: false,
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
      reverseText: {
        label: "Reverse Text",
        checked: data.reverseText,
        name: "reverseText",
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

  // Calculate Read Time
  const calculateReadTime = (text: string): string => {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.floor(wordCount / wordsPerMinute);
    const seconds = Math.floor(
      (wordCount % wordsPerMinute) / (wordsPerMinute / 60)
    );

    if (minutes === 0 && seconds === 0) return "Less than a second";
    if (minutes === 0) return `${seconds} seconds`;
    if (seconds === 0) return `${minutes} min`;

    return `${minutes} min ${seconds} sec`;
  };

  // Calculate Typing Speed
  const calculateTypingStats = (input: string) => {
    if (!typingTest.startTime || input.length === 0) {
      return { wpm: 0 };
    }
    const elapsedTime = (typingTest.endTime! - typingTest.startTime!) / 60000; // Convert to minutes

    if (elapsedTime < 0.05) return 0;

    const wpm = Math.round(input.length / 5 / elapsedTime); // Assuming 5 characters per word

    return { wpm: isFinite(wpm) ? wpm : 0 };
  };

  // Render Function to Generate Switches for those Utilities
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
  const typingTestHandler = (input: string) => {
    if (!typingTest.startTime) {
      setTypingTest((prev) => ({
        ...prev,
        startTime: Date.now(),
      }));
    }

    setTypingTest((prev) => ({
      ...prev,
      endTime: Date.now(),
      ...calculateTypingStats(input),
    }));
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    // Input Text
    const inputText: string = e.target.value;
    setExamString(inputText);
    typingTestHandler(inputText);
    setAdditionalData({
      readTime: calculateReadTime(examString),
      word_count: examString.split(/\s+/).filter(Boolean).length,
    });
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
        reverseText: false,
      });
    } else {
      // Otherwise, update the specific option
      setData({ ...data, [name]: checked });
    }
  };
  const tabHandler = (event: React.SyntheticEvent, newValue: string) => {
    setTabNo(newValue);
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
      "reverseText",
      "Reversed Text",
      (text) => esrever.reverse(text)
    );

    if (data.reverseText) {
      await AnalyserEngine.toggleOperation("reverseText", data.reverseText);
    }

    /** RESULT */
    const result = await AnalyserEngine.main();

    try {
      setAnalysis({
        output: result.output || "Null Output",
        purpose: result.purpose || "No Operations have been Performed",
        stats: {
          count: {
            characters: result.metadata.characterCount,
            alphabets: result.metadata.alphabetCount,
            numbers: result.metadata.numericCount,
          },
          url: result.metadata.url,
        },
      });
      setAdditionalData({
        readTime: calculateReadTime(result.output),
        word_count: result.output.split(/\s+/).filter(Boolean).length,
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysis((prev) => ({
        ...prev,
        output: "Error occurred during analysis",
      }));
    }
  };

  React.useEffect(() => {
    Prism.highlightAll();
  }, [analysis.output]);

  return (
    <div>
      <Container
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          marginTop: theme.spacing(12),
          marginBottom: theme.spacing(10),
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

          {analysis.output && (
            <Box marginTop="2rem">
              <Typography variant="h4" fontWeight="500" marginBottom="1rem">
                Analysis Results:
              </Typography>
              <Typography
                variant="inherit"
                fontWeight={"500"}
                marginBottom={"0.75rem"}
              >
                Operations Performed:
              </Typography>
              <Typography variant="kbd" marginBottom={"0.75rem"}>
                {analysis.purpose}
              </Typography>
              <pre className="language-c line-numbers">
                <code>{analysis.output}</code>
              </pre>

              {analysis.stats.url && (
                <Grid size={{ xs: 12 }}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant="h6" color="primary" fontWeight="600">
                        Extracted URL
                      </Typography>
                      <Typography variant="body1">
                        <pre className="language-c line-numbers">
                          <code>{`🔗: ${analysis.stats.url}`}</code>
                        </pre>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Box>
          )}
          <br />
          <Grid container spacing={2} marginTop={"0.75rem"}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="primary" fontWeight="600">
                    Character Count
                  </Typography>
                  <Typography variant="h5">
                    {analysis.stats.count.characters}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="primary" fontWeight="600">
                    Numeric Count
                  </Typography>
                  <Typography variant="h5">
                    {analysis.stats.count.numbers}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="primary" fontWeight="600">
                    Alphabet Count
                  </Typography>
                  <Typography variant="h5">
                    {analysis.stats.count.alphabets}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Typography variant="caption" color={"text.secondary"}>
            <b>
              <u>
                <i>Caution:</i>
              </u>
            </b>
            {"\u00A0"}
            The above options get only affected by analyser functions. In
            simpler words these datas are derived when "<b>ANALYSE</b>" button
            is pressed.
          </Typography>
          <Grid container spacing={2} marginTop={"0.75rem"}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="primary" fontWeight="600">
                    Word Count
                  </Typography>
                  <Typography variant="h5">
                    {additionalData.word_count}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="primary" fontWeight={600}>
                    Read Time
                  </Typography>
                  <Typography variant="h5">
                    {additionalData.readTime}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="primary" fontWeight={600}>
                    Words Per Minute
                  </Typography>
                  <Typography variant="h5">{typingTest.wpm}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Typography variant="caption" color={"text.secondary"}>
            <b>
              <u>
                <i>Caution:</i>
              </u>
            </b>
            {"\u00A0"}
            The above options are synced to the input field, and won't be
            affected by analyser functions.
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
