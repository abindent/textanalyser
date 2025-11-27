"use client";

import {  MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";

interface DisqusEmbedProps {
      shortname: string;
      identifier: string;
      title?: string;
      url?: string;
      language?: string;
      height?: string | number;
}

/**
 * DisqusEmbed — writes the Disqus embed HTML into a sandboxed iframe.
 * This isolates Disqus from the parent page CSS (prevents OKLCH/LAB parse errors).
 *
 * Usage:
 * <DisqusEmbed shortname={SHORTNAME} identifier={pageId} title={pageTitle} url={pageUrl} />
 */
export default function DisqusEmbed({
      shortname,
      identifier,
      title = "",
      url = typeof window !== "undefined" ? window.location.href : "",
      language = "en_US",
      height = "600px",
}: DisqusEmbedProps) {
      const iframeRef = useRef<HTMLIFrameElement | null>(null);

      useEffect(() => {
            const iframe = iframeRef.current;
            if (!iframe) return;

            // Build the HTML that will live inside the iframe
            const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      /* minimal reset inside iframe */
      html,body { margin:0; padding:0; min-height:100%; }
      #disqus_thread { width:100%; }
    </style>
  </head>
  <body>
    <div id="disqus_thread"></div>
    <script>
      var disqus_config = function () {
        this.page.url = ${JSON.stringify(url)};
        this.page.identifier = ${JSON.stringify(identifier)};
        this.page.title = ${JSON.stringify(title)};
        this.language = ${JSON.stringify(language)};
      };
      (function() {
        var d = document, s = d.createElement('script');
        s.src = 'https://${shortname}.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        s.async = true;
        s.defer = true;
        d.head.appendChild(s);
      })();
    </script>
    <noscript>Please enable JavaScript to view the comments.</noscript>
  </body>
</html>`;

            // Write into the iframe document
            try {
                  const doc = iframe.contentWindow?.document;
                  if (!doc) return;
                  doc.open();
                  doc.write(html);
                  doc.close();
            } catch (e) {
                  // Cross-origin or other issues — fallback: set srcdoc where supported
                  try {
                        iframe.setAttribute("srcdoc", html);
                  } catch (err) {
                        // Last resort: set src to data URI (may be blocked on some browsers)
                        iframe.src = "data:text/html;charset=utf-8," + encodeURIComponent(html);
                  }
            }
      }, [shortname, identifier, title, url, language]);

      return (
            <div className="relative w-full">
                  {/* Header */}
                  <div className="flex items-center gap-3 px-6 py-4 border-b rounded-t-xl transition-all duration-300 dark:bg-linear-to-r dark:from-slate-800 dark:to-slate-900 dark:border-slate-700 bg-linear-to-r from-slate-50 to-slate-100 border-slate-200">                
                        <div className="p-2 rounded-lg shadow-sm transition-transform duration-300 hover:scale-110 hover:rotate-3 dark:bg-slate-700 bg-white">
                              <MessageSquare className={`w-5 h-5 dark:text-indigo-400' : 'text-indigo-600'}`} />
                        </div>
                        <div>
                              <h3 className="text-lg font-semibold dark:text-slate-100 text-slate-800">
                                    Comments
                              </h3>
                              <p className="text-sm dark:text-slate-400 text-slate-600">
                                    Join the conversation
                              </p>
                        </div>
                  </div>

                  
                  {/* Iframe Container */}
                  <div className="not-first-of-type:relative rounded-b-xl shadow-lg overflow-hidden border dark:bg-slate-900 dark:border-slate-700 bg-white border-slate-200">
                        <iframe
                              ref={iframeRef}
                              title="Disqus comments"
                              style={{
                                    width: "100%",
                                    height,
                                    border: "none",
                                    display: "block",
                                    minHeight: "400px"
                              }}
                              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
                              className="transition-opacity duration-500"
                        />
                  </div>

                  {/* Decorative Bottom Border */}
                  <div className="h-1 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-xl"></div>
            </div>
      );
}