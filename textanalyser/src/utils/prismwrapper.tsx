"use client";
// REACT
import * as React from "react";

// PRISMJS
import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/components/prism-typescript";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/autolinker/prism-autolinker";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";

// FOR STATIC PRISM CODEBLOCK
export default function PRISMLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    Prism.highlightAll();
  }, [children]);
  return <div className="prism-codeblock">{children}</div>;
}
