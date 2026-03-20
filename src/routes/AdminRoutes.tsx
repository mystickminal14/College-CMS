import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../login/page/LoginPage";
import UserPage from "../pages/users/UserTable";
import AlumniPage from "../pages/alumni/AlumniPage";
import NewsPage from "../pages/news/NewsPage";
import RecognitionsPage from "../pages/recognitions/RecognitionPage";
import TeamsPage from "../pages/our-teams/OurTeam";
import DownloadsPage from "../pages/handbook/DownloadsPage";
import HolidaysPage from "../pages/holiday/HolidayPage";
import CoursePage from "../pages/courses/CousePage";
import CourseDetails from "../pages/courses/CourseDetails";
import AddCourseDetailsPage from "../pages/add-course/AddCourseDetailsPage";
import EditCourseDetailsPage from "../pages/add-course/EditCourseDetailsPage";
import NoticesPage from "../pages/notices/NoticesPage";
import NotFoundPage from "../components/NoRouteFound";
import IntakePage from "../pages/intake-calender/IntakePage";
import PlannersPage from "../pages/academic-planner/AcademicPlanner";
import ContactPage from "../pages/contact/ContactTable";
import AchievementPage from "../pages/achivement/Achivement";
import ConnectsPage from "../pages/lbef-connect/LbefConnect";
import GallerysPage from "../pages/gallery/GalleryPage";
import DocumentPage from "../pages/docs-required/DocsPage";
import JournalsPage from "../pages/journal/JournalPage";
import JournalDetails from "../pages/journal/JournalDetails";
import EditorialPage from "../pages/editorial-board/EditorialBoard";

import useMe from "../login/hooks/useMe";
import type { PermissionNameType } from "../login/model/permission";
import PlannerCoursePage from "../pages/planner-course/PlannerCourse";
import FeePlannersPage from "../pages/fee-planner/FeePlanner";
import AlumniFormTable from "../website/pages/alumni-form/pages/AlumniFormtable";
import ScholarshipPage from "../pages/scholarship/ScholarPage";
import HeroSectionPage from "../pages/hero-section/HeroSectIonPage";

// ------------------ ROUTE PERMISSIONS ------------------
const routePermissions: Record<string, PermissionNameType | null> = {
  
  "course": "COURSES",
  "course-details/:id": "COURSES",
  "course-details/:key/add/:id": "COURSES",
  "course-details/add/:id": "COURSES",
  "course-details/edit/:id": "COURSES",
  "hero-section": "HERO_SECTION",
  "administation/notice": "NOTICE",
  "administation/contact": "CONTACT",
  "students/planner": "ACADEMIC_PLANNER",
  "students/fee-planner": "FEE_PLANNER",
  "students/downloads": "DOWNLOADS",
  "user": "USERS",
  "alumni/screen": "ALUMNI",
  "alumni/form": "ALMUNI_FORM",

  "students/planner-course":"PLANNER_COURSE",
  "administation/achievement": "ACHIEVEMENT",
  "media/news": "NEWS",
  "media/connect": "CONNECT",
  "media/gallery": "GALLERY",
  "administation/recognition": "RECOGNITION",
  "teams": "TEAMS",
  "administation/holiday": "HOLIDAY",
  "admission/scholarship": "SCHOLARSHIP",
  "admission/intake": "INTAKE",
  "admission/docs": "DOCUMENTS",
  "media/journals": "JOURNALS",
  "media/journals/:id": "JOURNALS",
  "media/editorial-board": "EDITORIAL_BOARD",
};

// ------------------ PROTECTED ROUTE ------------------
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { data: meData, isLoading, isError } = useMe();
  const location = useLocation();

  // ------------------ Loader while fetching ------------------
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
      </div>
    );
  }

  if (isError) return <Navigate to="/admin/auth" replace />;
  if (!meData) return null; // fallback, though loader handles fetch

  const currentPath = location.pathname.replace(/^\/app\//, "");

  // Match the route
  const matchedRoute = Object.keys(routePermissions).find(route => {
    // Handle dynamic route segments like :id
    if (route.includes(":")) {
      const baseRoute = route.split("/:")[0];
      return currentPath.startsWith(baseRoute);
    }
    return route === currentPath;
  });

  const requiredPermission = matchedRoute ? routePermissions[matchedRoute] : null;

  if (requiredPermission && !meData.data?.permissions.includes(requiredPermission)) {
    return <NotFoundPage />;
  }

  if (!matchedRoute) return <NotFoundPage />;

  return children;
};

// ------------------ LOGIN ROUTE ------------------
const LoginRoute = () => {
  const { data } = useMe();
  if (data) return <Navigate to="/app/course" replace />;
  return <LoginPage />;
};

// ------------------ ADMIN ROUTES ------------------
export const adminRoutes = [
  { path: "/admin/auth", element: <LoginRoute /> },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "course", element: <CoursePage /> },
      { path: "course-details/:id", element: <CourseDetails /> },
      { path: "course-details/add/:id", element: <AddCourseDetailsPage /> },
      { path: "course-details/:key/add/:id", element: <AddCourseDetailsPage /> },
      { path: "course-details/edit/:id", element: <EditCourseDetailsPage /> },
      { path: "administation/notice", element: <NoticesPage /> },
      { path: "administation/contact", element: <ContactPage /> },
      { path: "students/planner", element: <PlannersPage /> },
      { path: "students/planner-course", element: <PlannerCoursePage /> },
      { path: "hero-section", element: <HeroSectionPage /> },
      
      { path: "students/fee-planner", element: <FeePlannersPage /> },
      { path: "students/downloads", element: <DownloadsPage /> },
      { path: "user", element: <UserPage /> },
      { path: "alumni/screen", element: <AlumniPage /> },
      { path: "alumni/form", element: <AlumniFormTable /> },

      { path: "administation/achievement", element: <AchievementPage /> },
      { path: "admission/scholarship", element: <ScholarshipPage /> },

      { path: "media/news", element: <NewsPage /> },
      { path: "media/connect", element: <ConnectsPage /> },
      { path: "media/gallery", element: <GallerysPage /> },
      { path: "administation/recognition", element: <RecognitionsPage /> },
      { path: "teams", element: <TeamsPage /> },
      { path: "administation/holiday", element: <HolidaysPage /> },
      { path: "admission/intake", element: <IntakePage /> },
      { path: "admission/docs", element: <DocumentPage /> },
      { path: "media/journals", element: <JournalsPage /> },
      { path: "media/journals/:id", element: <JournalDetails /> },
      { path: "media/editorial-board", element: <EditorialPage /> },

      // Catch-all unknown routes inside /app
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  // Catch-all unknown routes
  { path: "*", element: <NotFoundPage /> },
];
