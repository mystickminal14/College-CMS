import { motion } from "framer-motion";
import decoration from "../../../assets/decoration.webp";
import { fadeUp } from "../../comp/animation";
import { AlumniComp } from "./alumni-comp";
import Seo from "../../../context/seo";
import { APP_URL } from "../../../constants";
const AlumniSpeaks = () => {




  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="LBEF Alumni Success Stories | Student Testimonials Nepal"
        description="Hear from LBEF alumni and students about their academic journey, career growth, and real-world success after studying at Nepal’s first IT college."
        url={`${APP_URL}/alumni-speaks`}
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto sm:px-6 lg:px-8 py-4 md:py-20 text-center"
      >

        <div className="max-w-4xl mx-auto">
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
              Testimonials
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Alumni </span>
            <span className="relative inline-block ml-2">
              <span className="text-blue-600 relative z-10">Speak</span>
              <motion.img
                src={decoration}
                alt="Decoration"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-2 md:h-3"
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover inspiring stories and experiences shared by our alumni as they reflect on their journey and success beyond LBEF.
          </motion.p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-20">
        {/* <AlumniComp /> */}
        <AlumniComp />
      </div>
    </div>
  );
};

export default AlumniSpeaks;
