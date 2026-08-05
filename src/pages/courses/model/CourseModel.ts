import type { ClassTiming } from "../../class-timing/model/ClassTimingModel";

export interface Courses {
  id?: number;
  shiftId: number | null;
  shift?: Shift | null;
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
  classTimings?: ClassTiming[];
  classTimingIds?: number[];
}
export interface Shift {
  id: number;
  name: string;
  slug?: string | null;
  status?: EStatus;
}
export type EStatus = "ENABLED" | "DISABLED";

export type { ClassTiming };

