import { motion } from "framer-motion";
import { useState } from "react";
import imageone from "../../../assets/core/jalan.webp";
import imagetwo from "../../../assets/core/prakash.webp";
import decoration from "../../../assets/decoration.webp";
import imagethree from '../../../assets/core/drparam.webp';
import imagefour from '../../../assets/core/prof.webp';
import { fadeUp } from "../../comp/animation";
import Seo from "../../../context/seo";
import { APP_URL } from "../../../constants";
import MessageDetail from "../messages/Messages";
import { ChevronLeft, ChevronRight } from "lucide-react";

import butterflyGif from "../../../assets/butter.gif";

const OurMessage = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const messages = [
    {
      id: 1,
      name: "Er. Pankaj Jalan",
      position: "Chairman",
      institution: "LBEF Group Of Institutions",
      message:
        "Dear Students,\nIt is my pleasure to extend a warm welcome to all prospective students...",
      image: imageone,
    },
    {
      id: 2,
      name: "Er. Prakash Kumar Kejriwal",
      position: "Executive Director",
      institution: "LBEF Group of Institutions",
      message:
        "Dear Students,\nWelcome to LBEF College - the First IT College of Nepal!...",
      image: imagetwo,
    },
    {
      id: 3,
      name: "Datuk Paramjeet Singh",
      position: "CO-FOUNDER & CEO",
      institution: "APIIT Education Group",
      message:
        "Dear Students,\nWe welcome LBEF to the international community...",
      image: imagethree,
    },
    {
      id: 4,
      name: "Prof. Dr. Ho Chin Kuan",
      position: "VICE CHANCELLOR",
      institution: "Asia Pacific University",
      message:
        "Dear Students,\nI would like to extend a warm welcome...",
      image: imagefour,
    },
  ];

  const cardsPerView = 2;
  const totalSlides = Math.ceil(messages.length / cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <Seo
        title="Message From Leadership | LBEF"
        description="Read inspiring messages from leadership."
        url={`${APP_URL}/messages`}
      />

      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white relative">

        {/* ================= GLOBAL TOP BACKGROUND GIF ================= */}
        <div className="absolute top-0 left-0 w-full h-[60vh] z-0 pointer-events-none">
          <img
            src={butterflyGif}
            alt="Butterfly Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ================= PAGE CONTENT ================= */}
        <div className="relative z-10">

          {/* HEADER */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

            <div className="text-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                  <span className="text-gray-900">Leadership </span>
                  <span className="relative inline-block">
                    <span className="text-blue-600 relative z-10">
                      Messages
                    </span>
                    <motion.img
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      src={decoration}
                      alt="Decoration"
                      className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom-0 w-full h-2 md:h-3"
                    />
                  </span>
                </h1>
              </motion.div>
            </div>
          </div>

          {/* CAROUSEL */}
          <div className="relative max-w-6xl mx-auto p-8">
            <div className="relative overflow-hidden rounded-2xl">

              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full shrink-0 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ml-5">
                      {messages
                        .slice(slideIndex * cardsPerView, slideIndex * cardsPerView + cardsPerView)
                        .map((lead) => (
                          <div
                            key={lead.id}
                            onClick={() => setSelectedId(lead.id)}
                            className="pl-10 relative bg-white rounded-2xl shadow-md transition-transform hover:scale-105 cursor-pointer"
                          >
                            <div className="flex items-center gap-4 pt-6 pl-6 pb-2 pr-6">
                              <div className="w-20 h-20 rounded-full absolute top-5 -left-5 z-20 overflow-hidden border-4 border-[#474AFF]">
                                <img
                                  src={lead.image}
                                  alt={lead.name}
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-gray-900">
                                  {lead.name}
                                </h3>
                                <p className="text-lg text-gray-600">{lead.position}</p>
                                <p className="text-sm text-gray-500">
                                  {lead.institution}
                                </p>
                              </div>
                            </div>

                            <div className="pt-2 pl-6 pb-6 pr-6 text-gray-700 whitespace-pre-line">
                              {lead.message}
                              <div className="flex justify-end mt-2">
                                <span className="text-indigo-600 font-medium hover:underline">
                                  Read More
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* NAVIGATION */}
              {totalSlides > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {/* DOTS */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-blue-600 w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}

            {selectedId !== null && (
              <MessageDetail
                messageId={selectedId}
                onClose={() => setSelectedId(null)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OurMessage;