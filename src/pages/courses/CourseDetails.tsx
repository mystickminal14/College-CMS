// CourseDetails.tsx
import { ChevronRight, BookOpen } from "lucide-react";
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
  const tocRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false); // Track if we're programmatically scrolling
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading } = useGetCourseDetails({
    courseId: id!,
  });

  const blocks = data?.data ?? [];
  const tocItems = buildToc(blocks);

  // Set first item as active by default
  useEffect(() => {
    if (tocItems.length > 0 && !activeSection) {
      setActiveSection(tocItems[0].id);
    }
  }, [tocItems, activeSection]);

  useEffect(() => {
    if (!blocks.length) return;

    const onScroll = () => {
      // Don't update active section while programmatically scrolling
      if (isScrollingRef.current) return;

      const scrollPos = window.scrollY + 100; // Adjusted offset
      const sections = Object.entries(sectionRefs.current)
        .filter(([, ref]) => ref)
        .sort(([, a], [, b]) => a!.offsetTop - b!.offsetTop);

      let current = sections[0]?.[0] ?? "";

      // Find the section that's currently in view
      for (let i = 0; i < sections.length; i++) {
        const [id, ref] = sections[i];
        if (!ref) continue;

        const nextSection = sections[i + 1];
        const nextTop = nextSection?.[1]?.offsetTop || Infinity;

        if (scrollPos >= ref.offsetTop && scrollPos < nextTop) {
          current = id;
          break;
        }
      }

      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    // Use requestAnimationFrame for smoother scroll handling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blocks, activeSection]);

  const scrollToSection = (id: string) => {
    const section = sectionRefs.current[id];
    if (!section) return;

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set scrolling flag
    isScrollingRef.current = true;
    
    // Update active section immediately for better UX
    setActiveSection(id);

    // Smooth scroll with offset for header
    window.scrollTo({
      top: section.offsetTop - 100,
      behavior: "smooth"
    });

    // Reset scrolling flag after animation completes
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 500); // 500ms should cover most smooth scroll animations
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Header always visible */}
      <CourseHeader course={course} />

      {isLoading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* TOC Skeleton */}
            <aside className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      {i % 3 === 0 && (
                        <div className="ml-4 space-y-2">
                          <div className="h-3 w-4/5 bg-gray-100 rounded animate-pulse" />
                          <div className="h-3 w-3/4 bg-gray-100 rounded animate-pulse" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Content Skeleton */}
            <main className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4 mb-8 last:mb-0">
                    <div className="space-y-2">
                      <div className={`h-8 ${i % 2 === 0 ? 'w-2/3' : 'w-1/2'} bg-gray-200 rounded animate-pulse`} />
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                    </div>
                    {i % 2 === 0 && (
                      <div className="ml-6 space-y-2">
                        <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
                        <div className="h-3 w-4/5 bg-gray-100 rounded animate-pulse" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      )}

      {!isLoading && blocks.length > 0 && (
        <div className="max-full mx-auto px-4 sm:px-6 lg:px-30 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4">
              <div 
                ref={tocRef}
                className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-6 overflow-hidden transition-all duration-200"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Outline
                    </h3>
                    <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {tocItems.length} sections
                    </span>
                  </div>
                </div>

                <nav className="p-2 max-h-[calc(100vh-180px)] overflow-y-auto">
                  <div className="space-y-1">
                    {tocItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full cursor-pointer text-left py-3 px-4 rounded-lg transition-all duration-200
                          flex items-start gap-3 group
                          ${
                            activeSection === item.id
                              ? "bg-blue-50 border border-blue-100"
                              : "hover:bg-gray-50"
                          }
                        `}
                      >
                        <div className="shrink-0 mt-0.5">
                          {item.level === 1 ? (
                            <div className={`w-2 h-2 rounded-full ${
                              activeSection === item.id 
                                ? "bg-blue-600" 
                                : " group-hover:bg-gray-400"
                            }`} />
                          ) : (
                            <div className={`w-1.5 h-1.5 rounded-full ml-1 ${
                              activeSection === item.id 
                                ? "bg-blue-400" 
                                : "bg-gray-300 group-hover:bg-gray-400"
                            }`} />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <span className={`text-md font-medium block truncate ${
                            activeSection === item.id
                              ? "text-blue-700"
                              : "text-gray-700 group-hover:text-gray-900"
                          }`}>
                            {item.label}
                          </span>
                        </div>

                        {activeSection === item.id && (
                          <ChevronRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        )}
                      </button>
                    ))}
                  </div>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8">
                  <CourseDetailRenderer
                    blocks={blocks}
                    sectionRefs={sectionRefs}
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;