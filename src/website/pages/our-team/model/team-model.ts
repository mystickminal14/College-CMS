export interface TeamMember {
  id: number;
 name?: string;
  position?: string;
  department: Department;

  image?: string;     // cover image
  portrait?: string;  // portrait image
  bio?: string;     // cover image

  linkedIn?: string;
  facebook?: string;
  insta?: string;

  email?: string;
  phone?: string;
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
