import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategoryBySlug,
  getSubcategoriesByCategory,
  getFlashcardPageCount,
} from "@/lib/silo";
import Breadcrumb from "@/components/Breadcrumb";

export const revalidate = 86400;

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: catSlug } = await params;
  const category = await getCategoryBySlug(catSlug);
  if (!category) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studyg.app";

  return {
    title: `${category.name} Flashcards — Study Guide & Topic Directory`,
    description:
      category.description ??
      `Browse ${category.name} flashcard topics. Find subcategories and study guides for every level.`,
    alternates: { canonical: `${siteUrl}/flashcards/${catSlug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: catSlug } = await params;

  const category = await getCategoryBySlug(catSlug);
  if (!category) notFound();

  const subcategories = await getSubcategoriesByCategory(category.id);

  const counts = await Promise.all(
    subcategories.map((sub) => getFlashcardPageCount(sub.id))
  );

  // noindex logic: check how many subs have >= 1 published topic
  const subsWithContent = counts.filter((c) => c > 0).length;
  const shouldIndex = subsWithContent >= 3;

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Flashcard Directory", href: "/flashcards" },
    { label: category.name },
  ];

  return (
    <>
      {!shouldIndex && (
        <meta name="robots" content="noindex,follow" />
      )}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Breadcrumb items={breadcrumb} />

        <h1 className="text-4xl font-bold text-white mb-4">
          {category.name} Flashcards — Study Guide & Topic Directory
        </h1>
        {category.description && (
          <p className="text-gray-400 mb-12 max-w-2xl">{category.description}</p>
        )}

        {subcategories.length === 0 ? (
          <p className="text-gray-600">No subcategories yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subcategories.map((sub, i) => (
              <Link
                key={sub.slug}
                href={`/flashcards/${catSlug}/${sub.slug}`}
                className="group bg-[#121212] border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <h2 className="text-lg font-bold text-white mb-2 group-hover:text-gray-100">
                  {sub.name}
                </h2>
                {sub.description && (
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {sub.description}
                  </p>
                )}
                <p className="text-xs text-gray-600">
                  {counts[i]} {counts[i] === 1 ? "topic" : "topics"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
