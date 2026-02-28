"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";

export default function PostBody({ content }: { content: string }) {
  return (
    <div
      className="
        prose prose-invert prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:my-4
        prose-a:text-gray-200 prose-a:no-underline hover:prose-a:text-white hover:prose-a:underline
        prose-strong:text-white prose-strong:font-semibold
        prose-code:text-gray-200 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl
        prose-blockquote:border-l-white/20 prose-blockquote:text-gray-400 prose-blockquote:not-italic
        prose-ul:my-4 prose-li:my-1 prose-li:text-gray-300
        prose-ol:my-4
        prose-img:rounded-2xl
        prose-hr:border-white/10
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
