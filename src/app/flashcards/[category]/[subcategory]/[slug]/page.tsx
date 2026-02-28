import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  getFlashcardPageBySlug,
  getRelatedFlashcardPages,
  getAllPublishedSlugs,
} from "@/lib/silo";
import Breadcrumb from "@/components/Breadcrumb";
import FlashcardPreview from "@/components/FlashcardPreview";
import FAQSection from "@/components/FAQSection";
import RelatedTopics from "@/components/RelatedTopics";

export const revalidate = 86400;

type Props = {
  params: Promise<{ category: string; subcategory: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map(({ categorySlug, subcategorySlug, pageSlug }) => ({
    category: categorySlug,
    subcategory: subcategorySlug,
    slug: pageSlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: catSlug, subcategory: subSlug, slug } = await params;
  const page = await getFlashcardPageBySlug(slug);
  if (!page) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studyg.app";
  const description =
    page.intro.length > 155
      ? page.intro.slice(0, 155).trimEnd() + "…"
      : page.intro;

  return {
    title: page.h1,
    description,
    alternates: {
      canonical: `${siteUrl}/flashcards/${catSlug}/${subSlug}/${slug}`,
    },
    openGraph: {
      title: page.h1,
      description,
      type: "article",
    },
  };
}

export default async function TopicPage({ params }: Props) {
  const { category: catSlug, subcategory: subSlug, slug } = await params;

  const [category, subcategory, page] = await Promise.all([
    getCategoryBySlug(catSlug),
    getSubcategoryBySlug(subSlug),
    getFlashcardPageBySlug(slug),
  ]);

  if (!category || !subcategory || !page) notFound();

  const relatedPages = page.related_slugs?.length
    ? await getRelatedFlashcardPages(page.related_slugs)
    : [];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studyg.app";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Flashcard Directory",
        item: `${siteUrl}/flashcards`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${siteUrl}/flashcards/${catSlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: subcategory.name,
        item: `${siteUrl}/flashcards/${catSlug}/${subSlug}`,
      },
      { "@type": "ListItem", position: 5, name: page.h1 },
    ],
  };

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Flashcard Directory", href: "/flashcards" },
    { label: category.name, href: `/flashcards/${catSlug}` },
    { label: subcategory.name, href: `/flashcards/${catSlug}/${subSlug}` },
    { label: page.h1 },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-3xl mx-auto px-6 py-20">
        <Breadcrumb items={breadcrumb} />

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
          {page.h1}
        </h1>

        <p className="text-gray-400 leading-relaxed mb-12">{page.intro}</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Flashcard Preview
          </h2>
          <FlashcardPreview flashcards={page.flashcards} />
          <p className="mt-4 text-sm text-gray-600">
            Click any card to reveal the answer.
          </p>
        </section>

        {page.faq?.length > 0 && (
          <div className="mb-12">
            <FAQSection faqs={page.faq} />
          </div>
        )}

        {relatedPages.length > 0 && (
          <div className="mb-12">
            <RelatedTopics
              pages={relatedPages}
              categorySlug={catSlug}
              subcategorySlug={subSlug}
            />
          </div>
        )}

        <div className="pt-8 border-t border-white/5">
          <a
            href="https://apps.apple.com/app/id6741184646?inviteCode=BFLMPSVZ4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all text-sm"
          >
            Study these flashcards in StudyG — free →
          </a>
        </div>
      </div>
    </>
  );
}
