"use client";
// DEFAULTS
import React, { useState, useEffect } from "react";

// NEXTJS IMPORTS
import { useServerInsertedHTML } from "next/navigation";

// EMOTION
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// MUI THEME
import MUI_THEME from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import type { Theme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";

// REACT TOAST
import { ToastContainer } from "react-toastify";

// WEB PANEL COMPONENT
import Navbar from "./layoutNav/appbar";
import Footer from "./layoutNav/footer";
import Preloader from "./layoutNav/preloader";

// ICONS
import { KeyboardArrowUpIcon } from "@/icon";

// UTILITIES
import useScrollTrigger from "@mui/material/useScrollTrigger";


// Scrool to Top Function Props
interface RegistryProps {
  options: any | undefined;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
  children: React.ReactNode;
}
// Scroll to Top
function ScrollTop(props: RegistryProps) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 40,
  });

  const handleClick = (event: any) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#nav"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };
  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

// THEME REGISTRY
export function ThemeRegistry(props: RegistryProps) {
  const { options, children } = props;

  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: any = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });
  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: options.prepend ? `@layer emotion {${styles}}` : styles,
        }}
      />
    );
  });
  return (
    <CacheProvider value={cache}>
      <ThemeProvider
        colorSchemeStorageKey="theme"
        defaultMode="system"
        theme={props.theme}
      >
        <CssBaseline />
        {InitColorSchemeScript({
          defaultMode: "system",
          modeStorageKey: "theme",
        })}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <div id="nav" aria-label="achor"></div>
        <Navbar />
        {children}
        <Footer />
        <ScrollTop {...props}>
          <Fab color="info" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </ThemeProvider>
    </CacheProvider>
  );
}

// MAIN
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = MUI_THEME;

  // Loading State
  const [PageLoading, setPageLoading] = useState(true);

  // Setting Theme
  useEffect(() => {
    if (typeof window.document !== "undefined") {
      setPageLoading(false);
    }
  }, [PageLoading]);

  return PageLoading ? (
    <Preloader />
  ) : (
    <ThemeRegistry options={{ key: "mui" }} theme={theme}>
      {children}
    </ThemeRegistry>
  );
}
