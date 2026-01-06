import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Monitor } from 'lucide-react';
import image from "../../../assets/butterfiles.png";

import decoration from '../../../assets/decoration.png';
import useGetAll from './hook/useGetCourses';

import type { Courses } from '../../../pages/courses/model/CourseModel';

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
  const CourseSkeleton = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
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
          </div>
        ))}
      </div>
    );
  };

  const EmptyCourses = () => (
    <div className="w-full flex justify-center items-center py-8">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-700">
          No courses available right now
        </h3>
        <p className="text-gray-500 mt-2">
          Please check back later. New courses will be added soon.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
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
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut" as const
              }}
            />
            <span className="text-blue-600 font-medium text-sm">
              Explore Our Academic Programs
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">World Class </span>
            <span className="relative inline-block">
              <span className="text-blue-600 relative z-10"> Courses</span>
              <motion.img
               initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
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

      {isLoading && (
        <div className="relative bg-gray-100 py-10 px-4">
          <div className="relative max-w-7xl mx-auto">
            <CourseSkeleton />
          </div>
        </div>
      )}

      {!isLoading && courses.length === 0 && <EmptyCourses />}


      <div className="container mx-auto px-6 py-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
        
       
          {!isLoading &&
            courses.length > 0 &&
            courses.map((course) => (
                  <motion.div
                      key={course.id}
                      variants={fadeUp}
                            onClick={() => handleView(course)}

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
                           {course.prefix} {course.title}
                          </motion.h3>
                        </div>

                        <div className="hover-reveal mt-4">
                          <p className="text-sm text-white">
                            {truncateWords(course.details ?? "", 25)}
                          </p>
                          <span
                            className="mt-5 block text-white font-semibold cursor-pointer"
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
