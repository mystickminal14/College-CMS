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
import ContactPage from "../pages/contact/ContactTable";
import FeePlannersPage from "../pages/fee-planner/FeePlanner";
import AchievementPage from "../pages/achivement/Achivement";
import ConnectsPage from "../pages/lbef-connect/LbefConnect";
import GallerysPage from "../pages/gallery/GalleryPage";
import DocumentPage from "../pages/docs-required/DocsPage";
import useMe from "../login/hooks/useMe";
import JournalsPage from "../pages/journal/JournalPage";
import JournalDetails from "../pages/journal/JournalDetails";
import EditorialPage from "../pages/editorial-board/EditorialBoard";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isError } = useMe();

  if (isError) return <Navigate to="/admin/auth" replace />;

  return children;
};

const LoginRoute = () => {
  const { data } = useMe();

  if (data) return <Navigate to="/app/course" replace />;
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
      { path: "course-details/:key/add/:id", element: <AddCourseDetailsPage /> },
      { path: "course-details/edit/:id", element: <EditCourseDetailsPage /> },
      { path: "administation/notice", element: <NoticesPage /> },
      { path: "administation/contact", element: <ContactPage /> },
      { path: "students/planner", element: <PlannersPage /> },
      { path: "students/fee-planner", element: <FeePlannersPage /> },
      { path: "students/downloads", element: <DownloadsPage /> },
      { path: "user", element: <UserPage /> },
      { path: "alumni", element: <AlumniPage /> },
      { path: "administation/achievement", element: <AchievementPage /> },
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


    ],
  },
  { path: "*", element: <NotFoundPage /> },
];