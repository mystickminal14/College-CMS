export interface BlogFAQ {
  id?: number;
  question: string;
  answer: string;
  order: number;
}

export interface Blog {
  id?: number;
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  publishDate?: string | null;
  status: "DRAFT" | "PUBLISHED" | "SCHEDULED";
  featuredImage?: string | null;
  featuredImageAlt?: string;
  content?: string;
  readTime?: number;
  faqs?: BlogFAQ[];
  createdAt?: string;
  updatedAt?: string;
}