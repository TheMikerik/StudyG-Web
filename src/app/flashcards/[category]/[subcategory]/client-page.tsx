"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { GridPattern } from "@/components/ui/GridPattern";
import Breadcrumb, { type BreadcrumbItem } from "@/components/Breadcrumb";
import { FileText, ArrowRight, Layers, LayoutGrid } from "lucide-react";
import Pagination from "@/components/Pagination";
import { useEffect } from "react";

type Props = {
  category: {
    name: string;
  };
  catSlug: string;
  subcategory: {
    name: string;
    description: string | null;
  };
  subSlug: string;
  topics: {
    slug: string;
    h1: string;
  }[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  breadcrumb: BreadcrumbItem[];
};

export default function SubcategoryClientPage({
  category,
  catSlug,
  subcategory,
  subSlug,
  topics,
  totalCount,
  currentPage,
  totalPages,
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

  // Base offset for row numbers based on pagination
  const baseIndex = (currentPage - 1) * 20;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [subSlug]);

  return (
    <div className="relative min-h-screen selection:bg-white/30 selection:text-white pt-24 pb-32">
      <GridPattern />

      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[50rem] w-[50rem] rounded-full bg-white/[0.02] blur-[120px]" />
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


              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tighter leading-[1.1]">
                {subcategory.name}
              </h1>

              <p className="text-gray-400 text-[15px] font-light leading-relaxed mb-10 max-w-sm">
                {subcategory.description || `Browse the complete collection of flashcard topics for ${subcategory.name}. Designed for rapid learning and retention.`}
              </p>

              <div className="flex items-center gap-6 p-6 rounded-2xl bg-[#0A0A0A] border border-white/5">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white tracking-tight leading-none mb-1">
                    {totalCount}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    Available Topics
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Scrolling Right Column: High-Density Ledger */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {topics.length === 0 ? (
                <div className="card-premium rounded-3xl p-12 border border-white/5 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                  <FileText className="w-12 h-12 text-gray-600 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">No topics published yet.</h3>
                  <p className="text-gray-500 font-light text-sm">We are actively building the modules for this section.</p>
                </div>
              ) : (
                <div className="bg-[#050505] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
                  {/* Ledger Header */}
                  <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 w-8">ID</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Topic Title</span>
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
                    {topics.map((topic, index) => {
                      const absoluteIndex = baseIndex + index + 1;

                      return (
                        <motion.li key={topic.slug} variants={itemVariants} className="border-b border-white/5 last:border-0 relative group">
                          <Link
                            href={`/flashcards/${catSlug}/${subSlug}/${topic.slug}`}
                            className="flex items-center justify-between px-8 py-4 sm:py-5 hover:bg-white/[0.03] transition-colors"
                          >
                            <div className="flex items-center gap-4 min-w-0">
                              <span className="text-[11px] font-mono text-gray-600 group-hover:text-white transition-colors w-8">
                                {absoluteIndex.toString().padStart(2, '0')}
                              </span>
                              <span className="text-[14px] sm:text-[15px] font-medium text-gray-300 group-hover:text-white transition-colors truncate pr-4">
                                {topic.h1}
                              </span>
                            </div>

                            <div className="flex items-center shrink-0">
                              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                                <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-black transition-colors" />
                              </div>
                            </div>
                          </Link>

                          {/* Left highlight border on hover */}
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    basePath={`/flashcards/${catSlug}/${subSlug}`}
                  />
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
