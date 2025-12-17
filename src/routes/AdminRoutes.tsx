import { Navigate } from "react-router-dom";
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
import type { ReactNode } from "react";
import IntakePage from "../pages/intake-calender/IntakePage";
import PlannersPage from "../pages/academic-planner/AcademicPlanner";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/admin/auth" replace />;
  return children;
};

const LoginRoute = () => {
  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/app/course" replace />;
  return <LoginPage />;
};

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
      { path: "course-details/edit/:id", element: <EditCourseDetailsPage /> },
      { path: "administation/notice", element: <NoticesPage /> },
      { path: "students/planner", element: <PlannersPage /> },
      { path: "students/downloads", element: <DownloadsPage /> },

      { path: "user", element: <UserPage /> },
      { path: "alumni", element: <AlumniPage /> },

      { path: "media/news", element: <NewsPage /> },
      { path: "administation/recognition", element: <RecognitionsPage /> },
      { path: "teams", element: <TeamsPage /> },
      { path: "administation/holiday", element: <HolidaysPage /> },
      { path: "admission/intake", element: <IntakePage /> },

    ],
  },
  { path: "*", element: <NotFoundPage /> },
];
