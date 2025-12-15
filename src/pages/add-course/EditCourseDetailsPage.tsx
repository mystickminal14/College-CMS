// src/pages/EditCourseDetailsPage.tsx
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ChevronRight,  X,  } from "lucide-react";
import type { CourseDetailBlock, UpdateBlockData,  } from "../courses/model/CourseDetailModel";
import type { Courses } from "../courses/model/CourseModel";
import { buildToc } from "../courses/utils/CourseToc";
import CourseHeader from "../courses/components/CourseDetailHeader";
import useGetCourseDetails from "../courses/hooks/useGetDetails";
import { EditableBlock } from "./EditableBlock";
import useUpdateCourseBlock from "../courses/hooks/useUpdateCoruseBlock";
import DeleteBlockModal from "./DeleteBlock";

const EditCourseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course as Courses;

  const [blocks, setBlocks] = useState<CourseDetailBlock[]>([]);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeSection, setActiveSection] = useState("");

  const { data, isLoading, refetch } = useGetCourseDetails({ courseId: id! });
  const updateBlockMutation = useUpdateCourseBlock();

  useEffect(() => {
    if (data?.data) {
      setBlocks(data.data);
    }
  }, [data]);

  const tocItems = buildToc(blocks);

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + 120;
      const sections = Object.entries(sectionRefs.current)
        .filter(([, ref]) => ref)
        .sort(([, a], [, b]) => a!.offsetTop - b!.offsetTop);

      for (const [sectionId, ref] of sections) {
        if (ref && scrollPos >= ref.offsetTop && scrollPos < ref.offsetTop + ref.offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
const [selectedBlock, setSelectedBlock] =
  useState<CourseDetailBlock | null>(null);

const handleDeleteBlock = (block: CourseDetailBlock) => {
  setSelectedBlock(block);
  setIsDeleteOpen(true);
};
 
  const handleAddBlock = () => {
    if (!id) return;
    navigate(`/app/course-details/add/${id}`, { state: { course } });
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
      {course && <CourseHeader course={course} />}

      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Edit Course Details</h1>
            <div className="flex gap-3">
              <button
                onClick={handleAddBlock}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
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

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block lg:w-1/4">
              <div className="sticky top-8 bg-white rounded-xl shadow-lg p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <h3 className="text-lg font-bold mb-4 pb-3 border-b">On this page</h3>
                <nav className="space-y-2">
                  {tocItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex justify-between items-center transition ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {activeSection === item.id && <ChevronRight className="w-4 h-4" />}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            <main className="lg:w-3/4">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">Edit Course Content</h2>
                  <p className="text-gray-600">
                    Click the edit button on any block to modify its content. You can change the type, content, or delete blocks.
                  </p>
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

              <div className="lg:hidden mt-8">
                <details className="bg-white rounded-xl shadow">
                  <summary className="p-4 font-bold flex justify-between cursor-pointer">
                    On this page
                    <ChevronRight className="w-5 h-5" />
                  </summary>
                  <div className="p-4 space-y-2">
                    {tocItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </details>
              </div>
            </main>
          </div>
        </div>
      </div>
      <DeleteBlockModal
  isOpen={isDeleteOpen}
  block={selectedBlock}
  onClose={() => {
    setIsDeleteOpen(false);
    setSelectedBlock(null);
  }}
  onSuccess={() => {
    refetch();
  }}
/>

    </div>
  );
};

export default EditCourseDetailsPage;