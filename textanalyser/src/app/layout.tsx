import type { Metadata } from "next";
// CSS FILE CONFIG
import "./globals.css";

// FONTS
import { GeistSans } from "geist/font/sans";

// FONTAWESOME
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// PRISM
import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/autolinker/prism-autolinker.css";

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
  verification: {
    google: "RxEp4MDwAJu9fHlP-U2MIdzjSqTIi7eCyyF7kj8oAnc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
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
