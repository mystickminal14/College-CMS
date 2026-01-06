import { motion, type Variants } from 'framer-motion';
import career from "../../../../assets/career_image.webp";
import decoration from '../../../../assets/decoration.webp';

// Custom fade-in animations
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

export default function CareersSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Text Content */}
          <motion.div className="order-2 lg:order-1 space-y-6" variants={fadeLeft}>
            <p className="text-blue-600 font-semibold text-sm md:text-base uppercase tracking-wider mb-4">
              Careers
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Careers at{' '}
              <span className="relative inline-block">
                APU
                <img
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 w-full h-2 sm:h-3"
                />
              </span>
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-10">
              APU is one of Malaysia's premier private universities, where students are transformed into highly skilled, employable, and future-proof professionals via a unique blend of technology, innovation, and creativity.
            </p>
            <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 shadow-lg text-lg">
              EXPLORE
            </button>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div className="order-1 lg:order-2 rounded-3xl overflow-hidden shadow-2xl" variants={fadeRight}>
            <img
              src={career}
              alt="Students enjoying campus life at APU"
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
