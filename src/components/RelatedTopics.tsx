import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      <h2 className="text-2xl font-bold mb-6 text-black tracking-tight">Related Topics</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link
              href={`/flashcards/${categorySlug}/${subcategorySlug}/${page.slug}`}
              className="group card-premium smooth-border border border-black/5 hover:border-black/20 rounded-2xl p-5 flex items-center justify-between transition-all"
            >
              <span className="text-[15px] text-gray-600 group-hover:text-black font-medium transition-colors line-clamp-2 pr-4 text-balance">
                {page.h1}
              </span>
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-gray-500 group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
