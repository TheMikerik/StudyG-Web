import type { Metadata } from "next";
import { getCategories, getAllSubcategories } from "@/lib/silo";
import FlashcardsClientPage from "./client-page";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Flashcard Directory — Browse Study Topics",
  description:
    "Browse thousands of flashcard topics organized by subject. Biology, Medicine, Law, Computer Science, Languages, and more.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://studyg.app"}/flashcards`,
  },
};

export default async function FlashcardsRootPage() {
  const [categories, allSubs] = await Promise.all([
    getCategories(),
    getAllSubcategories(),
  ]);

  const subCountByCategory = allSubs.reduce(
    (acc, sub) => {
      acc[sub.category_id] = (acc[sub.category_id] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <FlashcardsClientPage
      categories={categories}
      subCountByCategory={subCountByCategory}
    />
  );
}
