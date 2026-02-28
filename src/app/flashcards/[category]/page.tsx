import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategoryBySlug,
  getSubcategoriesByCategory,
  getFlashcardPageCount,
} from "@/lib/silo";
import CategoryClientPage from "./client-page";

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
      <CategoryClientPage
        category={category}
        catSlug={catSlug}
        subcategories={subcategories}
        counts={counts}
        breadcrumb={breadcrumb}
      />
    </>
  );
}
