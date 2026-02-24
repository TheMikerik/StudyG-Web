import Link from "next/link";
import { CATEGORIES } from "@/lib/posts";
import { categoryToSlug } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">S</span>
              </div>
              <span className="font-bold text-slate-900">StudyG Blog</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Evidence-based study tips, memory science, and flashcard guides to
              help you learn faster and remember more.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Categories
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/blog/category/${categoryToSlug(cat)}`}
                    className="text-sm text-slate-500 hover:text-violet-600 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-slate-500 hover:text-violet-600 transition-colors"
                >
                  All Posts
                </Link>
              </li>
              <li>
                <a
                  href="https://studyg.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 hover:text-violet-600 transition-colors"
                >
                  StudyG App
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} StudyG. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            AI-powered content, daily updates.
          </p>
        </div>
      </div>
    </footer>
  );
}
