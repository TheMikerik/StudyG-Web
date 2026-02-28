import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import { PostPreview } from "@/types/post";
import { formatDate } from "@/lib/utils";

export default function PostCard({ post }: { post: PostPreview }) {
  const date = post.published_at ?? post.created_at;

  return (
    <article className="group card-gradient border border-white/5 rounded-3xl overflow-hidden glow-hover hover:border-white/20 transition-colors duration-300">
      {/* Subtle top accent line */}
      <div className="h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent" />

      <div className="p-8">
        <div className="mb-4">
          {post.category && <CategoryBadge category={post.category} />}
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="font-bold text-white text-lg leading-snug line-clamp-2 group-hover:text-gray-300 transition-colors mb-3">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}
        </Link>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
          <time className="text-xs text-gray-600">{formatDate(date)}</time>
          <Link
            href={`/blog/${post.slug}`}
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
