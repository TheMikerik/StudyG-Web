import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import { PostPreview } from "@/types/post";
import { formatDate } from "@/lib/utils";

export default function PostCard({ post }: { post: PostPreview }) {
  const date = post.published_at ?? post.created_at;

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-violet-200 hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-600" />

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 mb-4">
          {post.category && <CategoryBadge category={post.category} />}
        </div>

        <Link href={`/blog/${post.slug}`} className="flex-1 group/link">
          <h2 className="text-base font-semibold text-slate-900 group-hover/link:text-violet-700 transition-colors line-clamp-2 mb-2 leading-snug">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </Link>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
          <time className="text-xs text-slate-400">{formatDate(date)}</time>
          <Link
            href={`/blog/${post.slug}`}
            className="text-xs font-medium text-violet-600 hover:text-violet-800 transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
