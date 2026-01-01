import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../comp/animation';
import Mission from "../../../../assets/mission_vission.jpg";
import arrow from '../../../../assets/mission_arrow.png'
import decoration from '../../../../assets/decoration.png';

export default function MissionVisionSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${Mission}")` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Animated Content */}
      <motion.div
        className="relative z-10 w-full px-6 lg:px-16 xl:px-24"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Title */}
        <motion.h2
          className="text-center text-4xl md:text-5xl lg:text-6xl font-bold mb-20"
          variants={fadeUp}
          transition={{ duration: 1.2 }}
        >
          Mission &{' '}
          <span className="relative inline-block">
            Vision
            <img
              src={decoration}
              alt="Decoration"
              className="absolute left-1/2 -translate-x-1/2 w-full h-2 sm:h-3"
            />
          </span>
        </motion.h2>

        <div className="relative grid grid-cols-1 gap-28">
          {/* Our Mission */}
          <motion.div
            className="max-w-2xl space-y-6 text-left"
            variants={fadeUp}
            transition={{ duration: 1, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold">Our Mission</h3>
            <p className="text-lg md:text-xl leading-relaxed text-gray-200">
              We provide high quality, affordable, innovative and internationally
              benchmarked education and research in a professional, ethical and
              student-centred manner by designing and delivering a range of enriching
              and distinctive learning experiences.
            </p>
          </motion.div>

          {/* Curved Arrow */}
          <motion.div
            className="hidden lg:flex absolute rotate-45 top-55 -left-125 inset-0 justify-center items-center pointer-events-none"
            animate={{ rotate: [0, 5, -5, 0] }} // gentle sway animation
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <img
              src={arrow}
              alt="Curved Arrow"
              className="w-[25vw] h-auto"
            />
          </motion.div>

          {/* Our Vision */}
          <motion.div
            className="max-w-2xl space-y-6 text-left ml-auto"
            variants={fadeUp}
            transition={{ duration: 1, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold">Our Vision</h3>
            <p className="text-lg md:text-xl leading-relaxed text-gray-200">
              To be a leading university of technology and innovation transforming
              students into highly employable, competent and future-proof professionals.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
