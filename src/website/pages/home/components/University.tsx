import { motion } from "framer-motion";
import apu from "../../../../assets/apu_logo.webp";
import ranking from "../../../../assets/IndustryLogo/Bandung.png";
import md from '../../../../assets/IndustryLogo/md.jpeg';
import TOP from '../../../../assets/IndustryLogo/top.jpeg';
import Asia from '../../../../assets/IndustryLogo/asia.jpeg';
import five from '../../../../assets/IndustryLogo/five.jpeg';
import decoration from '../../../../assets/decoration.webp';
import campus from '../../../../assets/campus.webp';

import campus_inside from '../../../../assets/campus_inside.webp';
import { fadeUp, staggerContainer } from "../../../comp/animation";

export function University() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-20 bg-white overflow-hidden">

      {/* Left decorative campus image */}
      <motion.div
        className="absolute top-[5vh] left-[2vw] w-28 h-40 rounded-3xl -rotate-12 hidden lg:block bg-cover bg-center"
        style={{ backgroundImage: `url(${campus})` }}
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
      />

      {/* Right decorative campus inside image */}
      <motion.div
        className="absolute bottom-[6vh] right-[2vw] w-28 h-40 rounded-3xl rotate-12 hidden lg:block bg-cover bg-center"
        style={{ backgroundImage: `url(${campus_inside})` }}
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.1 }}
      />

      <motion.div
        className="w-full sm:max-w-7xl mx-auto relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Badge */}
        <motion.div className="text-center mb-4 sm:mb-6" variants={fadeUp}>
          <span className="inline-block px-6 py-2 text-[20px] sm:text-[25px] bg-[#474AFF] text-white font-bold rounded-full">
            Our University
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-center text-4xl md:text-5xl font-bold leading-tight mb-6 sm:mb-10"
          variants={staggerContainer}
        >
          <motion.span variants={fadeUp}>Gateway </motion.span>
          To{" "}
          <motion.span className="relative inline-block text-[#474AFF]" variants={fadeUp}>
            Personal
            <motion.img
              src={decoration}
              alt="Decoration"
              className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-3"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
            />
          </motion.span>{" "}
          <br />
          <motion.span className="text-gray-900" variants={fadeUp}>
            And Professional Growth
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.div
          className="w-full sm:max-w-6xl mx-auto text-center"
          variants={fadeUp}
        >
          <p className="text-xs sm:text-lg md:text-xl text-[#4D5756] leading-relaxed mb-8 sm:mb-12">
            The Asia Pacific University of Technology & Innovation (APU) is among Malaysia's Premier Private Universities, and is where a unique fusion of technology, innovation and creativity works effectively towards transforming students into highly competent, employable and future-proof professionals. APU has earned an enviable reputation as an award-winning University through its achievements in winning a host of{" "}
            <a
              href="https://www.apu.edu.my/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[#474AFF] hover:opacity-75 transition-opacity duration-200"
            >
              over 400 prestigious awards at local and international levels.
            </a>
          </p>
        </motion.div>

        {/* Logos & Rankings */}
        <motion.div
          className="flex items-center flex-wrap justify-center gap-6 sm:gap-10 mt-10 sm:mt-16"
          variants={staggerContainer}
        >
          {/* APU Logo */}
          <motion.img
            src={apu}
            alt="APU Logo"
            className="h-12 sm:h-16 md:h-20 w-auto"
            variants={fadeUp}
          />

          {/* Divider */}
          <motion.div className="w-px h-12 sm:h-16 md:h-20 bg-gray-300" variants={fadeUp} />

          {/* Ranking Logo */}
          <motion.img
            src={ranking}
            alt="QS 5 Star Rating"
            className="h-10 sm:h-14 md:h-16 w-auto"
            variants={fadeUp}
          />

          {/* Divider */}

          <motion.div className="w-px h-12 sm:h-16 md:h-20 bg-gray-300" variants={fadeUp} />

          {/* MD badge */}
          <motion.img
            src={md}
            alt="MD Ranking"
            className="h-10 sm:h-14 md:h-20 w-auto object-contain"
            variants={fadeUp}
          />

          {/* Divider */}
          <motion.div className="w-px h-12 sm:h-14 md:h-20 bg-gray-300" variants={fadeUp} />

          {/* Top badge */}
          <motion.img
            src={TOP}
            alt="Top University"
            className="h-10 sm:h-20 md:h-28 w-auto object-contain"
            variants={fadeUp}
          />

          {/* Divider */}
          <motion.div className="w-px h-12 sm:h-16 md:h-20 bg-gray-300" variants={fadeUp} />

          {/* Asia badge */}
          <motion.img
            src={Asia}
            alt="Asia Ranking"
            className="h-10 sm:h-20 md:h-26 w-auto object-contain"
            variants={fadeUp}
          />

          {/* Divider */}
          <motion.div className="w-px h-12 sm:h-16 md:h-20 bg-gray-300" variants={fadeUp} />

          {/* Five Star badge */}
          <motion.img
            src={five}
            alt="5 Star Rating"
            className="h-10 sm:h-14 md:h-20 w-auto object-contain"
            variants={fadeUp}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}