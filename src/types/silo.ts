export type Flashcard = {
  front: string;
  back: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  created_at: string;
};

export type Subcategory = {
  id: string;
  category_id: string;
  slug: string;
  name: string;
  description: string | null;
  created_at: string;
};

export type FlashcardPage = {
  id: string;
  subcategory_id: string;
  slug: string;
  h1: string;
  intro: string;
  flashcards: Flashcard[];
  faq: FAQItem[];
  related_slugs: string[] | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

export type FlashcardPagePreview = Omit<FlashcardPage, "intro" | "flashcards" | "faq">;
