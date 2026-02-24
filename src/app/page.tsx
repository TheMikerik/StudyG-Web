import Link from "next/link";
import { getPosts, CATEGORIES } from "@/lib/posts";
import { categoryToSlug } from "@/lib/utils";
import PostCard from "@/components/PostCard";
import CategoryBadge from "@/components/CategoryBadge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StudyG Blog — Study Smarter, Remember More",
  description:
    "Evidence-based study tips, memory science, and flashcard guides. Learn how to study smarter with spaced repetition — updated daily.",
};

export default async function HomePage() {
  const posts = await getPosts(6);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-violet-50 via-white to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 bg-violet-50 border border-violet-100 rounded-full px-3 py-1 mb-6">
            ✦ New post every day
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight">
            Study Smarter,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
              Remember More
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Evidence-based study tips, memory science, and flashcard guides —
            written daily to help you learn anything faster and retain it for
            longer.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/blog"
              className="px-7 py-3 rounded-full font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-colors text-sm"
            >
              Browse all posts
            </Link>
            <a
              href="https://studyg.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full font-semibold border border-slate-200 text-slate-700 hover:border-violet-300 hover:text-violet-700 transition-colors bg-white text-sm"
            >
              Get StudyG free →
            </a>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/blog/category/${categoryToSlug(cat)}`}
              className="shrink-0 hover:scale-105 transition-transform"
            >
              <CategoryBadge category={cat} />
            </Link>
          ))}
        </div>
      </section>

      {/* Latest posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Latest Posts</h2>
          <Link
            href="/blog"
            className="text-sm text-violet-600 font-medium hover:text-violet-800 transition-colors"
          >
            View all →
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg font-medium">No posts yet.</p>
            <p className="text-sm mt-1">
              Check back soon — posts are generated daily.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* CTA banner */}
      <section className="bg-gradient-to-r from-violet-600 to-purple-700 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to put it into practice?
          </h2>
          <p className="text-violet-100 mb-6 text-sm leading-relaxed">
            StudyG uses spaced repetition and active recall to help you learn
            anything — from languages to medical exams.
          </p>
          <a
            href="https://studyg.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-7 py-3 rounded-full font-semibold bg-white text-violet-700 hover:bg-violet-50 transition-colors text-sm"
          >
            Start learning for free →
          </a>
        </div>
      </section>
    </>
  );
}
