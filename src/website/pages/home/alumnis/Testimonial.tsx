import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import decoration from "../../../../assets/decoration.webp";
import useGetAll from "./hooks/useGetAlumni";
import type { Alumni } from "../../../../pages/alumni/model/AlumniModel";
import { IMAGE_URL } from "../../../../constants";

const MAX_WORDS = 160;
const AUTO_SWITCH_INTERVAL = 2000; // 2 seconds

function limitWords(text: string, maxWords: number) {
  const words = text.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
}

// Video popup component
function VideoPopup({ videoUrl, isOpen, onClose }: {
  videoUrl: string;
  isOpen: boolean;
  onClose: () => void
}) {
  if (!isOpen) return null;

  const embedUrl = videoUrl
    .replace("watch?v=", "embed/")
    .replace("youtu.be/", "www.youtube.com/embed/")
    .split("?")[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="relative w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
          aria-label="Close video"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative pt-[56.25%]">
          <iframe
            src={embedUrl}
            title="Alumni Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export function Testimonial() {
  const { data, isLoading } = useGetAll();
  const alumni: Alumni[] = data?.data || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);
  const autoSwitchRef = useRef<ReturnType<typeof setInterval> | null>(null);


  const activeAlumni = alumni[activeIndex];
  const story = activeAlumni?.story ?? "";

  useEffect(() => {
    if (storyRef.current) {
      storyRef.current.scrollTop = 0;
    }
  }, [activeIndex]);


  useEffect(() => {
    // Pause auto-switch if there's only one alumni, hovering, or video popup is open
    if (alumni.length <= 1 || isHovering || isVideoPopupOpen) {
      if (autoSwitchRef.current) {
        clearInterval(autoSwitchRef.current);
        autoSwitchRef.current = null;
      }
      return;
    }

    autoSwitchRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % alumni.length);
    }, AUTO_SWITCH_INTERVAL);

    return () => {
      if (autoSwitchRef.current) {
        clearInterval(autoSwitchRef.current);
        autoSwitchRef.current = null;
      }
    };
  }, [alumni.length, isHovering, isVideoPopupOpen]); // <-- added isVideoPopupOpen

  const next = () => setActiveIndex((i) => (i + 1) % alumni.length);
  const prev = () => setActiveIndex((i) => (i - 1 + alumni.length) % alumni.length);

  const openVideoPopup = () => {
    if (activeAlumni?.link) {
      setIsVideoPopupOpen(true);
    }
  };

  const closeVideoPopup = () => setIsVideoPopupOpen(false);

  const goToPage = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-12 px-4 lg:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          >
            What Our{" "}
            <motion.span className="relative text-[#474AFF] inline-block">
              Students
              <motion.img
                src={decoration}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.3 }}
                alt="decoration"
                className="absolute left-1/2 -translate-x-1/2 mt-0 sm:mt-1 w-full h-2 md:h-3"
              />
            </motion.span>{" "}
            Say?
          </motion.h1>
        </div>

        {isLoading ? (
          <div className="animate-pulse">
            {/* Main card skeleton */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 min-h-[500px] flex flex-col lg:flex-row gap-8">
              {/* Left side skeleton */}
              <div className="lg:w-2/5 space-y-6">
                <div className="aspect-4/3 rounded-2xl bg-gray-200" />
                <div className="space-y-3">
                  <div className="h-6 w-3/4 bg-gray-200 rounded" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded" />
                </div>
              </div>

              {/* Right side skeleton */}
              <div className="lg:w-3/5 space-y-6">
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-11/12 bg-gray-200 rounded" />
                  <div className="h-4 w-10/12 bg-gray-200 rounded" />
                  <div className="h-4 w-9/12 bg-gray-200 rounded" />
                </div>
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-between">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200" />
                      <div className="w-12 h-12 rounded-full bg-gray-200" />
                    </div>
                    <div className="text-sm text-gray-400">
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : alumni.length === 0 ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700">
              No Alumni available right now
            </h3>
            <p className="text-gray-500 mt-2">
              Please check back later. New Alumni will be added soon.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Main testimonial card */}
            <div
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl shadow-2xl p-2 lg:p-8 min-h-[500px] flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto"
                >
                  {/* Left side - Image and Info (40%) */}
                  <div className="lg:w-2/5 flex flex-col gap-6 items-center lg:items-start text-center lg:text-left">
                    {/* Smaller Image */}
                    <div className="relative">
                      <img
                        src={activeAlumni?.image ? IMAGE_URL + activeAlumni.image : ""}
                        alt={activeAlumni?.name ?? ""}
                        className="w-full h-60 lg:w-80 lg:h-95 aspect-4/3 rounded-2xl object-cover shadow-lg"
                      />
                    </div>

                    {/* User Info */}
                    <div className="space-y-2">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                        {activeAlumni?.name ?? ""}
                      </h3>
                      <p className="text-lg font-medium text-[#474AFF]">
                        {activeAlumni?.position ?? ""}
                      </p>
                      <p className="text-gray-600">
                        {activeAlumni?.course ?? ""}
                      </p>
                      <p className="text-sm text-gray-500">
                        Batch {activeAlumni?.batch ?? ""}
                      </p>
                    </div>
                  </div>


                  {/* Right side - Content, Video and Pagination (60%) */}
                  <div className="lg:w-6/5 flex flex-col">
                    {/* Content Section */}
                    <div className="flex-1 mb-6">
                      <div
                        ref={storyRef}
                        className="relative text-gray-700 h-full"
                      >
                        <span className="absolute -top-4 -left-2 text-5xl sm:text-6xl text-blue-100 font-bold select-none">
                          &ldquo;
                        </span>

                        <div className="h-full pl-2 pr-2 lg:pl-6 lg:pr-4 pt-6 pb-2">
                          <p className="text-base sm:text-lg leading-relaxed">
                            {limitWords(story, MAX_WORDS)}
                          </p>
                        </div>

                        <span className="absolute -bottom-4 -right-2 text-5xl sm:text-6xl text-blue-100 font-bold select-none">
                          &rdquo;
                        </span>
                      </div>
                    </div>

                    {/* Video Section (if video exists) */}
                    {activeAlumni?.link && (
                      <div className="mb-6">
                        <div className="flex justify-end gap-4">
                          <div
                            onClick={openVideoPopup}
                            className="relative cursor-pointer group rounded-xl overflow-hidden bg-gray-100 hover:shadow-lg transition-shadow shrink-0"
                            style={{ width: '200px', height: '120px' }}
                          >
                            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity z-10" />
                            <img
                              src={`https://img.youtube.com/vi/${activeAlumni.link.split('v=')[1]?.split('&')[0] || ''}/hqdefault.jpg`}
                              alt="Video thumbnail"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-5 h-5 text-[#474AFF] ml-0.5" />
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                    {/* Pagination Section (Below content and video with border top) */}
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Page indicator */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600">
                            {activeIndex + 1} / {alumni.length}
                          </span>

                        </div>

                        {/* Pagination dots */}
                        {alumni.length > 1 && (
                          <div className="flex items-center gap-2">
                            {alumni.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => goToPage(index)}
                                className={`w-3 h-3 rounded-full transition-all ${activeIndex === index
                                    ? "bg-[#474AFF] scale-110"
                                    : "bg-gray-300 hover:bg-gray-400"
                                  }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                              />
                            ))}
                          </div>
                        )}

                        {/* Navigation buttons */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={prev}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-300 hover:border-[#474AFF] hover:bg-[#474AFF] hover:text-white transition-all flex items-center justify-center"
                            aria-label="Previous testimonial"
                          >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>

                          <button
                            onClick={next}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#474AFF] text-white hover:bg-blue-700 transition-all flex items-center justify-center"
                            aria-label="Next testimonial"
                          >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile thumbnail indicators */}
            <div className="lg:hidden overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 justify-center">
                {alumni.slice(0, Math.min(alumni.length, 5)).map((a, index) => (
                  <button
                    key={a.id}
                    onClick={() => goToPage(index)}
                    className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 transition-all ${activeIndex === index
                        ? "ring-2 ring-[#474AFF] ring-offset-2"
                        : "opacity-50 hover:opacity-70"
                      }`}
                  >
                    <img
                      src={a.image ? IMAGE_URL + a.image : ""}
                      alt={a.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                {alumni.length > 5 && (
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-lg text-sm font-medium">
                    +{alumni.length - 5}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Video Popup (only when video link exists and is clicked) */}
        {activeAlumni?.link && (
          <VideoPopup
            videoUrl={activeAlumni.link}
            isOpen={isVideoPopupOpen}
            onClose={closeVideoPopup}
          />
        )}
      </div>

      {/* Scrollbar hide */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}