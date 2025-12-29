import OurTeamWeb from "../website/pages/our-team/OurTeam";
import RecognitionPageWeb from "../website/pages/recognition/RecognitionWeb";
import CourseProgram from "../website/pages/programs/CourseProgram";
import CourseDetails from "../pages/courses/CourseDetails";
import { HomePage } from "../website/pages/home/Home";
import { WebsiteLayout } from "../website/WebLayout";
import AcademicWebPlanner from "../website/pages/academic-planner-web/AcademicWebPlanner";
import StudentHandbook from "../website/pages/handbook/Handbook";
import HolidayWebPlanner from "../website/pages/holidays/Holiday";
import AdmissionProcedure from "../website/pages/admission/AdmissionPage";
import { AboutPage } from "../website/pages/about/About";
import ContactListPage from "../website/pages/contact-list/ContactListingPage";
import CodeOfConduct from "../website/pages/CodeOfConduct";
import FeePlannersWeb from "../website/pages/fee-planner-web/FeePlannerWeb";
import AchievementWeb from "../website/pages/achievement/AchivementWeb";
import NoticeWeb from "../website/pages/notice/NoticeWeb";
import Gallery from "../website/pages/gallery/Gallery";
import LBEFConnectWeb from "../website/pages/lbef-connect-web/lbef-connect-web";
import GyandeepScholasrhip from "../website/pages/admission/Gyandeep";
import MeritScholarship from "../website/pages/admission/Merit";
import JournalPageWeb from "../website/pages/journal/JournalPageWeb";
import NewCourse from "../website/pages/home/components/NewCourse";


const PlaceholderPage = ({ pageName }: { pageName: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-4xl font-bold">{pageName} - Page Under Construction</h1>
  </div>
);

export const websiteRoutes = [
  {
    path: "/",
    element: <WebsiteLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        children: [
          { path: "", element: <AboutPage/> },
          { path: "about-lbef", element: <AboutPage/> },
          { path: "about-university", element: <PlaceholderPage pageName="About University" /> },
          { path: "recognition", element: <RecognitionPageWeb /> },
          { path: "achivement", element: <AchievementWeb /> },

          { path: "our-team", element: <OurTeamWeb /> },
          { path: "training-placement", element: <PlaceholderPage pageName="Training & Placement Cell" /> },
          { path: "holidays", element: <HolidayWebPlanner/> },
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
        path: "students-life",
        children: [
          { path: "", element: <PlaceholderPage pageName="Students" /> },
          { path: "programs", element: <CourseProgram /> },
          { path: "student-code-of-conduct", element: <CodeOfConduct /> },
          { path: ":name/:id", element: <CourseDetails /> },
 {
            path: "fee-planner", element: <FeePlannersWeb />
          },
          {
            path: "academic-planner", element: <AcademicWebPlanner />
          },
           {
            path: "downloads", element: <StudentHandbook />
          },
           {
            path: "student-support", element: <ContactListPage />
          },
          { path: "notices", element: <NoticeWeb /> },
        ],
      },
      {
        path: "admissions",
        children: [
          { path: "", element: <PlaceholderPage pageName="Admissions" /> },
          { path: "admission-process", element: <AdmissionProcedure/>},
        
        ],
      },
      {
        path: "media",
        children: [
          { path: "", element: <PlaceholderPage pageName="Media" /> },
          { path: "photo-gallery", element: <Gallery/> },
          { path: "connect", element: <LBEFConnectWeb /> },
          { path: "news-events", element: <PlaceholderPage pageName="News & Events" /> },
          { path: "journal", element: <JournalPageWeb /> },
          { path: "journal/:id", element: <JournalPageWeb /> },
          { path: "journal/:id/abstract", element: <JournalPageWeb /> },

        ],
      },
       {
        path: "gyandeep-scholarship",
        element: <GyandeepScholasrhip />,
      },
      {
        path: "merit-scholarship",
        element: <MeritScholarship />,
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
      {
        path: "new",
        element: <NewCourse/>,
      },
    ]
  }
];
