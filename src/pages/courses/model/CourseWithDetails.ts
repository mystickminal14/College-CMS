export interface Course {
  id: number;
  title: string;
  slug: string;
  duration: string;
  credit: string;
  prefix:string;
  degree:string;
  details:string;
  fullForm:string;
  intake:string;
  image: string;
  semester:string;
  shift: string;
}

export interface CategoryWithDetails {
  id: number;
  name: string;
  status: "ENABLED" | "DISABLED"; // or just string if other values exist
  order: number;
  createdAt: string; // could also use Date if you parse it
  updatedAt: string;
  courses: Course[];
}
