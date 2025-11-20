"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Intro() {
  return (
    <section className="flex flex-col items-center pt-14 sm:pt-20 pb-8 sm:pb-12">
      <div className="mb-2 text-center w-full sm:text-left md:text-center">
        <h2 className="text-2xl font-semibold">ABOUT</h2>
      </div>

      <div className="w-full sm:w-11/12 md:w-2/3 lg:w-1/2 bg-white/5 dark:bg-slate-800 rounded-xl shadow-md flex flex-col items-center overflow-hidden">
        <div className="py-8">
          {/* Show light / dark versions of the image depending on theme */}
          <div className="block dark:hidden">
            <Image
              src="/icon.png"
              alt="TextAnalyser"
              width={160}
              height={160}
              className="object-contain"
            />
          </div>
          <div className="hidden dark:block">
            <Image
              src="/icon.png"
              alt="TextAnalyser"
              width={160}
              height={160}
              className="object-contain"
            />
          </div>
        </div>

        <div className="px-6 py-4 w-full">
          <h3 className="text-center text-2xl text-slate-700 dark:text-slate-300 mb-2">
            About Us
          </h3>

          <p className="text-center text-lg mb-2">
            Welcome to the Powerful Text Analyzer, Editor, and Designer Tool!
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
            Our tool is a comprehensive solution for all your text editing and
            design needs. Whether you're crafting a professional document,
            styling creative content, or analyzing text for improvements, we’ve
            got you covered!
          </p>

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            <strong>Why Choose TextAnalyser ?</strong>
          </p>

          <div className="mt-2 space-y-2 text-sm">
            <div>
              <strong>1. Easy to Use:</strong> Intuitive design for
              hassle-free text editing and designing.
            </div>
            <div>
              <strong>2. Feature-Rich:</strong> Packed with advanced features
              that rival many text analysing services.
            </div>
            <div>
              <strong>3. Versatile Design Options:</strong> Customize your text
              with fonts, colors, and layouts tailored to your style.
            </div>
            <div>
              <strong>4. Completely Free:</strong> Enjoy premium-quality text
              editing without spending a dime.
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            <Link
              href="https://github.com/abindent/textanalyser"
              target="_blank"
              className="text-sky-500 hover:underline"
            >
              Join the Community Today!
            </Link>
            <br />
            <span>
              Experience the power of effortless text editing and design today!
              Let’s create something amazing together.. 🚀
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}