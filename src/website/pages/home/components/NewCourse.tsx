import { ChevronLeft, ChevronRight, Monitor } from "lucide-react";
import bg from "../../../../assets/courses_bg.jpg";
import image from "../../../../assets/butterfiles.png";
import decoration from "../../../../assets/decoration.png";

import { useNavigate } from "react-router-dom";
import useGetAll from "../../programs/hook/useGetCourses";
import type { Courses } from "../../../../pages/courses/model/CourseModel";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, textContainer, textItem } from "../../../comp/animation";
import { useEffect, useRef, useState } from "react";

const truncateWords = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
};

export default function NewCourse() {
  const { data, isLoading } = useGetAll();
  const courses: Courses[] = data?.data || [];
  const navigate = useNavigate();

  const handleView = (course: Courses) => {
    const title = course.title.replace(/ /g, "-");
    navigate(`/students-life/${title}/${course.id}`, {
      state: { course },
    });
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const CourseSkeleton = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 15, delay: i * 0.1 }}
            className="h-[360px] rounded-lg bg-white shadow-md overflow-hidden animate-pulse"
          >
            <div className="h-full p-6 flex flex-col">
              <div className="flex justify-between">
                <div className="h-3 w-20 bg-gray-200 rounded" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>

              <div className="mt-auto">
                <div className="w-14 h-14 mb-4 rounded-full bg-gray-200" />
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
              </div>

              <div className="mt-4 space-y-2">
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-5/6 bg-gray-200 rounded" />
                <div className="h-3 w-4/6 bg-gray-200 rounded" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const EmptyCourses = () => (
    <motion.div
      className="w-full flex justify-center items-center py-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-700">
          No courses available right now
        </h3>
        <p className="text-gray-500 mt-2">
          Please check back later. New courses will be added soon.
        </p>
      </div>
    </motion.div>
  );

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-start mb-10"
        >
          {/* TEXT BLOCK */}
          <motion.h2
            variants={textContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight mb-6 md:mb-0 text-center md:text-left"
          >
            <motion.span
              variants={textItem}
              className="block text-[12px] sm:text-[14px] mb-4 font-normal uppercase tracking-wider opacity-80"
            >
              Our Courses
            </motion.span>

            <motion.span variants={textItem}>World Class Course</motion.span>{" "}

            <motion.span
              variants={textItem}
              className="relative text-[#474AFF] inline-block ml-2"
            >
              Students
              <motion.img
                src={decoration}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
                alt="Decoration"
                className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-full h-3"
              />
            </motion.span>{" "}

            <motion.span variants={textItem}>Can</motion.span>

            <br className="hidden md:block" />

            <motion.span variants={textItem} className="mt-1 block md:inline">
              Join With Us
            </motion.span>
          </motion.h2>

          {/* BUTTON */}
          <motion.button
            variants={textItem}
            className="flex items-center gap-2 px-6 py-3 border border-[#19213D] rounded-full hover:border-bg-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition mt-4 md:mt-0"
            onClick={() => navigate("students-life/programs")}
          >
            Learn About Course
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {isLoading && (
        <div className="relative bg-gray-100 py-20 px-4">
          <div
            className="absolute inset-0 bg-cover bg-center blur-[5px]"
            style={{ backgroundImage: `url(${bg})` }}
          />
          <div className="absolute inset-0 bg-[#474AFF] opacity-50" />
          <div className="relative max-w-7xl mx-auto">
            <CourseSkeleton />
          </div>
        </div>
      )}

      {!isLoading && courses.length === 0 && <EmptyCourses />}

      {!isLoading && courses.length > 0 && (
        <>
          <div className="relative bg-gray-100 py-20 px-4">
            <div
              className="absolute inset-0 bg-cover bg-center blur-[5px]"
              style={{ backgroundImage: `url(${bg})` }}
            />
            <div className="absolute inset-0 bg-[#474AFF] opacity-50" />

            <div className="relative max-w-7xl mx-auto">
              {isMobile ? (
                <MobileCarousel
                  courses={courses.slice(0, 6)}
                  onView={handleView}
                />
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {courses.slice(0, 6).map((course) => (
                    <motion.div
                      key={course.id}
                      variants={fadeUp}
                      className="group relative overflow-hidden rounded-lg bg-white border-b-4 border-blue-600 shadow-md h-[360px]"
                    >
                      {/* BACKGROUND IMAGE WITH SPRING */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        className="absolute inset-x-0 top-0 bottom-10 bg-no-repeat bg-center bg-size-[50%_50%]"
                        style={{
                          backgroundImage: `url(${image})`,
                        }}
                      />

                      {/* BLUE OVERLAY */}
                      <div className="card-bg absolute inset-0 bg-blue-600" />

                      {/* CARD CONTENT */}
                      <div className="relative z-10 p-6 flex flex-col h-full">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", stiffness: 120, damping: 15 }}
                          className="flex justify-between"
                        >
                          <p className="text-xs uppercase text-blue-600 group-hover:text-white">
                            {course.degree}
                          </p>
                          <p className="text-xs uppercase text-blue-600 group-hover:text-white">
                            {course.duration}
                          </p>
                        </motion.div>

                        <div className="mt-auto">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.1 }}
                            className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-blue-100 group-hover:opacity-0 transition"
                          >
                            <Monitor className="w-7 h-7 text-blue-600" />
                          </motion.div>

                          <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.2 }}
                            className="text-xl font-bold group-hover:text-white"
                          >
                            {course.title}
                          </motion.h3>
                        </div>

                        <div className="hover-reveal mt-4">
                          <p className="text-sm text-white">
                            {truncateWords(course.details ?? "", 30)}
                          </p>
                          <span
                            className="mt-6 block text-white font-semibold cursor-pointer"
                            onClick={() => handleView(course)}
                          >
                            READ MORE
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            <style>{`
              .card-bg {
                transform: scaleY(0);
                transform-origin: bottom;
                transition: transform 0.5s ease;
              }

              .group:hover .card-bg {
                transform: scaleY(1);
              }

              .hover-reveal {
                max-height: 0;
                opacity: 0;
                transform: translateY(24px);
                overflow: hidden;
                transition:
                  max-height 0.5s ease,
                  opacity 0.4s ease,
                  transform 0.5s ease;
              }

              .group:hover .hover-reveal {
                max-height: 200px;
                opacity: 1;
                transform: translateY(0);
              }
            `}</style>
          </div>
        </>
      )}
    </div>
  );
}

// ================= MOBILE CAROUSEL =================
const MobileCarousel = ({
  courses,
  onView,
}: {
  courses: Courses[];
  onView: (c: Courses) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [activePage, setActivePage] = useState(0);

  const CARD_WIDTH = 340;
  const CARDS_PER_PAGE = 1;

  const truncateWords = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const check = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanLeft(scrollLeft > 10);
    setCanRight(scrollLeft < scrollWidth - clientWidth - 10);
    setActivePage(Math.round(scrollLeft / (CARD_WIDTH * CARDS_PER_PAGE)));
  };

  useEffect(() => {
    check();
  }, []);

  const scrollToPage = (page: number) => {
    scrollRef.current?.scrollTo({
      left: CARD_WIDTH * CARDS_PER_PAGE * page,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() =>
          scrollRef.current?.scrollBy({ left: -CARD_WIDTH, behavior: "smooth" })
        }
        disabled={!canLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 transition-all ${
          !canLeft ? "opacity-30 cursor-not-allowed" : "hover:scale-110"
        }`}
      >
        <ChevronLeft className="w-6 h-6 text-blue-600" />
      </button>

      <button
        onClick={() =>
          scrollRef.current?.scrollBy({ left: CARD_WIDTH, behavior: "smooth" })
        }
        disabled={!canRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 transition-all ${
          !canRight ? "opacity-30 cursor-not-allowed" : "hover:scale-110"
        }`}
      >
        <ChevronRight className="w-6 h-6 text-blue-600" />
      </button>

      <div
        ref={scrollRef}
        onScroll={check}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {courses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="flex-none w-full max-w-sm"
          >
            <div className="bg-blue-600 text-white rounded-lg shadow-md h-[360px] flex flex-col p-6 justify-between">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
                className="flex justify-between"
              >
                <p className="text-xs uppercase font-semibold">{course.degree}</p>
                <p className="text-xs uppercase font-semibold">{course.duration}</p>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.1 }}
                className="mt-4 text-lg font-bold"
              >
                {course.title}
              </motion.h3>

              <p className="mt-2 text-sm flex-1">
                {truncateWords(course.details ?? "", 30)}
              </p>

              <span
                className="mt-4 text-sm font-semibold text-white cursor-pointer"
                onClick={() => onView(course)}
              >
                READ MORE
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6 md:hidden">
        {courses.map((_, i) => (
          <span
            key={i}
            onClick={() => scrollToPage(i)}
            className={`transition-all cursor-pointer ${
              activePage === i
                ? "w-8 h-2 bg-blue-500 rounded-full"
                : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
