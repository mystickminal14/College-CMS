// src/pages/EditCourseDetailsPage.tsx
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { X, ArrowRight, BookOpen, CalendarDays, Clock, GraduationCap, Languages, Sparkles } from "lucide-react";
import type { CourseDetailBlock, UpdateBlockData } from "../courses/model/CourseDetailModel";
import type { Courses } from "../courses/model/CourseModel";
import useGetCourseDetails from "../courses/hooks/useGetDetails";
import { EditableBlock } from "./EditableBlock";
import useUpdateCourseBlock from "../courses/hooks/useUpdateCoruseBlock";
import DeleteBlockModal from "./DeleteBlock";
import { IMAGE_URL } from "../../constants";
import { motion, type Variants } from "framer-motion";

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

const EditCourseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course as Courses;

  const [blocks, setBlocks] = useState<CourseDetailBlock[]>([]);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const { data, isLoading, refetch } = useGetCourseDetails({ courseId: id! });
  const updateBlockMutation = useUpdateCourseBlock();

  useEffect(() => {
    if (data?.data) setBlocks(data.data);
  }, [data]);

  const handleUpdateBlock = (updatedBlock: UpdateBlockData) => {
    if (!updatedBlock.id) return;

    updateBlockMutation.mutate(
      {
        id: updatedBlock.id,
        type: updatedBlock.type,
        title: updatedBlock.title,
        content: updatedBlock.content,
        order: updatedBlock.order,
      },
      { onSuccess: () => refetch() }
    );
  };

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<CourseDetailBlock | null>(null);

  const handleDeleteBlock = (block: CourseDetailBlock) => {
    setSelectedBlock(block);
    setIsDeleteOpen(true);
  };

  const handleAddBlock = () => {
    if (!id) return;
    navigate(`/app/course-details/key/add/${id}`, { state: { course } });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading course details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold mb-2">Edit Course Content</h2>
                <div className="flex gap-3">
                  <button
                    onClick={handleAddBlock}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    + Add New Block
                  </button>
                  <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>

              {blocks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No content blocks yet.</p>
                  <button
                    onClick={handleAddBlock}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Your First Block
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {blocks.map((block) => (
                    <EditableBlock
                      key={block.id}
                      block={block}
                      onDelete={handleDeleteBlock}
                      onUpdate={handleUpdateBlock}
                      sectionRefs={sectionRefs}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>

          {/* Sidebar / Aside */}
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

      <DeleteBlockModal
        isOpen={isDeleteOpen}
        block={selectedBlock}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedBlock(null);
        }}
        onSuccess={() => refetch()}
      />
    </div>
  );
};

export default EditCourseDetailsPage;
