export type PermissionNameType =
  | "USERS" | "COURSES" | "TEAMS" | "ALUMNI"| "ALMUNI_FORM"|"PLANNER_COURSE"|"SCHOLARSHIP"| "HERO_SECTION"
  | "NEWS" | "JOURNALS" | "EDITORIAL_BOARD" | "CONNECT" | "GALLERY"
  | "NOTICE" | "CONTACT" | "HOLIDAY" | "RECOGNITION" | "ACHIEVEMENT"
  | "INTAKE" | "DOCUMENTS" | "ACADEMIC_PLANNER" | "FEE_PLANNER" | "DOWNLOADS";

export interface PermissionName {
  id: number;
  name: PermissionNameType;
}

export interface Permission {
  id: number;
  userId: number;
  permissionId: number;
  permission: PermissionName;
}

export interface FrontendUser {
  id: number;
  fullname: string;
  username: string;
  email: string;
  role: "SUPERADMIN" | "ADMIN" | "USER" | "MANAGER";
  permissions: PermissionNameType[];
  token?: string;
}
