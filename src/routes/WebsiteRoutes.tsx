import { lazy } from "react";
import { WebsiteLayout } from "../website/WebLayout";
import CourseDetailsByID from "../pages/courses/CourseDetailsById";
import PreviewBlog from "../pages/blogs/PreviewBlog";
import BlogsPAge from "../website/pages/blogs/BlogsPage";
import VerificationPage from "../website/pages/verifications/Verifications";



/* =======================
   Lazy Loaded Pages
======================= */

const HomePage = lazy(() => import("../website/pages/home/Home"));
const AcademicHolidays = lazy(() => import("../website/pages/academic-holidays/AcademicHolidays"));
const OurTeamWeb = lazy(() => import("../website/pages/our-team/OurTeam"));
const RecognitionPageWeb = lazy(() => import("../website/pages/recognition/RecognitionWeb"));
const PermissionPageWeb = lazy(() => import("../website/pages/recognition/PermissionWeb"));
const AdministrativeHolidays = lazy(() => import("../website/pages/administrative-holidays/AdministrativeHolidays"));
const CourseProgram = lazy(() => import("../website/pages/programs/CourseProgram"));
const CourseDetails = lazy(() => import("../pages/courses/CourseDetails"));
const AcademicWebPlanner = lazy(() => import("../website/pages/academic-planner-web/AcademicWebPlanner"));
const StudentHandbook = lazy(() => import("../website/pages/handbook/Handbook"));
const HolidayWebPlanner = lazy(() => import("../website/pages/holidays/Holiday"));
const AdmissionProcedure = lazy(() => import("../website/pages/admission/AdmissionPage"));
const AboutPage = lazy(() => import("../website/pages/about/About"));
const ContactListPage = lazy(() => import("../website/pages/contact-list/ContactListingPage"));
const CodeOfConduct = lazy(() => import("../website/pages/CodeOfConduct"));
const FeePlannersWeb = lazy(() => import("../website/pages/fee-planner-web/FeePlannerWeb"));
const AchievementWeb = lazy(() => import("../website/pages/achievement/AchivementWeb"));
const NoticeWeb = lazy(() => import("../website/pages/notice/NoticeWeb"));
const Gallery = lazy(() => import("../website/pages/gallery/Gallery"));
const LBEFConnectWeb = lazy(() => import("../website/pages/lbef-connect-web/lbef-connect-web"));
const GyandeepScholasrhip = lazy(() => import("../website/pages/admission/Gyandeep"));
const MeritScholarship = lazy(() => import("../website/pages/admission/Merit"));
const JournalPageWeb = lazy(() => import("../website/pages/journal/JournalPageWeb"));
const AboutUniversity = lazy(() => import("../website/pages/about-university/AboutUniversity"));
const NewsPageWeb = lazy(() => import("../website/pages/news/News"));
const ICTScholarship = lazy(() => import("../website/pages/admission/IctScholarship"));
const PaymentModes = lazy(() => import("../website/pages/payment-modes/PaymentModes"));
const AlumniSpeaks = lazy(() => import("../website/pages/alumni-speaks/AlumniSpeaks"));
const StudentAccess = lazy(() => import("../website/pages/StudentAccess/StudentAccess"));
const TeamDetail = lazy(() => import("../website/pages/our-team/OurTeamDetails"));
const GalleryView = lazy(() => import("../website/pages/gallery/GalleryView"));
const AlumniFormPage = lazy(() => import("../website/pages/alumni-form/pages/Index"));
const AcademicClub = lazy(() => import("../website/pages/academic-club/AcademicClub"));
const OurMessage = lazy(() => import("../website/pages/our-message/OurMessage"));
const NotFoundPage = lazy(() => import("../components/NoRouteFound"));
const Scholarship = lazy(() => import("../website/pages/scholarship/Scholarship"));
const ICTRegistration = lazy(() => import("../website/pages/admission/IctRegistration"));
const VacancyWeb = lazy(() => import("../website/pages/vacancy/VacancyWeb"));
const VacancyDetailWeb = lazy(() => import("../website/pages/vacancy/VacancyDetailWeb"));
const CategoryCoursesPage = lazy(() => import("../website/pages/programs/CategoryCoursesPage"));
const ThankYouPage = lazy(() => import("../website/pages/programs/ThankYouPage"));
const ReferralPage = lazy(() => import("../website/pages/referral/ReferralPage"));
/* =======================
   Placeholder Page
======================= */

const PlaceholderPage = ({ pageName }: { pageName: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-4xl font-bold">
      {pageName} - Page Under Construction
    </h1>
  </div>
);

/* =======================
   Routes (UNCHANGED)
======================= */

export const websiteRoutes = [
  {
    path: "/",
    element: <WebsiteLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // {
      //   path: "about",
      //   children: [
      //     { path: "", element: <AboutPage /> },
      //     { path: "about-lbef", element: <AboutPage /> },
      //     { path: "about-university", element: <AboutUniversity /> },
      //     { path: "recognition", element: <RecognitionPageWeb /> },
      //     { path: "permission-letter", element: <PermissionPageWeb /> },

      //     { path: "achivement", element: <AchievementWeb /> },
      //     { path: "messages", element: <OurMessage /> },
      //     { path: "our-team", element: <OurTeamWeb /> },
      //     {
      //       path: "training-placement",
      //       element: <PlaceholderPage pageName="Training & Placement Cell" />,
      //     },
      //     { path: "holidays", element: <HolidayWebPlanner /> },
      //   ],
      // },
      { path: "about", element: <AboutPage /> },
      { path: "about-university", element: <AboutUniversity /> },
      { path: "recognitions", element: <RecognitionPageWeb /> },
      { path: "permission-letter", element: <PermissionPageWeb /> },
      { path: "achivements", element: <AchievementWeb /> },
      { path: "messages", element: <OurMessage /> },
      { path: "ourteam", element: <OurTeamWeb /> },
      { path: "training-and-placement", element: <PlaceholderPage pageName="Training & Placement Cell" /> },
      { path: "events", element: <HolidayWebPlanner /> },
      { path: "academic-holidays", element: <AcademicHolidays /> },
      { path: "administrative-holidays", element: <AdministrativeHolidays /> },
      // {
      //   path: "courses",
      //   children: [
      //     { path: "", element: <CourseProgram /> },
      //     { path: ":name/:id", element: <CourseDetails /> },
      //   ],
      // },
      { path: "courses", element: <CourseProgram /> },
      { path: "camp/:slug", element: <CategoryCoursesPage /> },
      { path: "referral", element: <ReferralPage /> },
      { path: ":slug/thank-you", element: <ThankYouPage /> },
      { path: ":slug", element: <CourseDetails /> },
      { path: "details/:courseId", element: <CourseDetailsByID /> },

      { path: "codeofconduct", element: <CodeOfConduct /> },
      { path: "codeofconduct", element: <CodeOfConduct />, },
      { path: "fee-payment-planners", element: <FeePlannersWeb /> },
      { path: "academic-planners", element: <AcademicWebPlanner /> },
      { path: "academic-club", element: <AcademicClub /> },
      { path: "downloads", element: <StudentHandbook /> },
      { path: "payment-modes", element: <PaymentModes /> },
      { path: "alumni-speaks", element: <AlumniSpeaks /> },
      { path: "alumni-information-form", element: <AlumniFormPage /> },
      { path: "online-libraries", element: <StudentAccess /> },
      { path: "contact-info", element: <ContactListPage /> },
      { path: "notice", element: <NoticeWeb /> },
      { path: "admission-procedure", element: <AdmissionProcedure />, },
      { path: "verification", element: <VerificationPage/>, },


      // {
      //   path: "students-life",
      //   children: [
      //     // { path: "", element: <CourseProgram /> },
      //     // { path: "programs", element: <CourseProgram /> },
      //     {
      //       path: "student-code-of-conduct",
      //       element: <CodeOfConduct />,
      //     },
      //     // { path: ":name/:id", element: <CourseDetails /> },
      //     { path: "fee-payment-planners", element: <FeePlannersWeb /> },
      //     { path: "academic-planners", element: <AcademicWebPlanner /> },
      //     { path: "academic-club", element: <AcademicClub /> },
      //     { path: "downloads", element: <StudentHandbook /> },
      //     { path: "payment-modes", element: <PaymentModes /> },
      //     { path: "alumni-speaks", element: <AlumniSpeaks /> },
      //     { path: "alumni-information-form", element: <AlumniFormPage /> },
      //     { path: "online-libraries", element: <StudentAccess /> },
      //     { path: "contact-info", element: <ContactListPage /> },
      //     { path: "notices", element: <NoticeWeb /> },
      //   ],
      // },

      // {
      //   path: "admissions",
      //   children: [
      //     { path: "", element: <AdmissionProcedure /> },
      //     {
      //       path: "admission-procedure",
      //       element: <AdmissionProcedure />,
      //     },
      //   ],
      // },
      { path: "lbef-connect", element: <LBEFConnectWeb /> },
      { path: "news", element: <NewsPageWeb /> },
      { path: "scholarship", element: <Scholarship /> },


      {
        path: "media",
        children: [
          { path: "", element: <Gallery /> },
          { path: "photo-gallery", element: <Gallery /> },
              {
        path: "blogs",
        element: <BlogsPAge/>,
      },
          {
            path: "photo-gallery/:name/:id",
            element: <GalleryView />,
          },
        ],
      },
      {
        path: "lrjstm",
        children: [
          { path: "", element: <JournalPageWeb /> },
          { path: "volume/view/:id", element: <JournalPageWeb /> },
          {
            path: "volume/abstract/:id",
            element: <JournalPageWeb />,
          },
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
      { path: "ictregistration", element: <ICTRegistration /> },
      { path: "vacancy", element: <VacancyWeb /> },
      { path: "vacancy/:id", element: <VacancyDetailWeb /> },
  
      {
        path: "ugc",
        element: <PlaceholderPage pageName="UGC" />,
      },
      {
        path: "contact",
        element: <PlaceholderPage pageName="Contact Us" />,
      },
      {
        path: "ourteam/:id",
        element: <TeamDetail />,
      },
      {
        path: "enroll",
        element: <PlaceholderPage pageName="Enroll Now" />,
      },
       {
        path: "blogs/:slug",
        element: <PreviewBlog/>,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },

];
