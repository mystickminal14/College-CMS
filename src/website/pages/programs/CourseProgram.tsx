import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import decoration from '../../../assets/decoration.png';
import useGetAll from './hook/useGetCourses';
import CourseMiniCard from './comp/CourseCard';
import { IMAGE_URL } from '../../../constants';
import type { Courses } from '../../../pages/courses/model/CourseModel';
import { CourseSkeleton } from './comp/CourseSkeleton';

import { fadeUp, staggerContainer } from '../../comp/animation';

const CourseProgram = () => {
  const { data, isLoading } = useGetAll();
  const courses = data?.data ?? [];
  const navigate = useNavigate();

  const handleView = (course: Courses) => {
    const title = course.title.replace(/ /g, '-');
    navigate(`/students-life/${title}/${course.id}`, { state: { course } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= HERO SECTION ================= */}
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
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom-0 w-full h-2 md:h-3"
              />
            </span>
            <br />
            <span className="text-gray-900">Students </span>
            <span className="text-blue-600"> Can Join </span>
            <span className="text-gray-900">With Us</span>
          </h1>

          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            World Class Course Students Can Join With Us
          </p>
        </motion.div>
      </div>

      {/* ================= COURSES GRID ================= */}
      <div className="container mx-auto px-6 py-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl justify-items-center mx-auto"
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="flex-none w-full max-w-sm"
              >
                <CourseSkeleton />
              </div>
            ))
          ) : courses.length > 0 ? (
            courses.map((course, index) => (
              <motion.div
                key={`${course.id}-${index}`}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex-none w-full max-w-sm"
              >
                <CourseMiniCard
                  title={course.title}
                  credits={course.credit}
                  semester={course.semester}
                  duration={course.duration}
                  image={`${IMAGE_URL}${course.image}`}
                  onView={() => handleView(course)}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={fadeUp}
              className="col-span-3 text-center py-12"
            >
              <h3 className="text-xl font-semibold text-gray-700">
                No courses available right now
              </h3>
              <p className="text-gray-500 mt-2">
                Please check back later. New courses will be added soon.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CourseProgram;
