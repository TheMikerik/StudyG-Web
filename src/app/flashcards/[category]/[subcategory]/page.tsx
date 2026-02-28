import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  getFlashcardPages,
  getFlashcardPageCount,
} from "@/lib/silo";
import SubcategoryClientPage from "./client-page";

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
    { label: "Flashcards", href: "/flashcards" },
    { label: category.name, href: `/flashcards/${catSlug}` },
    { label: subcategory.name },
  ];

  return (
    <>
      {!shouldIndex && (
        <meta name="robots" content="noindex,follow" />
      )}
      <SubcategoryClientPage
        category={{ name: category.name }}
        catSlug={catSlug}
        subcategory={{ name: subcategory.name, description: subcategory.description }}
        subSlug={subSlug}
        topics={topics.map(t => ({ slug: t.slug, h1: t.h1 }))}
        totalCount={totalCount}
        currentPage={page}
        totalPages={totalPages}
        breadcrumb={breadcrumb}
      />
    </>
  );
}
