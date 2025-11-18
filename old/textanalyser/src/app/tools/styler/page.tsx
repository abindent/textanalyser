import React from "react";

// IMPORTS
import type { Metadata } from "next";
import StylerPage from "@/components/pages/tools/styler";

// METADATA
export const metadata: Metadata = {
  title: "Styler | TextAnalyser",
  description: "This page is for styling your texts.",
  verification: {
    google: "RxEp4MDwAJu9fHlP-U2MIdzjSqTIi7eCyyF7kj8oAnc",
  },
};

export default async function Home() {
  return <StylerPage />;
}
