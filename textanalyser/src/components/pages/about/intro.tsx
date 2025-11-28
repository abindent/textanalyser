"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Intro() {
  return (
    <section className="w-full flex flex-col items-center pt-14 sm:pt-20 pb-8 sm:pb-12 px-4">
      {/* Section Title */}
      <div className="mb-6 text-center w-full">
        <h2 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-200 bg-clip-text text-transparent">
          ABOUT
        </h2>
      </div>

      {/* Main Card Container - Full Width */}
      <div className="w-full bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 dark:border-slate-700/40 overflow-hidden hover:shadow-3xl hover:border-white/60 dark:hover:border-slate-600/60 transition-all duration-300">
        {/* Image Section */}
        <div className="w-full py-8 px-6 bg-linear-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 flex justify-center items-center">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <Image
              src="/icon.png"
              alt="TextAnalyser Logo"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full px-6 sm:px-8 py-8 space-y-4">
          {/* Main Heading */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-sky-600 dark:text-sky-400 mb-2">
              About Us
            </h3>
            <div className="h-1 w-16 bg-linear-to-r from-sky-500 to-blue-500 rounded-full"></div>
          </div>

          {/* Intro Text */}
          <div className="space-y-3 pt-4">
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Welcome to the Powerful Text Analyzer, Editor, and Designer Tool!
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Our tool is a comprehensive solution for all your text editing and
              design needs. Whether you're crafting a professional document,
              styling creative content, or analyzing text for improvements,
              we've got you covered!
            </p>
          </div>

          {/* Why Choose Section */}
          <div className="pt-6">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4">
              Why Choose TextAnalyser?
            </h4>

            <div className="space-y-3">
              {[
                {
                  title: "Easy to Use",
                  desc: "Intuitive design for hassle-free text editing and designing.",
                },
                {
                  title: "Feature-Rich",
                  desc: "Packed with advanced features that rival many text analysing services.",
                },
                {
                  title: "Versatile Design Options",
                  desc: "Customize your text with fonts, colors, and layouts tailored to your style.",
                },
                {
                  title: "Completely Free",
                  desc: "Enjoy premium-quality text editing without spending a dime.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <span className="text-sky-500 dark:text-sky-400 font-bold shrink-0 w-6">
                    ✓
                  </span>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100">
                      {item.title}:
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3">
              <span className="font-semibold">Ready to get started?</span>
            </p>
            <Link
              href="https://github.com/abindent/textanalyser"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
            >
              Join the Community
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Experience the power of effortless text editing and design today!
              Let's create something amazing together. 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}