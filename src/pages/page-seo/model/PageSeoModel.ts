export type PageSeoType = "PAGE" | "COURSE" | "CATEGORY" | "CLUB" | "VACANCY" | "TEAM";
export type PageSeoState = "CUSTOM" | "DEFAULT";

export interface PageSeo {
  id: string;
  path: string;
  label: string;
  type: PageSeoType;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  updatedAt: string | null;
  isCustom: boolean;
}

export const PAGE_SEO_TYPE_LABELS: Record<PageSeoType, string> = {
  PAGE: "Page",
  COURSE: "Course",
  CATEGORY: "Program Category",
  CLUB: "Club",
  VACANCY: "Vacancy",
  TEAM: "Team Member",
};
