import { useLocation, useParams } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import type { Courses } from "./model/CourseModel";
import useGetCourseDetails from "./hooks/useGetDetails";
import CourseNewHeader from "./components/CourseNewHeader";
import { BlockType } from "./model/CourseDetailModel";
import { IMAGE_URL } from "../../constants";
import {
  Clock,
  CalendarDays,
  Languages,
  BookOpen,
  CheckCircle,
  GraduationCap,
} from "lucide-react";
import CourseDetailRenderer from "./CourseDetailRender";

/* ================= ANIMATION VARIANTS ================= */

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};


const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const course = location.state?.course as Courses;

  const { data } = useGetCourseDetails({
    courseId: id!,
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <CourseNewHeader course={course} />

      <div className="container max-w-7xl mx-auto px-4 pb-20">
        <div className="flex flex-col-reverse sm:felx-col lg:flex-row gap-8">
          <main className="lg:w-2/3 space-y-12">
          {data?.data?.length === 0 && (
  <div className="flex flex-col items-center justify-center text-center py-14 px-6 bg-white border border-dashed border-gray-300 rounded-2xl shadow-sm">
    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-50 mb-4">
      <BookOpen className="w-7 h-7 text-blue-600" />
    </div>

    <h3 className="text-lg font-semibold text-gray-800 mb-1">
      Course details are being updated
    </h3>

    <p className="text-sm text-gray-600 max-w-md leading-relaxed">
      The detailed syllabus, learning outcomes, and course structure for this
      program are currently under preparation. Our academic team is updating
      the content to ensure accuracy and clarity.
    </p>

    <div className="mt-5 flex flex-wrap gap-3 justify-center">
      <span className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
        Syllabus Coming Soon
      </span>
      <span className="px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full">
        Faculty Verified
      </span>
      <span className="px-3 py-1.5 text-xs font-medium bg-amber-50 text-amber-700 rounded-full">
        Updated Regularly
      </span>
    </div>

    <p className="text-xs text-gray-500 mt-6">
      Please check back later or contact the admissions team for more
      information.
    </p>
  </div>
)}

            {data?.data
              ?.filter((block) => block.type === BlockType.HEADING)
              .sort((a, b) => a.order - b.order)
              .map((heading) => (
                <motion.section
                  key={heading.id}
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 sm:p-6"
                >
                  <motion.h2
                    variants={fadeItem}
                    className="text-lg font-semibold text-blue-600 mb-4"
                  >
                    {heading.title}
                  </motion.h2>

                  <CourseDetailRenderer blocks={heading.children} />
                </motion.section>
              ))}
          </main>

          <aside className="lg:w-1/3">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md border border-gray-200 sticky top-6 overflow-hidden"
            >
              <img
                src={IMAGE_URL + course.image}
                alt="Course Preview"
                className="w-full h-48 object-cover"
              />

              <motion.div className="p-4 space-y-4" variants={fadeItem}>
                <h2 className="text-sm font-semibold text-gray-900">
                  {course.prefix} in {course.title}
                </h2>

                <div className="space-y-3 text-left">
                  {[
                    {
                      icon: CalendarDays,
                      label: "Duration",
                      value: `${course.duration} (${course.semester} semester)`,
                    },
                    { icon: Languages, label: "TT Language", value: "English" },
                    {
                      icon: BookOpen,
                      label: "Credits",
                      value: `${course.credit} Credit Hours`,
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={fadeItem}
                      className="flex items-center gap-2"
                    >
                      <item.icon className="w-4 h-4 text-blue-600" />
                      <p className="text-xs text-gray-600">
                        <span className="font-medium text-gray-800">
                          {item.label}:
                        </span>{" "}
                        {item.value}
                      </p>
                    </motion.div>
                  ))}

                  <motion.div variants={fadeItem} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <p className="text-xs text-gray-600">
                      <span className="font-medium text-gray-800">
                        Assessments:
                      </span>{" "}
                      Yes
                    </p>
                  </motion.div>

                  <motion.div variants={fadeItem} className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-600 mt-0.5" />
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <span className="font-medium text-gray-800">
                        Degree Awarded By:
                      </span>
                      <br />
                      Asia Pacific University of Technology & Innovation (APU)
                    </p>
                  </motion.div>
                </div>

                {/* CLASS TIMING */}
                <motion.div
                  variants={fadeItem}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4"
                >
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-md">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          Class Timing
                        </p>
                        <p className="text-xs font-medium text-blue-700">
                          6:30AM – 8:30AM
                        </p>
                        <p className="text-[11px] text-gray-600">
                          Sunday – Friday
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 p-2 rounded-md">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          Tutorials
                        </p>
                        <p className="text-xs font-medium text-emerald-700">
                          8:30AM – 9:30AM
                        </p>
                        <p className="text-[11px] text-gray-600">
                          Sunday – Friday
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* SCHOLARSHIP */}
                <motion.div
                  variants={fadeItem}
                  className="mt-4 bg-linear-to-r from-indigo-600 to-blue-600 rounded-lg p-4 text-white"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">
                        Apply for Scholarship
                      </p>
                      <p className="text-xs text-indigo-100">
                        Limited seats available for eligible students
                      </p>
                    </div>

                    <button className="bg-white text-indigo-600 text-xs font-semibold px-4 py-2 rounded-md hover:bg-indigo-50 transition">
                      Apply
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;