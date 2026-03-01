"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { GridPattern } from "@/components/ui/GridPattern";
import Breadcrumb, { type BreadcrumbItem } from "@/components/Breadcrumb";
import { FileText, ArrowRight, Layers, LayoutGrid } from "lucide-react";
import { useEffect } from "react";

type Props = {
  category: {
    name: string;
    description: string | null;
  };
  catSlug: string;
  subcategories: {
    slug: string;
    name: string;
    description: string | null;
  }[];
  counts: number[];
  breadcrumb: BreadcrumbItem[];
};

export default function CategoryClientPage({
  category,
  catSlug,
  subcategories,
  counts,
  breadcrumb,
}: Props) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  const totalTopics = counts.reduce((a, b) => a + b, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [catSlug]);

  return (
    <div className="relative min-h-screen selection:bg-white/30 selection:text-white pt-24 pb-32">
      <GridPattern />

      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[50rem] w-[50rem] rounded-full bg-black/[0.03] blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Sticky Left Column: Meta Info */}
          <div className="lg:w-[380px] shrink-0">
            <motion.div
              className="lg:sticky lg:top-32"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-8">
                <Breadcrumb items={breadcrumb} />
              </div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl lg:text-7xl font-bold text-black mb-6 tracking-tighter leading-[1.05]"
              >
                {category.name}.
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-gray-600 text-lg font-light leading-relaxed mb-12 max-w-sm"
              >
                {category.description || `Browse the complete collection of flashcard modules for ${category.name}. Designed for rapid learning and retention.`}
              </motion.p>

              <motion.div variants={itemVariants} className="flex gap-8 items-center">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-black tracking-tight">{subcategories.length}</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1.5 flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Categories</span>
                </div>
                <div className="w-px h-12 bg-black/10" />
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-black tracking-tight">
                    {totalTopics}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1.5 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Topics</span>
                </div>
              </motion.div>

            </motion.div>
          </div>

          {/* Scrolling Right Column: High-Density Ledger */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {subcategories.length === 0 ? (
                <div className="card-premium rounded-3xl p-12 border border-black/5 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                  <FileText className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-black mb-2 tracking-tight">No modules published yet.</h3>
                  <p className="text-gray-500 font-light text-sm">We are actively building the modules for this section.</p>
                </div>
              ) : (
                <div className="bg-white rounded-[2rem] border border-black/10 overflow-hidden shadow-2xl">
                  {/* Ledger Header */}
                  <div className="flex items-center justify-between px-8 py-5 border-b border-black/5 bg-black/[0.02]">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 w-8">ID</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Module Name</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hidden sm:block">Action</span>
                  </div>

                  {/* Dense List */}
                  <motion.ul
                    className="flex flex-col"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {subcategories.map((sub, index) => {
                      const count = counts[index];
                      const absoluteIndex = index + 1;

                      return (
                        <motion.li key={sub.slug} variants={itemVariants} className="border-b border-black/5 last:border-0 relative group">
                          <Link
                            href={`/flashcards/${catSlug}/${sub.slug}`}
                            className="flex items-center justify-between px-8 py-4 sm:py-5 hover:bg-black/[0.02] transition-colors"
                          >
                            <div className="flex items-center gap-4 min-w-0">
                              <span className="text-[11px] font-mono text-gray-500 group-hover:text-black transition-colors w-8">
                                {absoluteIndex.toString().padStart(2, '0')}
                              </span>
                              <span className="text-[14px] sm:text-[15px] font-medium text-gray-700 group-hover:text-black transition-colors truncate pr-4">
                                {sub.name}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 shrink-0">
                              <span className="px-2.5 py-1 bg-black/5 rounded-full border border-black/5 text-[10px] font-bold uppercase tracking-widest text-gray-600 hidden sm:block">
                                {count} {count === 1 ? "Topic" : "Topics"}
                              </span>
                              <div className="w-8 h-8 rounded-full bg-black/5 border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300">
                                <ArrowRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-white transition-colors" />
                              </div>
                            </div>
                          </Link>

                          {/* Left highlight border on hover */}
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}