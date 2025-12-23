import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import decoration from "../../../../assets/decoration.png";
import useGetAll from "./hooks/useGetAlumni";
import type { Alumni } from "../../../../pages/alumni/model/AlumniModel";
import { IMAGE_URL } from "../../../../constants";

const MAX_WORDS = 300; // max words to display
const CARD_HEIGHT = 200;
const GAP = 24;
const VISIBLE_CARDS = 3;
const RIGHT_CARD_HEIGHT = CARD_HEIGHT * VISIBLE_CARDS + GAP * (VISIBLE_CARDS - 1);

function limitWords(text: string, maxWords: number) {
  const words = text.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
}

// Estimate height for desktop based on word count
function estimateHeight(text: string, wordsPerLine = 10, lineHeight = 24) {
  const words = text.split(" ").length;
  const lines = Math.ceil(words / wordsPerLine);
  const height = lines * lineHeight + 180; // extra for image + info
  return Math.max(height, 400); // minimum height
}

export function Testimonial() {
  const { data, isLoading } = useGetAll();
  const alumni: Alumni[] = data?.data || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  const activeAlumni = alumni[activeIndex];
  const story = activeAlumni?.story ?? "";
  const dynamicHeight = estimateHeight(story);

  // Reset scroll position when story changes
  useEffect(() => {
    if (storyRef.current) {
      storyRef.current.scrollTop = 0;
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({
      top: activeIndex * (CARD_HEIGHT + GAP),
      behavior: "smooth",
    });
  }, [activeIndex]);

  const next = () => setActiveIndex((i) => (i + 1) % alumni.length);
  const prev = () => setActiveIndex((i) => (i - 1 + alumni.length) % alumni.length);

  return (
    <section className="py-8 px-4 lg:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            What Our{" "}
            <span className="relative text-[#474AFF] inline-block">
              Students
              <img
                src={decoration}
                alt=""
                className="absolute left-1/2 -translate-x-1/2 mt-0 sm:mt-1 w-full h-2 md:h-3"
              />
            </span>{" "}
            Say?
          </h1>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : alumni.length === 0 ? (
          <p className="text-center text-gray-500">No alumni available</p>
        ) : (
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left thumbnail list - Desktop only */}
            <div
              ref={listRef}
              className="hidden lg:block lg:col-span-4 space-y-6 overflow-y-auto pr-2 scrollbar-hide"
              style={{ maxHeight: RIGHT_CARD_HEIGHT }}
            >
              {alumni.map((a, index) => (
                <motion.div
                  key={a.id}
                  onClick={() => setActiveIndex(index)}
                  className={`cursor-pointer transition-all duration-300 ${activeIndex === index
                    ? "opacity-100 "
                    : "opacity-40 hover:opacity-70"
                    }`}

                  style={{ height: CARD_HEIGHT }}
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                    <img
                      src={a.image ? IMAGE_URL + a.image : ""}
                      alt={a.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right main card */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl shadow-2xl p-2 sm:p-6  flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8"
                  style={{
                    height: window.innerWidth >= 1024 ? dynamicHeight : 'auto',
                    minHeight: '450px'
                  }}
                >
                  <div className="flex justify-center lg:justify-start shrink-0">
                    <div className="w-full lg:w-80 lg:h-full mx-auto lg:mx-0">
                      <img
                        src={activeAlumni?.image ? IMAGE_URL + activeAlumni.image : ""}
                        alt={activeAlumni?.name ?? ""}
                        className="rounded-2xl object-cover w-full h-70 sm:h-90 lg:h-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col w-full flex-1 min-h-0">
                    <div
                      ref={storyRef}
                      className="relative text-gray-700 mb-4 flex-1 overflow-hidden"
                    >
                      <span className="absolute -top-3 -left-3 text-4xl sm:text-5xl text-blue-100 font-bold select-none">
                        &ldquo;
                      </span>

                      <div
                        className="h-full overflow-y-auto scrollbar-hide pl-4 pr-2 sm:pr-4"
                        style={{
                          maxHeight: window.innerWidth < 1024 ? '200px' : 'none'
                        }}
                      >
                        <p className="text-sm sm:text-base leading-relaxed pr-2">
                          {limitWords(story, MAX_WORDS)}
                        </p>
                      </div>

                      <span className="absolute -bottom-3 -right-3 text-4xl sm:text-5xl text-blue-100 font-bold select-none">
                        &rdquo;
                      </span>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                        {activeAlumni?.name ?? ""}
                      </h4>

                      <p className="text-sm sm:text-base font-medium text-black mt-1">
                        Position: {activeAlumni?.position ?? ""}
                      </p>

                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {activeAlumni?.course ?? ""} | Batch {activeAlumni?.batch ?? ""}
                      </p>

                      {/* Navigation - Always visible */}
                      <div className="flex items-center justify-between mt-4 sm:mt-6">
                        {/* Mobile indicators */}
                        <div className="lg:hidden flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            {activeIndex + 1} / {alumni.length}
                          </span>
                        </div>

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

              {/* Mobile thumbnail indicators */}
              <div className="lg:hidden mt-4 overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 justify-center">
                  {alumni.slice(0, Math.min(alumni.length, 5)).map((a, index) => (
                    <button
                      key={a.id}
                      onClick={() => setActiveIndex(index)}
                      className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 transition-all ${activeIndex === index
                        ? "ring-2 ring-[#474AFF] ring-offset-2"
                        : "opacity-50"
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
          </div>
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
        
        @media (max-width: 640px) {
          .testimonial-card {
            min-height: 450px;
          }
        }
        
        @media (min-width: 641px) and (max-width: 1023px) {
          .testimonial-card {
            min-height: 500px;
          }
        }
      `}</style>
    </section>
  );
}