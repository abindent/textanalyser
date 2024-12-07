import type { Metadata } from "next";
// CSS FILE CONFIG
import "./globals.css";

// REACT TOAST
import "react-toastify/ReactToastify.css";

// FONTAWESOME
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// FONTAWESOME CONFIG
config.autoAddCss = false;

// NEXTJS MATERIAL UI APP ROUTER VERSION
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

// LAYOUT IMPORT
import Layout from "@/layout/layout";

export const metadata: Metadata = {
  title: "TextAnalyser",
  description:
    "Just wanna to analyse your text? Come here and start analyzing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <Layout>{children}</Layout>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
