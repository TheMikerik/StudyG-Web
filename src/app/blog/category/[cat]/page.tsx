import { getPostsByCategory, getTotalPostCount, CATEGORIES } from "@/lib/posts";
import { categoryToSlug, slugToCategory } from "@/lib/utils";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import CategoryBadge from "@/components/CategoryBadge";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const POSTS_PER_PAGE = 9;

interface Props {
  params: Promise<{ cat: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cat } = await params;
  const category = slugToCategory(cat);
  return {
    title: `${category} — StudyG Blog`,
    description: `Browse all ${category} articles on StudyG Blog.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { cat } = await params;
  const { page: pageStr } = await searchParams;

  // Validate category
  const isValid = CATEGORIES.some((c) => categoryToSlug(c) === cat);
  if (!isValid) notFound();

  const categoryName = slugToCategory(cat);
  const page = Math.max(1, parseInt(pageStr ?? "1", 10));
  const offset = (page - 1) * POSTS_PER_PAGE;

  const [posts, total] = await Promise.all([
    getPostsByCategory(cat, POSTS_PER_PAGE, offset),
    getTotalPostCount(cat),
  ]);

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-3">
          <CategoryBadge category={categoryName} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">
          {categoryName}
        </h1>
        <p className="text-slate-500">
          {total} article{total !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none mb-8 pb-1 border-b border-slate-200">
        <Link
          href="/blog"
          className="shrink-0 px-4 py-2 rounded-full text-sm font-medium border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600 transition-colors"
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/blog/category/${categoryToSlug(c)}`}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              c === categoryName
                ? "bg-violet-600 text-white"
                : "border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg font-medium">No posts in this category yet.</p>
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
        basePath={`/blog/category/${cat}`}
      />
    </div>
  );
}
