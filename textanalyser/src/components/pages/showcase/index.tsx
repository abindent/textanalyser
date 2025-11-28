"use client";

import PRISMLoader from "@/lib/prismwrapper";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Code2, Zap, Type } from "lucide-react";

export default function Showcase() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="py-12 px-4 text-center">
        <div className="max-w-6xl  mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              TextAnalyser
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Comprehensive text analysis toolkit with powerful extensions
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <PRISMLoader>
          {/* ===== ANALYSER SECTION ===== */}
          <section className="mb-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-indigo-600 dark:bg-indigo-400 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                Analyser
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Core text analysis engine with comprehensive operation support
            </p>
            <Card className="bg-slate-900 border-slate-700 shadow-lg overflow-hidden">
              <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-medium text-slate-300">analyser.ts</span>
              </div>
              <div className="overflow-x-auto">
                <pre className="line-numbers p-4 text-sm" data-src="/showcase/scripts/analyser.ts"></pre>
              </div>
            </Card>
          </section>

          {/* ===== EXTENSION SECTION ===== */}
          <section className="mb-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                Extensions
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Advanced sentiment analysis, text summarization, readability metrics, language detection & more
            </p>
            <Card className="bg-slate-900 border-slate-700 shadow-lg overflow-hidden">
              <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-medium text-slate-300">extensions.ts</span>
              </div>
              <div className="overflow-x-auto">
                <pre className="line-numbers p-4 text-sm" data-src="/showcase/scripts/extensions.ts"></pre>
              </div>
            </Card>
          </section>

          {/* ===== DIVIDER ===== */}
          <Separator className="my-12 bg-slate-300 dark:bg-slate-700" />

          {/* ===== STYLER SECTION HEADER ===== */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <Type className="w-8 h-8 text-pink-600 dark:text-pink-400" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                Styler
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Advanced text styling and transformation utilities
            </p>
          </div>

          {/* ===== LUNICODE SECTION ===== */}
          <section className="mb-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-pink-500 dark:bg-pink-400 rounded-full"></div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                Lunicode
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 ml-4">
              Unicode character transformations and text styling
            </p>
            <Card className="bg-slate-900 border-slate-700 shadow-lg overflow-hidden">
              <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-medium text-slate-300">styler/lunicode.ts</span>
              </div>
              <div className="overflow-x-auto">
                <pre className="line-numbers p-4 text-sm" data-src="/showcase/scripts/styler/lunicode.ts"></pre>
              </div>
            </Card>
          </section>

          {/* ===== FANCY FONT GENERATOR SECTION ===== */}
          <section className="mb-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-pink-500 dark:bg-pink-400 rounded-full"></div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                Fancy Font Generator
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 ml-4">
              Transform text with various fancy fonts and styles
            </p>
            <Card className="bg-slate-900 border-slate-700 shadow-lg overflow-hidden">
              <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-medium text-slate-300">styler/styler. ts</span>
              </div>
              <div className="overflow-x-auto">
                <pre className="line-numbers p-4 text-sm" data-src="/showcase/scripts/styler/styler.ts"></pre>
              </div>
            </Card>
          </section>

          {/* ===== FOOTER ===== */}
          <div className="mt-16 pt-8 border-t border-slate-300 dark:border-slate-700 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Explore the full source code on{" "}
              <a
                href="https://github.com/abindent/textanalyser"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                GitHub
              </a>
            </p>
          </div>
        </PRISMLoader>
      </div>
    </div>
  );
}