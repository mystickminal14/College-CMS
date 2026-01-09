import type { Permission } from "./permission";

export interface LoginUser {
  username: string;
  password?: string;
  fullname?:string;
  message?:string;
  role?:'ADMIN' | 'MANAGER'|'SUPERADMIN'|'USER';
  token?:string
    permissions: Permission[]; 
  
}

