"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          <span className="font-bold text-slate-900">
            StudyG{" "}
            <span className="text-violet-600 font-semibold">Blog</span>
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === "/"
                ? "text-violet-700 bg-violet-50"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              pathname.startsWith("/blog")
                ? "text-violet-700 bg-violet-50"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Blog
          </Link>
          <a
            href="https://studyg.app"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 hidden sm:inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-colors"
          >
            Try StudyG →
          </a>
        </div>
      </nav>
    </header>
  );
}
