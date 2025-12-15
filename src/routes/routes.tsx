import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../login/page/LoginPage";
import type { ReactNode } from "react";
import NotFoundPage from "../components/NoRouteFound";
import UserPage from "../pages/users/UserTable";
import AlumniPage from "../pages/alumni/AlumniPage";
import NewsPage from "../pages/news/NewsPage";
import RecognitionsPage from "../pages/recognitions/RecognitionPage";
import TeamsPage from "../pages/our-teams/OurTeam";
import DownloadsPage from "../pages/handbook/DownloadsPage";
import HolidaysPage from "../pages/holiday/HolidayPage";
import CourseDetails from "../pages/courses/CourseDetails";
import AddCourseDetailsPage from "../pages/add-course/AddCourseDetailsPage";
import EditCourseDetailsPage from "../pages/add-course/EditCourseDetailsPage";
import NoticesPage from "../pages/notices/NoticesPage";
import { HomePage } from "../website/pages/home/Home";
import { WebsiteLayout } from "../website/WebLayout";
import CoursePage from "../pages/courses/CousePage";

// Create placeholder components for all website pages
const PlaceholderPage = ({ pageName }: { pageName: string }) => (
  <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {pageName}
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          This page is currently under development. Check back soon!
        </p>
        <div className="inline-flex items-center gap-3 bg-blue-50 rounded-full px-6 py-3">
          <span className="text-blue-500 text-xl">🚧</span>
          <span className="text-blue-700 font-medium">Page Coming Soon</span>
        </div>
      </div>
    </div>
  </div>
);

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
  // Public Website Routes with Navbar
  {
    path: "/",
    element: <WebsiteLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // About Routes
      {
        path: "about",
        children: [
          {
            index: true,
            element: <PlaceholderPage pageName="About" />,
          },
          {
            path: "about-us",
            element: <PlaceholderPage pageName="About Us" />,
          },
          {
            path: "our-team",
            element: <PlaceholderPage pageName="Our Team" />,
          },
          {
            path: "appreciation-letter",
            element: <PlaceholderPage pageName="Appreciation Letter" />,
          },
          {
            path: "testimonial",
            element: <PlaceholderPage pageName="Testimonial" />,
          },
        ],
      },
      // Students Routes
      {
        path: "students",
        children: [
          {
            index: true,
            element: <PlaceholderPage pageName="Students" />,
          },
          {
            path: "programs",
            element: <PlaceholderPage pageName="Programs" />,
          },
          {
            path: "campus-life",
            element: <PlaceholderPage pageName="Campus Life" />,
          },
          {
            path: "student-support",
            element: <PlaceholderPage pageName="Student Support" />,
          },
          {
            path: "career-services",
            element: <PlaceholderPage pageName="Career Services" />,
          },
        ],
      },
      // Admissions Routes
      {
        path: "admissions",
        children: [
          {
            index: true,
            element: <PlaceholderPage pageName="Admissions" />,
          },
          {
            path: "apply-now",
            element: <PlaceholderPage pageName="Apply Now" />,
          },
          {
            path: "admission-process",
            element: <PlaceholderPage pageName="Admission Process" />,
          },
          {
            path: "tuition-fees",
            element: <PlaceholderPage pageName="Tuition & Fees" />,
          },
          {
            path: "scholarships",
            element: <PlaceholderPage pageName="Scholarships" />,
          },
        ],
      },
      // Media Routes
      {
        path: "media",
        children: [
          {
            index: true,
            element: <PlaceholderPage pageName="Media" />,
          },
          {
            path: "photo-gallery",
            element: <PlaceholderPage pageName="Photo Gallery" />,
          },
          {
            path: "video-library",
            element: <PlaceholderPage pageName="Video Library" />,
          },
          {
            path: "news-events",
            element: <PlaceholderPage pageName="News & Events" />,
          },
        ],
      },
      // Other Routes
      {
        path: "blogs",
        element: <PlaceholderPage pageName="Blogs" />,
      },
      {
        path: "ugc",
        element: <PlaceholderPage pageName="UGC" />,
      },
      {
        path: "contact",
        element: <PlaceholderPage pageName="Contact Us" />,
      },
      {
        path: "enroll",
        element: <PlaceholderPage pageName="Enroll Now" />,
      },
    ],
  },

  // Admin Login Route
  {
    path: "/admin/auth",
    element: <LoginRoute />,
  },

  // Admin Protected Routes
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
      {
        path: "course-details/add/:id",
        element: <AddCourseDetailsPage />,
      },
      {
        path: "course-details/edit/:id",
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

  // 404 Page
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;