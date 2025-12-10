// CoursesCardView.tsx
import { FaPlus } from "react-icons/fa";
import DottedBorderWrapper from "./DottedWrapper";
import CourseMiniCard from "./MiniCard";
import type { CourseModel } from "../model/CourseModel";

interface CoursesCardViewProps {
  courses: CourseModel[];
  onEdit: (course: CourseModel) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  onView?: (course: CourseModel) => void;
}

const CoursesCardView = ({
  courses,
  onEdit,
  onDelete,
  onAddNew,
  onView
}: CoursesCardViewProps) => {
  return (
    <div className="
      grid 
      grid-cols-1 
      gap-3
      sm:gap-4
      sm:grid-cols-2 
      lg:grid-cols-3 
      place-items-center
      max-w-[95vw]
      mx-auto
      p-2
    ">
      {courses.map((course) => (
        <div key={course.id} className="w-full max-w-[400px]">
          <DottedBorderWrapper
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
        </div>
      ))}

      {/* Add New Course */}
      <div className="w-full max-w-[400px]">
        <div
          onClick={onAddNew}
          className="
            cursor-pointer 
            border-2 
            border-dashed 
            border-slate-300 
            dark:border-slate-700 
            rounded-2xl 
            p-6 
            flex 
            flex-col 
            items-center 
            justify-center 
            hover:border-blue-400 
            dark:hover:border-blue-500
            transition-all
            hover:shadow-lg
            h-full
            min-h-[424px]
            w-full
          "
        >
          <div className="
            w-16 
            h-16 
            rounded-full 
            bg-blue-600 
            dark:bg-blue-700
            text-white 
            flex 
            items-center 
            justify-center 
            mb-4
            hover:scale-110
            transition-transform
          ">
            <FaPlus className="text-2xl" />
          </div>
          <p className="
            text-slate-700 
            dark:text-slate-300 
            font-semibold
            text-lg
            text-center
          ">
            Add New Course
          </p>
          <p className="
            text-slate-500 
            dark:text-slate-400
            text-sm
            text-center
            mt-2
          ">
            Click to create a new course
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursesCardView;