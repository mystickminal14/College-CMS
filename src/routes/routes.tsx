import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import CoursePage from "../pages/courses/CoursePage";
import NoticesPage from "../pages/notices/NoticePage";
import { HomePage } from "../website/Website";
import { NavBar } from "../website/pages/home/components/NavBar";

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
    path: "/components",
    element: <NavBar />,
  },
  {
    path: "/home",
    element: <HomePage />,
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
