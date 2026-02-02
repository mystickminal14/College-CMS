import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../comp/animation';
import graduations from '../../../../assets/apu-about.webp';
import ring from '../../../../assets/ring.webp';
import decoration from '../../../../assets/decoration.webp';

export default function AboutUsSection() {
  return (
    <section
      id="about"
      className="h-screen bg-white flex items-center overflow-hidden"
    >
      <motion.div
        className="max-w-7xl mx-auto px-6 w-full"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-10 relative" variants={fadeUp}>
          <div className="relative max-w-6xl mx-auto pt-6">
            <div className="absolute hidden lg:block top-12 left-0 w-40 2xl:-left-16 2xl:w-64 h-24 border-t-2 border-l-2 border-black rounded-tl-2xl" />
            <div className="absolute hidden lg:block top-12 right-0 w-40 2xl:-right-16 2xl:w-64 h-24 border-t-2 border-r-2 border-black rounded-tr-2xl" />

            <h2 className="inline-block px-8 bg-white text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 relative z-10">
              About{' '}
              <span className="relative inline-block">
                Us
                <img
                  src={decoration}
                  alt=""
                  className="absolute left-1/2 -translate-x-1/2 w-full h-2 sm:h-3"
                />
              </span>
            </h2>
          </div>

          <p className="mt-4 text-gray-600 text-base md:text-lg max-w-4xl mx-auto">
            APU is one of Malaysia's premier private universities, transforming
            students into future-ready professionals through technology,
            innovation, and creativity.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <motion.div className="relative" variants={fadeUp}>
            {/* Decorative Rings */}
            <motion.div
              className="absolute hidden lg:block top-0 -left-10 w-28 h-28"
              initial={{ opacity: 0, rotate: 0 }}
              whileInView={{ opacity: 1, rotate: 15 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <img src={ring} alt="" className="w-full h-full object-contain" />
            </motion.div>

            <motion.div
              className="absolute hidden lg:block bottom-0 -right-10 w-32 h-32"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <img src={ring} alt="" className="w-full h-full object-contain" />
            </motion.div>

            {/* Main Image */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={graduations}
                alt="APU graduates during convocation"
                className="w-full h-[55vh] object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div className="space-y-6" variants={fadeUp}>
            <motion.h3
              className="text-xl md:text-2xl font-semibold"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Asia Pacific University of Technology & Innovation (APU)
            </motion.h3>

            <motion.p
              className="text-gray-600 text-base leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              Asia Pacific University of Technology & Innovation (APU) is among
              Malaysia’s premier private universities, known globally for
              producing highly employable, future-ready graduates and earning
              over 400 prestigious international awards.
            </motion.p>

            <motion.a
              href="https://www.apu.edu.my/about-apu/"
              target="_blank"
              className="inline-flex items-center gap-3 px-7 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
