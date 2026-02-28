import Link from "next/link";
import type { FlashcardPagePreview } from "@/types/silo";

type Props = {
  pages: FlashcardPagePreview[];
  categorySlug: string;
  subcategorySlug: string;
};

export default function RelatedTopics({ pages, categorySlug, subcategorySlug }: Props) {
  if (!pages.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-white">Related Topics</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link
              href={`/flashcards/${categorySlug}/${subcategorySlug}/${page.slug}`}
              className="block bg-[#121212] border border-white/5 rounded-xl p-4 hover:border-white/20 transition-all text-gray-300 hover:text-white text-sm"
            >
              {page.h1}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
