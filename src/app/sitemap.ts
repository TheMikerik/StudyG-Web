import { MetadataRoute } from "next";
import {
  getCategories,
  getAllSubcategories,
  getAllPublishedSlugs,
  getFlashcardPageCount,
} from "@/lib/silo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://studyg.app";

  const [categories, allSubs, publishedSlugs] = await Promise.all([
    getCategories(),
    getAllSubcategories(),
    getAllPublishedSlugs(),
  ]);

  // Published topic counts per subcategory
  const counts = await Promise.all(
    allSubs.map((sub) => getFlashcardPageCount(sub.id))
  );
  const countById = Object.fromEntries(
    allSubs.map((sub, i) => [sub.id, counts[i]])
  );
  const catById = Object.fromEntries(categories.map((cat) => [cat.id, cat]));

  // Subcategories with >= 1 published topic, grouped by category
  const subsWithContentPerCat = (catId: string) =>
    allSubs
      .filter((s) => s.category_id === catId && (countById[s.id] ?? 0) > 0)
      .length;

  // L1: index only if >= 3 subcategories have published topics
  const categoryUrls: MetadataRoute.Sitemap = categories
    .filter((cat) => subsWithContentPerCat(cat.id) >= 3)
    .map((cat) => ({
      url: `${siteUrl}/flashcards/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));

  // L2: index only if >= 3 published topics
  const subcategoryUrls: MetadataRoute.Sitemap = allSubs
    .filter((sub) => (countById[sub.id] ?? 0) >= 3)
    .map((sub) => {
      const cat = catById[sub.category_id];
      return {
        url: `${siteUrl}/flashcards/${cat?.slug}/${sub.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.6,
      };
    })
    .filter((entry) => !entry.url.includes("undefined"));

  // L3: all published topic pages
  const topicUrls: MetadataRoute.Sitemap = publishedSlugs.map(
    ({ categorySlug, subcategorySlug, pageSlug }) => ({
      url: `${siteUrl}/flashcards/${categorySlug}/${subcategorySlug}/${pageSlug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...(publishedSlugs.length > 0
      ? [
          {
            url: `${siteUrl}/flashcards`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 0.8,
          },
        ]
      : []),
    ...categoryUrls,
    ...subcategoryUrls,
    ...topicUrls,
  ];
}
