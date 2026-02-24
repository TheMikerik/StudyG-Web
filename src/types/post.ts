export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  tags: string[] | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

export type PostPreview = Omit<Post, "content">;
