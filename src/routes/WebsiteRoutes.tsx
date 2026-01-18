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
import { AboutUniversity } from "../website/pages/about-university/AboutUniversity";
import NewsPageWeb from "../website/pages/news/News";
import ICTScholarship from "../website/pages/admission/IctScholarship";
import PaymentModes from "../website/pages/payment-modes/PaymentModes";
import AlumniSpeaks from "../website/pages/alumni-speaks/AlumniSpeaks";
import StudentAccess from "../website/pages/StudentAccess/StudentAccess";
import TeamDetail from "../website/pages/our-team/OurTeamDetails";
import GalleryView from "../website/pages/gallery/GalleryView";
import AlumniFormPage from "../website/pages/alumni-form/pages/Index";


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
          { path: "", element: <AboutPage /> },
          { path: "about-lbef", element: <AboutPage /> },
          { path: "about-university", element: <AboutUniversity /> },
          { path: "recognition", element: <RecognitionPageWeb /> },
          { path: "achivement", element: <AchievementWeb /> },

          { path: "our-team", element: <OurTeamWeb /> },
          { path: "training-placement", element: <PlaceholderPage pageName="Training & Placement Cell" /> },
          { path: "holidays", element: <HolidayWebPlanner /> },
        ],
      },
      {
        path: "courses",
        children: [
          { path: "", element: <CourseProgram /> },
          { path: ":name/:id", element: <CourseDetails /> },
        ],
      },
      {
        path: "students-life",
        children: [
          { path: "", element: <CourseProgram /> },
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
            path: "payment-modes", element: <PaymentModes />
          },
          {
            path: "alumni-speaks", element: <AlumniSpeaks />
          },
          {
            path: "alumni-form", element: <AlumniFormPage />
          },
          {
            path: "student-access", element: <StudentAccess />
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
          { path: "", element: <AdmissionProcedure /> },
          { path: "admission-process", element: <AdmissionProcedure /> },

        ],
      },
      {
        path: "media",
        children: [
          { path: "", element: <Gallery /> },
          { path: "photo-gallery", element: <Gallery /> },
           { path: "photo-gallery/:name/:id", element: <GalleryView /> },
          { path: "connect", element: <LBEFConnectWeb /> },
          { path: "news-events", element: <NewsPageWeb /> },
          // { path: "journal", element: <JournalPageWeb /> },
          // { path: "journal/:id", element: <JournalPageWeb /> },
          // { path: "journal/:id/abstract", element: <JournalPageWeb /> },

        ],
      },
      {
        path: "lrjstm",
        children: [
          { path: "", element: <JournalPageWeb /> },
          { path: "volume/view/:id/:volume/:issue", element: <JournalPageWeb /> },
          { path: "volume/abstract/:id", element: <JournalPageWeb /> },

        ],
      },
      {
        path: "gyandeep-scholarship",
        element: <GyandeepScholasrhip />,
      },

      {
        path: "ict-scholarship",
        element: <ICTScholarship />,
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
      // {
      //   path: "messages/:id",
      //   element: <Messages />,
      // },
      {
        path: "team/:id",
        element: <TeamDetail />,
      },
      {
        path: "enroll",
        element: <PlaceholderPage pageName="Enroll Now" />,
      },

    ]
  }
];
