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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Post header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {post.category && <CategoryBadge category={post.category} />}
          <span className="text-sm text-slate-400">{mins} min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-slate-500 leading-relaxed mb-6">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-4 pt-5 border-t border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              S
            </div>
            <span className="text-sm font-medium text-slate-700">
              StudyG Team
            </span>
          </div>
          <span className="text-slate-300">·</span>
          <time className="text-sm text-slate-400">{formatDate(date)}</time>
        </div>
      </header>

      {/* Article body */}
      <PostBody content={post.content} />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-200">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 p-7 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 text-center">
        <h3 className="font-bold text-slate-900 mb-2">
          Ready to study smarter?
        </h3>
        <p className="text-sm text-slate-600 mb-5 leading-relaxed">
          StudyG uses spaced repetition and active recall to help you retain
          everything you learn — automatically.
        </p>
        <a
          href="https://studyg.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex px-6 py-2.5 rounded-full bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors"
        >
          Get StudyG free →
        </a>
      </div>

      {/* Related posts */}
      <RelatedPosts posts={relatedPosts} />
    </div>
  );
}
