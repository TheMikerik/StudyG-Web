import Link from "next/link";
import { PostPreview } from "@/types/post";
import { formatDate } from "@/lib/utils";
import CategoryBadge from "./CategoryBadge";

export default function RelatedPosts({ posts }: { posts: PostPreview[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-slate-200">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Related Posts</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block p-5 rounded-xl border border-slate-200 hover:border-violet-200 hover:shadow-md transition-all"
          >
            {post.category && (
              <div className="mb-3">
                <CategoryBadge category={post.category} />
              </div>
            )}
            <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 transition-colors line-clamp-2 text-sm leading-snug">
              {post.title}
            </h3>
            <time className="mt-2 block text-xs text-slate-400">
              {formatDate(post.published_at ?? post.created_at)}
            </time>
          </Link>
        ))}
      </div>
    </section>
  );
}
