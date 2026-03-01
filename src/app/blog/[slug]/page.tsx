import { getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { formatDate, readingTime } from "@/lib/utils";
import CategoryBadge from "@/components/CategoryBadge";
import PostBody from "@/components/PostBody";
import RelatedPosts from "@/components/RelatedPosts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://studyg-blog.vercel.app";

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      publishedTime: post.published_at ?? post.created_at,
      url: `${siteUrl}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.slug, post.category, 3);
  const date = post.published_at ?? post.created_at;
  const mins = readingTime(post.content);

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      {/* Post header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          {post.category && <CategoryBadge category={post.category} />}
          <span className="text-sm text-gray-500">{mins} min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-5 leading-tight tracking-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>
        )}

        {/* Author row */}
        <div className="flex items-center gap-4 pt-6 border-t border-black/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-black/10 border border-black/10 flex items-center justify-center text-black text-sm font-bold shrink-0">
              S
            </div>
            <span className="text-sm font-medium text-gray-700">
              StudyG Team
            </span>
          </div>
          <span className="text-black/20">·</span>
          <time className="text-sm text-gray-500">{formatDate(date)}</time>
        </div>
      </header>

      {/* Article body */}
      <PostBody content={post.content} />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-black/5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-black/5 border border-black/10 text-gray-600 px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* In-post CTA — light card style */}
      <div className="mt-14 p-8 rounded-3xl bg-gray-50 border border-black/5 text-center">
        <h3 className="font-bold text-black text-lg mb-2">
          Ready to put this into practice?
        </h3>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          StudyG uses spaced repetition and active recall to help you retain
          everything you learn — automatically.
        </p>
        <a
          href="https://apps.apple.com/app/id6741184646?inviteCode=BFLMPSVZ4"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-transform hover:scale-105 shadow-xl"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Download StudyG
        </a>
      </div>

      {/* Related posts */}
      <RelatedPosts posts={relatedPosts} />
    </div>
  );
}
