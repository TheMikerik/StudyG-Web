"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Flashcard } from "@/types/silo";

export default function FlashcardPreview({ flashcards }: { flashcards: Flashcard[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="flex flex-col gap-3">
      {flashcards.map((card, i) => {
        const isOpen = openIndex === i;

        return (
          <div
            key={i}
            className="group card-premium smooth-border border border-white/5 hover:border-white/20 rounded-2xl overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between p-5 text-left font-medium text-white select-none"
            >
              <span className="text-[15px] leading-snug pr-8">{card.front}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="shrink-0 text-gray-500 group-hover:text-gray-300"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-2 text-gray-400 border-t border-white/5 text-[15px] leading-relaxed font-light">
                    {card.back}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
