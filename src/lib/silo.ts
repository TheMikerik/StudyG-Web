import { supabase } from "./supabase";
import type {
  Category,
  Subcategory,
  FlashcardPage,
  FlashcardPagePreview,
} from "@/types/silo";

// ---------------------------------------------------------------------------
// Categories (L1)
// ---------------------------------------------------------------------------

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("getCategories error:", error);
    return [];
  }
  return (data ?? []) as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("getCategoryBySlug error:", error);
    return null;
  }
  return data as Category;
}

// ---------------------------------------------------------------------------
// Subcategories (L2)
// ---------------------------------------------------------------------------

export async function getSubcategoriesByCategory(
  categoryId: string
): Promise<Subcategory[]> {
  const { data, error } = await supabase
    .from("subcategories")
    .select("*")
    .eq("category_id", categoryId)
    .order("name");

  if (error) {
    console.error("getSubcategoriesByCategory error:", error);
    return [];
  }
  return (data ?? []) as Subcategory[];
}

export async function getSubcategoryBySlug(
  slug: string
): Promise<Subcategory | null> {
  const { data, error } = await supabase
    .from("subcategories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("getSubcategoryBySlug error:", error);
    return null;
  }
  return data as Subcategory;
}

// ---------------------------------------------------------------------------
// Flashcard pages (L3)
// ---------------------------------------------------------------------------

export async function getFlashcardPages(
  subcategoryId: string,
  limit = 20,
  offset = 0
): Promise<FlashcardPagePreview[]> {
  const { data, error } = await supabase
    .from("flashcard_pages")
    .select("id, subcategory_id, slug, h1, related_slugs, published, published_at, created_at")
    .eq("subcategory_id", subcategoryId)
    .eq("published", true)
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("getFlashcardPages error:", error);
    return [];
  }
  return (data ?? []) as FlashcardPagePreview[];
}

export async function getFlashcardPageBySlug(
  slug: string
): Promise<FlashcardPage | null> {
  const { data, error } = await supabase
    .from("flashcard_pages")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    console.error("getFlashcardPageBySlug error:", error);
    return null;
  }
  return data as FlashcardPage;
}

export async function getRelatedFlashcardPages(
  slugs: string[]
): Promise<FlashcardPagePreview[]> {
  if (!slugs.length) return [];

  const { data, error } = await supabase
    .from("flashcard_pages")
    .select("id, subcategory_id, slug, h1, related_slugs, published, published_at, created_at")
    .in("slug", slugs)
    .eq("published", true);

  if (error) {
    console.error("getRelatedFlashcardPages error:", error);
    return [];
  }
  return (data ?? []) as FlashcardPagePreview[];
}

export async function getFlashcardPageCount(
  subcategoryId: string
): Promise<number> {
  const { count, error } = await supabase
    .from("flashcard_pages")
    .select("id", { count: "exact", head: true })
    .eq("subcategory_id", subcategoryId)
    .eq("published", true);

  if (error) {
    console.error("getFlashcardPageCount error:", error);
    return 0;
  }
  return count ?? 0;
}

export async function getAllSubcategories(): Promise<Subcategory[]> {
  const { data, error } = await supabase
    .from("subcategories")
    .select("*")
    .order("name");

  if (error) {
    console.error("getAllSubcategories error:", error);
    return [];
  }
  return (data ?? []) as Subcategory[];
}

// Used by generateStaticParams and sitemap
export async function getAllPublishedSlugs(): Promise<
  { categorySlug: string; subcategorySlug: string; pageSlug: string }[]
> {
  const { data, error } = await supabase
    .from("flashcard_pages")
    .select(
      "slug, subcategories!inner(slug, categories!inner(slug))"
    )
    .eq("published", true);

  if (error) {
    console.error("getAllPublishedSlugs error:", error);
    return [];
  }

  return (data ?? []).map((row: any) => ({
    categorySlug: row.subcategories.categories.slug as string,
    subcategorySlug: row.subcategories.slug as string,
    pageSlug: row.slug as string,
  }));
}
