import React from "react";

// IMPORTS
import type { Metadata } from "next";
import AboutPage from "@/components/pages/static/about";

// METADATA
export const metadata: Metadata = {
  title: "About | TextAnalyser",
  description:
    "Quickly design, analyze, and customize your text with our powerful and user-friendly tool. Enjoy features like advanced text editing, styling, and designing, all for free! Experience text design akin to Microsoft Word and more.",
  keywords:
    "text analyzer, text editor, text designer, free text editing tool, customize text, text styling, text design tool, powerful editor",
};

export default async function Home() {
  return <AboutPage />;
}
