import type { ReactNode } from "react";
import Seo from "../../../context/seo";
import { APP_URL } from "../../../constants";
import AcademicSpaces from "./components/AcademicSpaces";
import BlockDirectory from "./components/BlockDirectory";
import CampusLedger from "./components/CampusLedger";
import FacilityBento from "./components/FacilityBento";
import InfraHero from "./components/InfraHero";
import StatsBar from "./components/StatsBar";
import StudentLife from "./components/StudentLife";
import VisitCampus from "./components/VisitCampus";

/** Standard page width; the hero and the learning band break out of it to run full width. */
const Contained = ({ children }: { children: ReactNode }) => (
  <div className="container px-4 mx-auto sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">{children}</div>
  </div>
);

export default function InfrastructurePage() {
  return (
    <>
      <Seo
        title="Campus Infrastructure | LBEF College Nepal"
        description="Explore LBEF College's Kathmandu campus — six blocks across 7 ropani with over 50,000 sq. ft. of built-up area, 32 classrooms, computer laboratories, libraries, a server room, infirmary and recreation facilities."
        url={`${APP_URL}/infrastructure`}
      />

      <div className="min-h-screen bg-white">
        <InfraHero />

        <Contained>
          <StatsBar />
          <BlockDirectory />
        </Contained>

        <AcademicSpaces />

        <Contained>
          <FacilityBento />
          <CampusLedger />
          <StudentLife />
          <VisitCampus />
        </Contained>
      </div>
    </>
  );
}
