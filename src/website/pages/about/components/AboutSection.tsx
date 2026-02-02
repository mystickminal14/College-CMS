import {  Users2 } from "lucide-react";
import decoration from '../../../../assets/decoration.webp';
import about from '../../../../assets/decoration/about.webp';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AboutSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div className="bg-linear-to-br from-blue-50 to-white overflow-x-hidden"> {/* ← Only this class added */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-8 lg:gap-16 items-center">
          {/* Left Side - Image with Overlaid Stats */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden w-full h-full md:h-140 aspect-square max-w-md">
              <img
                src={about}
                alt="LBEF Community"
                className="w-full h-full object-cover"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="absolute top-[1vw] right-[4vw] hidden 2xl:flex flex-col gap-4 px-6 translate-y-1/2 flex-1 bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <Users2 />
              </div>
              <div className="text-gray-600 text-2xl">25+ Years</div>
              <div className="font-bold text-gray-900">Excellence</div>
            </motion.div>

            {/* Success Stories Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="absolute bottom-[10vw] left-[4vw] hidden 2xl:flex flex-col gap-4 px-6 translate-y-1/2 flex-1 bg-blue-600 text-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <Users2 />
              </div>
              <div className="text-blue-100 text-2xl">14000+</div>
              <div className="font-bold">Success Stories</div>
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
            transition={{ duration: 0.9, ease: "easeOut", staggerChildren: 0.2 }}
            className="mt-24 lg:mt-0"
          >
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-6"
            >
              <span className="text-sm font-medium text-blue-600">About LBEF</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, x: 60 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="text-4xl lg:text-5xl font-bold leading-tight mb-6"
            >
              One Platform. Infinite{" "}
              <span className="relative inline-block text-[#474AFF]">
                Learning
                <img
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 w-full h-3"
                />
              </span>
              <br />
              Possibilities.
            </motion.h1>

            {/* Description Paragraphs */}
            <motion.p
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-gray-600 text-base leading-relaxed mb-4"
            >
              At LBEF, we believe quality education should be accessible, engaging, and
              empowering—for everyone, everywhere.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="text-gray-600 text-base leading-relaxed mb-8"
            >
              The Lord Buddha Education Foundation (LBEF), established in 1998, boasts a strong reputation for
              excellence across various academic fields. Originating from modest beginnings, the college has
              steadily advanced to become one of Nepal's premier institutions, currently serving over 1,500
              students, with more than 14,000 graduates from LBEF Group of Institutions.
              
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="text-gray-600 text-base leading-relaxed mb-8"
            >
              Conceived by Late Parmanand Kejriwal, an esteemed educationist and social worker, LBEF Group
              of Institutions was created with the vision of revolutionizing education in Nepal and providing
              quality education at affordable rates.
              LBEF Vidyapeeth Pvt. Ltd. is running under academic collaboration with the Asia Pacific University
              of Technology & Innovation (APU), Malaysia and we offer international bachelor's and master's
              degree programs in Information Technology and Management. These courses are approved by
              Ministry of Education and recognized by Tribhuvan University, Nepal.
            </motion.p>

            {/* CTA Button */}
            {/* <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4" />
            </motion.button> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
}