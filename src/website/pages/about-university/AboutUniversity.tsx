import { APP_URL } from "../../../constants";
import Seo from "../../../context/seo";
import ApeuSubFooter from "../home/components/ApeuSubFooter";
import AboutUsSection from "./components/AboutUs";
import OurCore from "./components/Core";
import HeroSection from "./components/HeroSection";
import { ImageSection } from "./components/ImageSection";
import MissionVisionSection from "./components/Mission";

export function AboutUniversity() {
  return (
    <>
    <Seo
  title="Asia Pacific University (APU) | LBEF Partner University"
  description="Explore Asia Pacific University of Technology & Innovation (APU), Malaysia – LBEF’s partner university known for innovation, technology, and global recognition."
  url={`${APP_URL}/about/about-university`}

/>

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