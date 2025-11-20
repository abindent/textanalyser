"use client";
import * as React from "react";
import Intro from "./intro";
import Highlights from "./highlights";

export default function About() {
  return (
    <div>
      <section
        id="hero"
        className="w-full h-full bg-linear-to-b from-[#CEE5FD] to-white dark:from-[#02294F] dark:to-transparent bg-size-[100%_20%] bg-no-repeat"
      >
        <Intro />
        <Highlights />
      </section>
    </div>
  );
}