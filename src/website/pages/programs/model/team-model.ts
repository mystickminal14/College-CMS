export interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: Department;
  image: string;
}

export type Department =
  | "MANAGEMENT"
  | "ADMINISTRATION"
  | "COMPUTING";

// Grouped response by department
export interface TeamsByDepartment {
  MANAGEMENT: TeamMember[];
  ADMINISTRATION: TeamMember[];
  COMPUTING: TeamMember[];
}
