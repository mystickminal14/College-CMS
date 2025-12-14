import React from "react";
import {
  BookOpen,
  Layers,
  Award,
  Clock,
  Calendar,
  SunMoon,
} from "lucide-react";
import InputField from "../../../utils/InputField";
import type { EShift } from "../model/CourseModel";

interface CoursesBasicFormProps {
  formData: {
    title: string;
    prefix: string;
    degree: string;
    credit: string;
    duration: string;
    category: string;
    semester: string;
    shift: EShift;
  };
  onChange: (field: string, value: string) => void;
  isSubmitting?: boolean;
}

const Shifts: EShift[] = ["MORNING", "BOTH", "EVENING"];

const CoursesBasicForm: React.FC<CoursesBasicFormProps> = ({
  formData,
  onChange,
  isSubmitting = false,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          icon={<BookOpen className="w-5 h-5" />}
          label="Degree Prefix"
          value={formData.prefix}
          field="prefix"
          onChange={onChange}
          placeholder="BSc (Hons)"
          required
          isSubmitting={isSubmitting}
        />
        {/* Course Name */}
        <InputField
          icon={<BookOpen className="w-5 h-5" />}
          label="Course Name"
          value={formData.title}
          field="title"
          onChange={onChange}
          placeholder="Information Technology"
          required
          isSubmitting={isSubmitting}
        />
        <InputField
          icon={<BookOpen className="w-5 h-5" />}
          label="Degree "
          value={formData.degree}
          field="degree"
          onChange={onChange}
          placeholder="Bachlelor / Master"
          required
          isSubmitting={isSubmitting}
        />

        {/* Category */}
        <InputField
          icon={<Layers className="w-5 h-5" />}
          label="Category"
          value={formData.category}
          field="category"
          onChange={onChange}
          placeholder="Artificial Intelligence"
          required
          isSubmitting={isSubmitting}
        />

        {/* Credit */}
        <InputField
          icon={<Award className="w-5 h-5" />}
          label="Credit"
          value={formData.credit}
          field="credit"
          onChange={onChange}
          placeholder="120"
          required
          isSubmitting={isSubmitting}
        />

        {/* Duration */}
        <InputField
          icon={<Clock className="w-5 h-5" />}
          label="Duration"
          value={formData.duration}
          field="duration"
          onChange={onChange}
          placeholder="4 Years"
          required
          isSubmitting={isSubmitting}
        />

        {/* Total Semester */}
        <InputField
          icon={<Calendar className="w-5 h-5" />}
          label="Total Semesters"
          value={formData.semester}
          field="semester"
          onChange={onChange}
          placeholder="8"
          required
          isSubmitting={isSubmitting}
        />

        {/* Shift */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-sm flex items-center gap-2 text-gray-700">
            <SunMoon className="w-4 h-4" />
            Shift
          </label>

          <select
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            value={formData.shift}
            onChange={(e) => onChange("shift", e.target.value)}
            disabled={isSubmitting}
          >
            <option value="">Select Shift</option>
            {Shifts.map((shift) => (
              <option key={shift} value={shift}>
                {shift.charAt(0) + shift.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
};

export default CoursesBasicForm;
