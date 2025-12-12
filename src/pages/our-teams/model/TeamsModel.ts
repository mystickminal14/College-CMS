export interface Teams {
  id?: number;
  name?: string;
  position?: string;
  department: Department;
  image?: string;
}


export type Department = "ADMINISTRATION" | "COMPUTING" | "MANAGEMENT";
