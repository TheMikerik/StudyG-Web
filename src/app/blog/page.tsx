import { getPosts, getTotalPostCount, CATEGORIES } from "@/lib/posts";
import { categoryToSlug } from "@/lib/utils";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Posts — StudyG Blog",
  description:
    "Browse all study tips, memory science articles, and flashcard guides on StudyG Blog.",
};

const POSTS_PER_PAGE = 9;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? "1", 10));
  const offset = (page - 1) * POSTS_PER_PAGE;

  const [posts, total] = await Promise.all([
    getPosts(POSTS_PER_PAGE, offset),
    getTotalPostCount(),
  ]);

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">All Posts</h1>
        <p className="text-slate-500">
          {total} article{total !== 1 ? "s" : ""} on studying, memory, and
          learning science
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none mb-8 pb-1 border-b border-slate-200">
        <span className="shrink-0 px-4 py-2 rounded-full text-sm font-medium bg-violet-600 text-white">
          All
        </span>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/blog/category/${categoryToSlug(cat)}`}
            className="shrink-0 px-4 py-2 rounded-full text-sm font-medium border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600 transition-colors"
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Posts grid */}
      {posts.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg font-medium">No posts yet.</p>
          <p className="text-sm mt-1">Check back soon.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/blog"
      />
    </div>
  );
}
