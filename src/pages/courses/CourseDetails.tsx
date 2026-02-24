import { useLocation, useParams } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
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
import { useEnquiry } from "../../context/EnquiryContext";
import LbefSubFooter from "../../website/pages/home/components/LbefSubFooter";
import Seo from "../../context/seo";
import { parseDate } from "../../utils/ParseDate";
import { FaMoneyBill } from "react-icons/fa";
import useGetCourseDetails from "./hooks/useGetDetails";

/* ------------------ TYPE GUARD ------------------ */
const isCourseDetailBlock = (
  block: CourseDetailBlock | null | undefined
): block is CourseDetailBlock => block !== null && block !== undefined;

/* ------------------ HELPER FUNCTION FOR ID ------------------ */
const generateId = (title?: string | null) =>
  title
    ?.toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");

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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const mainSectionContainerVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95, rotateX: -5 },
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
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

/* ------------------ COMPONENT ------------------ */
const CourseDetails = () => {

  const location = useLocation();
  const { open } = useEnquiry();

  const course = location?.state?.course as Courses;
  const id = course?.id ?? "1";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCourseDetails({
    courseId: String(id!),
    limit: 4,
  });
  // console.log("Course Detail Data:", data);

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
        if (entry.isIntersecting) {
          fetchNextPage();
        }
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
        description={`Study ${course?.prefix} ${course?.title} at LBEF College Nepal. Duration: ${course?.duration} years. Learn industry-focused skills with expert faculty.`}
      />

      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        <CourseNewHeader course={course} />
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-indigo-500/5 to-blue-500/5 rounded-2xl blur-xl"></div>

          <div className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-xl p-5 sm:p-6 shadow-lg sticky top-6 z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Course Structure", target: "programme-outline", icon: Layers },
                { title: "Career Options", target: "career-options", icon: Briefcase },
                { title: "Fee Structure", target: "fee-structure", icon: FileText },
                { title: "Eligibility Requirements", target: "entry-requirements", icon: GraduationCap },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeItem}
                  initial="hidden"
                  whileInView="visible"
                  onClick={() => {
                    const element = document.getElementById(item.target);
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                  className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>

                  <h3 className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-0 mt-26 pb-20">
          <div className="flex flex-col-reverse sm:flex-col lg:flex-row gap-8">
            <main className="lg:w-2/3 space-y-8">

              {contentBlocks.length === 0 && (
                <motion.section
                  variants={mainSectionContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-linear-to-br from-white to-blue-50/30 rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                </motion.section>
              )}

              {/* ---------- CONTENT BLOCKS ---------- */}
              {contentBlocks.map((block, index) => {
                const Icon = headingIcons[index % headingIcons.length];

                return (
                  <motion.section
                    key={block.id}
                    id={generateId(block.title)}
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${block.type === BlockType.HEADING ? "shadow-md" : "shadow-sm"
                      }`}
                  >
                    <motion.div
                      className={`p-4 sm:p-6 border-b border-gray-100 ${block.type === BlockType.HEADING
                        ? "bg-linear-to-r from-blue-50/50 to-indigo-50/30"
                        : "bg-linear-to-r from-gray-50/50 to-white"
                        } relative overflow-hidden`}
                    >
                      <motion.div
                        className={`absolute top-0 left-0 w-1 h-full ${block.type === BlockType.HEADING
                          ? "bg-linear-to-b from-blue-500 to-indigo-500"
                          : "bg-linear-to-b from-gray-400 to-gray-500"
                          }`}
                      />

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-linear-to-br from-blue-500 to-indigo-600">
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                          {block?.title}
                        </h2>


                      </div>
                    </motion.div>

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
                className="bg-white rounded-xl shadow-md border border-gray-200 sticky top-6 overflow-hidden"
              >
                <img
                  src={IMAGE_URL + course?.image}
                  alt="Course Preview"
                  className="w-full h-48 object-cover"
                />

                <motion.div className="p-4 space-y-4" variants={fadeItem}>
                  <h2 className="text-sm font-semibold text-gray-900">
                    {course?.prefix} in {course?.title}
                  </h2>

                  <div className="space-y-3 text-left">
                    {[
                      {
                        icon: CalendarDays,
                        label: "Duration",
                        value: `${course?.duration} years (${course?.semester} semester)`,
                      },
                      { icon: Languages, label: "Language", value: "English" },
                      {
                        icon: BookOpen,
                        label: "Credits",
                        value: `${course?.credit} Credit Hours`,
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
                        onClick={() => open()}
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
