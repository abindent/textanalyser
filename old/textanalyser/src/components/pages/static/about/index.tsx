"use client";
// REACT AND NEXTJS
import * as React from "react";
// MUI
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";

// EXTERNAL COMPONENTS
import Intro from "./intro";
import Highlights from "./highlights";

export default function About() {
  return (
    <div>
      <Box
        id="hero"
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          backgroundImage:
            theme.palette.mode === "light"
              ? "linear-gradient(180deg, #CEE5FD, #FFF)"
              : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
        })}
      >
        <Intro />
        <Highlights />
      </Box>
    </div>
  );
}