'use client';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * @component MarkdownRenderer
 * @summary Renders markdown with support for HTML, code highlighting, and custom styling
 * @param {string} content - Markdown content to render
 * @param {string} className - Optional CSS classes
 */
export default function MarkdownRenderer({
  content = '',
  className = '',
}: MarkdownRendererProps) {
  return (
    <div
      className={`prose prose-invert prose-sm max-w-none
        prose-headings:text-slate-100 prose-headings:font-bold
        prose-p:text-slate-300 prose-p:leading-relaxed
        prose-strong:text-slate-100 prose-strong:font-semibold
        prose-em:text-slate-200 prose-em:italic
        prose-code:text-emerald-400 prose-code:bg-slate-900 prose-code:px-1. 5 prose-code:py-0. 5 prose-code:rounded
        prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700
        prose-blockquote:border-l-indigo-500 prose-blockquote:text-slate-400
        prose-a:text-indigo-400 prose-a:underline hover:prose-a:text-indigo-300
        prose-ul:text-slate-300 prose-ul:space-y-1
        prose-ol:text-slate-300 prose-ol:space-y-1
        prose-li:marker:text-indigo-400
        prose-hr:border-slate-700
        prose-table:border-collapse prose-table:w-full
        prose-th:bg-slate-800 prose-th:text-slate-100 prose-th:border prose-th:border-slate-700 prose-th:px-3 prose-th:py-2
        prose-td:border prose-td:border-slate-700 prose-td:px-3 prose-td:py-2 prose-td:text-slate-300
        ${className}
      `}
    >
      <ReactMarkdown
        rehypePlugins={[
          rehypeRaw,
          [
            rehypeHighlight,
            {
              detect: true,
              prefix: 'hljs-',
            },
          ],
        ]}
        components={{
          // Custom renderers for better styling
          h1: ({ node, ... props }) => (
            <h1 className="text-2xl font-bold mt-4 mb-2 text-slate-100" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-bold mt-3 mb-2 text-slate-100" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-bold mt-2 mb-1 text-slate-100" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }: any) => (
            <code
              className={`${
                inline
                  ? 'bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded font-mono text-sm'
                  : `block bg-slate-900 text-slate-200 p-3 rounded-lg overflow-x-auto font-mono text-sm border border-slate-700 my-2`
              }`}
              {... props}
            >
              {children}
            </code>
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-indigo-500 pl-4 py-1 my-2 italic text-slate-400 bg-indigo-500/10 rounded-r"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside my-2 space-y-1 text-slate-300" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside my-2 space-y-1 text-slate-300" {... props} />
          ),
          li: ({ node, ...props }) => <li className="ml-2" {...props} />,
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4 rounded-lg border border-slate-700">
              <table className="w-full border-collapse" {...props} />
            </div>
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-indigo-400 hover:text-indigo-300 underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {... props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}