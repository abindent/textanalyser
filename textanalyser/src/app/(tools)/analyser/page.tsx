import React from "react";

// IMPORTS
import type { Metadata } from "next";
import AnalyserPage from "@/components/pages/tools/analyser";

// METADATA
export const metadata: Metadata = {
  title: "Analyser | TextAnalyser",
  description:
    "This page is for analying your texts which in coding is known as string.",
};

export default async function Home() {
  return <AnalyserPage />;
}
