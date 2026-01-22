import ApeuSubFooter from "../home/components/ApeuSubFooter";
import AboutUsSection from "./components/AboutUs";
import OurCore from "./components/Core";
import HeroSection from "./components/HeroSection";
import { ImageSection } from "./components/ImageSection";
import MissionVisionSection from "./components/Mission";

export function AboutUniversity() {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <MissionVisionSection />
      <ImageSection />
      <OurCore />
      <ApeuSubFooter/>
      {/* <CareersSection /> */}
    </>
  );
}