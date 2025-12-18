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
  const tocRef = useRef<HTMLDivElement | null>(null);

  const [activeSection, setActiveSection] = useState("");

  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  const { data, isLoading } = useGetCourseDetails({
    courseId: id!,
  });

  const blocks = data?.data ?? [];
  const tocItems = buildToc(blocks);

  /* ---------------- Initial active section ---------------- */
  useEffect(() => {
    if (tocItems.length && !activeSection) {
      setActiveSection(tocItems[0].id);
    }
  }, [tocItems, activeSection]);

  /* ---------------- IntersectionObserver ---------------- */
  useEffect(() => {
    if (!tocItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;

        const visible = entries
          .filter(e => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top -
              b.boundingClientRect.top
          );

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0,
      }
    );

    Object.values(sectionRefs.current).forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  /* ---------------- Scroll to section ---------------- */
  const scrollToSection = (id: string) => {
    const section = sectionRefs.current[id];
    if (!section) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    isProgrammaticScroll.current = true;
    setActiveSection(id);

    window.scrollTo({
      top: section.offsetTop - 100,
      behavior: "smooth",
    });

    scrollTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 700);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <CourseHeader course={course} />

      {!isLoading && blocks.length > 0 && (
        <div className="max-full mx-auto px-4 sm:px-6 lg:px-30 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* TOC */}
            <aside className="lg:w-1/4">
              <div
                ref={tocRef}
                className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-6 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Outline</h3>
                    <span className="ml-auto text-sm bg-gray-100 px-2 py-1 rounded">
                      {tocItems.length} sections
                    </span>
                  </div>
                </div>

                <nav className="p-2 max-h-[calc(100vh-180px)] overflow-y-auto">
                  {tocItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left py-3 px-4 rounded-lg flex items-start gap-3
                        ${
                          activeSection === item.id
                            ? "bg-blue-50 border border-blue-100"
                            : "hover:bg-gray-50"
                        }`}
                    >
                      <div className="mt-1">
                        <div
                          className={`rounded-full ${
                            item.level === 1 ? "w-2 h-2" : "w-1.5 h-1.5 ml-1"
                          } ${
                            activeSection === item.id
                              ? "bg-blue-600"
                              : "bg-gray-300"
                          }`}
                        />
                      </div>

                      <span
                        className={`truncate font-medium ${
                          activeSection === item.id
                            ? "text-blue-700"
                            : "text-gray-700"
                        }`}
                      >
                        {item.label}
                      </span>

                      {activeSection === item.id && (
                        <ChevronRight className="ml-auto w-4 h-4 text-blue-600" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <main className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
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
