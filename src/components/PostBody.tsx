"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";

export default function PostBody({ content }: { content: string }) {
  return (
    <div
      className="
        prose prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-black prose-headings:tracking-tight
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-4
        prose-a:text-gray-800 prose-a:no-underline hover:prose-a:text-black hover:prose-a:underline
        prose-strong:text-black prose-strong:font-semibold
        prose-code:text-gray-800 prose-code:bg-black/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-[#f9fafb] prose-pre:border prose-pre:border-black/10 prose-pre:rounded-2xl
        prose-blockquote:border-l-black/20 prose-blockquote:text-gray-500 prose-blockquote:not-italic
        prose-ul:my-4 prose-li:my-1 prose-li:text-gray-700
        prose-ol:my-4
        prose-img:rounded-2xl
        prose-hr:border-black/10
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
