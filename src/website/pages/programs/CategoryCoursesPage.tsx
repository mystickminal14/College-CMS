import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ArrowLeft, GraduationCap, Briefcase } from "lucide-react";
import { fadeUp } from "../../comp/animation";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";
import useGetCatWithDetails from "../../../pages/courses/hooks/useGetCourseWithCat";
import CourseRegisterModal from "./comp/CourseRegisterModal";
import Seo from "../../../context/seo";
import { APP_URL } from "../../../constants";
import type { Course } from "../../../pages/courses/model/CourseWithDetails";

const truncate = (text: string, words: number) => {
  if (!text) return "";
  const parts = text.split(" ");
  return parts.length <= words ? text : parts.slice(0, words).join(" ") + "…";
};

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
    <div className="p-5 space-y-3">
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-gray-200 rounded-full" />
        <div className="h-5 w-20 bg-gray-200 rounded-full" />
      </div>
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="h-4 bg-gray-100 rounded w-full mt-2" />
      <div className="h-4 bg-gray-100 rounded w-5/6" />
      <div className="h-px bg-gray-100 my-3" />
      <div className="flex justify-between">
        <div className="h-3.5 bg-gray-100 rounded w-20" />
        <div className="h-3.5 bg-gray-200 rounded w-16" />
      </div>
      <div className="flex justify-between">
        <div className="h-3.5 bg-gray-100 rounded w-16" />
        <div className="h-3.5 bg-gray-200 rounded w-12" />
      </div>
      <div className="flex gap-2 mt-4">
        <div className="h-10 bg-gray-100 rounded-xl flex-1" />
        <div className="h-10 bg-gray-200 rounded-xl flex-1" />
      </div>
    </div>
  </div>
);

function CourseCard({
  course,
  onRegister,
  onView,
}: {
  course: Course;
  onRegister: (name: string) => void;
  onView: (slug: string) => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden"
    >
      <div className="p-5 flex flex-col flex-1">
        {/* Degree + shift */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-full">
            {course.degree}
          </span>
          <span className="text-[11px] font-semibold bg-gray-50 text-gray-500 border border-gray-200 px-2.5 py-0.5 rounded-full">
            {course.shift === "BOTH" ? "Morning & Evening" : course.shift === "MORNING" ? "Morning" : "Evening"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 leading-snug mb-0.5">
          {course.prefix} {course.title}
        </h3>
        {course.fullForm && (
          <p className="text-xs text-gray-400 mb-3">{course.fullForm}</p>
        )}

        {/* Description */}
        {course.details && (
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            {truncate(course.details, 20)}
          </p>
        )}

        {/* Duration / Semesters */}
        <div className="border-t border-gray-100 pt-3 mb-4 flex gap-6 text-xs">
          <div>
            <p className="text-gray-400 mb-0.5">Duration</p>
            <p className="font-semibold text-gray-800">{course.duration} Years</p>
          </div>
          <div>
            <p className="text-gray-400 mb-0.5">Semesters</p>
            <p className="font-semibold text-gray-800">{course.semester}</p>
          </div>
          {course.intake && (
            <div>
              <p className="text-gray-400 mb-0.5">Intake</p>
              <p className="font-semibold text-gray-800">{course.intake}</p>
            </div>
          )}
        </div>

        {/* Career Options */}
        {(() => {
          const careerBlock = course.blocks?.find(b => b.category === "CAREER_OPTIONS");
          const items = careerBlock?.children.map(c => c.title).filter(Boolean) ?? [];
          if (!items.length) return null;
          return (
            <div className="mb-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Career Options</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {items.slice(0, 3).join(", ")}{items.length > 3 ? " & more" : ""}
              </p>
            </div>
          );
        })()}

        {/* Eligibility */}
        {(() => {
          const eligBlock = course.blocks?.find(b => b.category === "ELIGIBLITY_CRITERIA");
          const items = eligBlock?.children.map(c => c.title).filter(Boolean) ?? [];
          if (!items.length) return null;
          return (
            <div className="mb-4">
              <div className="flex items-center gap-1.5 mb-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-green-500" />
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Eligibility</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {items[0]}
              </p>
            </div>
          );
        })()}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onView(course.slug)}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            Learn More
          </button>
          <button
            onClick={() => onRegister(`${course.prefix} ${course.title}`)}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold transition-all duration-150"
          >
            Register Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function CategoryCoursesPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [registerCourse, setRegisterCourse] = useState<string | null>(null);

  const { data, isLoading } = useGetCatWithDetails();
  const categories = data?.data ?? [];

  const catIdNum = parseInt(categoryId ?? "0");
  const category = categories.find((c) => c.id === catIdNum);
  const courses = (category?.courses ?? []).filter(
    (c) => (c as any).status !== "DISABLED"
  );

  const handleView = (slug: string) => navigate(`/${slug}`);

  return (
    <>
      <Seo
        title={`${category?.name ?? "Programs"} | LBEF College`}
        description={`Explore ${category?.name ?? ""} programs at LBEF College Nepal. World-class courses designed for global careers.`}
        url={`${APP_URL}/courses/category/${categoryId}`}
      />

      <div className="min-h-screen bg-gray-50">
        <HeroTitleWithGif
          title={`Explore Our ${category?.name ?? "Programs"}`}
          highlightedText={category?.name ?? "Programs"}
          subtitle={`${courses.length} program${courses.length !== 1 ? "s" : ""} available — register your interest today and our admissions team will reach out to you.`}
          badgeText="Academic Programs"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Back link */}
          <button
            onClick={() => navigate("/courses")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Programs
          </button>

          {/* Grid */}
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
                  onRegister={setRegisterCourse}
                  onView={handleView}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {registerCourse && (
          <CourseRegisterModal
            courseName={registerCourse}
            onClose={() => setRegisterCourse(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
