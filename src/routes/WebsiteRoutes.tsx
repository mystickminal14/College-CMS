import OurTeamWeb from "../website/pages/our-team/OurTeam";
import RecognitionPageWeb from "../website/pages/recognition/RecognitionWeb";
import CourseProgram from "../website/pages/programs/CourseProgram";
import CourseDetails from "../pages/courses/CourseDetails";
import { HomePage } from "../website/pages/home/Home";
import { WebsiteLayout } from "../website/WebLayout";


const PlaceholderPage = ({ pageName }: { pageName: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-4xl font-bold">{pageName} - Page Under Construction</h1>
  </div>
);

export const websiteRoutes = [
 {   path: "/",
    element: <WebsiteLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
 {
    path: "about",
    children: [
      { path: "", element: <PlaceholderPage pageName="About" /> },
      { path: "about-lbef", element: <PlaceholderPage pageName="About LBEF" /> },
      { path: "about-university", element: <PlaceholderPage pageName="About University" /> },
      { path: "recognition", element: <RecognitionPageWeb /> },
      { path: "our-team", element: <OurTeamWeb /> },
      { path: "training-placement", element: <PlaceholderPage pageName="Training & Placement Cell" /> },
      { path: "administrative-holidays", element: <PlaceholderPage pageName="Administrative Holidays" /> },
    ],
  },
  {
    path: "courses",
    children: [
      { path: "", element: <PlaceholderPage pageName="Courses" /> },
      { path: "msc-ir", element: <PlaceholderPage pageName="MSc IR" /> },
      { path: "bsci-it", element: <PlaceholderPage pageName="BSc IT" /> },
      { path: ":name/:id", element: <CourseDetails /> },
    ],
  },
  {
    path: "students",
    children: [
      { path: "", element: <PlaceholderPage pageName="Students" /> },
      { path: "programs", element: <CourseProgram /> },
      { path: ":name/:id", element: <CourseDetails /> },
      { path: "campus-life", element: <PlaceholderPage pageName="Campus Life" /> },
      { path: "student-support", element: <PlaceholderPage pageName="Student Support" /> },
      { path: "career-services", element: <PlaceholderPage pageName="Career Services" /> },
    ],
  },
  {
    path: "admissions",
    children: [
      { path: "", element: <PlaceholderPage pageName="Admissions" /> },
      { path: "apply-now", element: <PlaceholderPage pageName="Apply Now" /> },
      { path: "admission-process", element: <PlaceholderPage pageName="Admission Process" /> },
      { path: "tuition-fees", element: <PlaceholderPage pageName="Tuition & Fees" /> },
      { path: "scholarships", element: <PlaceholderPage pageName="Scholarships" /> },
    ],
  },
  {
    path: "media",
    children: [
      { path: "", element: <PlaceholderPage pageName="Media" /> },
      { path: "photo-gallery", element: <PlaceholderPage pageName="Photo Gallery" /> },
      { path: "video-library", element: <PlaceholderPage pageName="Video Library" /> },
      { path: "news-events", element: <PlaceholderPage pageName="News & Events" /> },
    ],
  },
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
    ]}
];
