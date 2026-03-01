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
    title: category,
    description: `Browse all ${category} articles on StudyG Blog.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { cat } = await params;
  const { page: pageStr } = await searchParams;

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
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-3">
          <CategoryBadge category={categoryName} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">
          {categoryName}
        </h1>
        <p className="text-gray-600">
          {total} article{total !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none mb-10 pb-1 border-b border-black/5">
        <Link
          href="/blog"
          className="shrink-0 px-4 py-2 rounded-full text-sm font-medium border border-black/10 text-gray-600 hover:border-black/30 hover:text-black transition-all"
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/blog/category/${categoryToSlug(c)}`}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${c === categoryName
                ? "bg-black text-white font-bold"
                : "border border-black/10 text-gray-600 hover:border-black/30 hover:text-black"
              }`}
          >
            {c}
          </Link>
        ))}
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-24 text-gray-600">
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
