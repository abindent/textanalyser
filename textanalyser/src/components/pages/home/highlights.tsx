"use client";
import * as React from "react";
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
    icon: <Settings className="w-6 h-6" />,
    title: "Adaptable performance",
    description:
      "Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Built to last",
    description:
      "Experience unmatched durability that goes above and beyond with lasting investment.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <ThumbsUp className="w-6 h-6" />,
    title: "Great user experience",
    description:
      "Integrate our product into your routine with an intuitive and easy-to-use interface.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <WandSparkles className="w-6 h-6" />,
    title: "Innovative functionality",
    description:
      "Stay ahead with features that set new standards, addressing your evolving needs better than the rest.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <Speech className="w-6 h-6" />,
    title: "Reliable support",
    description:
      "Count on our responsive customer support, offering assistance that goes beyond the purchase.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: <TextSearch className="w-6 h-6" />,
    title: "Precision in every detail",
    description:
      "Enjoy a meticulously crafted product where small touches make a significant impact on your overall experience.",
    color: "from-indigo-500 to-purple-500",
  },
];

export default function Highlights() {
  // State for tracking which card is hovered
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <section
      id="highlights"
      className="py-12 sm:py-16 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:to-slate-900 text-white"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-8">
        {/* Section Header */}
        <div className="w-full text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Highlights</h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Explore why our product stands out: adaptability, durability,
            user-friendly design, and innovation. Enjoy reliable customer support
            and precision in every detail.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {items.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden rounded-xl bg-slate-800/50 dark:bg-slate-900/50 border border-slate-700/50 dark:border-slate-800/50 hover:border-slate-600 dark:hover:border-slate-700 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/10 dark:hover:shadow-sky-500/20 h-full flex flex-col cursor-pointer"
            >
              {/* Gradient background on hover - only for hovered card */}
              <div
                className={`absolute inset-0 opacity-0 ${
                  hoveredIndex === index
                    ? "opacity-15 dark:opacity-20"
                    : "opacity-0"
                } bg-linear-to-br ${item.color} transition-opacity duration-300`}
              ></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full gap-3">
                {/* Icon */}
                <div
                  className={`text-3xl transition-all duration-300 ${
                    hoveredIndex === index
                      ? "opacity-100 text-sky-200"
                      : "opacity-80 text-sky-400"
                  }`}
                >
                  {item.icon}
                </div>

                {/* Title */}
                <h3
                  className={`text-base sm:text-lg font-bold transition-colors duration-300 ${
                    hoveredIndex === index ? "text-sky-200" : "text-white"
                  }`}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-xs sm:text-sm leading-relaxed grow transition-colors duration-300 ${
                    hoveredIndex === index
                      ? "text-slate-200 dark:text-slate-300"
                      : "text-slate-300 dark:text-slate-400"
                  }`}
                >
                  {item.description}
                </p>

                {/* Bottom accent bar - animates only on hover */}
                <div
                  className={`h-1 rounded-full bg-linear-to-r ${item.color} transition-all duration-300 mt-auto ${
                    hoveredIndex === index ? "w-full" : "w-0"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}