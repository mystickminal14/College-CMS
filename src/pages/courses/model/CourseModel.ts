export interface Courses {
  id?: number;
  shift: EShift;
  title: string;
  credit: string;
  duration: string;
  category: string;
  semester: string;
  image?: string;
}
export type EShift = "MORNING" | "BOTH" | "EVENING";
