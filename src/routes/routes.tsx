import { createBrowserRouter, Navigate,  } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import CoursePage from "../pages/courses/CoursePage";
import NoticesPage from "../pages/notices/NoticePage";
import { HomePage } from "../website/web";
import LoginPage from "../login/page/LoginPage";
import type { ReactNode } from "react";
import { EmailSubscribe } from "../website/components/Home/EmailSubscribe";
import NotFoundPage from "../components/NoRouteFound";
import UserPage from "../pages/users/UserTable";
import AlumniPage from "../pages/alumni/AlumniPage";
import NewsPage from "../pages/news/NewsPage";
import RecognitionsPage from "../pages/handbook/RecognitionPage";
import TeamsPage from "../pages/our-teams/OurTeam";

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
    path: "/components",
    element: <EmailSubscribe />,
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
    ],
  },
]);

export default router;
