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
  intake?:string;
  brochure?:string;
feeStructure?:string;
  fullForm?:string;

  image?: string;
  hasDetails?:boolean;
}
export type EShift = "MORNING" | "BOTH" | "EVENING";
