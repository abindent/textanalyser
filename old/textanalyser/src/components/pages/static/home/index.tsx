"use client";
// REACT AND NEXTJS
import * as React from "react";
// MUI
import Box from "@mui/material/Box";

// EXTERNAL COMPONENTS
import Intro from "./intro";
import Features from "./features";
import Highlights from "./highlights";

export default function Home() {
  return (
    <div>
      <Box
        id="hero"
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          backgroundImage:
            theme.palette.mode === "light"
              ? "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)"
              : `radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)`,
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
        })}
      >
        <Intro />
        <Features/>
        <Highlights/>
      </Box>
    </div>
  );
}