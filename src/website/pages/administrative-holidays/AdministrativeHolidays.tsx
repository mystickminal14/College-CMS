import { useState } from "react";
import { motion } from 'framer-motion';
import {  staggerContainer } from '../../comp/animation';
import Seo from '../../../context/seo';
import { APP_URL } from '../../../constants';
import AdministrativeHolidaysImage from '../../../assets/AdministrativeHolidays.png'; // Add your image path
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";

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
      <HeroTitleWithGif
        title="Administrative Holidays"
        highlightedText="Holidays"
        subtitle="Stay informed about the official administrative holidays at LBEF College Nepal. Check out the calendar below for important dates and plan accordingly."
        badgeText="Administrative Holidays"
      />

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