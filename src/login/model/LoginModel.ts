export interface LoginUser {
  username: string;
  password?: string;
  fullname?:string;
  message?:string;
  role?:'ADMIN' | 'MANAGER'|'SUPERADMIN';
  token?:string
}

