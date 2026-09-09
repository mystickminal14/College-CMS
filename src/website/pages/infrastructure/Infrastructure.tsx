import Seo from "../../../context/seo";
import { APP_URL } from "../../../constants";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";
import CampusBlocks from "./components/CampusBlocks";
import CampusCollage from "./components/CampusCollage";
import CampusStats from "./components/CampusStats";
import FacilityGallery from "./components/FacilityGallery";
import GlanceTable from "./components/GlanceTable";
import LearningEnvironment from "./components/LearningEnvironment";
import StudentLife from "./components/StudentLife";

export default function InfrastructurePage() {
  return (
    <>
      <Seo
        title="Campus Infrastructure | LBEF College Nepal"
        description="Explore LBEF College's Kathmandu campus — six blocks across 7 ropani with over 50,000 sq. ft. of built-up area, 32 classrooms, computer laboratories, libraries, a server room, infirmary and recreation facilities."
        url={`${APP_URL}/infrastructure`}
      />

      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
          <HeroTitleWithGif
            title="Campus Infrastructure"
            highlightedText="Infrastructure"
            subtitle="Located in the heart of Kathmandu, LBEF College offers a modern and well-integrated campus spread across approximately 7 ropani of land, with a total built-up area exceeding 50,000 sq. ft., operating through six purpose-oriented blocks — Laligurans, Saypatri, Sunkhari, Danphe, Saras and Suga."
            badgeText="Campus Infrastructure"
          />

          <div className="mx-auto max-w-7xl">
            <CampusCollage />
            <CampusStats />
            <CampusBlocks />
            <LearningEnvironment />
            <FacilityGallery />
            <GlanceTable />
            <StudentLife />
          </div>
        </div>
      </div>
    </>
  );
}
