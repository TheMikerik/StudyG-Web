"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Shield, BrainCircuit, Star, Cpu, ChevronRight, Check, Zap, FileText, Smartphone
} from "lucide-react";

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
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
  };

  return (
    <div className="relative min-h-screen bg-white text-black selection:bg-gold-accent/30 selection:text-black overflow-hidden font-sans">
      {/* Precision Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      {/* Ambient Gold Glows */}
      <div className="pointer-events-none absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#f5ce8c]/15 blur-[120px] rounded-[100%] opacity-60" />

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center relative z-10">

          {/* Hero Text */}
          <motion.div
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-semibold tracking-wide text-gray-800 mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f5ce8c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f5ce8c]"></span>
              </span>
              STUDYG OS 2.0 • INTELLIGENT RETENTION
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl sm:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tighter mb-8"
            >
              Mastery, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-black via-gray-800 to-gray-400">Engineered.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-lg text-gray-500 mb-10 max-w-lg leading-relaxed font-normal tracking-tight"
            >
              A precision instrument for your mind. StudyG replaces infinite scroll with algorithmic review, converting wasted time into absolute knowledge retention.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <a
                href="https://apps.apple.com/app/id6741184646?inviteCode=BFLMPSVZ4"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-black/20 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-black/20 transition-all duration-300 pointer-events-none" />
                <span className="relative flex items-center gap-2 z-10">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Install from App Store
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform z-10" />
              </a>
              <Link
                href="/blog"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-black bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              >
                Explore Methodology
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-14 flex items-center gap-4 text-sm font-medium text-gray-500">
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format"
                  alt="Student avatar"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover z-10 relative"
                />
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format"
                  alt="Student avatar"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover z-10 relative"
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face&auto=format"
                  alt="Student avatar"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover z-10 relative"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex text-[#f5ce8c] mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-3.5 h-3.5" />)}
                </div>
                <span className="tracking-tight leading-none text-xs">Validated by 10k+ top-percentile students</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Device Context */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            className="relative hidden lg:flex h-[600px] items-center justify-center perspective-1000 w-full"
          >
            {/* Cinematic instrument lighting */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#f5ce8c]/10 via-transparent to-black/5 blur-3xl rounded-[100px] transform -rotate-12 scale-110" />

            <div className="relative w-[110%] ml-10 transition-transform duration-1000 hover:scale-[1.03] animate-[float_6s_ease-in-out_infinite] drop-shadow-2xl">
              <Image
                src="/hero-phones.png"
                alt="StudyG App Visualization"
                width={1200}
                height={1200}
                className="w-full h-auto object-contain filter contrast-105 saturate-105"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Layout - Engineering Precision */}
      <section className="py-24 relative z-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-black transition-all">
              Engineered for <span className="text-black inline-block transform hover:scale-105 transition-transform duration-300">Efficiency</span>.
            </h2>
            <p className="text-xl text-gray-500 font-light tracking-tight max-w-2xl mx-auto">
              Everything you need to stop scrolling and start retaining information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Large Card */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-[2rem] bg-gray-50 border border-gray-200/60 p-8 md:p-12 transition-all duration-500 hover:border-black/20 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-md">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight text-black">Nuclear Distraction Blocking</h3>
                <p className="text-gray-500 text-lg max-w-md font-light leading-relaxed">
                  Regain control. Define strict blocklists for social media and games. When you try to open them, we securely guide you back to focus.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-gray-200/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 text-gray-200/60 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
                <svg className="w-64 h-64" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z" />
                </svg>
              </div>
            </div>

            {/* Tall Card */}
            <div className="md:row-span-2 group relative overflow-hidden rounded-[2rem] bg-gray-50 border border-gray-200/60 p-8 transition-all duration-500 hover:border-black/20 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col justify-between">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white border border-gray-200 text-black rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-500 shadow-sm">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-black">AI-Powered<br />Creation</h3>
                <p className="text-gray-500 font-light mb-8">
                  Simply upload audio files, PDFs, or images and our AI will generate comprehensive flashcards for you automatically.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none z-0" />
              <div className="flex flex-col gap-3 mt-10 relative z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-16 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center px-4 animate-[pulse_3s_ease-in-out_infinite]">
                  <div className="w-8 h-8 rounded bg-gray-100" />
                  <div className="flex-1 ml-4 space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-full" />
                    <div className="h-2 bg-gray-100 rounded w-2/3" />
                  </div>
                </div>
                <div className="w-full h-16 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center px-4 animate-[pulse_3s_ease-in-out_infinite]" style={{ animationDelay: '500ms' }}>
                  <div className="w-8 h-8 rounded bg-gray-100" />
                  <div className="flex-1 ml-4 space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-full" />
                    <div className="h-2 bg-gray-100 rounded w-4/5" />
                  </div>
                </div>
                <div className="w-full h-16 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center px-4 animate-[pulse_3s_ease-in-out_infinite]" style={{ animationDelay: '1000ms' }}>
                  <div className="w-8 h-8 rounded bg-gray-100" />
                  <div className="flex-1 ml-4 space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-full" />
                    <div className="h-2 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Small Card 1 */}
            <div className="group relative overflow-hidden rounded-[2rem] bg-black text-white p-8 border border-black transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] shadow-[0_4px_20px_rgb(0,0,0,0.2)]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,206,140,0.15),transparent_70%)] pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="text-[#f5ce8c] mb-6 flex items-center justify-center w-12 h-12 bg-[#151515] border border-white/10 rounded-xl group-hover:scale-110 transition-transform duration-500">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight">FSRS Algorithm</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">Optimized scheduling ensures you review cards at the perfect moment to prevent forgetting.</p>
                </div>
              </div>
            </div>

            {/* Small Card 2 */}
            <div className="group relative overflow-hidden rounded-[2rem] bg-gray-50 border border-gray-200/60 p-8 transition-all duration-500 hover:border-black/20 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="text-black mb-6 w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-xl group-hover:-rotate-6 origin-bottom-left transition-transform duration-500 shadow-sm">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-black tracking-tight">Detailed Stats</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">Track your retention rates, study streaks, and time saved from blocked distractions.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Deep Dive / Alternating Section */}
      <section className="py-32 bg-white relative z-20 border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-32">

          {/* Feature 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-1/2 bg-gray-50 rounded-[2.5rem] h-[480px] border border-gray-200 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03),transparent_70%)] pointer-events-none" />

              <div className="w-64 h-80 bg-white border border-gray-200 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center gap-4 p-8 relative z-10 transform group-hover:-translate-y-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center shadow-inner relative mb-2">
                  <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <Smartphone className="w-7 h-7 relative z-10" />
                </div>
                <h4 className="text-black font-bold text-xl tracking-tight">App Blocked</h4>
                <p className="text-center text-gray-400 text-xs font-medium mb-4">Start a study session to unblock the app</p>
                <button className="w-full py-3 bg-black hover:bg-gray-800 text-white rounded-xl text-sm font-semibold transition-colors shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)]">
                  Study
                </button>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter text-black">Stop doomscrolling.<br />Start living.</h3>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 font-light">
                Custom app blocking lets you create personalized blocklists. We don't just block the app; we provide a moment of pause, allowing you to breathe and forcefully redirect your focus back to your goals.
              </p>
              <ul className="space-y-4">
                {['Strict Mode vectors available', 'Schedule-based blocking parameters', 'Granular usage statistics'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-600 font-medium text-sm">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-black" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-1/2 bg-gray-50 rounded-[2.5rem] h-[480px] border border-gray-200 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,206,140,0.1),transparent_70%)] pointer-events-none" />

              <div className="w-full max-w-sm relative z-10 perspective-[1000px] p-6 text-left">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] mb-6 transform translate-x-8 group-hover:translate-x-4 transition-transform duration-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Payload.Input</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    BiologyClass.pdf
                  </p>
                </div>

                <div className="bg-black text-white border border-gray-800 rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.2)] transform -translate-x-4 group-hover:-translate-x-0 transition-transform duration-700 relative z-20">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#f5ce8c]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-gray-400">Generated Card</span>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] font-mono text-white bg-white/10 rounded">Front</span>
                  </div>
                  <p className="font-bold text-lg mb-4 leading-tight">What is the primary product of photosynthesis?</p>
                  <p className="text-sm text-[#f5ce8c] font-light">Glucose and Oxygen</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter text-black">Knowledge,<br />Generated instantly.</h3>
              <p className="text-gray-500 text-lg leading-relaxed font-light">
                Don't waste time making cards. Our advanced AI pipeline analyzes your uploaded topics and assembles high-quality, question-answer pairs tailored to your structural learning level.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Trust & Testimonials - Minimalist Ledger */}
      <section className="py-32 relative bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-20 border-b border-gray-200 pb-6">
            <h2 className="text-3xl font-bold tracking-tight text-black">Peer Validations</h2>
            <div className="flex text-[#f5ce8c] mt-4 md:mt-0">
              {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-5 h-5" />)}
              <span className="ml-3 font-mono text-sm text-black font-semibold relative top-0.5 tracking-tight">4.9/5 AVERAGE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                quote: "This architecture fundamentally altered my workflow. The atomic blocking logic preserves my focus graph, while the FSRS generation is flawless.",
                name: "WaveCZ",
                role: "Pre-Med Student",
              },
              {
                quote: "A structural paradigm shift. It mitigates dopamine-driven scrolling loops completely. Productivity yields are unmatched.",
                name: "Muudys",
                role: "Engineering Major",
              },
              {
                quote: "The deep breathing intercept vectors turn negative latency into positive recovery periods. Truly a masterclass in UI/UX engineering.",
                name: "Aaron_T",
                role: "Law Student",
              },
            ].map((review, idx) => (
              <div key={idx} className="flex flex-col">
                <p className="text-xl text-black font-medium leading-relaxed tracking-tight mb-8 flex-grow">
                  "{review.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center font-bold text-sm text-black tracking-tighter shadow-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-black uppercase tracking-tight">{review.name}</h4>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Cinematic Gradient */}
      <section className="py-24 px-6 relative z-20">
        <div className="max-w-6xl mx-auto bg-black rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(245,206,140,0.2),transparent_70%)]" />
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] mix-blend-screen" />

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-white">
              Absolute Focus.
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light tracking-tight">
              Instantly replace the urge to scroll with a high-yield learning session. Install the instrument.
            </p>
            <a
              href="https://apps.apple.com/app/id6741184646?inviteCode=BFLMPSVZ4"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on App Store
              <ChevronRight className="w-5 h-5 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all text-gray-500" />
            </a>
          </div>
        </div>
      </section>

      {/* Global minimal styling additions */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(50%); }
        }
      `}} />
    </div>
  );
}

// Fallback user icon
function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
