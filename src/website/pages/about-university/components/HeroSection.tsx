import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../comp/animation';
import university_image from "../../../../assets/university.webp";

export default function HeroSection() {
  return (
    <>
      <div className="mb-8 text-left text-black px-20 pt-8 ">
        <p className="text-sm md:text-base opacity-65">
          <span className="inline-block w-4 h-px bg-black align-middle mr-2"></span>
          Our University
        </p>
      </div>

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${university_image})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Animated Content on Scroll */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"      // ✅ Animate when in viewport
          viewport={{ once: true, amount: 0.3 }} // triggers when 30% visible, runs once
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
