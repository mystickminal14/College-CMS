export interface Teams {
  id?: number;
  name?: string;
  position?: string;
  departmentId: number;

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

