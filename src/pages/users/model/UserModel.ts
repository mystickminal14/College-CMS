export interface User {
  id?: number;
  fullname?: string;
  username?: string;
  password?:string;
  email?: string;
  role?: Role;
}
export type Role = "USER" | "ADMIN";
