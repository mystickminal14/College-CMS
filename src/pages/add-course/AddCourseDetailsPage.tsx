// src/pages/AddCourseDetailsPage.tsx
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { CourseDetailBlock } from "../courses/model/CourseDetailModel";
import type { Courses } from "../courses/model/CourseModel";
import useAddCourseDetails from "../courses/hooks/useAddCourseDetails";
import { buildToc } from "../courses/utils/CourseToc";
import CourseHeader from "../courses/components/CourseDetailHeader";
import CourseDetailRenderer from "../courses/components/CourseDetailRender";
import BlockEditor from "./components/BlockEditor";

const AddCourseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
    const location = useLocation();
  const course = location.state?.course as Courses;

  const [blocks, setBlocks] = useState<CourseDetailBlock[]>([]);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeSection, setActiveSection] = useState("");

  const addDetailsMutation = useAddCourseDetails();
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

      for (const [id, ref] of sections) {
        if (scrollPos >= ref!.offsetTop && scrollPos < ref!.offsetTop + ref!.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSave = () => {
    if (!id) return;
    addDetailsMutation.mutate({ courseId: Number(id), blocks }, { onSuccess: () => navigate(-1) });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {course && <CourseHeader course={course} />}
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
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
                    {item.label}
                    {activeSection === item.id && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Add Course Details</h2>
              <BlockEditor blocks={blocks} onChange={setBlocks} />
              <button
                onClick={handleSave}
                disabled={addDetailsMutation.isPending}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {addDetailsMutation.isPending ? "Saving..." : "Save Course Details"}
              </button>
            </div>

            {blocks.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-xl font-bold mb-4">Preview</h3>
                <CourseDetailRenderer blocks={blocks} sectionRefs={sectionRefs} />
              </div>
            )}

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
  );
};

export default AddCourseDetailsPage;
