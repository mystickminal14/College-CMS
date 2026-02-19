import {
  Award,
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { IMAGE_URL } from "../../../constants";
import decoration from "../../../assets/decoration.webp";
import { useEnquiry } from "../../../context/EnquiryContext";
import type { Courses } from "../../courses/model/CourseModel";

interface CourseHeaderProps {
  course: Courses;
}

/* ================= ANIMATION VARIANTS ================= */

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

/* ====================================================== */

const CourseHeader = ({ course }: CourseHeaderProps) => {
  const { open } = useEnquiry();

  return (
    <motion.div
      className="p-4 md:p-8"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-3 justify-center">
          {/* ================= LEFT ================= */}
          <motion.div className="lg:w-1/2" variants={container}>
            {/* Badge + Title */}
            <motion.div className="mb-8" variants={container}>
              <motion.div
                variants={fadeUp}
                className="inline-block bg-linear-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-4"
              >
                {course.degree.toUpperCase()}'S DEGREE
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug text-center md:text-left"
              >
                <span className="relative inline-block ml-2">
                  <span className="text-blue-600 relative z-10">
                    {course.prefix}
                  </span>
                  <img
                    src={decoration}
                    alt="Decoration"
                    className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-3"
                  />
                </span>
                <span className="text-gray-800"> {course.title}</span>
              </motion.h1>

              <motion.div
                variants={fadeUp}
                className="w-24 h-1 bg-linear-to-r from-blue-600 to-indigo-600 mt-6 rounded-full"
              />
            </motion.div>

            {/* INFO GRID */}
            <motion.div
              variants={container}
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700"
            >
              {[
                {
                  icon: Clock,
                  title: "Shift",
                  value:
                    course.shift === "BOTH"
                      ? "Morning/Evening"
                      : course.shift.toLowerCase(),
                },
                {
                  icon: Calendar,
                  title: "Duration",
                  value: course.duration,
                },
                {
                  icon: BookOpen,
                  title: "Semester",
                  value: course.semester,
                },
                {
                  icon: Award,
                  title: "Credits",
                  value: course.credit,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-3"
                >
                  <item.icon className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p>{item.value}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div
                variants={fadeUp}
                className="flex items-start gap-3 sm:col-span-2"
              >
                <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Degree Awarded By</p>
                  <p>Asia Pacific University of Technology & Innovation</p>
                </div>
              </motion.div>
            </motion.div>

            {/* TIMING CARDS */}
            <motion.div
              variants={container}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-8"
            >
              <motion.div
                variants={fadeUp}
                className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      Class Timing
                    </h3>
                    <p className="text-lg font-semibold text-blue-700">
                      6:30AM - 8:30AM
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Sunday - Friday
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <BookOpen className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Tutorials</h3>
                    <p className="text-lg font-semibold text-emerald-700">
                      8:30AM - 9:30AM
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Sunday - Friday
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="mt-8">
              <button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg w-full md:w-auto" onClick={() => open}>
                Apply for Scholarship →
              </button>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT ================= */}
          <motion.div
            variants={fadeRight}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="w-full max-w-lg">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <img
                  src={IMAGE_URL + course.image}
                  alt="Course Preview"
                  className="w-full h-80 md:h-[420px] lg:h-[520px] object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseHeader;
