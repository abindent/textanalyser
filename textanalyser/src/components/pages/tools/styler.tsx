"use client";
// REACT
import * as React from "react";

// ICONS
import { Copy, Check, Sparkles, Zap, Wand2 } from "lucide-react";

// Toolkit
import { crazyWithFlourishOrSymbols, forward } from "@/lib/styler/styler";

// UI Components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const OUTPUT_BATCH_SIZE = 10;

/**
 * FadeInSection: Component that applies fade-in animation on scroll
 */
function FadeInSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0px) scale(1)"
          : "translateY(30px) scale(0.98)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* MAIN COMPONENT */
const StylerPage: React.FC = () => {
  /* STATE */
  const [inputText, setInputText] = React.useState<string>("Preview Text");
  const [fancyTexts, setFancyTexts] = React.useState<string[]>([]);
  const [copiedStates, setCopiedStates] = React.useState<Set<number>>(
    new Set()
  );
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  /* GENERATE INITIAL BATCH */
  const generateInitialBatch = React.useCallback((text: string) => {
    const cleanText = text.trim();
    if (!cleanText) {
      setFancyTexts([]);
      return;
    }

    // Get base styles from forward function
    let baseResults = forward(cleanText)
      .split("\n\n")
      .map((s) => s.trim())
      .filter(Boolean);

    // Ensure we have at least OUTPUT_BATCH_SIZE styles
    while (baseResults.length < OUTPUT_BATCH_SIZE) {
      baseResults.push(crazyWithFlourishOrSymbols(cleanText));
    }

    // Return only first batch
    setFancyTexts(baseResults.slice(0, OUTPUT_BATCH_SIZE));
    setCopiedStates(new Set());
  }, []);

  /* HANDLE INPUT CHANGE */
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputText(value);

    // Debounce generation
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      generateInitialBatch(value);
    }, 300);
  };

  /* LOAD MORE STYLES */
  const loadMore = () => {
    const cleanText = inputText.trim() || "Preview Text";
    const newStyles: string[] = [];

    for (let i = 0; i < OUTPUT_BATCH_SIZE; i++) {
      newStyles.push(crazyWithFlourishOrSymbols(cleanText));
    }

    setFancyTexts((prev) => [...prev, ...newStyles]);
  };

  /* HANDLE COPY */
  const handleCopy = async (textIndex: number) => {
    try {
      await navigator.clipboard.writeText(fancyTexts[textIndex]);
      setCopiedStates((prevStates) => {
        const updatedStates = new Set(prevStates);
        updatedStates.add(textIndex);
        return updatedStates;
      });

      setTimeout(() => {
        setCopiedStates((prevStates) => {
          const updatedStates = new Set(prevStates);
          updatedStates.delete(textIndex);
          return updatedStates;
        });
      }, 1700);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  /* FANCY TEXT OUTPUT COMPONENT */
  const FancyTextOutput: React.FC<{
    text: string;
    index: number;
    isCopied: boolean;
    onCopy: (index: number) => void;
  }> = ({ text, index, isCopied, onCopy }) => {
    return (
      <div
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <Card
          className={cn(
            "mb-4 overflow-hidden transition-all duration-300 border-slate-200 dark:border-slate-700",
            hoveredIndex === index
              ? "shadow-xl hover:shadow-sky-500/10"
              : "shadow-md"
          )}
        >
          <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <Label className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                <Zap className="inline mr-1" size={14} />
                Output #{index + 1}
              </Label>
              <div className="relative">
                <Textarea
                  value={text}
                  readOnly
                  rows={3}
                  className={cn(
                    "resize-none w-full min-h-14 rounded-lg font-mono text-sm p-3 transition-all duration-300",
                    "bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900",
                    "border border-slate-200 dark:border-slate-700",
                    hoveredIndex === index && "border-sky-400 dark:border-sky-500"
                  )}
                />
                <div className="absolute bottom-2 right-2 text-xs text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded">
                  {text.length} chars
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-start md:items-end">
              <Button
                onClick={() => onCopy(index)}
                disabled={isCopied}
                className={cn(
                  "inline-flex items-center gap-2 whitespace-nowrap transition-all duration-300 transform hover:scale-105 active:scale-95",
                  isCopied
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md"
                    : "bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-md"
                )}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  /* INITIAL EFFECT */
  React.useEffect(() => {
    generateInitialBatch(inputText);
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  /* RENDER */
  return (
    <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-300 dark:bg-sky-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div
          className="absolute -bottom-32 right-40 w-96 h-96 bg-blue-300 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-16">
        <FadeInSection>
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-2 mb-4 px-3 py-1 bg-sky-100 dark:bg-sky-900/30 rounded-full">
              <Wand2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-300">
                Text Styler
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              <span className="bg-linear-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-200 bg-clip-text text-transparent">
                🍡 🎀 Fancy Font Generator 🎀 🍡
              </span>
            </h1>

            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
              Transform your plain text into stunning stylized versions instantly.
              Get <strong>10 styles at once</strong>, then load more on demand!
            </p>
          </div>

          {/* Main Card */}
          <Card className="mb-8 overflow-hidden shadow-2xl border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl hover:shadow-3xl transition-shadow duration-300">
            <CardHeader className="bg-linear-to-r from-sky-500/10 to-blue-500/10 dark:from-sky-900/20 dark:to-blue-900/20 border-b border-slate-200 dark:border-slate-700 p-6 md:p-8">
              <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                <Sparkles className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                Input Text
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 md:p-8 space-y-6">
              {/* Input Section */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Enter your text
                </Label>
                <Textarea
                  value={inputText}
                  onChange={handleInputChange}
                  placeholder="Type something to generate fancy versions..."
                  rows={6}
                  className="w-full rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 p-4 text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all font-mono"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ✨ First 10 styles generate instantly | Click "Load More" for additional styles
                </p>
              </div>

              <Separator className="bg-slate-200 dark:bg-slate-700" />

              {/* Generated outputs */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    Generated Styles
                  </h3>
                  <span className="text-sm px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded-full font-medium">
                    {fancyTexts.length} styles
                  </span>
                </div>

                {fancyTexts.length === 0 && (
                  <div className="text-center py-8 px-4 bg-slate-50 dark:bg-slate-900/30 rounded-lg border border-dashed border-slate-300 dark:border-slate-600">
                    <Sparkles className="w-8 h-8 text-slate-400 dark:text-slate-600 mx-auto mb-2 opacity-50" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      No fancy outputs yet. Start typing above to see generated
                      styles.
                    </p>
                  </div>
                )}

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {fancyTexts.map((fancyText, index) => (
                    <FancyTextOutput
                      key={index}
                      text={fancyText}
                      index={index}
                      isCopied={copiedStates.has(index)}
                      onCopy={handleCopy}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInSection>

        {/* Load More Section */}
        <FadeInSection delay={200}>
          <Card className="border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    Generate More Styles
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Load {OUTPUT_BATCH_SIZE} additional fancy font variations for your text
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <Button
                    onClick={loadMore}
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95",
                      fancyTexts.length >= 100
                        ? "bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                        : "bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
                    )}
                    disabled={fancyTexts.length >= 100}
                  >
                    <Sparkles className="w-4 h-4" />
                    {fancyTexts.length >= 100
                      ? "Limit Reached"
                      : `Load ${OUTPUT_BATCH_SIZE} More`}
                  </Button>

                  <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center px-4 py-2 bg-slate-50 dark:bg-slate-900/30 rounded-lg whitespace-nowrap">
                    Total: <strong className="ml-1">{fancyTexts.length}</strong>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInSection>

        {/* Tips Section */}
        <FadeInSection delay={400}>
          <div className="mt-8 p-4 md:p-6 bg-linear-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border border-sky-200 dark:border-sky-800 rounded-lg">
            <p className="text-sm text-sky-900 dark:text-sky-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
              <span>
                <strong>💡 Pro Tips:</strong> Use the "Copy" button to instantly copy any style to your clipboard. 
                Each style works perfectly on social media, messaging apps, and more! 
                Generate as many as you need with "Load More".
              </span>
            </p>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default StylerPage;