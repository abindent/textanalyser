import React from "react";

// IMPORTS
import type { Metadata } from "next";
import Showcase from "@/components/pages/static/showcase";

// METADATA
export const metadata: Metadata = {
  title: "Showcase | TextAnalyser",
  description:
    "This page is for showcasing the important codes.",
};

export default async function Home() {
  return <Showcase />;
}
