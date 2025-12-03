import { FaPlus } from "react-icons/fa";
import DottedBorderWrapper from "./DottedWrapper";
import CourseMiniCard from "./MiniCard";
import type { CourseModel } from "../model/CourseModel";
interface CoursesCardViewProps {
  courses: CourseModel[];
  onEdit: (course: CourseModel) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  onView?: (course: CourseModel) => void;  // optional
}
const CoursesCardView = ({
  courses,
  onEdit,
  onDelete,
  onAddNew,
  onView
}: CoursesCardViewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {courses.map((course) => (
        <DottedBorderWrapper
          key={course.id}
          onEdit={() => onEdit(course)}
          onView={() => onView?.(course)}
          onDelete={() => onDelete(course.id)}
        >
          <CourseMiniCard
            title={course.title}
            credits={course.credits}
            instructor={course.instructor}
            semester={course.semester}
            enrolled={course.enrolled}
            capacity={course.capacity}
            status={course.status}
            color={course.color}
          />
        </DottedBorderWrapper>
      ))}

      {/* Add New Course */}
      <div
        onClick={onAddNew}
        className="cursor-pointer border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center hover:border-blue-400 transition"
      >
        <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mb-3">
          <FaPlus className="text-xl" />
        </div>
        <p className="text-slate-700 dark:text-slate-300 font-semibold">Add New Course</p>
      </div>

    </div>
  );
};

export default CoursesCardView;
