"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

// ICONS
import {
  Settings,
  Wrench,
  ThumbsUp,
  
  WandSparkles,
  TextSearch,
  Speech,
} from "lucide-react";

const items = [
  {
    icon: <Settings />,
    title: "Adaptable performance",
    description:
      "Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.",
  },
  {
    icon: <Wrench />,
    title: "Built to last",
    description:
      "Experience unmatched durability that goes above and beyond with lasting investment.",
  },
  {
    icon: <ThumbsUp />,
    title: "Great user experience",
    description:
      "Integrate our product into your routine with an intuitive and easy-to-use interface.",
  },
  {
    icon: <WandSparkles />,
    title: "Innovative functionality",
    description:
      "Stay ahead with features that set new standards, addressing your evolving needs better than the rest.",
  },
  {
    icon: <Speech />,
    title: "Reliable support",
    description:
      "Count on our responsive customer support, offering assistance that goes beyond the purchase.",
  },
  {
    icon: <TextSearch />,
    title: "Precision in every detail",
    description:
      "Enjoy a meticulously crafted product where small touches make a significant impact on your overall experience.",
  },
];

export default function Highlights() {
  return (
    <section
      id="highlights"
      className="pt-8 sm:pt-12 pb-8 sm:pb-16 text-white bg-[#06090a]"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
        <div className="w-full sm:w-4/5 md:w-3/5 text-left md:text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">Highlights</h2>
          <p className="mt-2 text-sm text-slate-300">
            Explore why our product stands out: adaptability, durability,
            user-friendly design, and innovation. Enjoy reliable customer
            support and precision in every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {items.map((item, index) => (
            <article
              key={index}
              className="flex flex-col gap-3 p-4 h-full border border-slate-800 bg-slate-900/50 rounded-lg"
            >
              <div className="opacity-60 text-2xl">{item.icon}</div>
              <div>
                <h3 className="font-medium text-lg">{item.title}</h3>
                <p className="text-sm text-slate-400 mt-1">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}