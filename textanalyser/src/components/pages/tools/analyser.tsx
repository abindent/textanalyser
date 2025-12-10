"use client";

import * as React from "react";
import Link from "next/link";

import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/autolinker/prism-autolinker";

import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

/* Small helpers & icons */
import {
    InfoIcon, TrendingUp, Brain, BarChart3, Globe, Type, Hash, KeySquare, AlignJustify, FileText, Link as LinkIcon, AtSign, Phone, Smile, SquareStack, ClipboardList, Quote, ArrowUpAZ, ArrowDownAZ, CaseSensitive, Undo2, User2, Wand2, Calculator, Delete,
    Loader2,
    Download,
    Copy
} from "lucide-react";

/* UTILITY FUNCTIONS */
import { Analyse } from "@/lib/analyser/analyse";
import { generateExportText, generateExportJSON, generateExportCSV } from "@/lib/analyser/export";

/* AI */
import { geminiSummarize, geminiAdvancedSentiment, geminiKeywordExtraction, geminiCustomPrompt } from "@/lib/analyser/ai/analyser";
import MarkdownRenderer from "./markdown";

/* Emoji Analysis Display */
interface EmojiAnalysisProps {
    metadata: {
        totalEmojis?: number;
        uniqueEmojis?: string[];
        uniqueEmojiCount?: number;
        emojiCategories?: Record<string, number>;
        emojiDensity?: number;
    };
}

const EmojiAnalysisDisplay: React.FC<EmojiAnalysisProps> = ({ metadata }) => {
    if (!metadata?.totalEmojis) return null;
    return (
        <Card className="p-4 bg-linear-to-br from-slate-800/50 to-slate-900/40 border-slate-700">
            <div className="flex items-start gap-3">
                <div className="text-2xl">😊</div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">Emoji Analysis</h4>
                        <div className="text-sm text-slate-400">Density: <span className="font-medium text-amber-400">{(metadata.emojiDensity ?? 0).toFixed(2)}%</span></div>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="bg-white/3 rounded-md p-2 text-center">
                            <div className="text-xs text-slate-300">Total</div>
                            <div className="text-lg font-semibold text-emerald-400">{metadata.totalEmojis ?? 0}</div>
                        </div>
                        <div className="bg-white/3 rounded-md p-2 text-center">
                            <div className="text-xs text-slate-300">Unique</div>
                            <div className="text-lg font-semibold text-indigo-300">{metadata.uniqueEmojiCount ?? 0}</div>
                        </div>
                        <div className="bg-white/3 rounded-md p-2 text-center">
                            <div className="text-xs text-slate-300">Types</div>
                            <div className="text-lg font-semibold">{Object.keys(metadata.emojiCategories || {}).length}</div>
                        </div>
                    </div>

                    <div className="mt-3">
                        <div className="text-xs text-slate-400 mb-1">Unique Emojis</div>
                        <div className="flex gap-1 flex-wrap">
                            {metadata.uniqueEmojis?.map((e, i) => (
                                <span key={i} className="px-2 py-1 rounded bg-white/5 text-sm">{e}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

/* Sentiment Analysis Display */
interface SentimentAnalysisProps {
    metadata?: {
        score?: number;
        positiveWordCount?: number;
        negativeWordCount?: number;
        totalWords?: number;
        classification?: "positive" | "negative" | "neutral";
    };
}

const SentimentAnalysisDisplay: React.FC<SentimentAnalysisProps> = ({ metadata }) => {
    if (!metadata || !metadata.classification) return null;

    const sentimentColors = {
        positive: { bg: "from-green-500/20 to-emerald-500/20", border: "border-green-500/50", text: "text-green-400", icon: "🟢" },
        negative: { bg: "from-red-500/20 to-pink-500/20", border: "border-red-500/50", text: "text-red-400", icon: "🔴" },
        neutral: { bg: "from-yellow-500/20 to-amber-500/20", border: "border-yellow-500/50", text: "text-yellow-400", icon: "🟡" },
    };

    const sentiment = sentimentColors[metadata.classification];

    return (
        <Card className={`p-4 bg-linear-to-br ${sentiment.bg} border-${sentiment.border}`}>
            <div className="flex items-start gap-3">
                <div className="text-2xl">{sentiment.icon}</div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">Sentiment Analysis</h4>
                        <div className={`text-sm font-bold ${sentiment.text}`}>{metadata.classification.toUpperCase()}</div>
                    </div>

                    <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-300">Score:</span>
                            <span className={`font-semibold ${sentiment.text}`}>{(metadata.score ?? 0).toFixed(3)}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full transition-all bg-linear-to-r ${sentiment.bg}`}
                                style={{ width: `${Math.abs(metadata.score ?? 0) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="bg-white/3 rounded-md p-2 text-center">
                            <div className="text-xs text-slate-300">Positive</div>
                            <div className="text-lg font-semibold text-green-400">{metadata.positiveWordCount ?? 0}</div>
                        </div>
                        <div className="bg-white/3 rounded-md p-2 text-center">
                            <div className="text-xs text-slate-300">Negative</div>
                            <div className="text-lg font-semibold text-red-400">{metadata.negativeWordCount ?? 0}</div>
                        </div>
                        <div className="bg-white/3 rounded-md p-2 text-center">
                            <div className="text-xs text-slate-300">Total Words</div>
                            <div className="text-lg font-semibold text-blue-400">{metadata.totalWords ?? 0}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

/* Readability Analysis Display */
interface ReadabilityAnalysisProps {
    metadata?: {
        readabilityScore?: number;
        gradeLevel?: number;
        smogIndex?: number; // Add this
        complexity?: string;
        avgWordsPerSentence?: number;
        avgSyllablesPerWord?: number;
    };
}

const ReadabilityAnalysisDisplay: React.FC<ReadabilityAnalysisProps> = ({ metadata }) => {
    if (!metadata) return null;

    return (
        <Card className="p-4 bg-linear-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50">
            <div className="flex items-start gap-3">
                <div className="text-2xl">📊</div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">Readability Metrics</h4>
                        <div className="text-sm text-slate-400">Grade: <span className="font-medium text-purple-400">{metadata.gradeLevel?.toFixed(1)}</span></div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <div className="bg-white/3 rounded-md p-2">
                            <div className="text-xs text-slate-300">Flesch Score</div>
                            <div className="text-lg font-semibold text-purple-400">{metadata.readabilityScore?.toFixed(1)}</div>
                        </div>
                        <div className="bg-white/3 rounded-md p-2">
                            <div className="text-xs text-slate-300">Grade Level</div>
                            <div className="text-lg font-semibold text-purple-400">{metadata.gradeLevel?.toFixed(1)}</div>
                        </div>
                        <div className="bg-white/3 rounded-md p-2">
                            <div className="text-xs text-slate-300">SMOG Index</div>
                            <div className="text-lg font-semibold text-purple-300">{metadata.smogIndex?.toFixed(1)}</div>
                        </div>
                        <div className="bg-white/3 rounded-md p-2">
                            <div className="text-xs text-slate-300">Complexity</div>
                            <div className="text-lg font-semibold text-pink-400 capitalize">{metadata.complexity}</div>
                        </div>
                        <div className="bg-white/3 rounded-md p-2">
                            <div className="text-xs text-slate-300">Words/Sent</div>
                            <div className="text-lg font-semibold text-indigo-400">{metadata.avgWordsPerSentence?.toFixed(1)}</div>
                        </div>
                        <div className="bg-white/3 rounded-md p-2">
                            <div className="text-xs text-slate-300">Syl/Word</div>
                            <div className="text-lg font-semibold text-cyan-400">{metadata.avgSyllablesPerWord?.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

/* Language Detection Display */
interface LanguageDetectionProps {
    metadata?: {
        detectedLanguage?: string;
        confidence?: number;
        scores?: Record<string, number>;
    };
}

const LanguageDetectionDisplay: React.FC<LanguageDetectionProps> = ({ metadata }) => {
    if (!metadata || !metadata.detectedLanguage) return null;

    return (
        <Card className="p-4 bg-linear-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/50">
            <div className="flex items-start gap-3">
                <div className="text-2xl">🌐</div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">Language Detection</h4>
                        <div className="text-sm text-slate-400">Confidence: <span className="font-medium text-cyan-400">{((metadata.confidence ?? 0) * 100).toFixed(1)}%</span></div>
                    </div>

                    <div className="mt-3">
                        <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/30 text-cyan-300 font-semibold text-sm capitalize">
                            {metadata.detectedLanguage}
                        </div>
                    </div>

                    {metadata.scores && Object.keys(metadata.scores).length > 0 && (
                        <div className="mt-3">
                            <div className="text-xs text-slate-400 mb-2">Language Scores</div>
                            <div className="space-y-1">
                                {Object.entries(metadata.scores).slice(0, 4).map(([lang, score]) => (
                                    <div key={lang} className="flex items-center justify-between text-xs">
                                        <span className="capitalize text-slate-300">{lang}:</span>
                                        <span className="font-medium text-slate-200">{(score * 100).toFixed(1)}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

/* MAIN COMPONENT */
export default function AnalyserPage() {
    const [tabValue, setTabValue] = React.useState<string>("basic");

    const initialResult: any = {
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

    const [examString, setExamString] = React.useState<string>("Hello World");
    const [analysis, setAnalysis] = React.useState<any>(initialResult);
    const [typingTest, setTypingTest] = React.useState<any>({ startTime: null, endTime: null, wpm: 0 });
    const [readTime, setReadTime] = React.useState<string>("Not Calculated");
    const [compareText, setCompareText] = React.useState<string>("");
    const [customPrompt, setCustomPrompt] = React.useState<string>("");
    const [customAIResult, setCustomAIResult] = React.useState<string>("");
    const [showCustomPromptDialog, setShowCustomPromptDialog] =
        React.useState<boolean>(false);
    const [isLoadingCustomAI, setIsLoadingCustomAI] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
        analyzeSentiment: boolean;
        calculateReadability: boolean;
        detectLanguage: boolean;
        compareTexts: boolean;
        extractKeywords: boolean;
        useGeminiAi: boolean,
        geminiSentiment: boolean,
        geminiSummarization: boolean,
        geminiKeywords: boolean,
    }

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
        analyzeSentiment: false,
        calculateReadability: false,
        detectLanguage: false,
        compareTexts: false,
        extractKeywords: false,
        useGeminiAi: false,
        geminiSentiment: false,
        geminiSummarization: false,
        geminiKeywords: false,
    });

    const enabledCount = Object.values(data).filter(Boolean).length;
    const isButtonDisabled = enabledCount === 0;

    const FormatData: any = {
        basicoperations: {
            removealpha: {
                label: "Remove Alphabets",
                name: "removealpha",
                help: "Remove all alphabetical characters",
                icon: <Type className="w-4 h-4" />
            },
            removenum: {
                label: "Remove Numbers",
                name: "removenum",
                help: "Strip numeric characters",
                icon: <Delete className="w-4 h-4" />
            },
            removepunc: {
                label: "Remove Punctuations",
                name: "removepunc",
                help: "Strip punctuation marks",
                icon: <Quote className="w-4 h-4" />
            },
            removespecialchar: {
                label: "Remove Special Characters",
                name: "removespecialchar",
                help: "Keep only alphanumeric & common punctuation",
                icon: <KeySquare className="w-4 h-4" />
            },
            newlineremover: {
                label: "Remove Extra Lines",
                name: "newlineremover",
                help: "Remove empty lines",
                icon: <AlignJustify className="w-4 h-4" />
            },
            extraspaceremover: {
                label: "Remove Extra Spaces",
                name: "extraspaceremover",
                help: "Collapse consecutive spaces",
                icon: <FileText className="w-4 h-4" />
            },
            extractUrls: {
                label: "Extract URLs",
                name: "extractUrls",
                help: "Pull out http/https links (exclusive)",
                icon: <LinkIcon className="w-4 h-4" />
            },
            extractEmail: {
                label: "Extract Emails",
                name: "extractEmail",
                help: "Extract email-like tokens",
                icon: <AtSign className="w-4 h-4" />
            },
            extractPhone: {
                label: "Extract Phone Nos",
                name: "extractPhoneNo",
                help: "Extract phone number-like tokens",
                icon: <Phone className="w-4 h-4" />
            },
            extractHasTag: {
                label: "Extract Hashtags",
                name: "extractHashTag",
                help: "Extract words starting with '#'",
                icon: <Hash className="w-4 h-4" />
            },
            extractEmojis: {
                label: "Extract Emojis",
                name: "extractEmojis",
                help: "Detect and summarise emojis",
                icon: <Smile className="w-4 h-4" />
            },
            extractMentions: {
                label: "Extract Mentions",
                name: "extractMentions",
                help: "Extract '@' mentions",
                icon: <User2 className="w-4 h-4" />
            },
        },
        countchar: {
            charcount: {
                label: "Count Characters",
                name: "charcount",
                help: "Count non-whitespace characters",
                icon: <SquareStack className="w-4 h-4" />
            },
            alphacount: {
                label: "Count Alphabets",
                name: "alphacount",
                help: "Count alphabet letters",
                icon: <Type className="w-4 h-4" />
            },
            numcount: {
                label: "Count Numbers",
                name: "numcount",
                help: "Count numeric digits",
                icon: <Calculator className="w-4 h-4" />
            },
            alphanumericcount: {
                label: "Count Alphabets & Numbers",
                name: "alphanumericcount",
                help: "Count letters + digits",
                icon: <ClipboardList className="w-4 h-4" />
            },
            wordccount: {
                label: "Count Words",
                name: "wordcount",
                help: "Count word tokens",
                icon: <FileText className="w-4 h-4" />
            },
            sentencecount: {
                label: "Count Sentences",
                name: "sentencecount",
                help: "Rudimentary sentence count",
                icon: <Quote className="w-4 h-4" />
            },
        },
        changecap: {
            fullcaps: {
                label: "Uppercase",
                name: "fullcaps",
                help: "Convert text to UPPERCASE",
                icon: <ArrowUpAZ className="w-4 h-4" />
            },
            titlecaps: {
                label: "Title Case",
                name: "titlecaps",
                help: "Convert to Title Case (approx)",
                icon: <CaseSensitive className="w-4 h-4" />
            },
            lowercaps: {
                label: "Lowercase",
                name: "lowercaps",
                help: "Convert text to lowercase",
                icon: <ArrowDownAZ className="w-4 h-4" />
            },
            reverseText: {
                label: "Reverse Text",
                name: "reverseText",
                help: "Reverse the characters in the text",
                icon: <Undo2 className="w-4 h-4" />
            },
        },
        analysis: {
            analyzeSentiment: {
                label: "Analyze Sentiment",
                name: "analyzeSentiment",
                help: "Detect sentiment (positive/negative/neutral)",
                icon: <Brain className="w-4 h-4" />
            },
            calculateReadability: {
                label: "Calculate Readability",
                name: "calculateReadability",
                help: "Flesch-Kincaid readability scores",
                icon: <BarChart3 className="w-4 h-4" />
            },
            detectLanguage: {
                label: "Detect Language",
                name: "detectLanguage",
                help: "Identify the language of the text",
                icon: <Globe className="w-4 h-4" />
            },
            compareTexts: {
                label: "Compare Texts",
                name: "compareTexts",
                help: "Compare current text with another text",
                icon: null
            },
            extractKeywords: {
                label: "Extract Keywords (Local)",
                name: "extractKeywords",
                help: "Extract top keywords using TF-IDF (Statistical)",
                icon: <Hash className="w-4 h-4" />
            },
        },
        aiAdvanced: {
            geminiSentiment: {
                label: "Advanced Sentiment (AI)",
                name: "geminiSentiment",
                help: "Use Gemini AI for detailed sentiment analysis",
                icon: <Brain className="w-4 h-4" />
            },
            geminiSummarization: {
                label: "AI Summarization",
                name: "geminiSummarization",
                help: "Use Gemini AI to summarize the text",
                icon: <TrendingUp className="w-4 h-4" />
            },
            geminiKeywords: {
                label: "Extract Topics & Keywords",
                name: "geminiKeywords",
                help: "Use AI to extract key topics and keywords",
                icon: <Hash className="w-4 h-4" />
            },
        },
    };
    const calculateReadTime = (text: string): string => {
        const wordsPerMinute = 200;
        const wordCount = text.trim().length ? text.trim().split(/\s+/).length : 0;
        const minutes = Math.floor(wordCount / wordsPerMinute);
        const seconds = Math.floor((wordCount % wordsPerMinute) / (wordsPerMinute / 60));
        if (minutes === 0 && seconds === 0) return "Less than a second";
        if (minutes === 0) return `${seconds} seconds`;
        if (seconds === 0) return `${minutes} min`;
        return `${minutes} min ${seconds} sec`;
    };

    const calculateTypingStats = (input: string) => {
        if (!typingTest.startTime || input.length === 0) return { wpm: 0 };
        const elapsedTime = (typingTest.endTime! - typingTest.startTime!) / 60000;
        if (elapsedTime < 0.05) return 0;
        const wpm = Math.round(input.length / 5 / elapsedTime);
        return { wpm: isFinite(wpm) ? wpm : 0 };
    };

    const typingTestHandler = (input: string) => {
        if (!typingTest.startTime) {
            setTypingTest((prev: any) => ({ ...prev, startTime: Date.now() }));
        }
        setTypingTest((prev: any) => ({
            ...prev,
            endTime: Date.now(),
            ...(calculateTypingStats(input) as any),
        }));
    };

    const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;
        typingTestHandler(inputText);
        setExamString(inputText);
        setReadTime(calculateReadTime(inputText));
    };

    const operationHandler = (name: string, checked: boolean) => {
        setData((prevData) => {
            return { ...prevData, [name]: checked };
        });
    };

    const renderSwitchRow = (item: { label: string; name: string; help?: string; icon?: any }) => {
        const name = item.name;
        const checked = (data as any)[name] || false;
        return (
            <div key={name} className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-white/2">
                <div className="flex items-center gap-2">
                    {item.icon && <span className="text-slate-400">{item.icon}</span>}
                    <div className="text-sm dark:text-slate-200">{item.label}</div>
                    {item.help && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="p-1 rounded hover:bg-white/5 cursor-pointer" aria-label="info">
                                    <InfoIcon className="w-4 h-4" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[220px]">
                                <div className="text-sm dark:text-slate-400">{item.help}</div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
                <Switch className="cursor-pointer" checked={checked} onCheckedChange={(v: boolean) => operationHandler(name, v)} />
            </div>
        );
    };

    const Examine = async () => {
        setIsLoading(true);
        const result = await Analyse(examString, compareText, data);
        // Gemini AI Processing
        let geminiResults: any = {};

        if (data.geminiSentiment) {
            try {
                geminiResults.sentiment = await geminiAdvancedSentiment(examString);
            } catch (error) {
                console.error("Gemini sentiment error:", error);
                geminiResults.sentiment = {
                    classification: "error",
                    explanation: "Failed to analyze sentiment",
                    confidence: 0
                };
            }
        }

        if (data.geminiSummarization) {
            try {
                geminiResults.summary = await geminiSummarize(examString);
            } catch (error) {
                console.error("Gemini summary error:", error);
                geminiResults.summary = "Failed to generate summary";
            }
        }

        if (data.geminiKeywords) {
            try {
                geminiResults.keywords = await geminiKeywordExtraction(examString);
            } catch (error) {
                console.error("Gemini keywords error:", error);
                geminiResults.keywords = { keywords: [], topics: [] };
            }
        }

        const completeResult = {
            ...result,
            metadata: {
                counts: {
                    characterCount: result.metadata?.counts?.characterCount || 0,
                    alphabetCount: result.metadata?.counts?.alphabetCount || 0,
                    numericCount: result.metadata?.counts?.numericCount || 0,
                    wordCount: result.metadata?.counts?.wordCount || 0,
                    sentenceCount: result.metadata?.counts?.sentenceCount || 0,
                },
                urls: result.metadata?.urls || [],
                emails: result.metadata?.emails || [],
                phoneNumbers: result.metadata?.phoneNumbers || [],
                hashtags: result.metadata?.hashtags || [],
                mentions: result.metadata?.mentions || [],
                keywords: result.metadata?.keywords || [],
                sentiment: result.metadata?.sentiment,
                readability: result.metadata?.readability,
                languageDetection: result.metadata?.languageDetection,
                textComparison: result.metadata?.textComparison,
                custom: result.metadata?.custom,
            },
            gemini: geminiResults,
        };

        try {
            setAnalysis(completeResult);
            setReadTime(calculateReadTime(result.output));
            setTimeout(() => setIsLoading(false), 500);
        } catch (error) {
            console.error("Analysis failed:", error);
            setAnalysis((prev: any) => ({ ...prev, output: "Error occurred during analysis" }));
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        Prism.highlightAll();
    }, [analysis.output]);

    return (
        <div className="px-6 py-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-extrabold">Text Analyser</h2>
                <div className="flex items-center gap-3">
                    <Badge>{enabledCount}</Badge>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="px-3">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Export Analysis Results</DialogTitle>
                                <DialogDescription>
                                    Download your complete analysis report with all results, AI analyses, extracted data, and statistics.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                {/* Display Comprehensive Output */}
                                <div>
                                    <label className="text-sm font-semibold mb-2 block">Full Analysis Report</label>
                                    <textarea
                                        className="w-full h-64 p-3 bg-slate-900 text-white rounded-lg border border-slate-700 font-mono text-xs resize-none overflow-auto"
                                        value={generateExportText(examString, analysis, customAIResult)}
                                        readOnly
                                    />
                                </div>

                                {/* Format Selection */}
                                <div>
                                    <label className="text-sm font-semibold mb-2 block">Export Format</label>
                                    <div className="flex gap-2 flex-wrap">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                const blob = new Blob([generateExportText(analysis, customAIResult)], {
                                                    type: "text/plain;charset=utf-8",
                                                });
                                                const href = URL.createObjectURL(blob);
                                                const anchor = document.createElement("a");
                                                anchor.href = href;
                                                anchor.download = `textanalyser-report-${new Date().toISOString().split('T')[0]}`;
                                                anchor.click();
                                                URL.revokeObjectURL(href);
                                            }}
                                        >
                                            📄 TXT (Full Report)
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                const blob = new Blob([generateExportJSON(analysis, customAIResult)], {
                                                    type: "application/json;charset=utf-8",
                                                });
                                                const href = URL.createObjectURL(blob);
                                                const anchor = document.createElement("a");
                                                anchor.href = href;
                                                anchor.download = `textanalyser-report-${new Date().toISOString().split('T')[0]}`;
                                                anchor.click();
                                                URL.revokeObjectURL(href);
                                            }}
                                        >
                                            { } JSON
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                const blob = new Blob([generateExportCSV(analysis, customAIResult)], {
                                                    type: "text/csv;charset=utf-8",
                                                });
                                                const href = URL.createObjectURL(blob);
                                                const anchor = document.createElement("a");
                                                anchor.href = href;
                                                anchor.download = `textanalyser-report-${new Date().toISOString().split('T')[0]}`;
                                                anchor.click();
                                                URL.revokeObjectURL(href);
                                            }}
                                        >
                                            📊 CSV
                                        </Button>
                                    </div>
                                </div>

                                {/* Quick Copy Actions */}
                                <div className="bg-slate-800/50 p-3 rounded-lg">
                                    <div className="text-sm font-semibold mb-2">Quick Actions</div>
                                    <div className="flex gap-2 flex-wrap">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => {
                                                navigator.clipboard?.writeText(generateExportText(analysis, customAIResult));
                                            }}
                                        >
                                            <Copy className="w-4 h-4 mr-2" />
                                            Copy Full Report
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => {
                                                navigator.clipboard?.writeText(analysis.output || "");
                                            }}
                                        >
                                            <Copy className="w-4 h-4 mr-2" />
                                            Copy Output
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="secondary">Close</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <main className="lg:col-span-2 space-y-6">
                    <textarea
                        id="examString"
                        value={examString}
                        onChange={changeHandler}
                        className="w-full min-h-72 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm"
                        placeholder="Type or paste your text here..."
                    />

                    {/* Show compare text input if compare operation is enabled */}
                    {data.compareTexts && (
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Compare with Text:</label>
                            <textarea
                                value={compareText}
                                onChange={(e) => setCompareText(e.target.value)}
                                className="w-full min-h-24 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm"
                                placeholder="Enter text to compare with..."
                            />
                        </div>
                    )}

                    {/* Custom AI Prompt Dialog */}
                    <Dialog open={showCustomPromptDialog} onOpenChange={setShowCustomPromptDialog}>
                        <DialogContent className="max-w-[89vw] sm:max-w-[580px] max-h-[85vh] p-0 flex flex-col">
                            <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 border-b">
                                <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                    <Wand2 className="w-5 h-5 shrink-0" />
                                    Custom AI Text Analysis
                                </DialogTitle>
                                <DialogDescription className="text-sm">
                                    Enter any prompt or question for Gemini AI to analyze your text. Be
                                    specific about what you want to know or achieve.
                                </DialogDescription>
                            </DialogHeader>

                            <ScrollArea type="always" className="h-30 md:h-80">
                                <div className="space-y-4 pr-3">
                                    {/* Quick Templates */}
                                    <div>
                                        <label className="text-sm font-semibold mb-2 block">
                                            Quick Templates
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {[
                                                {
                                                    label: "Improve Writing",
                                                    prompt:
                                                        "Critique this text for grammar, clarity, and tone. Suggest 3 specific improvements.",
                                                },
                                                {
                                                    label: "Extract Key Ideas",
                                                    prompt:
                                                        "List the 5 most important ideas or concepts in this text as bullet points.",
                                                },
                                                {
                                                    label: "Analyze Tone",
                                                    prompt:
                                                        "Analyze the tone and emotional undertones in this text. What audience is it best suited for?",
                                                },
                                                {
                                                    label: "Generate Questions",
                                                    prompt:
                                                        "Generate 5 insightful discussion questions based on this text.",
                                                },
                                            ].map((template) => (
                                                <Button
                                                    key={template.label}
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setCustomPrompt(template.prompt)}
                                                    className="text-left h-auto py-2 px-3 justify-start"
                                                >
                                                    {template.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Custom Prompt Input */}
                                    <div>
                                        <label className="text-sm font-semibold mb-2 block">
                                            Your Custom Prompt
                                        </label>
                                        <textarea
                                            className="w-full min-h-[120px] p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm"
                                            placeholder="Example: Summarize the main argument and list potential counterarguments..."
                                            value={customPrompt}
                                            onChange={(e) => setCustomPrompt(e.target.value)}
                                        />
                                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            {customPrompt.length} characters
                                        </div>
                                    </div>

                                    {/* Custom AI Analysis Result */}
                                    {customAIResult && (
                                        <Card className="p-4 bg-linear-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500/50">
                                            <div className="flex items-start gap-3">
                                                <div className="text-2xl shrink-0">✨</div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-base sm:text-lg font-semibold mb-3">
                                                        Custom AI Analysis
                                                    </h4>
                                                    <div className="bg-slate-900/50 rounded p-3 max-h-[300px] overflow-y-auto">
                                                        <MarkdownRenderer content={customAIResult} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    )}

                                    {/* Loading State */}
                                    {isLoadingCustomAI && (
                                        <div className="flex items-center justify-center gap-2 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span className="text-sm text-slate-600 dark:text-slate-400">
                                                Processing with AI...
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>

                            <DialogFooter className="px-4 sm:px-6 py-3 sm:py-4 border-t flex-row flex-wrap sm:flex-nowrap gap-2">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => {
                                        setCustomPrompt("");
                                        setCustomAIResult("");
                                    }}
                                    className="flex-1 sm:flex-none"
                                >
                                    Clear
                                </Button>
                                <Button
                                    size="sm"
                                    disabled={isLoadingCustomAI || !customPrompt.trim() || !examString.trim()}
                                    onClick={async () => {
                                        setIsLoadingCustomAI(true);
                                        try {
                                            const response = await geminiCustomPrompt({
                                                prompt: customPrompt,
                                                text: examString,
                                            });
                                            setCustomAIResult(response);
                                        } catch (error) {
                                            setCustomAIResult(
                                                `Error: ${error instanceof Error
                                                    ? error.message
                                                    : "Failed to process request"
                                                }`
                                            );
                                        } finally {
                                            setIsLoadingCustomAI(false);
                                        }
                                    }}
                                    className="flex-1 sm:flex-none"
                                >
                                    {isLoadingCustomAI ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 className="w-4 h-4 mr-2" />
                                            Analyze with AI
                                        </>
                                    )}
                                </Button>
                                <DialogClose asChild>
                                    <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <div className="space-y-4">
                        {/* Stats section */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <div className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                                <div className="text-xs text-slate-500 dark:text-slate-400">Read time</div>
                                <div className="font-medium text-sm sm:text-base">{readTime}</div>
                            </div>
                            <div className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                                <div className="text-xs text-slate-500 dark:text-slate-400">Typing speed</div>
                                <div className="font-medium text-sm sm:text-base">{typingTest.wpm ?? 0} wpm</div>
                            </div>
                        </div>

                        {/* Buttons section */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setExamString("");
                                    setCustomPrompt("");
                                    setCustomAIResult("");
                                    setAnalysis("");
                                }}
                                disabled={isLoading}
                                className="shrink-0"
                            >
                                Clear
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowCustomPromptDialog(true)}
                                title="Analyze text with custom AI prompt"
                                disabled={isLoading}
                                className="shrink-0"
                            >
                                <Wand2 className="w-4 h-4 mr-1.5" />
                                Custom AI
                            </Button>
                            <Button
                                size="sm"
                                onClick={Examine}
                                disabled={isButtonDisabled || isLoading}
                                className="shrink-0 w-full sm:w-auto sm:ml-auto"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                                        Analysing...
                                    </>
                                ) : isButtonDisabled ? (
                                    "Enable an option"
                                ) : (
                                    "Analyse"
                                )}
                            </Button>
                        </div>
                    </div>

                    {analysis.output && (
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold">Analysis Results</h3>
                                <div className="text-sm text-slate-400">exec: {analysis.executionTime ?? 0} ms</div>
                            </div>

                            <Card className="p-2">
                                <div className="h-40 overflow-auto">
                                    <pre className="language-c line-numbers p-4 bg-slate-900 text-white min-w-max">
                                        <code>{analysis.output}</code>
                                    </pre>
                                </div>
                            </Card>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {analysis.builtInOperations?.length > 0 && (
                                    <Card className="p-4">
                                        <h4 className="font-semibold mb-2">Built-in Operations</h4>
                                        <ul className="list-disc ml-5 text-sm">
                                            {analysis.builtInOperations.map((p: string, i: number) => <li key={i}>{p}</li>)}
                                        </ul>
                                    </Card>
                                )}

                                {analysis.customOperations?.length > 0 && (
                                    <Card className="p-4">
                                        <h4 className="font-semibold mb-2">Custom Operations</h4>
                                        <ul className="list-disc ml-5 text-sm">
                                            {analysis.customOperations.map((p: string, i: number) => <li key={i}>{p}</li>)}
                                        </ul>
                                    </Card>
                                )}

                                {/* Sentiment Analysis */}
                                {analysis.metadata.sentiment && (
                                    <SentimentAnalysisDisplay metadata={analysis.metadata.sentiment} />
                                )}
                                {/* Gemini AI Advanced Sentiment */}
                                {analysis.gemini?.sentiment && (
                                    <Card className="p-4 md:col-span-2 bg-linear-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500/50">
                                        <div className="flex items-start gap-3">
                                            <div className="text-2xl">🤖</div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-lg font-semibold">Gemini AI Sentiment Analysis</h4>
                                                    <Badge variant="outline" className="capitalize">
                                                        {analysis.gemini.sentiment.classification}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-slate-300 mt-2">{analysis.gemini.sentiment.explanation}</p>
                                                <div className="mt-2 text-xs text-slate-400">
                                                    Confidence: <span className="font-medium text-indigo-400">
                                                        {(analysis.gemini.sentiment.confidence * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )}

                                {/* Gemini AI Summary */}
                                {analysis.gemini?.summary && (
                                    <Card className="p-4 md:col-span-2 bg-linear-to-br from-green-500/20 to-emerald-500/20 border-green-500/50">
                                        <div className="flex items-start gap-3">
                                            <div className="text-2xl">✨</div>
                                            <div className="flex-1">
                                                <h4 className="text-lg font-semibold mb-2">AI-Generated Summary</h4>
                                                <p className="text-sm text-slate-300 leading-relaxed">{analysis.gemini.summary}</p>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                                {/* Local TF-IDF Keywords */}
                                {analysis.metadata?.keywords?.length > 0 && (
                                    <Card className="p-4 md:col-span-2 bg-linear-to-br from-slate-700/50 to-slate-800/50">
                                        <div className="flex items-start gap-3">
                                            <div className="text-2xl">🔑</div>
                                            <div className="flex-1">
                                                <h4 className="text-lg font-semibold mb-3">Extracted Keywords (TF-IDF)</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {analysis.metadata.keywords.map((keyword: string, i: number) => (
                                                        <Badge key={i} variant="secondary" className="bg-slate-700 hover:bg-slate-600">
                                                            {keyword}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="text-xs text-slate-400 mt-2">
                                                    * Statistical extraction based on term frequency and document relevance.
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                                {/* Gemini AI Keywords & Topics */}
                                {analysis.gemini?.keywords && (
                                    analysis.gemini.keywords.keywords.length > 0 || analysis.gemini.keywords.topics.length > 0
                                ) && (
                                        <Card className="p-4 md:col-span-2 bg-linear-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/50">
                                            <div className="flex items-start gap-3">
                                                <div className="text-2xl">🎯</div>
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-semibold mb-3">AI Topics & Keywords</h4>

                                                    {analysis.gemini.keywords.topics.length > 0 && (
                                                        <div className="mb-3">
                                                            <div className="text-xs text-slate-400 mb-2">Topics</div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {analysis.gemini.keywords.topics.map((topic: string, i: number) => (
                                                                    <Badge key={i} variant="secondary" className="bg-cyan-500/30">
                                                                        {topic}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {analysis.gemini.keywords.keywords.length > 0 && (
                                                        <div>
                                                            <div className="text-xs text-slate-400 mb-2">Keywords</div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {analysis.gemini.keywords.keywords.map((keyword: string, i: number) => (
                                                                    <Badge key={i} variant="outline">
                                                                        {keyword}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    )}

                                {/* Readability Analysis */}
                                {analysis.metadata.readability && (
                                    <ReadabilityAnalysisDisplay metadata={analysis.metadata.readability} />
                                )}

                                {/* Language Detection */}
                                {analysis.metadata.languageDetection && (
                                    <LanguageDetectionDisplay metadata={analysis.metadata.languageDetection} />
                                )}


                                {/* Text Comparison Results */}
                                {analysis.metadata.textComparison && (
                                    <Card className="p-4 md:col-span-2">
                                        <h4 className="font-semibold mb-3">Comparison Results</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-300">Similarity:</span>
                                                <span className="font-semibold text-green-400">{analysis.metadata.textComparison.similarity.toFixed(2)}%</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-300">Edit Distance:</span>
                                                <span className="font-semibold text-yellow-400">{analysis.metadata.textComparison.editDistance}</span>
                                            </div>
                                            {analysis.metadata.textComparison.wordDifference && (
                                                <div className="grid grid-cols-3 gap-2 mt-2">
                                                    <div className="bg-green-500/20 p-2 rounded text-center">
                                                        <div className="text-xs text-slate-400">Added</div>
                                                        <div className="font-semibold text-green-400">{analysis.metadata.textComparison.wordDifference.addedCount}</div>
                                                    </div>
                                                    <div className="bg-red-500/20 p-2 rounded text-center">
                                                        <div className="text-xs text-slate-400">Removed</div>
                                                        <div className="font-semibold text-red-400">{analysis.metadata.textComparison.wordDifference.removedCount}</div>
                                                    </div>
                                                    <div className="bg-blue-500/20 p-2 rounded text-center">
                                                        <div className="text-xs text-slate-400">Unchanged</div>
                                                        <div className="font-semibold text-blue-400">{analysis.metadata.textComparison.wordDifference.unchangedCount}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                )}

                                {/* URLs */}
                                {analysis.metadata?.urls?.length > 0 && (
                                    <Card className="p-4">
                                        <h4 className="font-semibold mb-3">URLs</h4>
                                        <div className="space-y-2">
                                            {analysis.metadata.urls.map((url: string, index: number) => (
                                                <div key={index} className="flex items-start gap-2">
                                                    <span className="text-muted-foreground text-sm">•</span>
                                                    <Link
                                                        href={url}
                                                        target="_blank"
                                                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"
                                                    >
                                                        {url}
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                )}

                                {/* Mentions */}
                                {analysis.metadata?.mentions?.length > 0 && (
                                    <Card className="p-4">
                                        <h4 className="font-semibold">Mentions</h4>
                                        {analysis.metadata.mentions.map((m: string, i: number) => <div key={i} className="text-sm">👤 {m}</div>)}
                                    </Card>
                                )}

                                {/* Emails */}
                                {analysis.metadata?.emails?.length > 0 && (
                                    <Card className="p-4">
                                        <h4 className="font-semibold">Emails</h4>
                                        {analysis.metadata.emails.map((em: string, i: number) => <Link href={`mailto:${em}`} key={i} className="text-sm text-blue-700">✉ {em}</Link>)}
                                    </Card>
                                )}

                                {/* Phone Numbers */}
                                {analysis.metadata?.phoneNumbers?.length > 0 && (
                                    <Card className="p-4">
                                        <h4 className="font-semibold">Phone Numbers</h4>
                                        {analysis.metadata.phoneNumbers.map((ph: string, i: number) => <div key={i} className="text-sm">📲 {ph}</div>)}
                                    </Card>
                                )}

                                {/* Hashtags */}
                                {analysis.metadata?.hashtags?.length > 0 && (
                                    <Card className="p-4">
                                        <h4 className="font-semibold">Hashtags</h4>
                                        {analysis.metadata.hashtags.map((h: string, i: number) => <div key={i} className="text-sm italic text-blue-800 dark:text-blue-500 hover:underline hover:cursor-pointer">{h}</div>)}
                                    </Card>
                                )}

                                {/* Emoji Analysis */}
                                {analysis.metadata?.custom?.extractEmojis &&
                                    Object.keys(analysis.metadata.custom.extractEmojis || {}).length > 0 && (
                                        <EmojiAnalysisDisplay metadata={analysis.metadata.custom.extractEmojis} />
                                    )}
                            </div>

                            {/* Summary stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                                {data.charcount && (<Card className="p-4">
                                    <div className="text-xs text-slate-400">Characters</div>
                                    <div className="text-2xl font-semibold">{analysis.metadata?.counts?.characterCount ?? 0}</div>
                                </Card>)}
                                {data.alphacount || data.alphanumericcount && (<Card className="p-4">
                                    <div className="text-xs text-slate-400">Alphabet</div>
                                    <div className="text-2xl font-semibold">{analysis.metadata?.counts?.alphabetCount ?? 0}</div>
                                </Card>)}
                                {data.numcount || data.alphanumericcount && (<Card className="p-4">
                                    <div className="text-xs text-slate-400">Numbers</div>
                                    <div className="text-2xl font-semibold">{analysis.metadata?.counts?.numericCount ?? 0}</div>
                                </Card>)}
                                {data.wordcount && (<Card className="p-4">
                                    <div className="text-xs text-slate-400">Words</div>
                                    <div className="text-2xl font-semibold">{analysis.metadata?.counts?.wordCount ?? 0}</div>
                                </Card>)}
                                {data.sentencecount && (<Card className="p-4">
                                    <div className="text-xs text-slate-400">Sentences</div>
                                    <div className="text-2xl font-semibold">{analysis.metadata?.counts?.sentenceCount ?? 0}</div>
                                </Card>)}
                            </div>
                        </section>
                    )}
                    {/* Custom AI Analysis Result */}
                    {customAIResult && (
                        <Card className="p-4 md:col-span-2 bg-linear-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500/50">
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">✨</div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-lg font-semibold">Custom AI Analysis</h4>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setShowCustomPromptDialog(true)}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                    <div className="mt-2 p-3 bg-slate-900/50 rounded text-sm text-slate-300 max-h-48 overflow-y-auto whitespace-pre-wrap">
                                        <MarkdownRenderer content={customAIResult} />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}

                </main>


                {/* Right column - Sidebar with Tabs / Switches / Stats */}
                <aside className="space-y-4">
                    <Card className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold">Operations</h4>
                            <div className="text-xs text-slate-400">Enabled <Badge>{enabledCount}</Badge></div>
                        </div>

                        <Tabs value={tabValue} onValueChange={(v: string) => setTabValue(v)}>
                            <ScrollArea type="always">
                                <ScrollBar orientation="horizontal" />
                                <TabsList className="mb-3">
                                    <TabsTrigger className="cursor-pointer" value="basic">Basic</TabsTrigger>
                                    <TabsTrigger className="cursor-pointer" value="count">Count</TabsTrigger>
                                    <TabsTrigger className="cursor-pointer" value="transform">Transform</TabsTrigger>
                                    <TabsTrigger className="cursor-pointer" value="analysis">Analysis</TabsTrigger>
                                    <TabsTrigger className="cursor-pointer" value="ai">🤖 AI</TabsTrigger>
                                </TabsList>
                            </ScrollArea>

                            <ScrollArea type="always" className="h-50 md:h-full">

                                <TabsContent value="basic" className="space-y-1">
                                    <div className="flex flex-col">
                                        {Object.values(FormatData.basicoperations).map((it: any) => renderSwitchRow(it))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="count" className="space-y-1">
                                    <div className="flex flex-col">
                                        {Object.values(FormatData.countchar).map((it: any) => renderSwitchRow(it))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="transform" className="space-y-1">
                                    <div className="flex flex-col">
                                        {Object.values(FormatData.changecap).map((it: any) => renderSwitchRow(it))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="analysis" className="space-y-1">
                                    <div className="flex flex-col">
                                        {Object.values(FormatData.analysis).map((it: any) => renderSwitchRow(it))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="ai" className="space-y-1">
                                    <div className="flex flex-col">
                                        {Object.values(FormatData.aiAdvanced).map((it: any) => renderSwitchRow(it))}
                                    </div>
                                </TabsContent>
                            </ScrollArea>
                        </Tabs>
                    </Card>

                    <Card className="p-4">
                        <h4 className="font-semibold mb-3">Extracted Data</h4>
                        <div className="text-sm text-slate-500 space-y-2">
                            <div>URLs: <span className="font-medium">{(analysis.metadata?.urls || []).length}</span></div>
                            <div>Emails: <span className="font-medium">{(analysis.metadata?.emails || []).length}</span></div>
                            <div>Mentions: <span className="font-medium">{(analysis.metadata?.mentions || []).length}</span></div>
                            <div>Hashtags: <span className="font-medium">{(analysis.metadata?.hashtags || []).length}</span></div>
                        </div>
                    </Card>
                </aside>
            </div>
        </div>
    );
}