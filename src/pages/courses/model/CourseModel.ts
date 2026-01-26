export interface Courses {
  id?: number;
  shift: EShift;
  title: string;
  credit: string;
  duration: string;
  category: string;
  semester: string;
  prefix: string;
  degree: string;
  details?: string;
  order?:number;

  image?: string;
  hasDetails?:boolean;
}
export type EShift = "MORNING" | "BOTH" | "EVENING";
