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
        "Dear Students,\nIt is my pleasure to extend a warm welcome to all prospective students. As a part of our student community, you are a part of a large and diverse group reflecting our wonderful regional character and diversity. We are all   ...",
      image: imageone,
    },
    {
      id: 2,
      name: "Er. Prakash Kumar Kejriwal",
      position: "Executive Director",
      institution: "LBEF Group of Institutions",
      message:
        "Dear Students,\nWelcome to LBEF College - the First IT College of Nepal! We are excited about your interest in joining our esteemed institution. At LBEF, we are dedicated to offering an exceptional educational experience that prepares you for ...",
      image: imagetwo,
    },
    {
      id: 3,
      name: "Datuk Paramjeet Singh",
      position: "CO-FOUNDER & CEO",
      institution: "APIIT Education Group",
      message:
        "Dear Students,\nWe welcome LBEF to the international community of the Asia Pacific University of Technology & Innovation (APU). Parents, prospective & current students will be pleased to note that over 11,000 students including international students from over 120 countries are currently....",
      image: imagethree,
    },
    {
      id: 4,
      name: "Prof. Dr. Ho Chin Kuan",
      position: "VICE CHANCELLOR",
      institution: "Asia Pacific University",
      message:
        "Dear Students,\nI would like to extend a warm welcome to students who are part of the APU – LBEF academic partnership. The APU – LBEF partnership which started in 2016 has produced around 300 graduates. Student centricity and uncompromising quality are at the heart...",
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
        description="Read inspiring messages from the Chairman, Executive Director, and Academic Leaders of LBEF."
        url={`${APP_URL}/messages`}
      />

      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="container mx-auto sm:px-6 lg:px-8 py-4 md:py-12 text-center">
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
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <span className="text-blue-600 font-medium text-sm">
                  Message from Our Leaders
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                <span className="text-gray-900">Leadership </span>
                <span className="relative inline-block">
                  <span className="text-blue-600 relative z-10">Messages</span>
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

          <div className="relative max-w-6xl mx-auto p-8">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-2xl">
              {/* Cards Container */}
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="w-full shrink-0 px-4"
                  >
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

              {/* Navigation Buttons - Show only if there are more than 2 slides */}
              {totalSlides > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {/* Indicators/Dots */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                        ? 'bg-blue-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
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