// CourseDetails.tsx
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import type { Courses } from "./model/CourseModel";
import CourseHeader from "./components/CourseDetailHeader";
import useGetCourseDetails from "./hooks/useGetDetails";
import { buildToc } from "./utils/CourseToc";
import CourseDetailRenderer from "./components/CourseDetailRender";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const course = location.state?.course as Courses;

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeSection, setActiveSection] = useState("");

  const { data, isLoading } = useGetCourseDetails({
    courseId: id!,
  });

  const blocks = data?.data ?? [];
  const tocItems = buildToc(blocks);

  
  useEffect(() => {
    if (!blocks.length) return;

    const onScroll = () => {
      const scrollPos = window.scrollY + 100;

      const sections = Object.entries(sectionRefs.current)
        .filter(([, ref]) => ref)
        .sort(([, a], [, b]) => a!.offsetTop - b!.offsetTop);

      let current = sections[0]?.[0] ?? "";

      for (const [id, ref] of sections) {
        if (
          scrollPos >= ref!.offsetTop &&
          scrollPos < ref!.offsetTop + ref!.offsetHeight
        ) {
          current = id;
          break;
        }
      }

      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [blocks, activeSection]);

  const scrollToSection = (id: string) => {
    const section = sectionRefs.current[id];
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header always visible */}
      <CourseHeader course={course} />

      {/* ===============================
          LOADING → SKELETON
      =============================== */}
      {isLoading && (
        <div className="max-w-7xl mx-auto flex">
          {/* TOC Skeleton */}
          <aside className="hidden lg:block w-1/4 sticky top-0 h-screen">
            <div className="bg-white border-r h-full px-8 py-8 space-y-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </aside>

          {/* Content Skeleton */}
          <main className="flex-1 bg-white px-12 py-8 space-y-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </main>
        </div>
      )}

     
      {!isLoading && blocks.length > 0 && (
        <div className="max-w-7xl mx-auto flex">
          
          <aside className="hidden lg:block w-1/4 sticky top-0 h-screen">
            <div className="bg-white border-r border-gray-200 h-full overflow-y-auto py-8">
              <div className="px-8">
                <h3 className="text-lg font-bold mb-6">
                  On this page
                </h3>

                <nav className="space-y-1">
                  {tocItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left py-3 px-2 rounded-lg
                        flex justify-between items-center
                        ${
                          activeSection === item.id
                            ? "bg-[#1a7cd3] text-white font-semibold"
                            : "text-gray-600 hover:bg-gray-100"
                        }
                        ${item.level === 2 ? "pl-6" : ""}
                      `}
                    >
                      <span className="truncate">{item.label}</span>
                      {activeSection === item.id && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          <main className="flex-1 bg-white min-h-screen">
            <div className="py-8 px-4 md:px-8 lg:px-12">
              <CourseDetailRenderer
                blocks={blocks}
                sectionRefs={sectionRefs}
              />
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
