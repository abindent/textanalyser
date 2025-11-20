"use client";
import * as React from "react";
import PRISMLoader from "@/lib/prismwrapper";

export default function Showcase() {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 mt-12 rounded-md transition-all duration-300">
        <h2 className="text-center text-2xl font-semibold mb-6">Analyser</h2>
        <PRISMLoader>
          <h3 className="text-lg font-medium">Analyser</h3>
          <pre className="line-numbers" data-src="/showcase/scripts/analyser.ts"></pre>
          <br />
          <h3 className="text-lg font-medium">Extension</h3>
          <pre className="line-numbers" data-src="/showcase/scripts/extensions.ts"></pre>
          <br />
          <h2 className="text-center text-2xl font-semibold mt-8">Styler</h2>
          <h3 className="text-lg font-medium">Lunicode</h3>
          <pre className="line-numbers" data-src="/showcase/scripts/styler/lunicode.ts"></pre>
          <h3 className="text-lg font-medium">Fancy Font Generator</h3>
          <pre className="line-numbers" data-src="/showcase/scripts/styler/styler.ts"></pre>
          <br />
        </PRISMLoader>
      </div>
    </div>
  );
}