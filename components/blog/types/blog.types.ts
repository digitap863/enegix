// ─── BlogPost shape ───────────────────────────────────────
export type BlogCategory =
  | "Medical"
  | "Industrial"
  | "Commercial"
  | "Laboratory"
  | "Emergency";

export type BlogPost = {
  id: string | number;
  slug: string;
  category: BlogCategory;
  categoryColor: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
};

// ─── Category filter list ─────────────────────────────────
export const BLOG_CATEGORIES = [
  "All",
  "Medical",
  "Industrial",
  "Commercial",
  "Laboratory",
  "Emergency",
] as const;

export type BlogCategoryFilter = (typeof BLOG_CATEGORIES)[number];
