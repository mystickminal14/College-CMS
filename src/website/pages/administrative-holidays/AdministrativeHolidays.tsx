import { useState } from "react";
import { motion } from 'framer-motion';
import decoration from '../../../assets/decoration.webp';
import { fadeUp, staggerContainer } from '../../comp/animation';
import Seo from '../../../context/seo';
import { APP_URL } from '../../../constants';
import AdministrativeHolidaysImage from '../../../assets/AdministrativeHolidays.png'; // Add your image path

const AdministrativeHolidays = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Administrative Holidays | LBEF College Nepal"
        description="View the official administrative calendar and holiday schedule for LBEF College Nepal."
        url={`${APP_URL}/administrative-holidays`}
      />

      {/* ================= HERO ================= */}
      <div className="container mx-auto sm:px-6 lg:px-8 py-4 md:py-20 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100"
          >
            <motion.span
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            />
            <span className="text-blue-600 font-medium text-sm">
              Administrative Holidays
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Administrative </span>
            <span className="relative inline-block">
              <span className="text-blue-600 relative z-10"> Holidays</span>
              <motion.img
                src={decoration}
                alt="Decoration"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom-0 w-full h-2 md:h-3"
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Stay informed about the official administrative holidays at LBEF College Nepal. Check out the calendar below for important dates and plan accordingly.
          </motion.p>
        </motion.div>
      </div>

      {/* ================= IMAGE VIEWER ================= */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 sm:px-6 py-5"
      >
        <div className="w-full bg-white rounded-lg p-4 flex flex-col items-center overflow-auto">
          {imageError ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-8">
              <p className="text-red-600 mb-4">Failed to load the administrative holidays image.</p>
              <a
                href={AdministrativeHolidaysImage}
                download
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download Image Instead
              </a>
            </div>
          ) : (
            <div className="flex justify-center">
              <img
                src={AdministrativeHolidaysImage}
                alt="Academic Holidays Calendar"
                className="max-w-full h-auto rounded-lg shadow-lg"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdministrativeHolidays;