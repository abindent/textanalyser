"use client";
// REACT
import * as React from "react";

// ICONS (keeps your existing icon export)
import { CopyIcon } from "lucide-react";

// Toolkit
import { crazyWithFlourishOrSymbols, forward } from "@/lib/styler/styler";

/**
 * Note:
 * This file replaces MUI controls with shadcn-style components / Tailwind classes.
 * The project must provide the shadcn primitives at the import paths below.
 *
 * If your shadcn components live at different paths, update the imports.
 */
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils"; // optional cn helper (classNames), remove if you don't have it

/* MAIN COMPONENT */
const StylerPage: React.FC = () => {
  /* STATE */
  const [debouncedInputText, setDebouncedInputText] =
    React.useState<string>("Preview Text");
  const [fancyTexts, setFancyTexts] = React.useState<string[]>([]);
  const [copiedStates, setCopiedStates] = React.useState<Set<number>>(
    new Set()
  );
  const [count, setCount] = React.useState<number>(0);

  /* HELPERS */
  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const generateFancy = (text: string) => {
    if (!text.trim()) {
      setFancyTexts([]);
      return;
    }

    const result = forward(text);
    const finalRes = result.split("\n\n");

    const updatedFancyTexts = finalRes.map((res) => res);
    for (let k = 1; k < count; k++) {
      updatedFancyTexts.push(crazyWithFlourishOrSymbols(text));
    }

    setFancyTexts(updatedFancyTexts);
    setCopiedStates(new Set()); // Reset copied states.
  };

  const debouncedGenerateFancy = React.useCallback(
    debounce((text: string) => generateFancy(text), 300),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const loadMore = () => {
    const newTexts: string[] = [];
    for (let i = 1; i <= 10; i++) {
      newTexts.push(crazyWithFlourishOrSymbols(debouncedInputText));
    }
    setFancyTexts((prev) => [...prev, ...newTexts]);
    setCount((prev) => prev + 10);
  };

  const handleCopy = async (textIndex: number) => {
    try {
      await navigator.clipboard.writeText(fancyTexts[textIndex]);
      setCopiedStates((prevStates) => {
        const updatedStates = new Set(prevStates);
        updatedStates.add(textIndex);
        return updatedStates;
      });

      // Reset the "Copied" state after 1.7 seconds
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDebouncedInputText(value); // immediate UI update
    debouncedGenerateFancy(value); // debounced generation
  };

  /* UI SUB-COMPONENTS */
  const FancyTextOutput: React.FC<{
    text: string;
    index: number;
    isCopied: boolean;
    onCopy: (index: number) => void;
  }> = ({ text, index, isCopied, onCopy }) => {
    return (
      <Card key={index} className="mb-4 shadow-sm">
        <CardContent className="flex flex-col gap-3 md:flex-row md:items-start">
          <div className="flex-1">
            <Label className="mb-1">Output #{index + 1}</Label>
            <Textarea
              value={text}
              readOnly
              
              rows={3}
              className="resize-none w-full min-h-12 rounded-md bg-slate-50 dark:bg-slate-800 text-sm p-3"
            />
          </div>

          <div className="flex flex-col gap-2 items-start md:items-end md:ml-4">
            <Button
              onClick={() => onCopy(index)}
              disabled={isCopied}
              variant={isCopied ? "secondary" : "default"}
              className={cn(
                "inline-flex items-center gap-2 whitespace-nowrap",
                isCopied ? "bg-emerald-600 text-white" : ""
              )}
            >
              {!isCopied && <CopyIcon />}
              {isCopied ? "Copied!" : "Copy"}
            </Button>
            <div className="text-xs text-muted-foreground">
              {text.length} characters
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  /* EFFECTS */
  React.useEffect(() => {
    if (debouncedInputText === "Preview Text") {
      generateFancy(debouncedInputText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputText]);

  /* RENDER */
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div
        className="rounded-lg p-6 transition-all duration-300"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(148, 181, 255, 0.12), transparent)",
        }}
      >
        <h1 className="text-center text-2xl md:text-3xl font-semibold mb-6">
          🍡 🎀 Fancy Font Generator 🎀 🍡
        </h1>

        <div className="space-y-4">
          <div>
            <Label className="mb-2">Your Text</Label>
            <Textarea
              value={debouncedInputText}
              onChange={handleInputChange}
              placeholder="Type something to generate fancy versions..."
              rows={8}
              className="w-full rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 text-sm"
            />
          </div>

          {/* Generated outputs */}
          <div id="result" className="mt-4">
            {fancyTexts.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No fancy outputs yet. Start typing above to see generated styles.
              </p>
            )}

            <div className="mt-3">
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

          <Separator />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3">
              <Button
                onClick={loadMore}
                disabled={count >= 89}
                className="inline-flex items-center"
              >
                {count >= 89
                  ? `No More to Load.`
                  : `Load More (${fancyTexts.length} generated)`}
              </Button>

              <div className="text-sm text-muted-foreground">
                Generated: <strong>{fancyTexts.length}</strong>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Tip: Use the "Copy" button to copy an individual output.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylerPage;