import { useRef, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  X,
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Languages,
  Sparkles,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

import type {
  CourseDetailBlock,
  UpdateBlockData,
} from "../courses/model/CourseDetailModel";
import type { Courses } from "../courses/model/CourseModel";

import useGetCourseDetails from "../courses/hooks/useGetDetails";
import useUpdateCourseBlock from "../courses/hooks/useUpdateCoruseBlock";

import { EditableBlock } from "./EditableBlock";
import DeleteBlockModal from "./DeleteBlock";
import { IMAGE_URL } from "../../constants";

/* ------------------ ANIMATIONS ------------------ */
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
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ------------------ COMPONENT ------------------ */
const EditCourseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const course = location.state?.course as Courses;

  /* ✅ ONE ref for ALL blocks (FIX) */
  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetCourseDetails({
    courseId: id!,
    limit: 4,
  });

  const updateBlockMutation = useUpdateCourseBlock();

  /* ------------------ FLATTEN PAGINATED DATA ------------------ */
  const blocks: CourseDetailBlock[] =
    data?.pages
      ?.flatMap((page) => page.data ?? [])
      ?.sort((a, b) => a.order - b.order) || [];

  /* ------------------ LOAD MORE OBSERVER ------------------ */
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

  /* ------------------ UPDATE BLOCK ------------------ */
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

  /* ------------------ DELETE MODAL ------------------ */
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] =
    useState<CourseDetailBlock | null>(null);

  const handleDeleteBlock = (block: CourseDetailBlock) => {
    setSelectedBlock(block);
    setIsDeleteOpen(true);
  };

  /* ------------------ ADD BLOCK ------------------ */
  const handleAddBlock = () => {
    if (!id) return;
    navigate(`/app/course-details/key/add/${id}`, {
      state: { course },
    });
  };

  /* ------------------ LOADING ------------------ */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading course details...</div>
      </div>
    );
  }

  /* ------------------ RENDER ------------------ */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* MAIN */}
          <main className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Edit Course Content</h2>

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
                  <p className="text-gray-500 mb-4">
                    No content blocks yet.
                  </p>
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

                  {/* LOAD MORE */}
                  <div
                    ref={loadMoreRef}
                    className="h-10 flex justify-center items-center"
                  >
                    {isFetchingNextPage && (
                      <p className="text-sm text-gray-500 animate-pulse">
                        Loading more blocks...
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* ASIDE */}
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
                      value: `${course.duration} years (${course.semester} semester)`,
                    },
                    { icon: Languages, label: "Language", value: "English" },
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

                  <motion.div
                    variants={fadeItem}
                    className="flex items-start gap-2"
                  >
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

                <motion.div
                  variants={asideItemVariants}
                  className="mt-4 bg-linear-to-r from-indigo-600 to-blue-600 rounded-lg p-4 text-white"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <p className="text-sm font-semibold">
                      Apply for Scholarship
                    </p>
                  </div>
                  <p className="text-xs text-indigo-100 mb-3">
                    Limited seats available for eligible students
                  </p>
                  <button className="bg-white text-indigo-600 text-xs font-semibold px-4 py-2 rounded-md w-full flex items-center justify-center gap-2">
                    Apply Now <ArrowRight className="w-3 h-3" />
                  </button>
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
