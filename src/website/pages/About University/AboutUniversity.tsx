import AboutUsSection from "./components/AboutUs";
import CareersSection from "./components/CareersSection";
import OurCore from "./components/Core";
import HeroSection from "./components/HeroSection";
import MissionVisionSection from "./components/Mission";

export function AboutUniversity() {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <MissionVisionSection />
      <OurCore />
      <CareersSection />
    </>
  );
}