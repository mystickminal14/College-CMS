import {  useLocation } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Courses } from "./model/CourseModel";
import CourseNewHeader from "./components/CourseNewHeader";
import { BlockType, type CourseDetailBlock } from "./model/CourseDetailModel";
import { IMAGE_URL } from "../../constants";
import {
  Clock,
  CalendarDays,
  Languages,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Award,
  FileText,
  Users,
  Target,
  Briefcase,
  Brain,
  Layers,
  ClipboardList,
  Laptop,
} from "lucide-react";

import CourseDetailRenderer from "./CourseDetailRender";
import LbefSubFooter from "../../website/pages/home/components/LbefSubFooter";
import Seo from "../../context/seo";
import useGetCourseDetails from "./hooks/useGetDetails";

/* ------------------ TYPE GUARD ------------------ */
const isCourseDetailBlock = (
  block: CourseDetailBlock | null | undefined
): block is CourseDetailBlock => block !== null && block !== undefined;

/* ------------------ HELPER FUNCTION FOR ID ------------------ */

/* ------------------ ANIMATION VARIANTS ------------------ */
const asideItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 130, damping: 14 },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, when: "beforeChildren", staggerChildren: 0.12 },
  },
};

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ------------------ COMPONENT ------------------ */
const CourseDetails = () => {
  const location = useLocation();

  const course = location?.state?.course as Courses;
  const id = course?.id ?? "1";

  /* ✅ ACTIVE CATEGORY STATE */
  const [activeCategory, setActiveCategory] =
    useState("COURSE_STRUCTURE");

  /* ✅ FETCH BASED ON CATEGORY */
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCourseDetails({
    courseId: String(id),
    category: activeCategory,
    limit: 4,
  });

  /* ------------------ FLATTEN PAGINATED DATA ------------------ */
  const contentBlocks =
    data?.pages
      ?.flatMap((page) => page.data ?? [])
      ?.filter(isCourseDetailBlock)
      ?.filter(
        (block) =>
          block.type === BlockType.HEADING ||
          block.type === BlockType.SUBHEADING
      )
      ?.sort((a, b) => a.order - b.order) || [];

  /* ------------------ INTERSECTION OBSERVER ------------------ */
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchNextPage();
      },
      { rootMargin: "200px" }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const headingIcons = [
    BookOpen,
    GraduationCap,
    CalendarDays,
    Clock,
    Languages,
    ClipboardList,
    Layers,
    Brain,
    Laptop,
    Briefcase,
    Target,
    Users,
    FileText,
    Award,
    Lightbulb,
    Sparkles,
  ];

  return (
    <>
      <Seo
        title={`${course?.prefix} ${course?.title} in Nepal | LBEF College`}
        description={`Study ${course?.prefix} ${course?.title} at LBEF College Nepal.`}
      />

      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        <CourseNewHeader course={course} />

        <div className="container max-w-7xl mx-auto px-4 sm:px-0  pb-20">
          <div className="flex flex-col-reverse sm:flex-col lg:flex-row gap-8">
            {/* ================= MAIN ================= */}
            <main className="lg:w-2/3 space-y-8">

              <div className="max-w-5xl sticky top-26 mx-auto z-10">
                {/* Glow background effect */}
                <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-indigo-500/5 to-blue-500/5 rounded-2xl blur-xl" />

                {/* Tabs container */}
                <div className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-xl p-4 sm:p-5 shadow-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { title: "Course Structure", category: "COURSE_STRUCTURE", icon: Layers },
                      { title: "Career Options", category: "CAREER_OPTIONS", icon: Briefcase },
                      { title: "Fee Structure", category: "FEE_STRUCTURE", icon: FileText },
                      { title: "Eligibility Requirements", category: "ELIGIBLITY_CRITERIA", icon: GraduationCap },
                    ].map((item, index) => {
                      const isActive = activeCategory === item.category;

                      return (
                        <motion.div
                          key={index}
                          variants={fadeItem}
                          initial="hidden"
                          whileInView="visible"
                          onClick={() => setActiveCategory(item.category)}
                          className={`
            flex flex-col items-center text-center p-3 rounded-xl cursor-pointer
            transition-all duration-200 ease-in-out
            ${isActive
                              ? "bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 scale-[1.02]"
                              : "bg-white/80 text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 shadow-sm hover:shadow-md"
                            }
          `}
                        >
                          <div
                            className={`
              w-9 h-9 rounded-full flex items-center justify-center mb-2 transition-colors
              ${isActive ? "bg-white/20" : "bg-blue-100"}
            `}
                          >
                            <item.icon
                              className={`w-5 h-5 ${isActive ? "text-white" : "text-blue-600"}`}
                            />
                          </div>
                          <h3 className="text-xs font-semibold leading-tight">{item.title}</h3>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* ---------- CONTENT BLOCKS ---------- */}
              {contentBlocks.map((block, index) => {
                const Icon = headingIcons[index % headingIcons.length];

                return (
                  <motion.section
                    key={block.id}
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md"
                  >
                    <div className="p-4 sm:p-6 border-b border-gray-100 bg-linear-to-r from-blue-50/50 to-indigo-50/30">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br from-blue-500 to-indigo-600">
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                          {block?.title}
                        </h2>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <CourseDetailRenderer blocks={block.children} />
                    </div>
                  </motion.section>
                );
              })}

              <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
                {isFetchingNextPage && (
                  <p className="text-sm text-gray-500 animate-pulse">
                    Loading more course details...
                  </p>
                )}
              </div>
            </main>

            <aside className="lg:w-1/3">
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md border border-gray-200 sticky top-14 overflow-hidden"
              >
                <img src={IMAGE_URL + course.image} alt="Course Preview" className="w-full h-48 object-cover" />

                <motion.div className="p-4 space-y-4" variants={fadeItem}>
                  <h2 className="text-sm font-semibold text-gray-900">{course.prefix} in {course.title}</h2>

                  <div className="space-y-3 text-left">
                    {[
                      { icon: CalendarDays, label: "Duration", value: `${course.duration} (${course.semester} semester)` },
                      { icon: Languages, label: "Language", value: "English" },
                      { icon: BookOpen, label: "Credits", value: `${course.credit} Credit Hours` },
                    ].map((item, i) => (
                      <motion.div key={i} variants={fadeItem} className="flex items-center gap-2">
                        <item.icon className="w-4 h-4 text-blue-600" />
                        <p className="text-xs text-gray-600">
                          <span className="font-medium text-gray-800">{item.label}:</span> {item.value}
                        </p>
                      </motion.div>
                    ))}

                    <motion.div variants={fadeItem} className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-blue-600 mt-0.5" />
                      <p className="text-xs text-gray-600 leading-relaxed">
                        <span className="font-medium text-gray-800">Degree Awarded By:</span>
                        <br />
                        Asia Pacific University of Technology & Innovation (APU)
                      </p>
                    </motion.div>
                  </div>

                  {/* CLASS TIMING */}
                  <motion.div variants={fadeItem} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-md"><Clock className="w-4 h-4 text-blue-600" /></div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800">Class Timing</p>
                          <p className="text-xs font-medium text-blue-700">6:30AM – 8:30AM</p>
                          <p className="text-[11px] text-gray-600">Sunday – Friday</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-100 p-2 rounded-md"><BookOpen className="w-4 h-4 text-emerald-600" /></div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800">Tutorials</p>
                          <p className="text-xs font-medium text-emerald-700">8:30AM – 9:30AM</p>
                          <p className="text-[11px] text-gray-600">Sunday – Friday</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* SCHOLARSHIP */}
                  <motion.div
                    variants={asideItemVariants}
                    className="mt-4 bg-linear-to-r from-indigo-600 to-blue-600 rounded-lg p-4 text-white relative overflow-hidden"
                    whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 250 } }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent"
                      animate={{ x: ["0%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <Sparkles className="w-4 h-4" />
                        <p className="text-sm font-semibold">Apply for Scholarship</p>
                      </div>
                      <p className="text-xs text-indigo-100 mb-3">Limited seats available for eligible students</p>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-indigo-600 text-xs font-semibold px-4 py-2 rounded-md hover:bg-indigo-50 transition w-full flex items-center justify-center gap-2"
                        onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSd4a49-3lWEfEeQERhJrQLiqX2YBIbCMTuocah0MyZ2jsvxqg/viewform")}
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

        <LbefSubFooter />
      </div>
    </>
  );
};

export default CourseDetails;