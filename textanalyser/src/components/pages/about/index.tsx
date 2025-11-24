"use client";
import * as React from "react";
import Intro from "./intro";
import Highlights from "./highlights";


export default function About() {
  return (
    <div>
      {/* Intro Section */}
      <Intro />

      {/* Highlights Section - Dark Card Style */}
      <div className="w-full px-4 mx-auto mb-12">
        <Highlights />
      </div>
    </div>
  );
}