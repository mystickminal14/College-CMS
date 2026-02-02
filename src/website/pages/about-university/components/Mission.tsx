import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../comp/animation';
import Mission from "../../../../assets/mission_vission.webp";
import decoration from '../../../../assets/decoration.webp';

export default function MissionVisionSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={Mission}
          alt="Mission & Vision background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Title */}
        <motion.h2
          className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-14"
          variants={fadeUp}
        >
          Mission &{' '}
          <span className="relative inline-block">
            Vision
            <img
              src={decoration}
              alt=""
              className="absolute left-1/2 -translate-x-1/2 w-full h-2 sm:h-3"
            />
          </span>
        </motion.h2>

        {/* Content Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Mission */}
          <motion.div
            className="space-y-5 max-w-xl"
            variants={fadeUp}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold">Our Mission</h3>
            <p className="text-base md:text-lg leading-relaxed text-gray-200">
              We provide high quality, affordable, innovative and internationally
              benchmarked education and research in a professional, ethical and
              student-centred manner by designing and delivering enriching and
              distinctive learning experiences.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="space-y-5 max-w-xl lg:ml-auto"
            variants={fadeUp}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold">Our Vision</h3>
            <p className="text-base md:text-lg leading-relaxed text-gray-200">
              To be a leading university of technology and innovation transforming
              students into highly employable, competent and future-proof professionals.
            </p>
          </motion.div>

     
        </div>
      </motion.div>
    </section>
  );
}
