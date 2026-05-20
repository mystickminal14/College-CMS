// utils/permissionResolver.ts
import type { PermissionNameType } from "../login/model/permission";

export const subMenuPermissionMap: Record<string, PermissionNameType> = {
  // ---------------- Students ----------------
  planner: "ACADEMIC_PLANNER",
  "planner-course": "PLANNER_COURSE",
  "fee-planner": "FEE_PLANNER",
  downloads: "DOWNLOADS",

  // ---------------- Media ----------------
  blogs: "BLOGS",
  news: "NEWS",
  journals: "JOURNALS",
  "editorial-board": "EDITORIAL_BOARD",
  connect: "CONNECT",
  gallery: "GALLERY",

  // ---------------- Academic ----------------
  notice: "NOTICE",
  contact: "CONTACT",
  holiday: "HOLIDAY",
  recognition: "RECOGNITION",
  achievement: "ACHIEVEMENT",

  // ---------------- Admission ----------------
  intake: "INTAKE",
  docs: "DOCUMENTS",

  // ---------------- Core / Main Modules (add missing important ones) ----------------
  users: "USERS",
  course: "COURSES",
  teams: "TEAMS",
  alumni: "ALUMNI",
  scholarship: "SCHOLARSHIP",
  "hero-section": "HERO_SECTION",
  faq: "FAQ",

  // ---------------- Job Vacancy ----------------
  vacancy: "VACANCY",
};