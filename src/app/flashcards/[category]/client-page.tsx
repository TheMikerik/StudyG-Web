"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { GridPattern } from "@/components/ui/GridPattern";
import Breadcrumb, { type BreadcrumbItem } from "@/components/Breadcrumb";

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
          <motion.div variants={itemVariants}>
            <Breadcrumb items={breadcrumb} />
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {category.name} Flashcards <span className="text-white/40 font-light">— Study Guide & Topic Directory</span>
          </motion.h1>

          {category.description && (
            <motion.p variants={itemVariants} className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed mb-12">
              {category.description}
            </motion.p>
          )}

          {subcategories.length === 0 ? (
            <motion.p variants={itemVariants} className="text-gray-600">
              No subcategories yet.
            </motion.p>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              variants={containerVariants}
            >
              {subcategories.map((sub, i) => (
                <motion.div key={sub.slug} variants={itemVariants} className="h-full">
                  <Link
                    href={`/flashcards/${catSlug}/${sub.slug}`}
                    className="group flex flex-col h-full card-premium smooth-border border border-white/5 hover:border-white/20 rounded-3xl p-8 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full">
                      <h2 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                        {sub.name}
                      </h2>
                      {sub.description && (
                        <p className="text-gray-500 text-[15px] mb-8 font-light leading-relaxed line-clamp-3 flex-grow">
                          {sub.description}
                        </p>
                      )}
                      <p className="text-[12px] font-bold text-gray-500 tracking-wider uppercase mt-auto">
                        {counts[i]} {counts[i] === 1 ? "topic" : "topics"}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
