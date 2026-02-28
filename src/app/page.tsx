import Link from "next/link";
import { getPosts, CATEGORIES } from "@/lib/posts";
import { categoryToSlug } from "@/lib/utils";
import PostCard from "@/components/PostCard";
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
      <section className="relative pt-40 pb-28 lg:pt-52 lg:pb-40 overflow-hidden">
        {/* White glow blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            New post every day
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Read Smarter.
            <br />
            <span className="text-gradient">Learn Faster.</span>
          </h1>

          <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl mx-auto">
            Evidence-based study tips, memory science, and flashcard guides —
            written daily to help you learn anything and remember it for good.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Browse Posts
            </Link>
            <a
              href="https://apps.apple.com/app/id6741184646?inviteCode=BFLMPSVZ4"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
            >
              Try StudyG →
            </a>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/blog/category/${categoryToSlug(cat)}`}
              className="shrink-0 px-4 py-2 rounded-full text-sm font-medium border border-white/10 text-gray-400 hover:border-white/30 hover:text-white transition-all"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Latest posts */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white">Latest Posts</h2>
            <Link
              href="/blog"
              className="text-sm text-gray-400 font-medium hover:text-white transition-colors"
            >
              View all →
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-24 text-gray-600">
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
        </div>
      </section>
    </>
  );
}
