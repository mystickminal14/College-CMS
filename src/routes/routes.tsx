import { createBrowserRouter, Navigate,  } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../login/page/LoginPage";
import type { ReactNode } from "react";
import NotFoundPage from "../components/NoRouteFound";
import UserPage from "../pages/users/UserTable";
import AlumniPage from "../pages/alumni/AlumniPage";
import NewsPage from "../pages/news/NewsPage";
import TeamsPage from "../pages/our-teams/OurTeam";
import DownloadsPage from "../pages/handbook/DownloadsPage";
import HolidaysPage from "../pages/holiday/HolidayPage";
import CourseDetails from "../pages/courses/CourseDetails";
import CoursePage from "../pages/courses/CousePage";
import AddCourseDetailsPage from "../pages/add-course/AddCourseDetailsPage";
import EditCourseDetailsPage from "../pages/add-course/EditCourseDetailsPage";
import NoticesPage from "../pages/notices/NoticesPage";
import { HomePage } from "../website/web";
import RecognitionsPage from "../pages/recognitions/RecognitionPage";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const LoginRoute = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/app/course" replace />;
  }
  return <LoginPage />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginRoute />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/app",
    element: (
     <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "course",
        element: <CoursePage />,
      },
      {
    path: "course-details/:id",
    element: <CourseDetails />,
  },
    { path: "course-details/add/:id",
    element: <AddCourseDetailsPage />,
  },
   { path: "course-details/edit/:id",
    element: <EditCourseDetailsPage />,
  },
      {
        path: "notice",
        element: <NoticesPage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "alumni",
        element: <AlumniPage />,
      },
      {
        path: "news",
        element: <NewsPage />,
      },
        {
        path: "recognition",
        element: <RecognitionsPage />,
      },
        {
        path: "teams",
        element: <TeamsPage />,
      },
       {
        path: "downloads",
        element: <DownloadsPage />,
      },
        {
        path: "holiday",
        element: <HolidaysPage />,
      },
    ],
  },
]);

export default router;
