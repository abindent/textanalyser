"use client";
// COMPONENTS
import DeskTopVersion from "./desktop";
import MobileVersion from "./mobile";

// MUI THEME
import { useMediaQuery, useTheme } from "@mui/material";

export default function Navbar() {
  // THEME
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  return (
    <div>
      {isMobile ? (
        <MobileVersion />
      ) : (
        <DeskTopVersion />
      )}
    </div>
  );
};