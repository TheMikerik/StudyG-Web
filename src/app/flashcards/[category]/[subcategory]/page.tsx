import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  getFlashcardPages,
  getFlashcardPageCount,
} from "@/lib/silo";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination";

export const revalidate = 86400;

const PAGE_SIZE = 20;

type Props = {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: catSlug, subcategory: subSlug } = await params;
  const [category, subcategory] = await Promise.all([
    getCategoryBySlug(catSlug),
    getSubcategoryBySlug(subSlug),
  ]);
  if (!category || !subcategory) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studyg.app";
  const count = await getFlashcardPageCount(subcategory.id);

  return {
    title: `${subcategory.name} Flashcards — ${count} Topics`,
    description:
      subcategory.description ??
      `Study ${subcategory.name} with ${count} flashcard topic pages. Part of the ${category.name} directory.`,
    alternates: {
      canonical: `${siteUrl}/flashcards/${catSlug}/${subSlug}`,
    },
  };
}

export default async function SubcategoryPage({ params, searchParams }: Props) {
  const { category: catSlug, subcategory: subSlug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10));
  const offset = (page - 1) * PAGE_SIZE;

  const [category, subcategory] = await Promise.all([
    getCategoryBySlug(catSlug),
    getSubcategoryBySlug(subSlug),
  ]);
  if (!category || !subcategory) notFound();

  const [topics, totalCount] = await Promise.all([
    getFlashcardPages(subcategory.id, PAGE_SIZE, offset),
    getFlashcardPageCount(subcategory.id),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const shouldIndex = totalCount >= 3;

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Flashcard Directory", href: "/flashcards" },
    { label: category.name, href: `/flashcards/${catSlug}` },
    { label: subcategory.name },
  ];

  return (
    <>
      {!shouldIndex && (
        <meta name="robots" content="noindex,follow" />
      )}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Breadcrumb items={breadcrumb} />

        <h1 className="text-4xl font-bold text-white mb-4">
          {subcategory.name} Flashcards — {totalCount} Topics
        </h1>
        {subcategory.description && (
          <p className="text-gray-400 mb-12 max-w-2xl">{subcategory.description}</p>
        )}

        {topics.length === 0 ? (
          <p className="text-gray-600">No topics published yet. Check back soon.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {topics.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/flashcards/${catSlug}/${subSlug}/${topic.slug}`}
                  className="group flex items-center justify-between bg-[#121212] border border-white/5 rounded-xl p-5 hover:border-white/20 transition-all"
                >
                  <span className="text-white font-medium group-hover:text-gray-100">
                    {topic.h1}
                  </span>
                  <span className="text-gray-600 text-sm ml-4 shrink-0">→</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath={`/flashcards/${catSlug}/${subSlug}`}
        />

        <div className="mt-12 pt-8 border-t border-white/5">
          <Link
            href={`/flashcards/${catSlug}`}
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            ← Back to {category.name}
          </Link>
        </div>
      </div>
    </>
  );
}
