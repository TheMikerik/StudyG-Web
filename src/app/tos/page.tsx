import LegalTOC from "@/components/LegalTOC";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — StudyG",
  description: "Please read these terms carefully before using StudyG.",
};

const TOC_ITEMS = [
  { href: "#intro", label: "Introduction" },
  { href: "#acceptance", label: "1. Acceptance" },
  { href: "#usage", label: "2–5. Account & Use" },
  { href: "#billing", label: "6. Subscriptions" },
  { href: "#content", label: "7. User Content" },
  { href: "#legal", label: "8–15. Legal" },
];

export default function TOSPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gray-50 border-b border-black/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-black/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center animate-fade-in-up relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-medium text-gray-600 mb-6">
            📄 Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Terms &amp; <span className="text-gradient">Conditions</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Please read these terms carefully before using StudyG.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            <strong>Effective Date:</strong>{" "}
            <span className="text-black">January 1, 2026</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <h3 className="font-bold text-black mb-4 pl-4 uppercase text-xs tracking-wider opacity-50">
                Contents
              </h3>
              <LegalTOC items={TOC_ITEMS} />
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-9 space-y-8">
            <div
              id="intro"
              className="bg-white border border-black/5 rounded-2xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                Terms &amp; Conditions
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to StudyG, a flashcard app designed to help users learn
                and retain information through spaced repetition. By downloading
                or using our app, you agree to comply with and be bound by the
                following Terms and Conditions. Please read them carefully.
              </p>
            </div>

            <div
              id="acceptance"
              className="bg-white border border-black/5 rounded-2xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using StudyG, you agree to these Terms and
                Conditions and any additional terms applicable to certain
                features or services. If you do not agree, please discontinue
                use of the app immediately.
              </p>
            </div>

            <div
              id="usage"
              className="bg-white border border-black/5 rounded-2xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                2. Eligibility
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                You must be at least 13 years old to use StudyG. Parents or
                legal guardians are responsible for monitoring the use of the
                app by minors under their supervision.
              </p>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                3. Account Registration
              </h2>
              <p className="text-gray-600 mb-3">
                To access certain features, you may be required to create an
                account. You agree to:
              </p>
              <ul className="space-y-2 text-gray-600 list-disc pl-5 mb-6">
                <li>
                  Provide accurate, current, and complete information during
                  registration.
                </li>
                <li>Keep your login credentials secure.</li>
                <li>
                  Notify us immediately of any unauthorized use of your account.
                </li>
              </ul>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                4. Use of the App
              </h2>
              <p className="text-gray-600 mb-3">
                You agree to use the app responsibly. You may not:
              </p>
              <ul className="space-y-2 text-gray-600 list-disc pl-5 mb-6">
                <li>Use the app for unlawful purposes or activities.</li>
                <li>
                  Disrupt or interfere with the app&apos;s functionality.
                </li>
                <li>
                  Attempt to reverse-engineer or exploit the app&apos;s
                  software.
                </li>
              </ul>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                5. Privacy and Data
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We are committed to protecting your privacy. Please review our
                Privacy Policy to understand how your data is collected, used,
                and stored.
              </p>
            </div>

            <div
              id="billing"
              className="bg-white border border-black/5 rounded-2xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                6. Paid Subscriptions and Billing
              </h2>
              <p className="text-gray-600 mb-3">
                By purchasing a subscription, you agree to:
              </p>
              <ul className="space-y-2 text-gray-600 list-disc pl-5 mb-4">
                <li>Pay all applicable fees promptly.</li>
                <li>
                  Allow us to charge your provided payment method for recurring
                  subscriptions until you cancel.
                </li>
              </ul>
              <p className="text-gray-600">
                <strong className="text-black">
                  Cancellation and Refunds:
                </strong>{" "}
                You can cancel your subscription at any time through device
                settings. Refunds are subject to our discretion and applicable
                app store policies.
              </p>
            </div>

            <div
              id="content"
              className="bg-white border border-black/5 rounded-2xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                7. User Content
              </h2>
              <p className="text-gray-600 mb-3">
                When you create flashcards, decks, or other content within
                StudyG:
              </p>
              <ul className="space-y-2 text-gray-600 list-disc pl-5 mb-4">
                <li>You retain ownership of your content.</li>
                <li>
                  You grant us a non-exclusive, worldwide license to use, store,
                  and display your content for the purpose of providing and
                  improving our services.
                </li>
                <li>
                  You are solely responsible for ensuring your content does not
                  violate any third-party rights.
                </li>
              </ul>
              <p className="text-gray-600">
                When you terminate your account, all flashcards, decks and other
                content are deleted from our database.
              </p>
            </div>

            <div
              id="legal"
              className="bg-white border border-black/5 rounded-2xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                8. Disclaimer of Warranties
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                StudyG is provided on an &ldquo;as-is&rdquo; and
                &ldquo;as-available&rdquo; basis. We do not guarantee the app
                will be free of errors, interruptions, or security
                vulnerabilities. Learning outcomes may vary for individual users.
              </p>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                9. Limitation of Liability
              </h2>
              <p className="text-gray-600 mb-3">
                To the fullest extent permitted by law, StudyG and its creators
                are not liable for:
              </p>
              <ul className="space-y-2 text-gray-600 list-disc pl-5 mb-6">
                <li>
                  Any direct, indirect, incidental, or consequential damages
                  resulting from use of the app.
                </li>
                <li>Loss of data, reputation, or profits.</li>
              </ul>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                10. Dispute Resolution
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Contact us first at info@studyg.app. If unresolved within 60
                days, either party may initiate binding arbitration under the
                American Arbitration Association&apos;s rules. Class actions are
                not permitted.
              </p>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                11. Intellectual Property
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                All content, trademarks, and materials provided through StudyG
                are the property of the app&apos;s creators or licensed to us.
                You may not reproduce, distribute, or modify this content without
                prior permission.
              </p>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                12. Changes to Terms
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We may update these Terms periodically. Continued use of the app
                after such changes constitutes your acceptance.
              </p>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                13. Termination
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We reserve the right to suspend or terminate your access at our
                sole discretion, without prior notice, for violation of these
                Terms.
              </p>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                14. Governing Law
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                These Terms are governed by the laws of Czechia.
              </p>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                15. Contact Information
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Questions? Contact us at{" "}
                <a
                  href="mailto:info@studyg.app"
                  className="text-black underline decoration-black/30 hover:decoration-black transition-all"
                >
                  info@studyg.app
                </a>
                .
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Last Updated:</strong> March 22, 2025
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
