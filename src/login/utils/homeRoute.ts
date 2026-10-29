import type { PermissionNameType } from "../model/permission";

// The page each permission opens, as registered in routes/AdminRoutes.tsx.
// Permissions without an admin page of their own are left out.
const PERMISSION_HOME: Partial<Record<PermissionNameType, string>> = {
  COURSES: "/app/course",
  USERS: "/app/user",
  TEAMS: "/app/teams",
  ALUMNI: "/app/alumni/screen",
  PLANNER_COURSE: "/app/students/planner-course",
  SCHOLARSHIP: "/app/admission/scholarship",
  HERO_SECTION: "/app/hero-section",
  FAQ: "/app/faq",
  NEWS: "/app/media/news",
  JOURNALS: "/app/media/journals",
  EDITORIAL_BOARD: "/app/media/editorial-board",
  CONNECT: "/app/media/connect",
  GALLERY: "/app/media/gallery",
  BLOGS: "/app/media/blogs",
  NOTICE: "/app/administation/notice",
  CONTACT: "/app/administation/contact",
  HOLIDAY: "/app/administation/holiday",
  RECOGNITION: "/app/administation/recognition",
  ACHIEVEMENT: "/app/administation/achievement",
  INTAKE: "/app/admission/intake",
  DOCUMENTS: "/app/admission/docs",
  ACADEMIC_PLANNER: "/app/students/planner",
  FEE_PLANNER: "/app/students/fee-planner",
  DOWNLOADS: "/app/students/downloads",
  VACANCY: "/app/job-vacancy/vacancy",
  COURSE_REGISTRATION: "/app/course-registration",
  POPUP: "/app/popup",
  CLUBS: "/app/clubs",
  VISITOR: "/app/visitor",
};

// Where to land after login: Courses when the user may open it, otherwise the first
// page their permissions allow. Landing on a page the user cannot open shows a 404.
export const getHomeRoute = (permissions: readonly string[] = []): string => {
  if (permissions.includes("COURSES")) return PERMISSION_HOME.COURSES!;

  for (const permission of permissions) {
    const path = PERMISSION_HOME[permission as PermissionNameType];
    if (path) return path;
  }
  return PERMISSION_HOME.COURSES!;
};
