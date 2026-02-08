export interface Dept {
  id?: number;
name:string;
order?:number;
status?:EShift
}
export type EShift = "ENABLED" | "DISABLED";
export interface UpdateDeptPayload {
  id: number;
name:string;

}
export interface DeptAll {
  id: number;
name:string;
order:number;
status:EShift
}
export interface UpdateDeptPayload {
  id: number;
name:string;

}