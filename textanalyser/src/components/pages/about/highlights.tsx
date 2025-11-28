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
    color: "dark:from-blue-500 dark:to-cyan-500",
    lightColor: "from-blue-400 to-cyan-400",
  },
  {
    icon: <Wrench />,
    title: "Built to last",
    description:
      "Experience unmatched durability that goes above and beyond with lasting investment.",
    color: "dark:from-purple-500 dark:to-pink-500",
    lightColor: "from-purple-400 to-pink-400",
  },
  {
    icon: <ThumbsUp />,
    title: "Great user experience",
    description:
      "Integrate our product into your routine with an intuitive and easy-to-use interface.",
    color: "dark:from-green-500 dark:to-emerald-500",
    lightColor: "from-green-400 to-emerald-400",
  },
  {
    icon: <WandSparkles />,
    title: "Innovative functionality",
    description:
      "Stay ahead with features that set new standards, addressing your evolving needs better than the rest.",
    color: "dark:from-yellow-500 dark:to-orange-500",
    lightColor: "from-yellow-400 to-orange-400",
  },
  {
    icon: <Speech />,
    title: "Reliable support",
    description:
      "Count on our responsive customer support, offering assistance that goes beyond the purchase.",
    color: "dark:from-red-500 dark:to-pink-500",
    lightColor: "from-red-400 to-pink-400",
  },
  {
    icon: <TextSearch />,
    title: "Precision in every detail",
    description:
      "Enjoy a meticulously crafted product where small touches make a significant impact on your overall experience.",
    color: "dark:from-purple-500 dark:to-orange-500",
    lightColor: "from-orange-400 to-purple-400",
  },
];


export default function Highlights() {
  return (
    <section
      id="highlights"
      className="py-12 sm:py-16 bg-linear-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-8">
        {/* Section Header */}
        <div className="w-full text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-slate-900 dark:text-white">
            Highlights
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
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
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 p-6 transition-all duration-300 hover:shadow-lg dark:hover:shadow-sky-500/10 hover:shadow-slate-200 h-full flex flex-col"
            >
              {/* Gradient background overlay on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 bg-linear-to-br ${item.lightColor} ${item.color} transition-opacity duration-300`}
              ></div>

              {/* Light mode accent background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-3 bg-linear-to-br from-slate-100 to-slate-50 dark:hidden transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full gap-3">
                {/* Icon */}
                <div className="text-3xl opacity-80 group-hover:opacity-100 transition-opacity text-sky-600 dark:text-sky-400">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors leading-relaxed grow">
                  {item.description}
                </p>

                {/* Bottom accent bar */}
                <div className={`h-1 w-0 group-hover:w-full bg-linear-to-r ${item.lightColor} ${item.color} rounded-full transition-all duration-300 mt-auto`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}