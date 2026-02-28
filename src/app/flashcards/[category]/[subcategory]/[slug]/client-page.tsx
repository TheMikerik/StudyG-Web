"use client";

import { motion, type Variants } from "framer-motion";
import { GridPattern } from "@/components/ui/GridPattern";
import Breadcrumb, { type BreadcrumbItem } from "@/components/Breadcrumb";
import FlashcardPreview from "@/components/FlashcardPreview";
import FAQSection from "@/components/FAQSection";
import RelatedTopics from "@/components/RelatedTopics";
import type { FlashcardPage, FlashcardPagePreview } from "@/types/silo";

type Props = {
  page: FlashcardPage;
  catSlug: string;
  subSlug: string;
  relatedPages: FlashcardPagePreview[];
  breadcrumb: BreadcrumbItem[];
};

export default function TopicClientPage({
  page,
  catSlug,
  subSlug,
  relatedPages,
  breadcrumb,
}: Props) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-white/30 selection:text-white pt-24 pb-32">
      <GridPattern />

      {/* Ambient background glow optimized for deep focus */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center -z-10">
        <div className="h-[50rem] w-[50rem] rounded-full bg-white/[0.015] opacity-60 blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Breadcrumb items={breadcrumb} />
          </motion.div>

          {/* Header Block */}
          <motion.div variants={itemVariants} className="mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              {page.h1}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              {page.intro}
            </p>
          </motion.div>

          {/* Flashcards Block */}
          <motion.section variants={itemVariants} className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Flashcard Deck
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                {page.flashcards.length} Cards
              </span>
            </div>
            <FlashcardPreview flashcards={page.flashcards} />
            <p className="mt-5 text-[13px] text-gray-500 text-center uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
              <span className="w-10 h-px bg-white/10" />
              Click cards to reveal answers
              <span className="w-10 h-px bg-white/10" />
            </p>
          </motion.section>

          {/* FAQ Block */}
          {page.faq?.length > 0 && (
            <motion.div variants={itemVariants} className="mb-16">
              <FAQSection faqs={page.faq} />
            </motion.div>
          )}

          {/* Related Block */}
          {relatedPages.length > 0 && (
            <motion.div variants={itemVariants} className="mb-16">
              <RelatedTopics
                pages={relatedPages}
                categorySlug={catSlug}
                subcategorySlug={subSlug}
              />
            </motion.div>
          )}

          {/* CTA Block */}
          <motion.div
            variants={itemVariants}
            className="card-premium smooth-border border border-white/10 rounded-3xl p-10 md:p-14 text-center mt-20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700" />

            <h2 className="text-3xl font-bold mb-4 tracking-tight text-white relative z-10">
              Master this topic effortlessly.
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto font-light leading-relaxed relative z-10">
              Export these flashcards directly into StudyG. Review exactly when you need to with FSRS scheduling algorithms.
            </p>
            <a
              href="https://apps.apple.com/app/id6741184646?inviteCode=BFLMPSVZ4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.15)] relative z-10"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Study in App
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
