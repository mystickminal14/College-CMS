import { useEffect, useState } from "react";
import SubFooter from "../home/components/SubFooter";
import { VideoSection } from "../home/components/VideoSection";
import ABoutHeroSection from "./components/AboutHeroSection";
import AboutSection from "./components/AboutSection";
import CollegeAppSection from "./components/CollegeApp";
import FAQSection from "./components/FAQSection";
import Employability from "./components/LearningEmployability";
import { MissionSection } from "./components/MissionSection";
import OurCore from "./components/OurCore";
import PartnerSection from "./components/OurPartner";
import StartJourney from "./components/StartJourney";
import StatusSection from "./components/StatusSection";
import { motion, useScroll, useTransform } from "framer-motion";
import Inspiration from "../our-team/component/inspiration";
import { TenReasons } from "./components/TenReasons";


export function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const { scrollY } = useScroll();


  /* Content slides upward */
  const contentY = useTransform(scrollY, [0, 400], [100, 0]);

  return (
    <>
      {!isMobile ? (
        <div className="relative">
          <ABoutHeroSection />
          <Inspiration />



          {/* ================= HERO ================= */}
          <motion.div
            className="sticky top-0 z-10 bg-white"
          >
            <AboutSection />

          </motion.div>



          <motion.div
            style={{ y: contentY }}
            className="relative z-20 bg-white"
          >
            <StatusSection />
            <TenReasons />
            <motion.div
              className="sticky top-0 z-10 bg-white"
            >
              <VideoSection />
            </motion.div>

            <motion.div
              style={{ y: contentY }}
              className="relative z-20 bg-white"
            >
              <MissionSection />

              <OurCore />
              <motion.div
                className="sticky top-0 z-10 bg-white"
              >
                <PartnerSection />
              </motion.div>
              <motion.div
                style={{ y: contentY }}
                className="relative z-20 bg-white"
              >
                <StartJourney />
                <Employability />
                <CollegeAppSection />
                <SubFooter />
                <FAQSection />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      ) : (
        <> <ABoutHeroSection />
          <Inspiration />
          <MissionSection />
          <VideoSection />
          <StatusSection />
          <AboutSection />
          <TenReasons />
          <OurCore />
          <PartnerSection />
          <StartJourney />
          <Employability />
          <CollegeAppSection />
          <SubFooter />
          <FAQSection />
        </>
      )


      }

    </>

  );
}