// utils/permissionResolver.ts
import type { PermissionNameType } from "../login/model/permission";

export const subMenuPermissionMap: Record<string, PermissionNameType> = {
  // Students
  planner: "ACADEMIC_PLANNER",
  "planner-course": "PLANNER_COURSE",
  "fee-planner": "FEE_PLANNER",
  downloads: "DOWNLOADS",

  // Media
  news: "NEWS",
  journals: "JOURNALS",
  "editorial-board": "EDITORIAL_BOARD",
  connect: "CONNECT",
  gallery: "GALLERY",

  // Academic
  notice: "NOTICE",
  contact: "CONTACT",
  holiday: "HOLIDAY",
  recognition: "RECOGNITION",
  achievement: "ACHIEVEMENT",

  // Admission
  intake: "INTAKE",
  docs: "DOCUMENTS",
};
