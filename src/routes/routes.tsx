import { createBrowserRouter, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import AppLayout from "../components/layout/AppLayout";
import CoursePage from "../pages/courses/CoursePage";
import NoticesPage from "../pages/notices/NoticePage";

// const ProtectedRoute = ({ children }: { children: ReactNode }) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

// const LoginRoute = () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     return <Navigate to="/app/dashboard" replace />;
//   }
//   return <LoginPage />;
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
  },
  
  {
    path: "/app",
    element: (
        <AppLayout />
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
    ],
  },
]);

export default router;
