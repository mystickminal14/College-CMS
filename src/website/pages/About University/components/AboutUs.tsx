import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../comp/animation';
import graduations from '../../../../assets/apu-second.jpg';
import ring from '../../../../assets/ring.png';
import decoration from '../../../../assets/decoration.png';

export default function AboutUsSection() {
  return (
    <section className="py-16 md:py-24 bg-white" id="about">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-12 relative" variants={fadeUp}>
          <div className="relative max-w-6xl mx-auto pt-10">
            <div className="absolute hidden lg:block top-15 left-0 w-50 2xl:-left-20 2xl:w-150 h-30 border-t-2 border-l-2 border-black rounded-tl-2xl"></div>
            <div className="absolute hidden lg:block top-15 right-0 w-50 2xl:-right-20 2xl:w-150 h-30 border-t-2 border-r-2 border-black rounded-tr-2xl"></div>
            <h2 className="inline-block px-8 bg-white text-4xl md:text-5xl font-bold text-blue-600 relative z-10">
              About{' '}
              <span className="relative inline-block">
                Us
                <img
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 w-full h-2 sm:h-3"
                />
              </span>
            </h2>
          </div>
          <p className="mt-6 text-gray-600 text-lg max-w-4xl mx-auto">
            APU is one of Malaysia's premier private universities, where students are
            transformed into highly skilled, employable, and future-proof professionals
            via a unique blend of technology, innovation, and creativity.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-30 items-center">
          {/* Left: Image with animated rings */}
          <motion.div className="relative" variants={fadeUp}>
            {/* Top-left Ring with rotation */}
            <motion.div
              className="absolute hidden lg:block top-0 -left-15 w-32 h-32 rounded-full"
              initial={{ y: 50, opacity: 0, rotate: 0 }}
              whileInView={{ y: 0, opacity: 1, rotate: 15 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.5, ease: 'easeOut', repeat: Infinity, repeatType: "mirror" }}
            >
              <img src={ring} alt="decorative ring" className="h-40 w-40 object-contain" />
            </motion.div>

            {/* Bottom-right Ring with gentle bounce */}
            <motion.div
              className="absolute hidden lg:block bottom-0 -right-15 w-40 h-40 pointer-events-none"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: [0, -5, 0], opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
            >
              <img src={ring} alt="decorative ring" className="h-40 w-40 object-contain" />
            </motion.div>

            {/* Main Image with subtle parallax */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={graduations}
                alt="APU graduates in academic dress during convocation"
                className="w-full h-full md:h-[600px] object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right: Text with staggered fade */}
          <motion.div className="space-y-8" variants={fadeUp}>
            <motion.h3 variants={fadeUp} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
              Asia Pacific University of Technology & Innovation (APU)
            </motion.h3>
            <motion.p variants={fadeUp} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
              The Asia Pacific University of Technology & Innovation (APU) is amongst Malaysia's
              Premier Private Universities, and is where a unique fusion of technology,
              innovation and creativity works effectively towards transforming students into highly
              competent, employable and future-proof professionals. APU has earned an enviable
              reputation as an award-winning University through its achievements in winning a host
              of over 400 prestigious awards at local and international levels.
            </motion.p>
            <motion.button
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg inline-flex items-center gap-3 text-lg"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
