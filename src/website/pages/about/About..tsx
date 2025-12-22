import ABoutHeroSection from "./components/AboutHeroSection";
import AboutSection from "./components/AboutSection";
import FAQSection from "./components/FAQSection";
import  Employability  from "./components/LearningEmployability";
import MissionSection from "./components/MissionSection";
import OurCore from "./components/OurCore";
import PartnerSection from "./components/OurPartner";
import StartJourney from "./components/StartJourney";
import StatusSection from "./components/StatusSection";

export function AboutPage() {
  return (
    <>
      <ABoutHeroSection />
      <MissionSection />
      <StatusSection />
      <AboutSection />
      <OurCore />
      <PartnerSection />
      <StartJourney />
      <Employability />
      <FAQSection />
    </>

  );
}