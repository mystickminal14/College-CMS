import { createBrowserRouter, Navigate,  } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import CoursePage from "../pages/courses/CoursePage";
import NoticesPage from "../pages/notices/NoticePage";
import { HomePage } from "../website";
import { OurPartners } from "../website/components/Home/OurPartners";
import { EmailSubscribe } from "../website/components/Home/EmailSubscribe";

// const ProtectedRoute = ({ children }: { children: ReactNode }) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

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
    element: <AppLayout />,
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
