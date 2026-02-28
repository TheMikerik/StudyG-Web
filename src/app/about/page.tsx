import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — StudyG",
  description:
    "We are on a mission to redefine how you learn and focus in a digital world.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-4xl mx-auto px-6 text-center animate-fade-in-up relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Our <span className="text-gradient">Story</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We are on a mission to redefine how you learn and focus in a digital
            world.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="pb-24 flex-grow">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-12">
          {/* Mission */}
          <div className="bg-[#121212] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center text-3xl shrink-0">
                🚀
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">The Mission</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  StudyG is your companion for effective learning and focus. Our
                  mission is to help you maximize productivity by combining smart
                  flashcard learning with innovative features like app-blocking
                  to minimize distractions. Whether you&apos;re studying for
                  exams or expanding your knowledge, StudyG keeps you on track.
                  Join us on this journey to make learning engaging, focused, and
                  fun!
                </p>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 text-9xl opacity-5 group-hover:opacity-10 transition-opacity duration-700 select-none">
              🚀
            </div>
          </div>

          {/* Science */}
          <div className="bg-[#121212] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-[#1e1e1e] border border-white/10 text-white rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                🧠
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">The Science</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  At the heart of StudyG is the power of spaced repetition, a
                  proven method for retaining knowledge long-term. By presenting
                  information at carefully timed intervals, StudyG ensures you
                  review material at just the right moment, strengthening your
                  memory and improving recall. The app&apos;s intuitive interface
                  makes it easy to create, organize, and study your flashcards,
                  so you can focus on what truly matters—learning.
                </p>
              </div>
            </div>
          </div>

          {/* Productivity */}
          <div className="bg-[#121212] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-[#1e1e1e] border border-white/10 text-white rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                🛡️
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Productivity Booster
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  But StudyG is more than just a study tool; it&apos;s a
                  productivity booster. With the unique app-blocking feature, you
                  can temporarily block access to distracting apps until
                  you&apos;ve completed your set of flashcards. This creates a
                  focused environment that helps you build better habits and
                  achieve your goals. StudyG isn&apos;t just about
                  learning—it&apos;s about transforming how you approach your
                  time and productivity.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 text-9xl opacity-5 group-hover:opacity-10 transition-opacity duration-700 select-none">
              🛡️
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
