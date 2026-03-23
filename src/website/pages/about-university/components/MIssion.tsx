import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../comp/animation';
import Mission from "../../../../assets/banner_apu.webp";
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
        <div className="absolute inset-0 bg-black/60" />
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
          className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-20"
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

        {/* Mission & Vision Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-10">
          {/* Mission */}
          <motion.div
            className="space-y-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
            variants={fadeUp}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <h3 className="text-2xl md:text-3xl font-bold">Our Mission</h3>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-gray-200">
              To provide high quality, affordable, innovative and internationally
              benchmarked education and research in a professional, ethical and
              student-centred manner — designing and delivering enriching and
              distinctive learning experiences that transform lives.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="space-y-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
            variants={fadeUp}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔭</span>
              <h3 className="text-2xl md:text-3xl font-bold">Our Vision</h3>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-gray-200">
              To be a leading university of technology and innovation,
              transforming students into highly employable, competent and
              future-proof professionals — ranked among the top universities
              globally and recognised as Malaysia's Premier Digital Tech Institution.
            </p>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}