import LegalTOC from "@/components/LegalTOC";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — StudyG",
  description:
    "This policy explains how we collect and handle your information when using StudyG.",
};

const TOC_ITEMS = [
  { href: "#collected", label: "1. Info Collected" },
  { href: "#use", label: "2. Use of Info" },
  { href: "#sharing", label: "3. Data Sharing" },
  { href: "#rights", label: "4. Your Rights" },
  { href: "#security", label: "5–9. General Terms" },
  { href: "#ccpa", label: "CCPA Compliance" },
  { href: "#tech", label: "Tech & AI" },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-[#0a0a0a] border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center animate-fade-in-up relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400 mb-6">
            🔒 Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            This policy explains how we collect and handle your information when
            using StudyG.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            <strong>Effective Date:</strong>{" "}
            <span className="text-white">January 1, 2026</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <h3 className="font-bold text-white mb-4 pl-4 uppercase text-xs tracking-wider opacity-50">
                Contents
              </h3>
              <LegalTOC items={TOC_ITEMS} />
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-9 space-y-8 content-area">
            <div
              id="collected"
              className="bg-[#121212] border border-white/5 rounded-2xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-white/10">
                1. Information We Collect and Legal Bases for Processing
              </h2>
              <ul className="space-y-2 text-gray-400 leading-relaxed list-disc pl-5">
                <li>
                  <strong className="text-white">Account Information:</strong>{" "}
                  Name and email address. We process this based on{" "}
                  <strong className="text-white">contractual necessity</strong>.
                </li>
                <li>
                  <strong className="text-white">Usage Data:</strong> Feature
                  usage, survey answers, and performance metrics. Based on our{" "}
                  <strong className="text-white">legitimate interest</strong>.
                </li>
                <li>
                  <strong className="text-white">Device Information:</strong>{" "}
                  Device type, OS, app version. Based on{" "}
                  <strong className="text-white">legitimate interest</strong>.
                </li>
                <li>
                  <strong className="text-white">Payment Information:</strong>{" "}
                  Processed by{" "}
                  <a
                    href="https://superwall.com/privacy"
                    className="text-white underline decoration-white/30 hover:decoration-white transition-all"
                  >
                    Superwall
                  </a>
                  (third-party). Based on{" "}
                  <strong className="text-white">contractual necessity</strong>.
                </li>
                <li>
                  <strong className="text-white">User Content:</strong> Decks
                  &amp; Flashcards you create. Based on{" "}
                  <strong className="text-white">contractual necessity</strong>.
                </li>
                <li>
                  <strong className="text-white">Technical Data:</strong> IP
                  address. Based on{" "}
                  <strong className="text-white">legitimate interest</strong>.
                </li>
                <li>
                  <strong className="text-white">AI Feature Data:</strong>{" "}
                  Inputs and generated content (we do <em>NOT</em> keep or save
                  inputs). Based on{" "}
                  <strong className="text-white">contractual necessity</strong>.
                </li>
                <li>
                  <strong className="text-white">Authentication Data:</strong>{" "}
                  Basic profile from &ldquo;Sign in with Apple&rdquo; or
                  &ldquo;Google Sign-in&rdquo;. Based on{" "}
                  <strong className="text-white">consent</strong> and{" "}
                  <strong className="text-white">contractual necessity</strong>.
                </li>
              </ul>
            </div>

            <div
              id="use"
              className="bg-[#121212] border border-white/5 rounded-2xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-white/10">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-400 mb-3">We use your information to:</p>
              <ul className="space-y-2 text-gray-400 list-disc pl-5">
                <li>Provide and improve the App</li>
                <li>Process payments and manage subscriptions</li>
                <li>Communicate about updates and support</li>
                <li>Comply with legal requirements</li>
                <li>Analyze usage trends to enhance user experience</li>
                <li>Power AI features through Google&apos;s Gemini AI</li>
              </ul>
            </div>

            <div
              id="sharing"
              className="bg-[#121212] border border-white/5 rounded-2xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-white/10">
                3. Who We Share Your Information With
              </h2>
              <p className="text-gray-400 mb-3">
                We do not sell or rent your personal information. We may share
                information with:
              </p>
              <ul className="space-y-2 text-gray-400 list-disc pl-5">
                <li>
                  <strong className="text-white">Service Providers:</strong>{" "}
                  Posthog (analytics), Supabase (database), Sentry (errors),
                  PowerSync (syncing), Superwall (payments), UpStash (rate
                  limiting), Apple &amp; Google (authentication)
                </li>
                <li>
                  <strong className="text-white">Legal Requirements:</strong>{" "}
                  When required by law
                </li>
                <li>
                  <strong className="text-white">Business Transfers:</strong>{" "}
                  In the event of a merger, acquisition, or asset sale
                </li>
              </ul>
            </div>

            <div
              id="rights"
              className="bg-[#121212] border border-white/5 rounded-2xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-white/10">
                4. Your Rights
              </h2>
              <p className="text-gray-400 mb-3">You have the right to:</p>
              <ul className="space-y-2 text-gray-400 list-disc pl-5">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your data</li>
                <li>Restrict processing</li>
                <li>Object to processing</li>
                <li>Data portability</li>
              </ul>
              <p className="text-gray-400 mt-4">
                California residents have additional rights under applicable law.
              </p>
            </div>

            <div
              id="security"
              className="bg-[#121212] border border-white/5 rounded-2xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-white/10">
                5. Data Security
              </h2>
              <p className="text-gray-400 mb-6">
                We use encryption and other security measures to protect your
                data, though no method is 100% secure.
              </p>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-white/10">
                6. Data Retention
              </h2>
              <p className="text-gray-400 mb-3">
                We keep your data as long as needed to provide services or as
                required by law. When you delete your account, we delete your
                personal information except:
              </p>
              <ul className="space-y-2 text-gray-400 list-disc pl-5 mb-6">
                <li>Where legally required to retain it</li>
                <li>
                  Analytics data (which you can request to be deleted by
                  contacting us)
                </li>
              </ul>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-white/10">
                7. Children&apos;s Privacy
              </h2>
              <p className="text-gray-400 mb-6">
                Our App is not intended for children under 13, and we do not
                knowingly collect data from them.
              </p>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-white/10">
                8. Updates to This Policy
              </h2>
              <p className="text-gray-400 mb-6">
                We may update this policy and will notify you of significant
                changes through the App or website.
              </p>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-white/10">
                9. Contact Us
              </h2>
              <p className="text-gray-400 mb-6">
                Questions or concerns? Contact us at{" "}
                <a
                  href="mailto:info@studyg.app"
                  className="text-white underline decoration-white/30 hover:decoration-white transition-all"
                >
                  info@studyg.app
                </a>
                .
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Last Updated:</strong> March 22, 2025
              </p>
            </div>

            <div
              id="ccpa"
              className="bg-gradient-to-br from-[#121212] to-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-white/10">
                CCPA Compliance for California Residents
              </h2>
              <p className="text-gray-400 mb-3">
                California residents have the following rights under the CCPA:
              </p>
              <ul className="space-y-2 text-gray-400 list-disc pl-5 mb-4">
                <li>The right to know what personal information we collect</li>
                <li>
                  The right to request deletion of your personal information
                </li>
                <li>
                  The right to opt-out of the sale of your personal information
                  (we do not sell personal information)
                </li>
              </ul>
              <p className="text-gray-400 mb-4">
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:info@studyg.app"
                  className="text-white underline decoration-white/30 hover:decoration-white transition-all"
                >
                  info@studyg.app
                </a>
                .
              </p>
              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                No Discriminatory Practices
              </h3>
              <p className="text-gray-400">
                We do not discriminate against you for exercising any of your
                rights under the CCPA.
              </p>
            </div>

            <div
              id="tech"
              className="bg-[#121212] border border-white/5 rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                Important Note on AI Features
              </h3>
              <p className="text-gray-400 mb-6">
                When using AI features, your input is processed by
                Google&apos;s Gemini AI. We recommend not inputting sensitive or
                confidential information into AI features.
              </p>
              <h3 className="text-xl font-semibold text-white mb-3">
                UpStash for Rate Limiting
              </h3>
              <p className="text-gray-400 mb-6">
                We use UpStash to manage rate limiting. UpStash may collect your
                IP address for this purpose. See{" "}
                <a
                  href="https://upstash.com/docs/common/help/legal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline decoration-white/30 hover:decoration-white transition-all"
                >
                  UpStash Privacy
                </a>
                .
              </p>
              <h3 className="text-xl font-semibold text-white mb-3">
                Do Not Track
              </h3>
              <p className="text-gray-400">
                Our App does not currently recognize &ldquo;Do Not Track&rdquo;
                signals. However, we respect your privacy preferences through
                device settings options.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
