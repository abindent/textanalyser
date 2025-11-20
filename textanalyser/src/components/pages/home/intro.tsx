"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { CodeIcon, ChevronRight } from "lucide-react";

export default function Intro() {
  return (
    <section className="container mx-auto px-4 flex flex-col items-center pt-14 sm:pt-20 pb-8 sm:pb-12">
      <div className="w-full max-w-4xl">
        <h1 className="text-center text-3xl md:text-4xl font-medium mb-4">
          A new way to crazify your texts{" "}
          <span className="text-sky-500">- TextAnalyser</span>
        </h1>

        <p className="text-center text-slate-600 dark:text-slate-300 mb-4 max-w-3xl mx-auto">
          Welcome to TextAnalyser! Step into a world where your words come
          alive. Refine, enhance, style, and design your text effortlessly with
          this powerful tool. Unleash your creativity, explore text analysis,
          and make every word count.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 justify-center mb-6">
          <Link href="/tools/analyser" className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg">
            <ChevronRight />
            Start now
          </Link>

          <a
            href="https://github.com/abindent/textanalyser"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg"
          >
            <CodeIcon />
            Get Code
          </a>
        </div>
      </div>

      {/* Decorative image / mock */}
      <div className="w-full mt-6">
        {/* For theme-aware imagery use two images toggled by dark: utility */}
        <div className="rounded-xl overflow-hidden relative mx-auto w-full h-64 sm:h-96 shadow-lg border">
          <Image
            src="/resources/light/txt-analyser.png"
            alt="Text analyser light"
            fill
            className="object-cover block dark:hidden"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <Image
            src="/resources/dark/txt-analyser.png"
            alt="Text analyser dark"
            fill
            className="object-cover hidden dark:block"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}