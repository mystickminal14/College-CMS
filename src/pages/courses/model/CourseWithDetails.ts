export interface CourseBlock {
  category: "CAREER_OPTIONS" | "ELIGIBLITY_CRITERIA";
  title: string | null;
  children: { title: string | null; content: string | null }[];
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  duration: string;
  credit: string;
  prefix: string;
  degree: string;
  details: string;
  fullForm: string;
  intake: string;
  image: string;
  semester: string;
  shift: { id: number; name: string; slug?: string | null } | null;
  blocks?: CourseBlock[];
}

export interface CategoryWithDetails {
  id: number;
  name: string;
  slug: string;
  status: "ENABLED" | "DISABLED"; // or just string if other values exist
  order: number;
  createdAt: string; // could also use Date if you parse it
  updatedAt: string;
  courses: Course[];
}
