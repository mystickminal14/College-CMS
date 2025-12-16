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
      { path: "notice", element: <NoticesPage /> },
      { path: "user", element: <UserPage /> },
      { path: "alumni", element: <AlumniPage /> },
      { path: "news", element: <NewsPage /> },
      { path: "recognition", element: <RecognitionsPage /> },
      { path: "teams", element: <TeamsPage /> },
      { path: "downloads", element: <DownloadsPage /> },
      { path: "holiday", element: <HolidaysPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];
