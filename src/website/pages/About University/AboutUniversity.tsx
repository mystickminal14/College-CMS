import AboutUsSection from "./components/AboutUs";
import CareersSection from "./components/CareersSection";
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
      <CareersSection />
    </>
  );
}