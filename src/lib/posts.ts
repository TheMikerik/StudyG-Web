import { supabase } from "./supabase";
import { Post, PostPreview } from "@/types/post";
import { MOCK_POSTS } from "./mockData";
import { categoryToSlug } from "./utils";

// Fall back to mock data when Supabase isn't configured yet (empty string counts as missing)
const useMock = !(process.env.NEXT_PUBLIC_SUPABASE_URL || "").startsWith("http");

export const CATEGORIES = [
  "Study Tips",
  "Memory Science",
  "Flashcards",
  "Productivity",
  "Learning Languages",
  "Exams",
];

export async function getPosts(
  limit = 10,
  offset = 0
): Promise<PostPreview[]> {
  if (useMock) {
    return MOCK_POSTS.slice(offset, offset + limit) as PostPreview[];
  }

  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, category, tags, published_at, created_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("getPosts error:", error);
    return [];
  }
  return (data ?? []) as PostPreview[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (useMock) {
    return MOCK_POSTS.find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    console.error("getPostBySlug error:", error);
    return null;
  }
  return data as Post;
}

export async function getPostsByCategory(
  catSlug: string,
  limit = 10,
  offset = 0
): Promise<PostPreview[]> {
  if (useMock) {
    return MOCK_POSTS.filter(
      (p) => categoryToSlug(p.category ?? "") === catSlug
    ).slice(offset, offset + limit) as PostPreview[];
  }

  const categoryName = catSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, category, tags, published_at, created_at")
    .eq("published", true)
    .eq("category", categoryName)
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("getPostsByCategory error:", error);
    return [];
  }
  return (data ?? []) as PostPreview[];
}

export async function getRelatedPosts(
  currentSlug: string,
  category: string | null,
  limit = 3
): Promise<PostPreview[]> {
  if (!category) return [];

  if (useMock) {
    return MOCK_POSTS.filter(
      (p) => p.slug !== currentSlug && p.category === category
    ).slice(0, limit) as PostPreview[];
  }

  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, category, tags, published_at, created_at")
    .eq("published", true)
    .eq("category", category)
    .neq("slug", currentSlug)
    .limit(limit);

  if (error) {
    console.error("getRelatedPosts error:", error);
    return [];
  }
  return (data ?? []) as PostPreview[];
}

export async function getTotalPostCount(catSlug?: string): Promise<number> {
  if (useMock) {
    if (catSlug) {
      return MOCK_POSTS.filter(
        (p) => categoryToSlug(p.category ?? "") === catSlug
      ).length;
    }
    return MOCK_POSTS.length;
  }

  let query = supabase
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("published", true);

  if (catSlug) {
    const categoryName = catSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    query = query.eq("category", categoryName);
  }

  const { count, error } = await query;
  if (error) {
    console.error("getTotalPostCount error:", error);
    return 0;
  }
  return count ?? 0;
}
