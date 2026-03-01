import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import { PostPreview } from "@/types/post";
import { formatDate } from "@/lib/utils";

export default function PostCard({ post }: { post: PostPreview }) {
  const date = post.published_at ?? post.created_at;

  return (
    <article className="group card-gradient border border-black/5 rounded-3xl overflow-hidden glow-hover hover:border-black/10 transition-colors duration-300">
      {/* Subtle top accent line */}
      <div className="h-px bg-gradient-to-r from-black/20 via-black/5 to-transparent" />

      <div className="p-8">
        <div className="mb-4">
          {post.category && <CategoryBadge category={post.category} />}
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="font-bold text-black text-lg leading-snug line-clamp-2 group-hover:text-gray-700 transition-colors mb-3">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}
        </Link>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-black/5">
          <time className="text-xs text-gray-500">{formatDate(date)}</time>
          <Link
            href={`/blog/${post.slug}`}
            className="text-xs text-gray-500 hover:text-black transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
