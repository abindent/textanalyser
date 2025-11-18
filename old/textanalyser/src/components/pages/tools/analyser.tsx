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
import Divider from "@mui/material/Divider";
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
import {
  BiotechIcon,
  DoneIcon,
  CategoryIcon,
  EmojiEmotionsIcon,
  PercentIcon,
} from "@/icon";

// ANALYSER
import { Tools } from "textanalysis-tool";

// PRISM Wrapper

// PRISMJS
import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/autolinker/prism-autolinker";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";

// EMOJI METADATA
interface EmojiAnalysisProps {
  metadata: {
    totalEmojis?: number;
    uniqueEmojis?: string[];
    uniqueEmojiCount?: number;
    emojiCategories?: {
      nature?: number;
      objects?: number;
      symbols?: number;
    };
    emojiDensity?: number;
  };
}
const EmojiAnalysisDisplay: React.FC<EmojiAnalysisProps> = ({ metadata }) => {
  // Only render if there are emojis
  if (!metadata.totalEmojis || metadata.totalEmojis === 0) {
    return null;
  }

  return (
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography
            variant="h6"
            color="primary"
            fontWeight="600"
            gutterBottom
            display="flex"
            alignItems="center"
            gap={1}
            component={"div"}
          >
            <EmojiEmotionsIcon color="primary" />
            Emoji Analysis
          </Typography>

          {/* Emoji Overview */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body1" component={"div"}>
              Total Emojis:
              <Chip
                label={metadata.totalEmojis}
                color="primary"
                size="small"
                sx={{ ml: 1 }}
              />
            </Typography>
            <Typography variant="body1" component={"div"}>
              Unique Emojis:
              <Chip
                label={metadata.uniqueEmojiCount}
                color="secondary"
                size="small"
                sx={{ ml: 1 }}
              />
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Emoji Breakdown */}
          <Typography
            variant="subtitle1"
            color="text.secondary"
            display="flex"
            alignItems="center"
            gap={1}
            mb={1}
          >
            <CategoryIcon fontSize="small" />
            Emoji Categories
          </Typography>

          <Grid container spacing={1}>
            {Object.entries(metadata.emojiCategories || {}).map(
              ([category, count]) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={category}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: "center", py: 1 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        textTransform="capitalize"
                      >
                        {category}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        {count}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            )}
          </Grid>

          {/* Emoji Density */}
          <Box
            mt={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="subtitle1"
              color="text.secondary"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <PercentIcon fontSize="small" />
              Emoji Density
            </Typography>
            <Typography variant="h6" color="secondary">
              {metadata.emojiDensity?.toFixed(2)}%
            </Typography>
          </Box>

          {/* Unique Emojis Display */}
          <Box mt={2}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Unique Emojis
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {metadata.uniqueEmojis?.map((emoji, index) => (
                <Chip
                  key={index}
                  label={emoji}
                  variant="outlined"
                  size="medium"
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
// MAIN COMPONENT
export default function AnalyserPage() {
  /** THE PRESETS **/

  // MUI TABS
  const [tabNo, setTabNo] = React.useState<string>("1");

  // OUTPUT INITIALIZATION
  const initialResult: AnalysisData = {
    purpose: "",
    output: "",
    operations: [],
    builtInOperations: [],
    customOperations: [],
    metadata: {
      counts: {
        characterCount: 0,
        alphabetCount: 0,
        numericCount: 0,
        wordCount: 0,
        sentenceCount: 0,
      },
      urls: [],
      emails: [],
      phoneNumbers: [],
      hashtags: [],
      mentions: [],
      custom: [],
    },
    executionTime: 0,
  };

  // INPUT AND OUTPUT
  const [examString, setExamString] = React.useState<string>("Hello World");
  const [analysis, setAnalysis] = React.useState<AnalysisData>(initialResult);

  const [typingTest, setTypingTest] = React.useState<TypingStats>({
    startTime: null,
    endTime: null,
    wpm: 0,
  });

  const [readTime, setReadTime] = React.useState<string>("Not Calculated");

  // DATA INTERFACE
  interface Data {
    removealpha: boolean;
    removenum: boolean;
    removepunc: boolean;
    removespecialchar: boolean;
    fullcaps: boolean;
    titlecaps: boolean;
    lowercaps: boolean;
    extraspaceremover: boolean;
    newlineremover: boolean;
    extractUrls: boolean;
    charcount: boolean;
    alphacount: boolean;
    numcount: boolean;
    alphanumericcount: boolean;
    wordcount: boolean;
    sentencecount: boolean;
    reverseText: boolean;
    extractEmojis: boolean;
    extractMentions: boolean;
    extractEmail: boolean;
    extractHashTag: boolean;
    extractPhoneNo: boolean;
  }

  interface AnalysisData extends Tools.AnalyserResult {
    purpose: string;
    output: string;
    operations: string[];
    metadata: {
      counts: {
        characterCount: number;
        alphabetCount: number;
        numericCount: number;
        wordCount: number;
        sentenceCount: number;
      };
      urls: string[];
      emails: string[];
      phoneNumbers: string[];
      hashtags: string[];
      mentions: string[];
      custom?:
        | {
            [key: string]: any;
          }
        | undefined;
    };
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
    titlecaps: false,
    lowercaps: false,
    extraspaceremover: false,
    newlineremover: false,
    extractUrls: false,
    charcount: false,
    alphacount: false,
    numcount: false,
    alphanumericcount: false,
    wordcount: false,
    sentencecount: false,
    reverseText: false,
    extractEmojis: false,
    extractMentions: false,
    extractEmail: false,
    extractHashTag: false,
    extractPhoneNo: false,
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
      },
      removenum: {
        label: "Remove Numbers",
        checked: data.removenum,
        name: "removenum",
      },
      removepunc: {
        label: "Remove Punctuations",
        checked: data.removepunc,
        name: "removepunc",
      },
      removespecialchar: {
        label: "Remove Special Characters",
        checked: data.removespecialchar,
        name: "removespecialchar",
      },
      newlineremover: {
        label: "Remove Extra Lines",
        checked: data.newlineremover,
        name: "newlineremover",
      },
      extraspaceremover: {
        label: "Remove Extra Spaces",
        checked: data.extraspaceremover,
        name: "extraspaceremover",
      },
      extractUrls: {
        label: "Extract URLs",
        checked: data.extractUrls,
        name: "extractUrls",
      },
      extractEmail: {
        label: "Extract Emails",
        checked: data.extractEmail,
        name: "extractEmail",
      },
      extractPhone: {
        label: "Extract Phone Nos",
        checked: data.extractPhoneNo,
        name: "extractPhoneNo",
      },
      extractHasTag: {
        label: "Extract Hashtags",
        checked: data.extractHashTag,
        name: "extractHashTag",
      },
      extractEmojis: {
        label: "Extract Emoji",
        checked: data.extractEmojis,
        name: "extractEmojis",
      },
      extractMentions: {
        label: "Extract Mentions",
        checked: data.extractMentions,
        name: "extractMentions",
      },
    },
    countchar: {
      charcount: {
        label: "Count Characters",
        checked: data.charcount,
        name: "charcount",
      },
      alphacount: {
        label: "Count Alphabets",
        checked: data.alphacount,
        name: "alphacount",
      },
      numcount: {
        label: "Count Numbers",
        checked: data.numcount,
        name: "numcount",
      },
      alphanumericcount: {
        label: "Count Alphabets and Numbers",
        checked: data.alphanumericcount,
        name: "alphanumericcount",
      },
      wordccount: {
        label: "Count Words",
        checked: data.wordcount,
        name: "wordcount",
      },
      sentencecount: {
        label: "Count Sentences",
        checked: data.sentencecount,
        name: "sentencecount",
      },
    },
    changecap: {
      fullcaps: {
        label: "Turn to Uppercase",
        checked: data.fullcaps,
        name: "fullcaps",
      },
       titlecaps: {
        label: "Turn to Title Case",
        checked: data.titlecaps,
        name: "titlecaps",
      },
      lowercaps: {
        label: "Turn to Lowercase",
        checked: data.lowercaps,
        name: "lowercaps",
      },
      reverseText: {
        label: "Reverse Text",
        checked: data.reverseText,
        name: "reverseText",
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
    typingTestHandler(inputText);
    setExamString(inputText);
    setReadTime(calculateReadTime(examString));
  };

  const operationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, checked } = e.target;

    setData((prevData) => {
      if (name === "extractUrls" && checked) {
        // When extractUrls is enabled, turn off all other options
        return Object.keys(prevData).reduce((acc: any, key) => {
          acc[key] = key === "extractUrls";
          return acc;
        }, {} as typeof prevData);
      }
      // Otherwise, update the specific option
      return { ...prevData, [name]: checked };
    });
  };

  const tabHandler = (event: React.SyntheticEvent, newValue: string) => {
    setTabNo(newValue);
  };

  // MAIN ANALYSER FUNCTION
  const Examine = async () => {
    /** BASIC ENGINE */
    const AnalyserEngine = new Tools.Analyser(examString, {
      [Tools.Operations.RemoveAlphabets]: data.removealpha,
      [Tools.Operations.RemoveNumbers]: data.removenum,
      [Tools.Operations.RemovePunctuations]: data.removepunc,
      [Tools.Operations.RemoveSpecialChars]: data.removespecialchar,
      [Tools.Operations.ConvertToUppercase]: data.fullcaps,
      [Tools.Operations.ConvertToTitleCase]: data.titlecaps,
      [Tools.Operations.ConvertToLowercase]: data.lowercaps,
      [Tools.Operations.RemoveExtraSpaces]: data.extraspaceremover,
      [Tools.Operations.RemoveNewlines]: data.newlineremover,
      [Tools.Operations.ExtractUrls]: data.extractUrls,
      [Tools.Operations.CountCharacters]: data.charcount,
      [Tools.Operations.CountAlphabets]: data.alphacount,
      [Tools.Operations.CountNumbers]: data.numcount,
      [Tools.Operations.CountAlphanumeric]: data.alphanumericcount,
      [Tools.Operations.CountWords]: data.wordcount,
      [Tools.Operations.CountSentences]: data.sentencecount,
      [Tools.Operations.ReverseText]: data.reverseText,
      [Tools.Operations.ExtractMentions]: data.extractMentions,
      [Tools.Operations.ExtractEmails]: data.extractEmail,
      [Tools.Operations.ExtractHashtags]: data.extractHashTag,
      [Tools.Operations.ExtractPhoneNumbers]: data.extractPhoneNo,
    });

    /** CUSTOM OPERATION */
    await AnalyserEngine.addCustomOperation(
      "extractEmojis",
      "Extracted Emojis",
      {
        operation: (text: string) => {
          const emojiRegex =
            /[\u{1F300}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;

          const emojis = text.match(emojiRegex) || [];

          if (emojis.length > 0) {
          }

          return text;
        },
        metadata: { analysisType: "emoji-detection" },
        metadataExtractor: (text: string) => {
          // Comprehensive emoji regex
          const emojiRegex =
            /[\u{1F300}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;

          // Extract all emojis
          const emojis = text.match(emojiRegex) || [];

          // Count unique emojis
          const uniqueEmojis = [...new Set(emojis)];

          // Categorize emojis (this is a simplified categorization)
          const emojiCategories = {
            nature: emojis.filter((emoji) =>
              /[\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}]/u.test(emoji)
            ),
            objects: emojis.filter((emoji) =>
              /[\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}]/u.test(emoji)
            ),
            symbols: emojis.filter((emoji) =>
              /[\u{2600}-\u{26FF}]/u.test(emoji)
            ),
          };

          return {
            totalEmojis: emojis.length,
            uniqueEmojis: uniqueEmojis,
            uniqueEmojiCount: uniqueEmojis.length,
            emojiCategories: {
              nature: emojiCategories.nature.length,
              objects: emojiCategories.objects.length,
              symbols: emojiCategories.symbols.length,
            },
            emojiDensity: (emojis.length / text.length) * 100,
          };
        },

        isEnabled: data.extractEmojis,
      }
    );

    /** RESULT */
    const result = await AnalyserEngine.main();

    const completeResult: AnalysisData = {
      ...result,
      metadata: {
        counts: {
          characterCount: result.metadata.counts.characterCount || 0,
          alphabetCount: result.metadata.counts.alphabetCount || 0,
          numericCount: result.metadata.counts.numericCount || 0,
          wordCount: result.metadata.counts.wordCount || 0,
          sentenceCount: result.metadata.counts.sentenceCount || 0,
        },
        urls: result.metadata.urls || [],
        emails: result.metadata.emails || [],
        phoneNumbers: result.metadata.phoneNumbers || [],
        hashtags: result.metadata.hashtags || [],
        mentions: result.metadata.mentions || [],
        custom: result.metadata.custom,
      },
    };

    try {
      setAnalysis(completeResult);
      setReadTime(calculateReadTime(result.output));
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
                        size={"small"}
                        color="primary"
                        label="Beta Phase (TBA)"
                      />
                    }
                    iconPosition="end"
                    label="Text Transformations"
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
            <Box
              key={analysis.executionTime || "analysis" + Date.now()}
              marginTop="2rem"
            >
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
              {analysis.builtInOperations.length > 0 && (
                <>
                  <Box key="builtInOperationsBox">
                    <Typography
                      variant="inherit"
                      fontWeight="500"
                      marginBottom="0.75rem"
                      key="builtInOperationsLabel"
                    >
                      ▶ Built In Operations:
                    </Typography>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      key={"operations_builtin_map"}
                    >
                      {analysis.builtInOperations.map((purpose, index) => (
                        <Typography
                          key={`_purposes_builtins_${index}`}
                          variant="overline"
                          marginBottom="0.75rem"
                        >
                          ● {purpose}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </>
              )}
              {analysis.customOperations.length > 0 && (
                <>
                  <Box key="customOperationsBox">
                    <Typography
                      variant="inherit"
                      fontWeight="500"
                      marginBottom="0.75rem"
                      key="customOperationsLabel"
                    >
                      ▶ Custom Operations:
                    </Typography>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      key={"operations_custom_map"}
                    >
                      {analysis.customOperations.map((purpose, index) => (
                        <Typography
                          key={`_purposes_custom_${index}`}
                          variant="overline"
                          marginBottom="0.75rem"
                        >
                          ● {purpose}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </>
              )}

              <pre className="language-c line-numbers">
                <code>{analysis.output}</code>
              </pre>

              {analysis.metadata.urls.length > 0 && (
                <Grid size={{ xs: 12 }}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant="h6" color="primary" fontWeight="600">
                        Extracted URL
                      </Typography>
                      <pre className="language-c line-numbers">
                        <code>{`🔗: ${[...analysis.metadata.urls]}`}</code>
                      </pre>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {analysis.metadata.mentions.length > 0 && (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} mb={"0.5rem"}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant="h6" color="primary" fontWeight="600">
                        Extracted Mentions
                      </Typography>
                      {analysis.metadata.mentions.map((mention, index) => (
                        <Typography
                          key={"_mentions_" + index}
                          variant="body1"
                          component="div"
                        >
                          <pre className="language-c">
                            <code>{`👤: ${mention}`}</code>
                          </pre>
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {analysis.metadata.emails.length > 0 && (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} mb={"0.5rem"}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant="h6" color="primary" fontWeight="600">
                        Extracted Emails
                      </Typography>
                      {analysis.metadata.emails.map((email, index) => (
                        <Typography
                          key={"_email_" + index}
                          variant="body1"
                          component="div"
                        >
                          <pre className="language-c">
                            <code>{`✉: ${email}`}</code>
                          </pre>
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {analysis.metadata.phoneNumbers.length > 0 && (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} mb={"0.5rem"}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant="h6" color="primary" fontWeight="600">
                        Extracted Phone Numbers
                      </Typography>
                      {analysis.metadata.phoneNumbers.map((phoneNumber, index) => (
                        <Typography
                          key={"_phone_" + index}
                          variant="body1"
                          component="div"
                        >
                          <pre className="language-c">
                            <code>{`📲: ${phoneNumber}`}</code>
                          </pre>
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {analysis.metadata.hashtags.length > 0 && (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} mb={"0.5rem"}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant="h6" color="primary" fontWeight="600">
                        Extracted Hashtags
                      </Typography>
                      {analysis.metadata.hashtags.map((hashtag, index) => (
                        <Typography
                          key={"_hash_tags_" + index}
                          variant="body1"
                          component="div"
                        >
                          <pre className="language-c">
                            <code>{`👤: ${hashtag}`}</code>
                          </pre>
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {analysis.metadata.custom?.extractEmojis &&
                Object.keys(analysis.metadata.custom?.extractEmojis).length >
                  0 && (
                  <Box marginTop="2rem" suppressHydrationWarning>
                    <EmojiAnalysisDisplay
                      key={
                        "_analysis_emoji_" +
                        Math.random() *
                          analysis.metadata.custom?.extractEmojis.length
                      } // if using a dynamic key to force remount
                      metadata={analysis.metadata.custom?.extractEmojis}
                    />
                  </Box>
                )}
            </Box>
          )}
          <br />
          <Grid container spacing={3} gap={4} marginTop={"0.75rem"}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="primary" fontWeight="600">
                    Character Count
                  </Typography>
                  <Typography variant="h5">
                    {analysis.metadata.counts.characterCount}
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
                    {analysis.metadata.counts.numericCount}
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
                    {analysis.metadata.counts.alphabetCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="primary" fontWeight="600">
                    Word Count
                  </Typography>
                  <Typography variant="h5">
                    {analysis.metadata.counts.wordCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="primary" fontWeight="600">
                    Sentence Count
                  </Typography>
                  <Typography variant="h5">
                    {analysis.metadata.counts.sentenceCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="primary" fontWeight="600">
                    Execution Time (ms)
                  </Typography>
                  <Typography variant="h5">{analysis.executionTime}</Typography>
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
            is pressed (while certain options are chosen).
          </Typography>

          <Typography variant="h3" color={"text.primary"} pt={3}>
            Stats
          </Typography>
          <Grid container spacing={2} marginTop={"0.75rem"}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="primary" fontWeight={600}>
                    Read Time
                  </Typography>
                  <Typography variant="h5">{readTime}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="primary" fontWeight={600}>
                    Typing speed
                  </Typography>
                  <Typography variant="h5">{typingTest.wpm} wpm</Typography>
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
