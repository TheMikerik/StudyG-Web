"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { GridPattern } from "@/components/ui/GridPattern";

type Props = {
  categories: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  }[];
  subCountByCategory: Record<string, number>;
};

export default function FlashcardsClientPage({ categories, subCountByCategory }: Props) {
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

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center -z-10">
        <div className="h-[40rem] w-[40rem] rounded-full bg-white/[0.02] opacity-50 blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors duration-200 font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Flashcard Directory
          </motion.h1>
          <motion.p variants={itemVariants} className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
            Browse high-yield flashcard topics by subject. Every deck is designed to help you study smarter and retain information at maximum velocity.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((cat) => {
            const count = subCountByCategory[cat.id] ?? 0;
            return (
              <motion.div key={cat.slug} variants={itemVariants} className="h-full">
                <Link
                  href={`/flashcards/${cat.slug}`}
                  className="group block h-full card-premium smooth-border border border-white/5 hover:border-white/20 rounded-3xl p-8 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="relative z-10 flex flex-col h-full">
                    <h2 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                      {cat.name}
                    </h2>
                    {cat.description && (
                      <p className="text-gray-500 text-[15px] mb-8 line-clamp-3 font-light leading-relaxed flex-grow">
                        {cat.description}
                      </p>
                    )}
                    <p className="text-[12px] font-bold text-gray-500 tracking-wider uppercase mt-auto">
                      {count} {count === 1 ? "subcategory" : "subcategories"}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
