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
        <h2 className="text-2xl font-bold mb-6 text-black tracking-tight">
          Frequently Asked Questions
        </h2>
        <dl className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="card-premium smooth-border border border-black/5 rounded-2xl p-6 hover:border-black/10 transition-colors"
            >
              <dt className="font-semibold text-black mb-3 text-[15px] leading-snug">{faq.question}</dt>
              <dd className="text-gray-600 text-[15px] leading-relaxed font-light">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
