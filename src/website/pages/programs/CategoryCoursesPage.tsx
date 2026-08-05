import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ArrowLeft, GraduationCap, Briefcase, BookMarked } from "lucide-react";
import { fadeUp } from "../../comp/animation";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";
import useGetCatWithDetails from "../../../pages/courses/hooks/useGetCourseWithCat";
import CourseRegisterModal from "./comp/CourseRegisterModal";
import Seo from "../../../context/seo";
import { APP_URL } from "../../../constants";
import type { Course, CourseBlock } from "../../../pages/courses/model/CourseWithDetails";
import LbefSubFooter from "../home/components/LbefSubFooter";
import ApeuSubFooter from "../home/components/ApeuSubFooter";
import { useEnquiry } from "../../../context/EnquiryContext";

type PageTab = "details" | "career" | "eligibility";

// Category-specific Meritto/NoPaperForms widgets (falls back to the site-wide
// widget for any category not listed here).
const CATEGORY_WIDGET_CLASS: Record<string, string> = {
  "bsc-it": "npfWidget-8ba86168054a16adae9a43feb359f45f",
  "bsc-cs": "npfWidget-37b0a5e5264dcf9f208d052c97b65286",
};

const PAGE_TABS: { id: PageTab; label: string; icon: React.ElementType }[] = [
  { id: "details", label: "Course Details", icon: BookMarked },
  { id: "career", label: "Career Options", icon: Briefcase },
  { id: "eligibility", label: "Eligibility", icon: GraduationCap },
];

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
    <div className="p-5 space-y-3">
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-gray-200 rounded-full" />
        <div className="h-5 w-20 bg-gray-200 rounded-full" />
      </div>
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="h-px bg-gray-100 my-2" />
      <div className="grid grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-1">
            <div className="h-2.5 bg-gray-100 rounded w-12" />
            <div className="h-4 bg-gray-200 rounded w-10" />
          </div>
        ))}
      </div>
      <div className="h-px bg-gray-100 my-1" />
      <div className="space-y-1.5">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
        <div className="h-3 bg-gray-100 rounded w-4/6" />
      </div>
      <div className="flex gap-2 pt-2">
        <div className="h-10 bg-gray-100 rounded-xl flex-1" />
        <div className="h-10 bg-gray-200 rounded-xl flex-1" />
      </div>
    </div>
  </div>
);

// ─── Course card ──────────────────────────────────────────────────────────────

function CourseCard({
  course,
  activeTab,
  onRegister,
  onLearnMore,
}: {
  course: Course;
  activeTab: PageTab;
  onRegister: (name: string, slug: string) => void;
  onLearnMore: (name: string, slug: string) => void;
}) {
  const extractItems = (block: CourseBlock | undefined): string[] => {
    if (!block) return [];
    const items: string[] = [];
    for (const child of block.children) {
      if (child.title) {
        items.push(child.title);
      } else if (child.content) {
        try {
          const parsed = JSON.parse(child.content);
          if (Array.isArray(parsed)) items.push(...parsed);
          else items.push(child.content);
        } catch {
          items.push(child.content);
        }
      }
    }
    return items;
  };

  const careerItems = extractItems(course.blocks?.find(b => b.category === "CAREER_OPTIONS"));
  const eligItems = extractItems(course.blocks?.find(b => b.category === "ELIGIBLITY_CRITERIA"));

  const shiftLabel = course.shift?.name;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      {/* ── Always-visible header ── */}
      <div className="p-5 pb-4">
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-full">
            {course.degree}
          </span>
          {shiftLabel && (
            <span className="text-[11px] font-semibold bg-gray-50 text-gray-500 border border-gray-200 px-2.5 py-0.5 rounded-full">
              {shiftLabel}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-gray-900 leading-snug mb-0.5">
          {course.prefix} {course.title}
        </h3>
        {course.fullForm && (
          <p className="text-xs text-gray-400">{course.fullForm}</p>
        )}
      </div>

      <div className="h-px bg-gray-100 mx-5" />

      {/* ── Tab content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="px-5 py-4 flex-1"
        >
          {/* Tab 1 — Course Details */}
          {activeTab === "details" && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3 text-xs">
                {course.duration && (
                  <div>
                    <p className="text-gray-400 mb-0.5">Duration</p>
                    <p className="font-semibold text-gray-800">{course.duration} Yrs</p>
                  </div>
                )}
                {course.semester && (
                  <div>
                    <p className="text-gray-400 mb-0.5">Semesters</p>
                    <p className="font-semibold text-gray-800">{course.semester}</p>
                  </div>
                )}
                {course.intake && (
                  <div>
                    <p className="text-gray-400 mb-0.5">Intake</p>
                    <p className="font-semibold text-gray-800">{course.intake}</p>
                  </div>
                )}
                {course.credit && (
                  <div>
                    <p className="text-gray-400 mb-0.5">Credit Hrs</p>
                    <p className="font-semibold text-gray-800">{course.credit}</p>
                  </div>
                )}
              </div>

              {course.details && (
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                  {course.details}
                </p>
              )}
            </div>
          )}

          {/* Tab 2 — Career Options */}
          {activeTab === "career" && (
            careerItems.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {careerItems.slice(0, 8).map((item, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-xs text-gray-600 line-clamp-1">{item}</span>
                  </div>
                ))}
                {careerItems.length > 8 && (
                  <p className="col-span-2 text-xs text-gray-400 mt-0.5">
                    +{careerItems.length - 8} more
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No career options listed.</p>
            )
          )}

          {/* Tab 3 — Eligibility */}
          {activeTab === "eligibility" && (
            eligItems.length > 0 ? (
              <ul className="space-y-1.5">
                {eligItems.slice(0, 6).map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    <span className="text-xs text-gray-600">{item}</span>
                  </li>
                ))}
                {eligItems.length > 6 && (
                  <p className="text-xs text-gray-400 mt-0.5">+{eligItems.length - 6} more</p>
                )}
              </ul>
            ) : (
              <p className="text-xs text-gray-400 italic">No eligibility criteria listed.</p>
            )
          )}
        </motion.div>
      </AnimatePresence>

      <div className="h-px bg-gray-100 mx-5" />

      {/* ── Actions ── */}
      <div className="p-5 pt-4 flex gap-2">
        <button
          onClick={() => onLearnMore(`${course.prefix} ${course.title}`, course.slug)}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:border-blue-300 hover:text-blue-600 transition-colors"
        >
          Learn More
        </button>
        <button
          onClick={() => onRegister(`${course.prefix} ${course.title}`, course.slug)}
          className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold transition-all duration-150"
        >
          Register Now
        </button>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CategoryCoursesPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { open } = useEnquiry();
  const [activeTab, setActiveTab] = useState<PageTab>("details");
  const [registerCourse, setRegisterCourse] = useState<{ name: string; slug: string } | null>(null);
  const [learnMore, setLearnMore] = useState<{ name: string; slug: string } | null>(null);

  const { data, isLoading } = useGetCatWithDetails();
  const categories = data?.data ?? [];

  const category = categories.find((c) => c.slug === slug);
  const categoryWidgetClass = slug ? CATEGORY_WIDGET_CLASS[slug] : undefined;
  const courses = (category?.courses ?? []).filter(
    (c) => (c as any).status !== "DISABLED"
  );

  return (
    <>
      <Seo
        title={`${category?.name ?? "Programs"} | LBEF College`}
        description={`Explore ${category?.name ?? ""} programs at LBEF College Nepal. World-class courses designed for global careers.`}
        url={`${APP_URL}/camp/${slug}`}
      />

      <div className="min-h-screen bg-gray-50">
        <HeroTitleWithGif
          title={`Explore Our ${category?.name ?? "Programs"}`}
          highlightedText={category?.name ?? "Programs"}
          subtitle={`${courses.length}${courses.length === 4 || courses.length === 3 ? " Specialism" : " programs"} ${courses.length !== 1 ? "are" : "is"} available — register your interest today and our admissions team will reach out to you.`}
          badgeText="Academic Programs"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Back */}
          <button
            onClick={() => navigate("/courses")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Programs
          </button>

          {/* ── Page-level tab bar ── */}
          <div className="flex gap-1 bg-white rounded-2xl p-1 shadow-sm border border-gray-100 mb-6">
            {PAGE_TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* ── Grid ── */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Courses Available</h3>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">
                No courses are listed under this category yet. Check back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  activeTab={activeTab}
                  onRegister={(name, slug) =>
                    categoryWidgetClass ? open(categoryWidgetClass) : setRegisterCourse({ name, slug })
                  }
                  onLearnMore={(name, slug) =>
                    categoryWidgetClass ? open(categoryWidgetClass) : setLearnMore({ name, slug })
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {registerCourse && (
          <CourseRegisterModal
            courseName={registerCourse.name}
            onClose={() => setRegisterCourse(null)}
            onAfterRegister={() => navigate(`/${registerCourse.slug}/thank-you`)}
          />
        )}
        {learnMore && (
          <CourseRegisterModal
            courseName={learnMore.name}
            onClose={() => setLearnMore(null)}
            onAfterRegister={() => navigate(`/${learnMore.slug}`)}
          />
        )}
      </AnimatePresence>
      <LbefSubFooter />
      <ApeuSubFooter />
    </>
  );
}
