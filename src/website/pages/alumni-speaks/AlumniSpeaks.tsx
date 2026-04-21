import { motion } from "framer-motion";
import { fadeUp } from "../../comp/animation";
import { AlumniComp } from "./alumni-comp";
import Seo from "../../../context/seo";
import { APP_URL } from "../../../constants";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";

const AlumniSpeaks = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="LBEF Alumni Success Stories | Student Testimonials Nepal"
        description="Hear from LBEF alumni and students about their academic journey, career growth, and real-world success after studying at Nepal's first IT college."
        url={`${APP_URL}/alumni-speak`}
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto sm:px-6 lg:px-8 py-4 md:py-20 text-center"
      >
        <HeroTitleWithGif
          title="Alumni Speak"
          highlightedText="Speak"
          subtitle="Discover inspiring stories and experiences shared by our alumni as they reflect on their journey and success beyond LBEF."
          badgeText="Testimonials"
        />

        {/* Content */}
        <div className="container mx-auto px-4 pb-20">
          {/* <AlumniComp /> */}
          <AlumniComp />
        </div>
      </motion.div>
    </div>
  );
};

export default AlumniSpeaks;