"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";

export default function PostBody({ content }: { content: string }) {
  return (
    <div
      className="
        prose prose-slate prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-slate-700 prose-p:leading-relaxed prose-p:my-4
        prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-slate-900 prose-strong:font-semibold
        prose-code:text-violet-700 prose-code:bg-violet-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-slate-950 prose-pre:rounded-xl prose-pre:shadow-md
        prose-blockquote:border-l-violet-400 prose-blockquote:text-slate-600 prose-blockquote:not-italic
        prose-ul:my-4 prose-li:my-1
        prose-ol:my-4
        prose-img:rounded-xl prose-img:shadow-md
        prose-hr:border-slate-200
      "
    >
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
