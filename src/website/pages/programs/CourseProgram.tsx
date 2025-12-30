import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Monitor } from 'lucide-react';

import decoration from '../../../assets/decoration.png';
import useGetAll from './hook/useGetCourses';

import type { Courses } from '../../../pages/courses/model/CourseModel';
import { CourseSkeleton } from './comp/CourseSkeleton';

import { fadeUp, staggerContainer } from '../../comp/animation';

const truncateWords = (text: string, wordLimit: number) => {
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

const CourseProgram = () => {
  const { data, isLoading } = useGetAll();
  const courses: Courses[] = data?.data ?? [];
  const navigate = useNavigate();

  const handleView = (course: Courses) => {
    const title = course.title.replace(/ /g, '-');
    navigate(`/students-life/${title}/${course.id}`, { state: { course } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= HERO SECTION (UNCHANGED) ================= */}
      <div className="container mx-auto sm:px-6 lg:px-8 py-4 md:py-20 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-blue-600 font-medium text-sm">
              Explore Our Academic Programs
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">World Class </span>
            <span className="relative inline-block">
              <span className="text-blue-600 relative z-10"> Courses</span>
              <img
                src={decoration}
                alt=""
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom-0 w-full h-2 md:h-3"
              />
            </span>
            <br />
            <span className="text-gray-900">Students </span>
            <span className="text-blue-600"> Can Join </span>
            <span className="text-gray-900">With Us</span>
          </h1>

          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto">
            World Class Course Students Can Join With Us
          </p>
        </motion.div>
      </div>

      {/* ================= COURSES GRID ================= */}
      <div className="container mx-auto px-6 py-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {/* ================= LOADING ================= */}
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <motion.div key={index} variants={fadeUp}>
                <CourseSkeleton />
              </motion.div>
            ))}

          {/* ================= EMPTY STATE ================= */}
          {!isLoading && courses.length === 0 && (
            <motion.div
              variants={fadeUp}
              className="lg:col-span-3 text-center py-16"
            >
              <h3 className="text-xl font-semibold text-gray-700">
                No courses available right now
              </h3>
              <p className="text-gray-500 mt-2">
                Please check back later. New courses will be added soon.
              </p>
            </motion.div>
          )}

          {/* ================= DATA ================= */}
          {!isLoading &&
            courses.length > 0 &&
            courses.map((course) => (
              <motion.div
                key={course.id}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-lg bg-white border-b-4 border-blue-600 shadow-md h-[360px]"
              >
                {/* Hover background */}
                <div className="card-bg absolute inset-0 bg-blue-600" />

                <div className="relative z-10 p-6 flex flex-col h-full">
                  <div className="flex justify-between">
                    <p className="text-xs uppercase text-blue-600 group-hover:text-white">
                      {course.degree}
                    </p>
                    <p className="text-xs uppercase text-blue-600 group-hover:text-white">
                      {course.duration}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-blue-100 group-hover:opacity-0 transition">
                      <Monitor className="w-7 h-7 text-blue-600" />
                    </div>

                    <h3 className="text-xl font-bold group-hover:text-white">
                      {course.title}
                    </h3>
                  </div>

                  <div className="hover-reveal mt-4">
                    <p className="text-sm text-white">
                      {truncateWords(course.details ?? '', 30)}
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

        {/* ================= HOVER STYLES ================= */}
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
    </div>
  );
};

export default CourseProgram;
