import type { User } from "../model/UserModel";

 export const userColumns = [
    { label: "Full Name", accessor: "fullname" as keyof User },
    { label: "Username", accessor: "username" as keyof User },
    { label: "Email", accessor: "email" as keyof User },
    { label: "Role", accessor: "role" as keyof User },
  ];