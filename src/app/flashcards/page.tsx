import Link from "next/link";
import type { Metadata } from "next";
import { getCategories, getAllSubcategories } from "@/lib/silo";

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
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="mb-12">
        <p className="text-xs text-gray-600 mb-3">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>{" "}
          / Flashcard Directory
        </p>
        <h1 className="text-4xl font-bold text-white mb-4">
          Flashcard Directory
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Browse flashcard topics by subject. Every deck is designed to help
          you study smarter with spaced repetition.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const count = subCountByCategory[cat.id] ?? 0;
          return (
            <Link
              key={cat.slug}
              href={`/flashcards/${cat.slug}`}
              className="group bg-[#121212] border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
            >
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-gray-100">
                {cat.name}
              </h2>
              {cat.description && (
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {cat.description}
                </p>
              )}
              <p className="text-xs text-gray-600">
                {count} {count === 1 ? "subcategory" : "subcategories"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
