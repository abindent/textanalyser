"use client";
import * as React from "react";
import Intro from "./intro";
import Features from "./features";
import Highlights from "./hightlights";

export default function Home() {
  return (
    <div>
      <section className="w-full h-full bg-size-[100%_20%] bg-no-repeat dark:bg-size-[100%_20%]">
        <Intro />
        <Features />
        <Highlights />
      </section>
    </div>
  );
}