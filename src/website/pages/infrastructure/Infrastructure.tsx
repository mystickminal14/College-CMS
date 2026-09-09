import Seo from "../../../context/seo";
import { APP_URL } from "../../../constants";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";
import AcademicSpaces from "./components/AcademicSpaces";
import BlockDirectory from "./components/BlockDirectory";
import CampusPlate from "./components/CampusPlate";
import CampusLedger from "./components/CampusLedger";
import FacilityBento from "./components/FacilityBento";
import StudentLife from "./components/StudentLife";
import VisitCampus from "./components/VisitCampus";

export default function InfrastructurePage() {
  return (
    <>
      <Seo
        title="Campus Infrastructure | LBEF College Nepal"
        description="Explore LBEF College's Kathmandu campus — six blocks across 7 ropani with over 50,000 sq. ft. of built-up area, 32 classrooms, computer laboratories, libraries, a server room, infirmary and recreation facilities."
        url={`${APP_URL}/infrastructure`}
      />

      <div className="min-h-screen bg-white">
        <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
          <HeroTitleWithGif
            title="Campus Infrastructure"
            highlightedText="Infrastructure"
            subtitle="Seven ropani in the heart of Kathmandu, six blocks named after Nepali flowers and birds, and more than 50,000 sq. ft. of rooms students actually use."
            badgeText="Campus Infrastructure"
          />

          <div className="mx-auto max-w-7xl">
            <CampusPlate />
            <BlockDirectory />
            <AcademicSpaces />
            <FacilityBento />
            <CampusLedger />
            <StudentLife />
            <VisitCampus />
          </div>
        </div>
      </div>
    </>
  );
}
