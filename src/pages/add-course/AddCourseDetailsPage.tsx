// src/pages/AddCourseDetailsPage.tsx
import { useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarDays, Clock, GraduationCap, Languages, Sparkles } from "lucide-react";
import type { CourseDetailBlock, ContentCategory } from "../courses/model/CourseDetailModel";
import type { Courses } from "../courses/model/CourseModel";
import CourseDetailRenderer from "../courses/components/CourseDetailRender";
import BlockEditor from "./components/BlockEditor";
import { useQueryClient } from "@tanstack/react-query";
import { COURSE_CACHE_KEY, IMAGE_URL } from "../../constants";
import { motion, type Variants } from "framer-motion";
import useAddCourseDetails from "../courses/hooks/useAddCourseDetails";

const asideItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 130, damping: 14 } },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, when: "beforeChildren", staggerChildren: 0.12 } },
};

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Define the four categories
const categories: ContentCategory[] = [
  "COURSE_STRUCTURE",
  "CAREER_OPTIONS",
  "FEE_STRUCTURE",
  "ELIGIBLITY_CRITERIA",
];

const AddCourseDetailsPage = () => {
  const { id, key } = useParams<{ id: string; key: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course as Courses;

  // State for blocks separated per category
  const [blocksMap, setBlocksMap] = useState<Record<ContentCategory, CourseDetailBlock[]>>({
    COURSE_STRUCTURE: [],
    CAREER_OPTIONS: [],
    FEE_STRUCTURE: [],
    ELIGIBLITY_CRITERIA: [],
  });

  const [selectedCategory, setSelectedCategory] = useState<ContentCategory>("COURSE_STRUCTURE");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const addDetailsMutation = useAddCourseDetails();
  const queryClient = useQueryClient();

  const handleSave = () => {
    if (!id) return;

    const blocks = blocksMap[selectedCategory].map(block => ({
      ...block,
      category: selectedCategory, // Always pass current tab/category
    }));

    addDetailsMutation.mutate(
      { courseId: Number(id), blocks },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [COURSE_CACHE_KEY, id, "details"] });
          if (key) navigate(`/app/course-details/edit/${id}`);
          navigate(-1);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="lg:w-3/4 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Add Course Details</h2>

              {/* Category Tabs */}
              <div className="flex gap-2 mb-4">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-md font-medium text-sm ${
                      selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {cat.replaceAll("_", " ")}
                  </button>
                ))}
              </div>

              {/* Block Editor for selected category */}
              <BlockEditor
                blocks={blocksMap[selectedCategory]}
                onChange={(newBlocks) =>
                  setBlocksMap((prev) => ({ ...prev, [selectedCategory]: newBlocks }))
                }
                  category={selectedCategory}
              />

              <button
                onClick={handleSave}
                disabled={addDetailsMutation.isPending}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {addDetailsMutation.isPending ? "Saving..." : "Save Course Details"}
              </button>
            </div>

            {/* Preview */}
            {blocksMap[selectedCategory].length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-xl font-bold mb-4">Preview</h3>
                <CourseDetailRenderer
                  blocks={blocksMap[selectedCategory]}
                  sectionRefs={sectionRefs}
                />
              </div>
            )}
          </main>

           <aside className="lg:w-1/3">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md border border-gray-200 sticky top-6 overflow-hidden"
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
                        <p className="text-xs font-medium text-blue-700">6:30AM – 11:00AM</p>
                        <p className="text-[11px] text-gray-600">Sunday – Friday</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 p-2 rounded-md"><BookOpen className="w-4 h-4 text-emerald-600" /></div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">Tutorials</p>
                        <p className="text-xs font-medium text-emerald-700">11:00AM – 1:00PM</p>
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
    </div>
  );
};

export default AddCourseDetailsPage;