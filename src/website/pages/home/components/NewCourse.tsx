import { ChevronLeft, ChevronRight, Monitor } from "lucide-react";
import bg from "../../../../assets/courses_bg.webp";
import image from "../../../../assets/butterfiles.webp";
import decoration from "../../../../assets/decoration.webp";

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


export default function NewCourse() {
  const { data, isLoading } = useGetAll();
  const courses: Courses[] = data?.data || [];
  const navigate = useNavigate();
  const handleView = (course: Courses) => {
    navigate(`/${course.slug}`);
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);


  return (
    <div>
      <div className="max-w-7xl mt-5 sm:mt-0 mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center md:flex-row justify-between md:items-start mb-10"
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
                className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-full h-3"
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
            className="flex text-sm sm:text-lg items-center gap-2 px-6 py-3 border border-[#19213D] rounded-full hover:border-bg-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition md:mt-0"
            onClick={() => navigate("/courses")}
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
                      onClick={() => handleView(course)}

                      variants={fadeUp}
                      className="group relative cursor-pointer overflow-hidden rounded-lg bg-white border-b-4 border-blue-600 shadow-md h-[360px]"
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
                            {course.duration} years
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
                            {course.prefix} {course.title}
                          </motion.h3>
                        </div>

                        <div className="hover-reveal mt-4">
                          <p className="text-sm text-white">
                            {truncateWords(course.details ?? "", 25)}
                          </p>
                          <span
                            className="mt-4 block text-white font-semibold cursor-pointer"
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

const MobileCarousel = ({
  courses,
  onView,
}: {
  courses: Courses[];
  onView: (c: Courses) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const CARD_WIDTH =
    typeof window !== "undefined"
      ? Math.min(window.innerWidth - 32, 420)
      : 360;

  const onScroll = () => {
    if (!scrollRef.current) return;
    setActive(Math.round(scrollRef.current.scrollLeft / CARD_WIDTH));
  };

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({
      left: CARD_WIDTH * dir,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* buttons */}
      <button
        onClick={() => scrollBy(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow z-10"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => scrollBy(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow z-10"
      >
        <ChevronRight />
      </button>

      {/* carousel */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex overflow-hidden touch-none"
      >
        {courses.map((course) => (
          <div
            key={course.id}
            style={{ width: CARD_WIDTH }}
            className="flex-none px-4"
            onClick={() => onView(course)}
          >
            <div className="bg-blue-600 text-white h-[360px] rounded-lg p-6 flex flex-col">
              <div className="flex justify-between text-xs">
                <span>{course.degree}</span>
                <span>{course.duration}</span>
              </div>
              <h3 className="mt-4 font-bold">
                {course.prefix} {course.title}
              </h3>
              <p className="mt-3 text-sm flex-1">
                {truncateWords(course.details ?? "", 28)}
              </p>
              <span className="font-semibold">READ MORE</span>
            </div>
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="flex justify-center gap-2 mt-4">
        {courses.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all cursor-pointer ${active === i ? "w-8 bg-blue-500" : "w-2 bg-gray-300"
              }`}
          />
        ))}
      </div>
    </div>
  );
};
