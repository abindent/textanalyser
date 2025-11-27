"use client";

import * as React from "react";
import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/autolinker/prism-autolinker";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";

import { Tools } from "textanalysis-tool";

import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

/* Small helpers & icons */
import { InfoIcon } from "lucide-react"; // project icons - replace if different

/* Emoji Analysis Display (shadcn / tailwind) */
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

/* MAIN COMPONENT */
export default function AnalyserPage() {
    // Tabs state (shadcn tabs use string values)
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

    // Data options
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

    const enabledCount = Object.values(data).filter(Boolean).length;
    const isButtonDisabled = enabledCount === 0;

    const FormatData: any = {
        basicoperations: {
            removealpha: { label: "Remove Alphabets", name: "removealpha", help: "Remove all alphabetical characters" },
            removenum: { label: "Remove Numbers", name: "removenum", help: "Strip numeric characters" },
            removepunc: { label: "Remove Punctuations", name: "removepunc", help: "Strip punctuation marks" },
            removespecialchar: { label: "Remove Special Characters", name: "removespecialchar", help: "Keep only alphanumeric & common punctuation" },
            newlineremover: { label: "Remove Extra Lines", name: "newlineremover", help: "Remove empty lines" },
            extraspaceremover: { label: "Remove Extra Spaces", name: "extraspaceremover", help: "Collapse consecutive spaces" },
            extractUrls: { label: "Extract URLs", name: "extractUrls", help: "Pull out http/https links (exclusive)" },
            extractEmail: { label: "Extract Emails", name: "extractEmail", help: "Extract email-like tokens" },
            extractPhone: { label: "Extract Phone Nos", name: "extractPhoneNo", help: "Extract phone number-like tokens" },
            extractHasTag: { label: "Extract Hashtags", name: "extractHashTag", help: "Extract words starting with '#'" },
            extractEmojis: { label: "Extract Emojis", name: "extractEmojis", help: "Detect and summarise emojis" },
            extractMentions: { label: "Extract Mentions", name: "extractMentions", help: "Extract '@' mentions" },
        },
        countchar: {
            charcount: { label: "Count Characters", name: "charcount", help: "Count non-whitespace characters" },
            alphacount: { label: "Count Alphabets", name: "alphacount", help: "Count alphabet letters" },
            numcount: { label: "Count Numbers", name: "numcount", help: "Count numeric digits" },
            alphanumericcount: { label: "Count Alphabets & Numbers", name: "alphanumericcount", help: "Count letters + digits" },
            wordccount: { label: "Count Words", name: "wordcount", help: "Count word tokens" },
            sentencecount: { label: "Count Sentences", name: "sentencecount", help: "Rudimentary sentence count" },
        },
        changecap: {
            fullcaps: { label: "Uppercase", name: "fullcaps", help: "Convert text to UPPERCASE" },
            titlecaps: { label: "Title Case", name: "titlecaps", help: "Convert to Title Case (approx)" },
            lowercaps: { label: "Lowercase", name: "lowercaps", help: "Convert text to lowercase" },
            reverseText: { label: "Reverse Text", name: "reverseText", help: "Reverse the characters in the text" },
        },
    };

    // Read time (same as before)
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

    // Typing stats
    const calculateTypingStats = (input: string) => {
        if (!typingTest.startTime || input.length === 0) return { wpm: 0 };
        const elapsedTime = (typingTest.endTime! - typingTest.startTime!) / 60000;
        if (elapsedTime < 0.05) return 0;
        const wpm = Math.round(input.length / 5 / elapsedTime);
        return { wpm: isFinite(wpm) ? wpm : 0 };
    };

    // handlers
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

    // operation handler for shadcn switch
    const operationHandler = (name: string, checked: boolean) => {
        setData((prevData) => {
            if (name === "extractUrls" && checked) {
                // when extractUrls enabled, turn off others
                const newState: any = {};
                Object.keys(prevData).forEach((k) => (newState[k] = k === "extractUrls"));
                return newState;
            }
            return { ...prevData, [name]: checked };
        });
    };

    const renderSwitchRow = (item: { label: string; name: string; help?: string }) => {
        const name = item.name;
        const checked = (data as any)[name] || false;
        return (
            <div key={name} className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-white/2">
                <div className="flex items-center gap-2">
                    <div className="text-sm dark:text-slate-200">{item.label}</div>
                    {item.help && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="p-1 rounded hover:bg-white/5 cursor-pointer" aria-label="info">
                                    <InfoIcon />
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
        } as any);

        // custom emoji operation
        try {
            await AnalyserEngine.addCustomOperation(
                "extractEmojis",
                "Extracted Emojis",
                {
                    operation: (text: string) => {
                        const emojiRegex =
                            /[\u{1F300}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
                        const emojis = text.match(emojiRegex) || [];
                        return text;
                    },
                    metadata: { analysisType: "emoji-detection" },
                    metadataExtractor: (text: string) => {
                        const emojiRegex =
                            /[\u{1F300}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
                        const emojis = text.match(emojiRegex) || [];
                        const uniqueEmojis = [...new Set(emojis)];
                        const emojiCategories = {
                            nature: emojis.filter((emoji) =>
                                /[\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}]/u.test(emoji)
                            ),
                            objects: emojis.filter((emoji) =>
                                /[\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}]/u.test(emoji)
                            ),
                            symbols: emojis.filter((emoji) => /[\u{2600}-\u{26FF}]/u.test(emoji)),
                        };
                        return {
                            totalEmojis: emojis.length,
                            uniqueEmojis,
                            uniqueEmojiCount: uniqueEmojis.length,
                            emojiCategories: {
                                nature: emojiCategories.nature.length,
                                objects: emojiCategories.objects.length,
                                symbols: emojiCategories.symbols.length,
                            },
                            emojiDensity: (emojis.length / (text.length || 1)) * 100,
                        };
                    },
                    isEnabled: data.extractEmojis,
                } as any
            );
        } catch (err) {
            try {
                // fallback signature
                await (AnalyserEngine as any).addCustomOperation(
                    "extractEmojis",
                    "Extracted Emojis",
                    (text: string) => text,
                    data.extractEmojis
                );
            } catch (e) {
                // ignore
            }
        }

        const result = await AnalyserEngine.main();

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
                custom: result.metadata?.custom,
            },
        };

        try {
            setAnalysis(completeResult);
            setReadTime(calculateReadTime(result.output));
        } catch (error) {
            console.error("Analysis failed:", error);
            setAnalysis((prev: any) => ({ ...prev, output: "Error occurred during analysis" }));
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
                            <Button variant="ghost" className="px-3">Export</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[480px]">
                            <DialogHeader>
                                <DialogTitle>Export Results</DialogTitle>
                                <DialogDescription>Copy or download the analysis output.</DialogDescription>
                            </DialogHeader>
                            <div className="mt-2"> 
                                <pre className="language-c line-numbers" id="analyserOutput">
                                    <code>{analysis.output || "No output"}</code>
                                </pre>
                            </div>
                            <DialogFooter>
                                <Button onClick={() => { navigator.clipboard?.writeText(analysis.output || ""); }} className="mr-2">Copy</Button>
                                <DialogClose asChild>
                                    <Button variant="secondary" className="bg-red-600 hover:bg-red-500 text-white">Close</Button>
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

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                                <div className="text-xs text-slate-500">Read time</div>
                                <div className="font-medium">{readTime}</div>
                            </div>
                            <div className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                                <div className="text-xs text-slate-500">Typing speed</div>
                                <div className="font-medium">{typingTest.wpm ?? 0} wpm</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" onClick={() => setExamString("")}>Clear</Button>
                            <Button onClick={Examine} disabled={isButtonDisabled}>{isButtonDisabled ? "Enable an option" : "Analyse"}</Button>
                        </div>
                    </div>

                    {analysis.output && (
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold">Analysis Results</h3>
                                <div className="text-sm text-slate-400">exec: {analysis.executionTime ?? 0} ms</div>
                            </div>

                            <Card className="p-2">
                                <ScrollArea className="h-40 overflow-hidden">
                                    <pre className="language-c line-numbers p-4 bg-slate-900 text-white">
                                        <code>{analysis.output}</code>
                                    </pre>
                                </ScrollArea>
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

                                {/* Extracted metadata cards */}
                                {analysis.metadata?.urls?.length > 0 && (
                                    <Card className="p-4">
                                        <h4 className="font-semibold">URLs</h4>
                                        <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(analysis.metadata.urls)}</pre>
                                    </Card>
                                )}

                                {analysis.metadata?.mentions?.length > 0 && (
                                    <Card className="p-4">
                                        <h4 className="font-semibold">Mentions</h4>
                                        {analysis.metadata.mentions.map((m: string, i: number) => <div key={i} className="text-sm">👤 {m}</div>)}
                                    </Card>
                                )}

                                {analysis.metadata?.emails?.length > 0 && (
                                    <Card className="p-4">
                                        <h4 className="font-semibold">Emails</h4>
                                        {analysis.metadata.emails.map((em: string, i: number) => <div key={i} className="text-sm">✉ {em}</div>)}
                                    </Card>
                                )}

                                {analysis.metadata?.phoneNumbers?.length > 0 && (
                                    <Card className="p-4">
                                        <h4 className="font-semibold">Phone Numbers</h4>
                                        {analysis.metadata.phoneNumbers.map((ph: string, i: number) => <div key={i} className="text-sm">📲 {ph}</div>)}
                                    </Card>
                                )}

                                {analysis.metadata?.hashtags?.length > 0 && (
                                    <Card className="p-4">
                                        <h4 className="font-semibold">Hashtags</h4>
                                        {analysis.metadata.hashtags.map((h: string, i: number) => <div key={i} className="text-sm italic text-blue-800 dark:text-blue-500 hover:underline hover:cursor-pointer">{h}</div>)}
                                    </Card>
                                )}

                                {/* Emoji card if present */}
                                {analysis.metadata?.custom?.extractEmojis &&
                                    Object.keys(analysis.metadata.custom.extractEmojis || {}).length > 0 && (
                                        <EmojiAnalysisDisplay metadata={analysis.metadata.custom.extractEmojis} />
                                    )}
                            </div>

                            {/* Summary stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                                <Card className="p-4">
                                    <div className="text-xs text-slate-400">Characters</div>
                                    <div className="text-2xl font-semibold">{analysis.metadata?.counts?.characterCount ?? 0}</div>
                                </Card>
                                <Card className="p-4">
                                    <div className="text-xs text-slate-400">Alphabet</div>
                                    <div className="text-2xl font-semibold">{analysis.metadata?.counts?.alphabetCount ?? 0}</div>
                                </Card>
                                <Card className="p-4">
                                    <div className="text-xs text-slate-400">Numbers</div>
                                    <div className="text-2xl font-semibold">{analysis.metadata?.counts?.numericCount ?? 0}</div>
                                </Card>
                                <Card className="p-4">
                                    <div className="text-xs text-slate-400">Words</div>
                                    <div className="text-2xl font-semibold">{analysis.metadata?.counts?.wordCount ?? 0}</div>
                                </Card>
                            </div>
                        </section>
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
                            <TabsList className="mb-3">
                                <TabsTrigger className="cursor-pointer" value="basic">Basic</TabsTrigger>
                                <TabsTrigger className="cursor-pointer" value="count">Count</TabsTrigger>
                                <TabsTrigger className="cursor-pointer" value="transform">Transform</TabsTrigger>
                            </TabsList>

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

                    <Card className="p-4">
                        <h4 className="font-semibold mb-3">Summary</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <div className="text-xs text-slate-400">Characters</div>
                                <div className="font-medium">{analysis.metadata?.counts?.characterCount ?? 0}</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-400">Alphabets</div>
                                <div className="font-medium">{analysis.metadata?.counts?.alphabetCount ?? 0}</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-400">Numbers</div>
                                <div className="font-medium">{analysis.metadata?.counts?.numericCount ?? 0}</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-400">Words</div>
                                <div className="font-medium">{analysis.metadata?.counts?.wordCount ?? 0}</div>
                            </div>
                            <div className="col-span-2 mt-2">
                                <Separator />
                                <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                                    <div>Exec time</div>
                                    <div className="font-medium">{analysis.executionTime ?? 0} ms</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </aside>
            </div>
        </div>
    );
}