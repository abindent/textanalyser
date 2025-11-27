import React from "react";

// IMPORTS
import type { Metadata } from "next";
import Showcase from "@/components/pages/showcase";

// METADATA
export const metadata: Metadata = {
  title: "Showcase | TextAnalyser",
  description: "This page is for showcasing the important codes.",
  verification: {
    google: "RxEp4MDwAJu9fHlP-U2MIdzjSqTIi7eCyyF7kj8oAnc",
  },
};

export default async function Home() {
  return <Showcase />;
}