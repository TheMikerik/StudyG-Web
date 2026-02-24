import { MetadataRoute } from "next";
import { getPosts, CATEGORIES } from "@/lib/posts";
import { categoryToSlug } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts(1000);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://studyg-blog.vercel.app";

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.published_at ?? post.created_at),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${siteUrl}/blog/category/${categoryToSlug(cat)}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.6,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...categoryUrls,
    ...postUrls,
  ];
}
