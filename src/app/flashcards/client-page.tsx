"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { GridPattern } from "@/components/ui/GridPattern";
import { BookOpen, Layers, ArrowLeft } from "lucide-react";

type Props = {
  categories: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  }[];
  subCountByCategory: Record<string, number>;
};

const categoryConfig: Record<string, { emoji: string; textGradient: string; iconBg: string; glowBg: string }> = {
  biology: { emoji: "🧬", textGradient: "group-hover:from-emerald-600 group-hover:to-green-700", iconBg: "bg-emerald-500/10 group-hover:bg-emerald-500/20 text-emerald-600", glowBg: "bg-emerald-400" },
  medicine: { emoji: "🩺", textGradient: "group-hover:from-rose-600 group-hover:to-red-700", iconBg: "bg-rose-500/10 group-hover:bg-rose-500/20 text-rose-600", glowBg: "bg-rose-400" },
  "computer-science": { emoji: "💻", textGradient: "group-hover:from-cyan-600 group-hover:to-blue-700", iconBg: "bg-cyan-500/10 group-hover:bg-cyan-500/20 text-cyan-600", glowBg: "bg-cyan-400" },
  law: { emoji: "⚖️", textGradient: "group-hover:from-amber-600 group-hover:to-orange-700", iconBg: "bg-amber-500/10 group-hover:bg-amber-500/20 text-amber-600", glowBg: "bg-amber-400" },
  languages: { emoji: "🌍", textGradient: "group-hover:from-fuchsia-600 group-hover:to-purple-700", iconBg: "bg-fuchsia-500/10 group-hover:bg-fuchsia-500/20 text-fuchsia-600", glowBg: "bg-fuchsia-400" },
  history: { emoji: "🏛️", textGradient: "group-hover:from-yellow-600 group-hover:to-amber-700", iconBg: "bg-yellow-500/10 group-hover:bg-yellow-500/20 text-yellow-600", glowBg: "bg-yellow-400" },
  math: { emoji: "📐", textGradient: "group-hover:from-indigo-600 group-hover:to-violet-700", iconBg: "bg-indigo-500/10 group-hover:bg-indigo-500/20 text-indigo-600", glowBg: "bg-indigo-400" },
  default: { emoji: "📚", textGradient: "group-hover:from-black group-hover:to-gray-600", iconBg: "bg-black/5 group-hover:bg-black/10 text-black", glowBg: "bg-black" }
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
    <div className="relative min-h-screen selection:bg-white/30 selection:text-white pt-24 pb-32">
      <GridPattern />

      {/* Dynamic ambient lighting for split layout */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[50rem] w-[50rem] rounded-full bg-black/[0.03] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-black/[0.02] blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Sticky Left Column */}
          <div className="lg:w-[400px] xl:w-[450px] shrink-0">
            <motion.div
              className="lg:sticky lg:top-32"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-10">
                <Link href="/" className="inline-flex items-center gap-2 text-[11px] text-gray-600 hover:text-black transition-all duration-300 font-bold uppercase tracking-[0.2em] bg-black/5 hover:bg-black/10 px-4 py-2.5 rounded-full border border-black/5 hover:border-black/20 backdrop-blur-md">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Return Home
                </Link>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl lg:text-7xl font-bold text-black mb-6 tracking-tighter leading-[1.05]"
              >
                Master <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/40">
                  Any Subject.
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-gray-600 text-lg font-light leading-relaxed mb-12 max-w-sm"
              >
                Browse rigorous, high-yield flashcard topics. Each deck is engineered for maximum retention through interval repetition.
              </motion.p>

              <motion.div variants={itemVariants} className="flex gap-8 items-center">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-black tracking-tight">{categories.length}</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1.5 flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Subjects</span>
                </div>
                <div className="w-px h-12 bg-black/10" />
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-black tracking-tight">
                    {Object.values(subCountByCategory).reduce((a, b) => a + b, 0)}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1.5 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Topics</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scrolling Right Column (Bento Boards) */}
          <div className="flex-1">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {categories.map((cat, index) => {
                const count = subCountByCategory[cat.id] ?? 0;
                // Every 3rd item spans 2 columns for an asymmetrical bento vibe
                const isLarge = index % 3 === 0;
                const config = categoryConfig[cat.slug] || categoryConfig.default;

                return (
                  <motion.div
                    key={cat.slug}
                    variants={itemVariants}
                    className={`h-full ${isLarge ? "md:col-span-2" : "md:col-span-1"}`}
                  >
                    <Link
                      href={`/flashcards/${cat.slug}`}
                      className="group block h-full card-premium smooth-border border border-black/5 hover:border-black/20 rounded-[2.5rem] p-8 lg:p-10 transition-all duration-500 relative overflow-hidden bg-white/80 backdrop-blur-xl"
                    >
                      <div className={`absolute -right-20 -top-20 w-64 h-64 ${config.glowBg} rounded-full blur-[100px] opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none`} />

                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-8">
                          <div className={`w-14 h-14 ${config.iconBg} rounded-2xl border border-black/5 transition-colors flex items-center justify-center text-3xl`}>
                            {config.emoji}
                          </div>
                          <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase px-3 py-1.5 bg-black/5 rounded-full border border-black/5 flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5" />
                            {count} {count === 1 ? "Category" : "Categories"}
                          </span>
                        </div>

                        <h2 className={`text-3xl font-bold text-black mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all ${config.textGradient}`}>
                          {cat.name}
                        </h2>

                        {cat.description && (
                          <p className="text-gray-600 text-[15px] font-light leading-relaxed line-clamp-3 mb-8 max-w-lg">
                            {cat.description}
                          </p>
                        )}

                        <div className="mt-auto pt-6 border-t border-black/5 flex items-center text-sm font-semibold text-gray-600 group-hover:text-black transition-colors uppercase tracking-wider">
                          Open Library <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
