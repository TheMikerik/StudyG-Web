import type { FAQItem } from "@/types/silo";

export default function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section>
        <h2 className="text-2xl font-bold mb-6 text-white">
          Frequently Asked Questions
        </h2>
        <dl className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#121212] border border-white/5 rounded-xl p-6"
            >
              <dt className="font-semibold text-white mb-2">{faq.question}</dt>
              <dd className="text-gray-400">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
