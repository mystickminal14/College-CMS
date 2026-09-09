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
import Seo from "../../../context/seo";
import ApeuSubFooter from "./components/ApeuSubFooter";
import LbefSubFooter from "./components/LbefSubFooter";
import IndustryPartnerSection from "./components/IndustryPartner";
import BlogSECTION from "./components/BlogSection";
import InfrastructureSection from "./components/InfrastructureSection";
export default function HomePage() {
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
        title="LBEF College Nepal | The First IT College of Nepal"
        description="LBEF is the first IT college of Nepal offering quality education in IT and management fields. Join LBEF to shape your future with industry-focused programs and experienced faculty."
      />
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
            <motion.div
              className="sticky top-0 z-10 bg-white"
            >
              <University />
            </motion.div>
            <motion.div
              className="sticky top-0 z-10 bg-white"
            >
              <VideoSection />
            </motion.div>
            <motion.div
              style={{ y: contentY }}
              className="relative z-20 bg-white"
            >
              <WhyChooseLBEF />
              <motion.div
                className="sticky top-0 z-10 bg-white"
              >
                <InfrastructureSection />
              </motion.div>
              <motion.div
                className="sticky top-0 z-10 bg-white"
              >
                <IndustryPartnerSection />
              </motion.div>
              <motion.div
                className="sticky top-0 z-10 bg-white"
              >
              <BlogSECTION/>

              </motion.div>
              <motion.div
                className="sticky top-0 z-10 bg-white"
              >
                <Testimonial />
              </motion.div>
              <motion.div
                className="sticky top-0 z-10 bg-white"
              >
                <GalleryGrid />
              </motion.div>
              <motion.div
                className="sticky top-0 z-10 bg-white"
              >
                <RecentNews />
              </motion.div>
              <motion.div
                style={{ y: contentY }}
                className="relative z-20 bg-white"
              >
                <EmailSubscribe />
                <motion.div
                  className="sticky top-0 z-10 bg-white"
                >
                  <ApeuSubFooter />

                </motion.div>
                <motion.div
                  style={{ y: contentY }}
                  className="relative z-20 bg-white"
                >
                  <LbefSubFooter />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      ) : (
        <>
          <HeroSection />
          <ApplyNow />
          <NewCourse />
          <University />
          <VideoSection />
          <WhyChooseLBEF />
          <InfrastructureSection />
          <IndustryPartnerSection />
          <JoinStudents />
          <Testimonial />
          <GalleryGrid />
          <RecentNews />
          <EmailSubscribe />
          <SubFooter />

        </>
      )


      }
    </>
  )
}