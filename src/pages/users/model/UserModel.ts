export type Role = "MANAGER" | "ADMIN"|"USER";

export type PermissionNameType =
  | "USERS" | "COURSES" | "TEAMS" | "ALUMNI"| "PLANNER_COURSE"| "ALMUNI_FORM"|"BLOGS"|"SCHOLARSHIP"| "HERO_SECTION"
  | "NEWS" | "JOURNALS" | "EDITORIAL_BOARD" | "CONNECT" | "GALLERY"|"SCHOLARSHIP"
  | "NOTICE" | "CONTACT" | "HOLIDAY" | "RECOGNITION" | "ACHIEVEMENT"
  | "INTAKE" | "DOCUMENTS" | "ACADEMIC_PLANNER" | "FEE_PLANNER" | "DOWNLOADS" | "VACANCY" | "COURSE_REGISTRATION" | "POPUP";

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

export interface User {
  id?: number;
  fullname?: string;
  username?: string;
  password?: string;
  email?: string;
  role?: Role;
  permissions?: PermissionNameType[]; // 👈 IMPORTANT
}
