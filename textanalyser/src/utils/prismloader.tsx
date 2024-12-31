"use client";

// REACT
import * as React from "react";

// PRISMJS
import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/components/prism-typescript";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/autolinker/prism-autolinker.css";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/autolinker/prism-autolinker";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";


export default function PRISMLoader({
  children,
  language,
}: {
  children: React.ReactNode;
  language: string;
}) {

  React.useEffect(() => {
      Prism.highlightAll();
  }, [children]);

  return (
    <pre className={`language-${language} line-numbers`}>
      <code>{children}</code>
    </pre>
  );
}