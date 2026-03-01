import { getPosts, getTotalPostCount, CATEGORIES } from "@/lib/posts";
import { categoryToSlug } from "@/lib/utils";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Posts",
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
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">
          All Posts
        </h1>
        <p className="text-gray-600">
          {total} article{total !== 1 ? "s" : ""} on studying, memory, and
          learning science
        </p>
      </div>

      {/* Category tabs — matching light theme original */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none mb-10 pb-1 border-b border-black/5">
        <span className="shrink-0 px-4 py-2 rounded-full text-sm font-bold bg-black text-white">
          All
        </span>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/blog/category/${categoryToSlug(cat)}`}
            className="shrink-0 px-4 py-2 rounded-full text-sm font-medium border border-black/10 text-gray-600 hover:border-black/30 hover:text-black transition-all"
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Posts grid */}
      {posts.length === 0 ? (
        <div className="text-center py-24 text-gray-600">
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

      <Pagination currentPage={page} totalPages={totalPages} basePath="/blog" />
    </div>
  );
}
