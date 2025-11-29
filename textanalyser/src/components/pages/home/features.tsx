"use client";
import * as React from "react";
import Image from "next/image";
import { SquarePen, EditIcon } from "lucide-react";

export default function Features() {
  const items = [
    {
      icon: <SquarePen />,
      title: "Text Analyser",
      description: "Here you can analyse your texts.",
      imageLight: "/resources/light/text-analyser.png",
      imageDark: "/resources/dark/text-analyser.png",
    },
    {
      icon: <EditIcon />,
      title: "Styler (Fancy Font)",
      description:
        "This utility adds different fancy characters to crazify (beautify) your text.",
      imageLight: "/resources/light/font-generation.png",
      imageDark: "/resources/dark/font-generation.png",
    },
  ];
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <section id="features" className="py-8 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Product features</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            Our web app features different utilities for your texts. Here you
            can analyse texts, extract urls from them and can even crazify your
            plain texts.
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {items.map(({ title }, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(index)}
                className={`cursor-pointer px-3 py-1 rounded-full border ${
                  selectedItemIndex === index
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                }`}
              >
                {title}
              </button>
            ))}
          </div>

          {/* Mobile preview (visible on small screens) */}
          <div className="mt-4 md:hidden bg-transparent rounded-lg overflow-hidden border">
            <div className="h-44 bg-center bg-no-repeat bg-contain">
              <div className="relative w-full h-44">
                <Image
                  src={
                    typeof window !== "undefined" &&
                    document.documentElement.classList.contains("dark")
                      ? selectedFeature.imageDark
                      : selectedFeature.imageLight
                  }
                  alt={selectedFeature.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="p-3">
              <p className="font-semibold">{selectedFeature.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {selectedFeature.description}
              </p>
            </div>
          </div>

          {/* Desktop list */}
          <div className="hidden md:flex flex-col gap-3 mt-4">
            {items.map(({ icon, title, description }, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(index)}
                className={`cursor-pointer flex gap-4 items-center p-4 rounded-lg border ${
                  selectedItemIndex === index
                    ? "bg-slate-50/30 dark:bg-slate-700/60 border-sky-500"
                    : "bg-transparent border-slate-200 dark:border-slate-800"
                }`}
              >
                <div
                  className={`text-2xl ${
                    selectedItemIndex === index ? "text-sky-500" : "text-slate-400"
                  }`}
                >
                  {icon}
                </div>
                <div className="text-left">
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center">
          <div className="w-full h-80 bg-white/5 rounded-lg border overflow-hidden relative pointer-events-none">
            <Image
              src={selectedFeature.imageLight}
              alt={selectedFeature.title}
              fill
              className="object-contain block dark:hidden"
            />
            <Image
              src={selectedFeature.imageDark}
              alt={selectedFeature.title}
              fill
              className="object-contain hidden dark:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}