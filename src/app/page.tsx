import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StudyG — Focus Deeply, Learn Faster",
  description:
    "Transform your digital habits. Block distractions instantly and turn wasted screen time into effortless learning mastery with FSRS algorithms.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Now with AI Flashcards
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
              Focus Deeply.
              <br />
              <span className="text-gradient">Learn Faster.</span>
            </h1>

            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Transform your digital habits. Block distractions instantly and
              turn wasted screen time into effortless learning mastery with FSRS
              algorithms.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://apps.apple.com/app/id6741184646?inviteCode=BFLMPSVZ4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <Link
                href="/blog"
                className="flex items-center justify-center gap-3 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                Read the Blog →
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {["W", "M", "A"].map((initial) => (
                  <div
                    key={initial}
                    className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#050505] flex items-center justify-center text-xs font-bold text-white"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p>Trusted by 10,000+ students</p>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative hidden lg:flex h-[600px] items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-3xl opacity-30 rounded-full" />
            <div className="relative z-10 w-64 h-[520px] bg-[#0a0a0a] border border-white/10 rounded-[40px] shadow-2xl flex flex-col overflow-hidden">
              {/* Phone status bar */}
              <div className="h-12 flex items-center justify-center border-b border-white/5 shrink-0">
                <div className="w-20 h-5 bg-white/10 rounded-full" />
              </div>
              {/* App content mock */}
              <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
                <div className="text-xs text-gray-500 font-medium mb-1">
                  Today&apos;s Session
                </div>
                <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 flex flex-col gap-2">
                  <div className="text-xs text-gray-400">
                    What is spaced repetition?
                  </div>
                  <div className="text-sm text-white font-medium">
                    A technique that spaces out reviews at increasing intervals
                    to boost long-term memory.
                  </div>
                </div>
                <div className="flex gap-2 mt-1">
                  <button className="flex-1 py-2 bg-white/5 rounded-xl text-xs text-gray-400">
                    Again
                  </button>
                  <button className="flex-1 py-2 bg-white text-black rounded-xl text-xs font-bold">
                    Good
                  </button>
                  <button className="flex-1 py-2 bg-white/5 rounded-xl text-xs text-gray-400">
                    Easy
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {[80, 60, 90].map((w, i) => (
                    <div
                      key={i}
                      className="h-10 bg-[#121212] border border-white/5 rounded-xl animate-pulse"
                      style={{ animationDelay: `${i * 250}ms`, width: `${w}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features bento grid */}
      <section id="features" className="py-24 bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Engineered for{" "}
              <span className="text-white">Efficiency</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to stop scrolling and start retaining
              information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large card */}
            <div className="md:col-span-2 bg-[#121212] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center text-2xl mb-6">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l6 2.67V11c0 3.83-2.6 7.4-6 8.55C8.6 18.4 6 14.83 6 11V7.67L12 5z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  Nuclear Distraction Blocking
                </h3>
                <p className="text-gray-400 text-lg max-w-md">
                  Regain control. Define strict blocklists for social media and
                  games. When you try to open them, we guide you back to focus.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all duration-700" />
            </div>

            {/* Tall card */}
            <div className="md:row-span-2 bg-[#121212] border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
              <div className="w-14 h-14 bg-[#1e1e1e] border border-white/10 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-colors">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                AI-Powered
                <br />
                Creation
              </h3>
              <p className="text-gray-400 mb-8">
                Upload audio files, PDFs, or images and our AI generates
                comprehensive flashcards for you automatically.
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#050505] to-transparent" />
              <div className="flex flex-col gap-3 mt-10 opacity-60 group-hover:opacity-100 transition-opacity">
                {[0, 250, 500].map((delay) => (
                  <div
                    key={delay}
                    className="w-full h-16 bg-[#1e1e1e] rounded-xl border border-white/5 animate-pulse"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>

            {/* Small card 1 */}
            <div className="bg-[#121212] border border-white/5 rounded-3xl p-8 group hover:border-white/20 transition-all duration-500">
              <div className="text-3xl text-gray-300 mb-4">⟳</div>
              <h3 className="text-xl font-bold mb-2">FSRS Algorithm</h3>
              <p className="text-gray-400 text-sm">
                Optimized scheduling ensures you review cards at the perfect
                moment to prevent forgetting.
              </p>
            </div>

            {/* Small card 2 */}
            <div className="bg-[#121212] border border-white/5 rounded-3xl p-8 group hover:border-white/20 transition-all duration-500">
              <div className="text-3xl text-gray-300 mb-4">◎</div>
              <h3 className="text-xl font-bold mb-2">Detailed Stats</h3>
              <p className="text-gray-400 text-sm">
                Track your retention rates, study streaks, and time saved from
                blocked distractions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deep dive alternating sections */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-32">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 bg-gradient-to-br from-[#121212] to-[#0a0a0a] rounded-3xl h-[400px] border border-white/5 flex items-center justify-center relative overflow-hidden group">
              <div className="w-56 bg-[#050505] border border-white/10 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-4 p-6 relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-2xl">
                  ✕
                </div>
                <h4 className="text-white font-bold text-lg">App Blocked</h4>
                <p className="text-center text-gray-500 text-xs">
                  Start a study session to unblock the app
                </p>
                <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs transition-colors text-white">
                  Study
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-bold mb-4">
                Stop doomscrolling.
                <br />
                Start living.
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Custom app blocking lets you create personalized blocklists. We
                don&apos;t just block the app; we provide a moment of pause,
                allowing you to breathe and redirect your focus back to your
                goals.
              </p>
              <ul className="space-y-3 text-gray-300">
                {[
                  "Strict Mode available",
                  "Schedule-based blocking",
                  "Usage statistics",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="text-white font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2 bg-gradient-to-bl from-[#121212] to-[#0a0a0a] rounded-3xl h-[400px] border border-white/5 flex items-center justify-center relative overflow-hidden group">
              <div className="w-full max-w-sm p-6 relative z-10">
                <div className="bg-[#050505] border border-white/10 rounded-xl p-4 shadow-xl mb-4 translate-x-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <span className="text-xs text-gray-400">Input</span>
                  </div>
                  <p className="text-sm text-white">BiologyClass.pdf</p>
                </div>
                <div className="bg-white text-black border border-white/10 rounded-xl p-4 shadow-xl -translate-x-4 relative z-20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs">⚡</span>
                    <span className="text-xs font-bold">Generated Card</span>
                  </div>
                  <p className="font-bold text-sm mb-1">
                    What is the primary product of photosynthesis?
                  </p>
                  <p className="text-sm opacity-70">Glucose and Oxygen</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-bold mb-4">
                Knowledge,
                <br />
                Generated instantly.
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Don&apos;t waste time making cards. Our advanced AI analyzes
                your topic and creates high-quality, question-answer pairs
                tailored to your learning level.
              </p>
              <ul className="space-y-3 text-gray-300">
                {[
                  "PDF, audio & image support",
                  "Automatic Q&A generation",
                  "Adapts to your level",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="text-white font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Impact Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "This app has really helped me change how I use my time. The blocking feature keeps me focused, and the flashcards are a massive bonus.",
                name: "WaveCZ",
                location: "Czechia",
                initial: "W",
              },
              {
                quote:
                  "Game-Changer! The best app I've found to reduce distractions. After just one week, I've gotten so much done.",
                name: "Muudys",
                location: "United States",
                initial: "M",
              },
              {
                quote:
                  "I love the breathing exercise feature. It turns every break into a productive one. Can't wait for more updates.",
                name: "aaron_t",
                location: "Australia",
                initial: "A",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-[#121212] p-8 rounded-2xl border border-white/5 glow-hover"
              >
                <div className="flex text-white mb-4 text-xs gap-1">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  &quot;{review.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">
                    {review.initial}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
