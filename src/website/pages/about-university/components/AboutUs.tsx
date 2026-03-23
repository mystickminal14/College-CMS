import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../comp/animation';
import graduations from '../../../../assets/apu-about.webp';
import ring from '../../../../assets/ring.webp';
import decoration from '../../../../assets/decoration.webp';

const stats = [
  { value: '10,000+', label: 'Students Enrolled' },
  { value: '130+', label: 'Nationalities' },
  { value: '400+', label: 'Global Awards' },
  { value: 'QS 5★', label: 'Star Rated University' },
];

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

            <h2 className="inline-block px-8 bg-white text-3xl md:text-4xl lg:text-5xl font-bold relative z-10">
              About{' '}
              <span className="relative text-blue-600 inline-block">
                APU
                <img
                  src={decoration}
                  alt=""
                  className="absolute left-1/2 -translate-x-1/2 w-full h-2 sm:h-3"
                />
              </span>
            </h2>
          </div>

          <p className="mt-4 text-gray-600 text-base md:text-lg max-w-4xl mx-auto">
            Malaysia's Premier Digital Tech Institution — shaping future-ready
            graduates through world-class education, global partnerships, and
            cutting-edge innovation.
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
          <motion.div className="space-y-5" variants={fadeUp}>
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
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              APU is among Malaysia's most prestigious private universities,
              awarded <span className="font-semibold text-blue-600">Premier Digital Tech Institution</span> status
              by MDEC. With students from over 130 countries, APU offers a
              truly global campus experience backed by a QS 5-Star rating and
              an exclusive dual degree partnership with De Montfort University
              (DMU), UK.
            </motion.p>

            <motion.p
              className="text-gray-600 text-base leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Conveniently located just 16km from Kuala Lumpur's iconic Petronas
              Twin Towers, APU combines world-class facilities, industry-aligned
              programmes, and over 400 international awards to deliver an
              education that is truly future-proof.
            </motion.p>

            {/* Stats row */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-blue-50 rounded-xl px-3 py-3 text-center"
                >
                  <p className="text-blue-600 font-bold text-lg leading-tight">{stat.value}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.a
              href="https://www.apu.edu.my/about-apu/"
              target="_blank"
              rel="noopener noreferrer"
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