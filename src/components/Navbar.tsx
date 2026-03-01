"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center border border-black/10 group-hover:border-black/20 transition-colors">
            <span className="text-black font-bold text-sm">S</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-black">
            StudyG
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${pathname === "/" ? "text-black" : "text-gray-500 hover:text-black"
              }`}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors ${pathname.startsWith("/blog")
                ? "text-black"
                : "text-gray-500 hover:text-black"
              }`}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors ${pathname === "/about" ? "text-black" : "text-gray-500 hover:text-black"
              }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors ${pathname === "/contact" ? "text-black" : "text-gray-500 hover:text-black"
              }`}
          >
            Contact
          </Link>
          <a
            href="https://apps.apple.com/app/id6741184646?inviteCode=BFLMPSVZ4"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-transform transform hover:scale-105"
          >
            Download
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-black p-2"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile fullscreen overlay — matches original site pattern */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <button
          className="absolute top-6 right-6 text-black p-2"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <Link href="/" className="text-2xl font-medium text-black" onClick={() => setMobileOpen(false)}>Home</Link>
        <Link href="/blog" className="text-2xl font-medium text-black" onClick={() => setMobileOpen(false)}>Blog</Link>
        <Link href="/about" className="text-2xl font-medium text-black" onClick={() => setMobileOpen(false)}>About</Link>
        <Link href="/contact" className="text-2xl font-medium text-black" onClick={() => setMobileOpen(false)}>Contact</Link>
        <a
          href="https://apps.apple.com/app/id6741184646?inviteCode=BFLMPSVZ4"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl font-medium text-black"
          onClick={() => setMobileOpen(false)}
        >
          Download
        </a>
      </div>
    </header>
  );
}
