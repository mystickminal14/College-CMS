// src/pages/EditCourseDetailsPage.tsx
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ChevronRight, Trash2, X, Edit2 } from "lucide-react";
import type { CourseDetailBlock, UpdateBlockData } from "../courses/model/CourseDetailModel";
import type { Courses } from "../courses/model/CourseModel";
import useDeleteCourseBlock from "../courses/hooks/useDeleteCourseBlock";
import { buildToc } from "../courses/utils/CourseToc";
import CourseHeader from "../courses/components/CourseDetailHeader";
import useGetCourseDetails from "../courses/hooks/useGetDetails";
import useUpdateCourseBlock from "../courses/hooks/useUpdateCoruseBlock";
import { ErrorBoundary } from 'react-error-boundary';
import EditBlockModal from "./EdiBlockModal";

// Error fallback component
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
    <h3 className="text-lg font-semibold text-red-700">Something went wrong</h3>
    <p className="text-red-600">{error.message}</p>
    <button
      onClick={() => window.location.reload()}
      className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Reload Page
    </button>
  </div>
);

const EditCourseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course as Courses;

  const [blocks, setBlocks] = useState<CourseDetailBlock[]>([]);
  const [editingBlock, setEditingBlock] = useState<UpdateBlockData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeSection, setActiveSection] = useState("");

  const { data, isLoading, refetch } = useGetCourseDetails({ courseId: id! });
  const updateBlockMutation = useUpdateCourseBlock();
  const deleteBlockMutation = useDeleteCourseBlock();

  useEffect(() => {
    if (data?.data) {
      setBlocks(data.data);
    }
  }, [data]);

  // Debug logs
  useEffect(() => {
    console.log("Modal state:", isModalOpen);
    console.log("Editing block:", editingBlock);
  }, [isModalOpen, editingBlock]);

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

  const handleEditBlock = (block: CourseDetailBlock) => {
    console.log("Editing block:", block);
    
    // Convert CourseDetailBlock to UpdateBlockData
    const blockData: UpdateBlockData = {
      id: block.id,
      type: block.type,
      order: block.order,
      children: block.children || [],
    };

    // Add type-specific properties
    if (block.type === "HEADING" || block.type === "SUBHEADING") {
      blockData.title = block.title;
    } else if (block.type === "PARAGRAPH") {
      blockData.content = block.content as string;
    } else if (block.type === "LIST") {
      blockData.content = block.content as string[];
    }

    console.log("Converted block data:", blockData);
    setEditingBlock(blockData);
    setIsModalOpen(true);
  };

  const handleSaveBlock = (updatedBlock: UpdateBlockData) => {
    if (!id || !updatedBlock.id) return;
    
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
          setIsModalOpen(false);
          setEditingBlock(null);
        },
      }
    );
  };

  const handleDeleteBlock = (block: CourseDetailBlock) => {
    if (window.confirm("Are you sure you want to delete this block?")) {
      deleteBlockMutation.mutate(
        { id: block.id },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
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
            {/* Desktop TOC */}
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

            {/* Main Content */}
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
                        onEdit={handleEditBlock}
                        onDelete={handleDeleteBlock}
                        sectionRefs={sectionRefs}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile TOC */}
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

      {/* Edit Block Modal with Error Boundary */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <EditBlockModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingBlock(null);
          }}
          block={editingBlock}
          onSave={handleSaveBlock}
          isSaving={updateBlockMutation.isPending}
        />
      </ErrorBoundary>
    </div>
  );
};

// Editable Block Component
interface EditableBlockProps {
  block: CourseDetailBlock;
  onEdit: (block: CourseDetailBlock) => void;
  onDelete: (block: CourseDetailBlock) => void;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

const EditableBlock = ({ block, onEdit, onDelete, sectionRefs }: EditableBlockProps) => {
  const sectionId = block.type === "HEADING" || block.type === "SUBHEADING" 
    ? `${block.type.toLowerCase()}-${block.id}`
    : `block-${block.id}`;

  const renderContent = () => {
    switch (block.type) {
      case "HEADING":
      case "SUBHEADING":
        return (
          <div className="flex items-center gap-2">
            <h3 className={`${block.type === "HEADING" ? "text-2xl" : "text-xl"} font-bold`}>
              {block.title}
            </h3>
            {block.children && block.children.length > 0 && (
              <span className="text-sm text-gray-500">
                ({block.children.length} {block.children.length === 1 ? 'child' : 'children'})
              </span>
            )}
          </div>
        );
      case "PARAGRAPH":
        return (
          <p className="text-gray-700 whitespace-pre-wrap">
            {block.content as string}
          </p>
        );
      case "LIST":
        return (
          <ul className="list-disc pl-6 space-y-1">
            {(block.content as string[]).map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={(el) => {
        sectionRefs.current[sectionId] = el;
      }}
      className="group relative border rounded-xl p-6 hover:border-blue-300 transition-all duration-200 bg-white"
    >
      {/* Block Actions */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(block)}
          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          title="Edit block"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(block)}
          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          title="Delete block"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Block Type Badge */}
      <div className="mb-3">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
          {block.type}
        </span>
      </div>

      {/* Block Content */}
      <div className="pr-12">{renderContent()}</div>

      {/* Render Children Recursively */}
      {block.children && block.children.length > 0 && (
        <div className="ml-6 mt-6 border-l border-gray-200 pl-6 space-y-6">
          {block.children.map((child) => (
            <EditableBlock
              key={child.id}
              block={child}
              onEdit={onEdit}
              onDelete={onDelete}
              sectionRefs={sectionRefs}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EditCourseDetailsPage;