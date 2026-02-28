import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  getFlashcardPageBySlug,
  getRelatedFlashcardPages,
  getAllPublishedSlugs,
} from "@/lib/silo";
import TopicClientPage from "./client-page";

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
      <TopicClientPage
        page={page}
        catSlug={catSlug}
        subSlug={subSlug}
        relatedPages={relatedPages}
        breadcrumb={breadcrumb}
      />
    </>
  );
}
