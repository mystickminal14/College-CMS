export interface Courses {
  id?: number;
  shift: EShift;
  title: string;
  credit: string;
  duration: string;
  categoryId: number|null;
  semester: string;
  prefix: string;
  degree: string;
  details?: string;
  order?:number;
  intake?:string;
  brochure?:string;
  feeStructure?:string;
  fullForm?:string;
  slug?:string;
  image?: string;
  status?: EStatus;
  hasDetails?:boolean;
}
export type EShift = "MORNING" | "BOTH" | "EVENING";
export type EStatus = "ENABLED" | "DISABLED";

