import { University } from "./components/University";
import { ApplyNow } from "./components/ApplyNow";
import { HeroSection } from "./components/HeroSection";
import { VideoSection } from "./components/VideoSection";
import { WhyChooseLBEF } from "./components/WhyChooseLBEF";
import { JoinStudents } from "./components/JoinStudents";
import { Testimonial } from "./alumnis/Testimonial";
import { EmailSubscribe } from "./components/EmailSubscribe";
import RecentNews from "./components/RecentNews";
import SubFooter from "./components/SubFooter";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import NewCourse from "./components/NewCourse";
import GalleryGrid from "./components/GalleryGrid";
export function HomePage() {
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
      {!isMobile ? (
        <div className="relative">
          <HeroSection />
          <motion.div
            className="sticky top-0 z-10 bg-white"
          >
            <ApplyNow />
          </motion.div>
          <motion.div
            style={{ y: contentY }}
            className="relative z-20 bg-white"
          >
            <NewCourse />
            <University />
            <motion.div
              className="sticky top-0 z-10 bg-white"
            >
              <VideoSection />
            </motion.div>
            <motion.div
              style={{ y: contentY }}
              className="relative z-20 bg-white"
            ><WhyChooseLBEF />
              <motion.div
                className="sticky top-0 z-10 bg-white"
              >
                <JoinStudents />
              </motion.div>
              <motion.div
                style={{ y: contentY }}
                className="relative z-20 bg-white"
              >
                <Testimonial />
                
                <GalleryGrid />
               
                <RecentNews />
                <EmailSubscribe />
                <SubFooter /></motion.div></motion.div>

          </motion.div>
        </div>
      ) : (
        <><HeroSection />
          <ApplyNow />
          <NewCourse />
          <University />
          <VideoSection />
          <WhyChooseLBEF />
          <JoinStudents />
          <Testimonial />
          {/* <LatestInslight /> */}
          {/* <OurPartners /> */}
          <GalleryGrid />
          {/* <Events /> */}
          <RecentNews />
          <EmailSubscribe />
          <SubFooter />

        </>
      )


      }
    </>
  )
}