import type { Flashcard } from "@/types/silo";

export default function FlashcardPreview({ flashcards }: { flashcards: Flashcard[] }) {
  return (
    <dl className="flex flex-col gap-3">
      {flashcards.map((card, i) => (
        <details
          key={i}
          className="group bg-[#121212] border border-white/5 rounded-xl overflow-hidden"
        >
          <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-medium text-white select-none">
            <dt>{card.front}</dt>
            <span className="text-gray-500 ml-4 shrink-0 transition-transform group-open:rotate-180">
              ▾
            </span>
          </summary>
          <dd className="px-5 pb-5 pt-4 text-gray-400 border-t border-white/5">
            {card.back}
          </dd>
        </details>
      ))}
    </dl>
  );
}
