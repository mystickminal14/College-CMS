import AboutSection from "./components/AboutSection";
import FAQSection from "./components/FAQSection";
import OurCore from "./components/OurCore";
import PartnerSection from "./components/OurPartner";
import StartJourney from "./components/StartJourney";
import StatusSection from "./components/StatusSection";

export function AboutPage() {
  return (
    <>
      <StatusSection />
      <AboutSection />
      <OurCore />
      <PartnerSection />
      <StartJourney />
      <FAQSection />
    </>

  );
}