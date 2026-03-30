import { motion, useScroll, useTransform} from "framer-motion";
import { APP_URL } from "../../../constants";
import Seo from "../../../context/seo";
import ApeuSubFooter from "../home/components/ApeuSubFooter";
import AboutUsSection from "./components/AboutUs";
import OurCore from "./components/Core";
import HeroSection from "./components/HeroSection";
import { useEffect, useState } from "react";
import AchievementsSection from "./components/Achievement";
import MissionVisionSection from "./components/MIssion";

export default function AboutUniversity() {
 const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollY } = useScroll();
  

  const contentY = useTransform(scrollY, [0, 400], [100, 0]);

  return (
    <>
      <Seo
        title="Asia Pacific University (APU) | LBEF Partner University"
        description="Explore Asia Pacific University of Technology & Innovation (APU), Malaysia – LBEF’s partner university known for innovation, technology, and global recognition."
        url={`${APP_URL}/about-university`}

      />
     {!isMobile?(
       <div className="relative">
        <motion.div
          className="sticky top-0 z-10 bg-white"
        >
          <HeroSection />

        </motion.div>
        <motion.div
          className="sticky top-0 z-10 bg-white"
        >
          <AboutUsSection />

        </motion.div>
           <motion.div
          className="sticky top-0 z-10 bg-white"
        >
          <MissionVisionSection />

        </motion.div>
          <motion.div
            style={{ y: contentY }}
            className="relative z-20 bg-white"
          >
          <AchievementsSection />

              <motion.div
          className="sticky top-0 z-10 bg-white"
        >

        </motion.div>
             <motion.div
          className="sticky top-0 z-10 bg-white"
        >
          <OurCore />

        </motion.div>
         <motion.div
          className="sticky top-0 z-10 bg-white"
        >
          <ApeuSubFooter />

        </motion.div>
          </motion.div>
           
      

      </div>
     ):( <>
               <HeroSection />
               
          <AboutUsSection />
          <MissionVisionSection />
          <AchievementsSection />

                         <OurCore />

                         <ApeuSubFooter />

     
             </>)}

      {/* <CareersSection /> */}
    </>
  );
}