"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight, Shield, Sparkles, RefreshCw, BarChart3,
  BrainCircuit, Star, XCircle, Zap, Cpu, FileText, CheckCircle2
} from "lucide-react";

// Subtle grid pattern for the background
const GridPattern = () => (
  <svg
    className="absolute inset-0 -z-10 h-full w-full stroke-white/5 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
    aria-hidden="true"
  >
    <defs>
      <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M.5 40V.5H40" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern)" />
  </svg>
);

export default function LandingPageClient() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-white/30 selection:text-white">
      <GridPattern />

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[40rem] w-[40rem] rounded-full bg-white/[0.02] opacity-50 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/[0.04] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Now with AI Flashcards
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
            >
              Focus Deeply.
              <br />
              <span className="text-gradient">Learn Faster.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Transform your digital habits. Block distractions instantly and
              turn wasted screen time into effortless learning mastery with FSRS
              algorithms.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://apps.apple.com/app/id6741184646?inviteCode=BFLMPSVZ4"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-bold text-lg overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 translate-y-[100%] bg-gray-200 transition-transform duration-300 group-hover:translate-y-0" />
                <span className="relative flex items-center gap-2 z-10">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  App Store
                </span>
              </a>
              <Link
                href="/blog"
                className="flex items-center justify-center gap-3 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-xl font-medium text-lg hover:bg-white/10 transition-colors"
              >
                Read the Blog
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format"
                  alt="Student avatar"
                  className="w-10 h-10 rounded-full border-2 border-[#050505] object-cover z-10 relative"
                />
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format"
                  alt="Student avatar"
                  className="w-10 h-10 rounded-full border-2 border-[#050505] object-cover z-10 relative"
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face&auto=format"
                  alt="Student avatar"
                  className="w-10 h-10 rounded-full border-2 border-[#050505] object-cover z-10 relative"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex text-yellow-500 text-[10px] mb-0.5">
                  <Star className="fill-current w-3 h-3" />
                  <Star className="fill-current w-3 h-3" />
                  <Star className="fill-current w-3 h-3" />
                  <Star className="fill-current w-3 h-3" />
                  <Star className="fill-current w-3 h-3" />
                </div>
                <p>Trusted by 10,000+ students</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Cinematic Image Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 30, delay: 0.2 }}
            className="relative hidden lg:flex h-[640px] items-center justify-center group perspective-1000"
          >
            {/* Ambient backlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/10 to-transparent blur-3xl opacity-50 rounded-full transition-opacity duration-700 group-hover:opacity-70" />

            {/* App Image Provided */}
            <div className="relative z-10 w-[700px] transform transition-transform duration-700 hover:-translate-y-2 lg:hover:rotate-6 scale-105 animate-float drop-shadow-2xl">
              <Image
                src="/hero-phones.png"
                alt="StudyG App iPhones"
                width={1000}
                height={1000}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features bento grid */}
      <section id="features" className="py-32 relative border-t border-white/[0.02] bg-obsidian-950">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Engineered for <span className="text-gradient">Efficiency</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
              Everything you need to stop scrolling and start retaining
              information at maximum velocity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Spotlight Large Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 card-premium rounded-3xl p-8 md:p-12 relative overflow-hidden group smooth-border border border-white/10 hover:border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight">
                  Nuclear Distraction Blocking
                </h3>
                <p className="text-gray-400 text-lg max-w-md leading-relaxed font-light">
                  Regain absolute control. Define strict blocklists for social media and games. When you slip, we elegantly guide you back to focus.
                </p>
              </div>

              {/* Decorative graphic */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
              <div className="absolute bottom-5 right-5 w-48 h-48 border border-white/5 rounded-full opacity-20" />
              <div className="absolute bottom-12 right-12 w-32 h-32 border border-white/5 rounded-full opacity-40" />
            </motion.div>

            {/* AI Creation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:row-span-2 card-premium rounded-3xl p-8 relative overflow-hidden group smooth-border border border-white/10 hover:border-white/20 flex flex-col"
            >
              <div className="w-14 h-14 bg-obsidian-800 border border-white/10 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-colors duration-300 z-10">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 z-10 tracking-tight">
                AI-Powered <br /> Creation
              </h3>
              <p className="text-gray-400 z-10 font-light text-sm mb-12">
                Upload audio, PDFs, or images. Our proprietary pipeline extracts core concepts instantly.
              </p>

              <div className="mt-auto relative z-0 flex flex-col gap-3">
                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-obsidian-900 to-transparent z-10" />
                {[
                  { icon: FileText, text: "Scanning PDF..." },
                  { icon: BrainCircuit, text: "Extracting entities" },
                  { icon: Zap, text: "Formatting cards" }
                ].map((step, i) => (
                  <div
                    key={i}
                    className="w-full flex items-center gap-3 bg-obsidian-800/80 p-3 rounded-xl border border-white/5 transform transition-transform group-hover:-translate-y-1"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <step.icon className="w-4 h-4 text-gray-400" />
                    <div className="text-xs text-gray-400 font-medium">
                      {step.text}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Small card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card-premium rounded-3xl p-8 border border-white/10 hover:border-white/20 smooth-border group"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6 text-gray-300 group-hover:bg-white/10 transition-colors">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">FSRS Core</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                State-of-the-art scheduling algorithms calculate the exact microsecond to review to prevent forgetting.
              </p>
            </motion.div>

            {/* Small card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="card-premium rounded-3xl p-8 border border-white/10 hover:border-white/20 smooth-border group"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6 text-gray-300 group-hover:bg-white/10 transition-colors">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">Deep Analytics</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Track retention syntax, granular study streaks, and precise hours recovered from digital distraction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deep dives */}
      <section className="py-32 overflow-hidden bg-obsidian-950 border-t border-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-40">

          {/* Feature 1: Blocking */}
          <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full md:w-1/2"
            >
              <div className="w-full aspect-square md:aspect-[4/3] rounded-3xl p-1 bg-gradient-to-br from-white/10 to-transparent">
                <div className="w-full h-full bg-obsidian-900 rounded-[22px] border border-obsidian-800 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent)] pointer-events-none" />

                  <div className="w-64 bg-obsidian-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-5 p-8 relative z-10 transition-transform duration-500 group-hover:scale-105">
                    <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
                      <XCircle className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <h4 className="text-white font-bold text-lg mb-1">App Blocked</h4>
                      <p className="text-gray-500 text-xs font-medium">Session in progress</p>
                    </div>
                    <button className="w-full py-3 bg-white text-black rounded-xl text-sm font-bold shadow-lg shadow-white/10 hover:scale-[1.02] transition-transform">
                      Return to Focus
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full md:w-1/2"
            >
              <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-[1.1]">
                Stop doomscrolling.
                <br />
                <span className="text-gradient-subtle">Start living.</span>
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light max-w-lg">
                We replace the chemical hook of infinite scroll with a circuit breaker. Custom blocklists provide a moment of pause, allowing your executive function to intercept pure impulse.
              </p>
              <ul className="space-y-4 text-gray-300">
                {[
                  "Kernel-level Strict Mode enforcement",
                  "Algorithmic scheduling logic",
                  "Behavioral usage telemetry",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-sm font-medium">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Feature 2: Creation */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full md:w-1/2"
            >
              <div className="w-full aspect-square md:aspect-[4/3] rounded-3xl p-1 bg-gradient-to-bl from-white/10 to-transparent">
                <div className="w-full h-full bg-obsidian-900 rounded-[22px] border border-obsidian-800 flex items-center justify-center relative overflow-hidden group">

                  <div className="w-full max-w-sm p-6 relative z-10 flex flex-col items-center">
                    {/* Input Mock */}
                    <motion.div
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="w-full bg-obsidian-950 border border-white/10 rounded-xl p-4 shadow-xl mb-4 -translate-y-2 group-hover:translate-y-0 transition-transform"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Source Payload</span>
                      </div>
                      <p className="text-sm text-gray-300 font-mono">Biology_101_Lecture.pdf</p>
                    </motion.div>

                    {/* Pipeline connection */}
                    <div className="h-8 w-px bg-gradient-to-b from-white/20 to-transparent my-1" />

                    {/* Output Mock */}
                    <motion.div
                      transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                      className="w-[105%] bg-white text-black rounded-xl p-5 shadow-2xl relative z-20 translate-y-2 group-hover:translate-y-0 transition-transform"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Cpu className="w-4 h-4 text-black" />
                        <span className="text-xs font-bold uppercase tracking-wider">Compiled Output</span>
                      </div>
                      <p className="font-bold text-[15px] leading-snug mb-2">
                        What is the specific enzyme responsible for carbon fixation in the Calvin cycle?
                      </p>
                      <p className="text-sm font-medium opacity-60">RuBisCO</p>
                    </motion.div>
                  </div>

                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full md:w-1/2"
            >
              <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-[1.1]">
                Knowledge,
                <br />
                <span className="text-gradient-subtle">Compiled instantly.</span>
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light max-w-lg">
                Avoid manual data entry. Our proprietary ML models parse dense material and synthesize it into atomized, high-yield spaced repetition payloads tailored exactly to your curriculum.
              </p>
              <ul className="space-y-4 text-gray-300">
                {[
                  "Vectorized PDF & Image parsing",
                  "Automated Cloze & Q/A generation",
                  "Adaptive difficulty scaling",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-sm font-medium">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-obsidian-950 border-t border-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold tracking-tight">System Validations</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "This architecture fundamentally altered my workflow. The atomic blocking logic preserves my focus graph, while the FSRS generation is flawless.",
                name: "WaveCZ",
                location: "Czechia",
                initial: "W",
              },
              {
                quote: "A structural paradigm shift. It mitigates dopamine-driven scrolling loops completely. Productivity yields are unmatched.",
                name: "Muudys",
                location: "United States",
                initial: "M",
              },
              {
                quote: "The deep breathing intercept vectors turn negative latency into positive recovery periods. Truly a masterclass in UI/UX engineering.",
                name: "aaron_t",
                location: "Australia",
                initial: "A",
              },
            ].map((review, idx) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-premium p-8 rounded-3xl border border-white/5 smooth-border hover:border-white/20 flex flex-col h-full"
              >
                <div className="flex text-white mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current w-4 h-4" />
                  ))}
                </div>
                <p className="text-gray-300 mb-8 leading-relaxed font-light text-sm flex-grow">
                  "{review.quote}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-obsidian-800 border border-white/10 flex items-center justify-center font-bold text-sm text-white">
                    {review.initial}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div
          className="bg-white text-black rounded-3xl p-12 md:p-20 text-center relative overflow-hidden max-w-7xl mx-auto px-6"
          id="download"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Ready to study smarter?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              Join thousands of students building better habits and learning
              faster with StudyG.
            </p>
            <a
              href="https://apps.apple.com/app/id6741184646?inviteCode=BFLMPSVZ4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-transform transform hover:scale-105 shadow-xl"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on App Store
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
