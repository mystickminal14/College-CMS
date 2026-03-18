import type { DeptAll } from "../../../../pages/our-team-dept/model/DeptModel";

export interface TeamMember {
  id: number;
  name: string;
  position?: string;

  departmentId: number;
  department: DeptAll;

  bio?: string | null;

  image?: string;
  portrait?: string;

  facebook?: string | null;
  insta?: string | null;
  linkedIn?: string | null;

  phone?: string | null;
  email?: string | null;
  status?: "ENABLED" | "DISABLED";
  order: number;       // member display order
  createdAt: string;
  updatedAt: string;
}


export interface TeamsByDepartment {
  [departmentName: string]: TeamMember[];
}
