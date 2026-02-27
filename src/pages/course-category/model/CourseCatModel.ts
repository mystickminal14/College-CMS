export interface CourseCategory {
  id?: number;
name:string;
order?:number;
status?:EShift
}
export type EShift = "ENABLED" | "DISABLED";
export interface UpdateCourseCategoryPayload {
  id: number;
name:string;

}
export interface CourseCategoryAll {
  id: number;
name:string;
order:number;
status:EShift
}
export interface UpdateCourseCategoryPayload {
  id: number;
name:string;

}