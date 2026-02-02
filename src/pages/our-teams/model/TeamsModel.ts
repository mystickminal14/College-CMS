export interface Teams {
  id?: number;
  name?: string;
  position?: string;
  department: Department;

  image?: string;     // cover image
  portrait?: string;  // portrait image
  bio?: string;     // cover image
  order?:number;
  linkedIn?: string;
  facebook?: string;
  insta?: string;

  email?: string;
  phone?: string;
}

export type Department = "ADMINISTRATION" | "COMPUTING" | "MANAGEMENT";
