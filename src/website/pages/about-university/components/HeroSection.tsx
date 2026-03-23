import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../comp/animation';
import university_image from "../../../../assets/university.webp";
import logo from "../../../../assets/apu_logo.webp";

export default function HeroSection() {
  return (
    <>
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: `url(${university_image})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* APU Logo - Top Right */}
        <div className="absolute top-5 right-6 z-20">
          <img src={logo} alt="APU Logo" className="h-12 sm:h-22 w-auto drop-shadow-lg" />
        </div>

        {/* Animated Content on Scroll */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Main Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-12"
            variants={fadeUp}
          >
            Malaysia's Best Technology
            <br />
            University
          </motion.h1>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeUp}
          >
            <a
              href="#about"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 shadow-lg text-lg"
            >
              EXPLORE
            </a>
            <a
              href="https://www.apu.edu.my/about-apu/"
              target="_blank"
              className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-gray-900 transition duration-300 text-lg"
            >
              VISIT OFFICIAL WEBSITE
            </a>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}