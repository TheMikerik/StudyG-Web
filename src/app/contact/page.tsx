import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — StudyG",
  description:
    "We'd love to hear from you — whether it's a question, feedback, or just a hello!",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-white/5 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-4xl mx-auto px-6 text-center animate-fade-in-up relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We&apos;d love to hear from you — whether it&apos;s a question,
            feedback, or just a hello!
          </p>
        </div>
      </section>

      {/* Discord card */}
      <section className="pb-24 flex-grow">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-indigo-400/50 transition-all duration-500">
            <div className="relative z-10">
              {/* Discord icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.042.03.052a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>

              <h2 className="text-3xl font-bold mb-4">
                Join Our Community
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Connect with fellow learners, get real-time support, and stay
                updated with the latest features. Our Discord community is where
                the magic happens!
              </p>

              <div className="space-y-4">
                <a
                  href="https://discord.gg/6p4nV8Yevg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-4 p-6 rounded-xl bg-white text-black hover:bg-gray-100 transition-all hover:-translate-y-1 shadow-lg font-bold text-lg"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.042.03.052a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  Join Discord Server
                </a>

                <div className="text-center">
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                    Community Features
                  </div>
                  <div className="text-sm text-gray-300 mt-1">
                    Live support · Study groups · Feature updates · Daily
                    motivation
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-indigo-500/10 to-purple-500/10 pointer-events-none opacity-50" />
          </div>
        </div>
      </section>
    </>
  );
}
