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
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  Zap,
} from "lucide-react";
import CourseDetailRenderer from "./CourseDetailRender";

/* ================= ANIMATION VARIANTS ================= */
const asideItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 14,
    },
  },
};

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
const mainSectionContainerVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 60,
    scale: 0.95,
    rotateX: -5,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      mass: 0.8,
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  hover: {
    y: -8,
    scale: 1.01,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
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
              <motion.section
                variants={mainSectionContainerVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-linear-to-br from-white to-blue-50/30 rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <div className="p-8 text-center relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 to-indigo-500"
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center"
                  >
                    <BookOpen className="w-10 h-10 text-blue-600" />
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-bold text-gray-900 mb-3"
                  >
                    Course details are being updated
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 max-w-md mx-auto leading-relaxed mb-6"
                  >
                    The detailed syllabus, learning outcomes, and course structure for this
                    program are currently under preparation. Our academic team is updating
                    the content to ensure accuracy and clarity.
                  </motion.p>
                  
                  <motion.div
                    className="flex flex-wrap gap-3 justify-center"
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                  >
                    {[
                      { text: "Syllabus Coming Soon", color: "bg-blue-50 text-blue-700" },
                      { text: "Faculty Verified", color: "bg-emerald-50 text-emerald-700" },
                      { text: "Updated Regularly", color: "bg-amber-50 text-amber-700" },
                    ].map((tag, i) => (
                      <motion.span
                        key={i}
                        variants={fadeItem}
                        whileHover={{ y: -3, scale: 1.05 }}
                        className={`px-4 py-2 text-sm font-medium rounded-full ${tag.color} flex items-center gap-2`}
                      >
                        <CheckCircle className="w-3 h-3" />
                        {tag.text}
                      </motion.span>
                    ))}
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-sm text-gray-500 mt-8 flex items-center justify-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    Please check back later or contact the admissions team for more information.
                  </motion.p>
                </div>
              </motion.section>
            )}

            {data?.data
              ?.filter((block) => block.type === BlockType.HEADING)
              .sort((a, b) => a.order - b.order)
              .map((heading,index) => (
                <motion.section
                  key={heading.id}
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 sm:p-6"
                >
                    <motion.div 
                    className="p-6 border-b border-gray-100 bg-linear-to-r from-gray-50/50 to-white relative overflow-hidden"
                    animate={
                       `linear-linear(to right, #f8fafc, #f1f5f9)`
                    }
                  >
                    <motion.div 
                      className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-blue-500 to-indigo-500"
                      animate={{ 
                        scaleY:1 ,
                        opacity:1  
                      }}
                    />
                    
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="relative"
                        animate={
                         ` [0, 10, -10, 0] `
                        }
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-14 h-14 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                          <span className="text-white text-lg font-bold">{index + 1}</span>
                        </div>
                        <motion.div 
                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center"
                    animate={
                         ` [1, 1.2, 1] `
                        }
                         
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Zap className="w-3 h-3 text-white" />
                        </motion.div>
                      </motion.div>
                      
                      <div className="flex-1">
                        <motion.h2 
                          className="text-xl font-bold text-gray-900 mb-1"
                          animate=
                             "#1e40af"
                        >
                          {heading.title}
                        </motion.h2>
                        <div className="flex items-center gap-4">
                          <motion.span 
                            className="text-xs font-medium text-gray-500 flex items-center gap-1"
                            whileHover={{ color: "#3b82f6" }}
                          >
                            <BookOpen className="w-3 h-3" />
                            Detailed Content
                          </motion.span>
                          <motion.span 
                            className="text-xs font-medium text-gray-500 flex items-center gap-1"
                            whileHover={{ color: "#10b981" }}
                          >
                            <Layers className="w-3 h-3" />
                            {heading.children?.length || 0} modules
                          </motion.span>
                        </div>
                      </div>
                      
                      <motion.div
                        animate='45'
                        className="text-gray-300 group-hover:text-blue-400"
                      >
                        <ChevronRight  className="w-6 h-6" />
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* Section Content */}
                  <motion.div 
                    className="p-6"
                    initial={false}
                  animate="#f8fafc"
                  >
                    <CourseDetailRenderer blocks={heading.children} />
                  </motion.div>
                  
                

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
                  variants={asideItemVariants}
                  custom={7}
                  className="mt-4 bg-linear-to-r from-indigo-600 to-blue-600 rounded-lg p-4 text-white relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 250 }
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent"
                    animate={{ x: ["0%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="w-4 h-4" />
                      <p className="text-sm font-semibold">
                        Apply for Scholarship
                      </p>
                    </div>
                    <p className="text-xs text-indigo-100 mb-3">
                      Limited seats available for eligible students
                    </p>
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-indigo-600 text-xs font-semibold px-4 py-2 rounded-md hover:bg-indigo-50 transition w-full flex items-center justify-center gap-2"
                    >
                      Apply Now
                      <ArrowRight className="w-3 h-3" />
                    </motion.button>
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