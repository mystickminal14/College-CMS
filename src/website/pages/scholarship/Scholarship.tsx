import decoration from "../../../assets/decoration.webp";
import { motion } from "framer-motion";
import { fadeUp } from "../..//comp/animation";
import Seo from "../../../context/seo";
import { APP_URL } from "../../../constants";
import ScholarshipContent from "./components/Contents";

const Scholarship = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Student Scholarship | LBEF College Nepal"
        description="Learn about the student scholarship programs at LBEF College Nepal, including eligibility criteria, application process, and benefits for students."
        url={`${APP_URL}/students-life/student-code-of-conduct`}
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
          <motion.div
            className="container mx-auto px-2 sm:px-6 lg:px-8 py-6 text-center"
            variants={fadeUp}
          >
            <div className="max-w-8xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100"
              >
                <motion.span
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut" as const
                  }}
                />
                <span className="text-blue-600 font-medium text-sm">
                  Scholarship
                </span>
              </motion.div>



              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                <span className="relative inline-block ml-2">
                  <span className="text-blue-600 relative z-10"> Scholarship </span>
                  <motion.img
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    src={decoration}
                    alt="Decoration"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-2 sm:bottom-0 w-full h-3"
                  />
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }} className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Explore the various scholarship opportunities available at LBEF College Nepal, designed to support and empower our students in their academic journey.
              </motion.p>
            </div>
          </motion.div>

          {/* CONTENT CARD */}
          <ScholarshipContent />

        </div>
      </motion.div>
    </div>
  );
};

export default Scholarship;
