import React from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import type { Courses } from "./model/CourseModel";
import CourseMiniCard from "./components/CourseCard";
import { IMAGE_URL } from "../../constants";

interface CoursesCardViewProps {
  courses: Courses[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (course: Courses) => void;
  onDelete: (course: Courses) => void;
  onView: (course: Courses) => void;
}

const CoursesCardView: React.FC<CoursesCardViewProps> = ({
  courses,
  isLoading,
  isError,
  onEdit,
  onDelete,
  onView,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-start gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-64 w-[280px] sm:w-[340px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 dark:text-red-400 py-8">
        Failed to load courses
      </p>
    );
  }

  if (courses.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-8">
        No courses found
      </p>
    );
  }

  return (
    <div className="flex flex-wrap justify-start gap-6">
      {courses.map((course) => (
        <div key={course.id} className="relative flex justify-start">
          <CourseMiniCard
            title={course.title}
            credits={course.credit}
            semester={course.semester}
            duration={course.duration}
            image={`${IMAGE_URL}${course.image}`}
            onView={() => onView(course)}
          />

          {/* ACTIONS – always visible */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={() => onEdit(course)}
              className="bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700"
            >
              <Edit size={18} />
            </button>

            <button
              onClick={() => onDelete(course)}
              className="bg-red-600 text-white p-2 rounded-full shadow hover:bg-red-700"
            >
              <Trash2 size={18} />
            </button>

            <button
              onClick={() => onView(course)}
              className="bg-green-600 text-white p-2 rounded-full shadow hover:bg-green-700"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesCardView;
