import { fadeUp } from "../..//comp/animation";
import Seo from "../../../context/seo";
import { APP_URL } from "../../../constants";
import ScholarshipContent from "./components/Contents";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";
import { motion } from "framer-motion";

const Scholarship = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Student Scholarship | LBEF College Nepal"
        description="Learn about student scholarship programs at LBEF College Nepal, including eligibility criteria, application process, and benefits for students."
        url={`${APP_URL}/student-code-of-conduct`}
      />
      <motion.div
        className="container mx-auto px-2 sm:px-6 lg:px-8 py-6 md:py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="max-w-6xl mx-auto">

          {/* HERO */}
          <HeroTitleWithGif
            title="Scholarship"
            highlightedText="Scholarship"
            subtitle="Explore various scholarship opportunities available at LBEF College Nepal, designed to support and empower our students in their academic journey."
            badgeText="Scholarship"
          />

          {/* CONTENT CARD */}
          <ScholarshipContent />

        </div>
      </motion.div>
    </div>
  );
};

export default Scholarship;
