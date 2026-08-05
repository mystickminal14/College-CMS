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
import { FaMoneyBill } from "react-icons/fa";
import useGetCourseCategoryNameAll from "../../course-category/hooks/useGetCatName";
import useGetShiftNameAll from "../../shift/hooks/useGetShiftName";
import useGetClassTimingNameAll from "../../class-timing/hooks/useGetClassTimingName";
import { formatTimeRange } from "../../class-timing/utils/format";

interface CoursesBasicFormProps {
  formData: {
    title: string;
    prefix: string;
    degree: string;intake?:string;
  brochure?:string;
    credit: string;slug:string
    duration: string;
      categoryId: number | null;feeStructure:string;
    details: string;fullForm:string,
    semester: string;
    shiftId: number | null;
    classTimingIds: number[];
  };
onChange: (field: string, value: string | number | null | number[]) => void;  isSubmitting?: boolean;
}

const CoursesBasicForm: React.FC<CoursesBasicFormProps> = ({
  formData,
  onChange,
  isSubmitting = false,
}) => {
  const { data: categoryData, isLoading: categoryLoading } = useGetCourseCategoryNameAll();
const categories = categoryData?.data ?? [];
  const { data: shiftData, isLoading: shiftLoading } = useGetShiftNameAll();
  const shifts = shiftData?.data ?? [];
  const { data: classTimingData, isLoading: classTimingLoading } =
    useGetClassTimingNameAll();
  const classTimings = classTimingData?.data ?? [];

  const toggleClassTiming = (id: number) => {
    const current = formData.classTimingIds ?? [];
    onChange(
      "classTimingIds",
      current.includes(id) ? current.filter((v) => v !== id) : [...current, id]
    );
  };
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
          label="Full Form"
          value={formData.fullForm}
          field="fullForm"
          onChange={onChange}
          placeholder="Masters in...(optional)"
          isSubmitting={isSubmitting}
        />
          <InputField
          icon={<BookOpen className="w-5 h-5" />}
          label="Slug (Route Path)"
          value={formData.slug}
          field="slug"
          onChange={onChange}
          placeholder="bscit.."
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

       <div className="flex flex-col">
  <label className="mb-2 font-medium text-sm flex items-center gap-2 text-gray-700">
    <Layers className="w-4 h-4" />
    Category
  </label>

<select
  value={formData.categoryId ?? ""}
  onChange={(e) =>
    onChange("categoryId", e.target.value ? Number(e.target.value) : null)
  }
  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
  disabled={isSubmitting || categoryLoading}
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ))}
</select>
</div>

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
<InputField
          icon={<BookOpen className="w-5 h-5" />}
          label="Course Caption"
          value={formData.details}
          field="details"
          onChange={onChange}
          placeholder="Detailed Description about course...."
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
            value={formData.shiftId ?? ""}
            onChange={(e) =>
              onChange("shiftId", e.target.value ? Number(e.target.value) : null)
            }
            disabled={isSubmitting || shiftLoading}
          >
            <option value="">Select Shift</option>
            {shifts.map((shift) => (
              <option key={shift.id} value={shift.id}>
                {shift.name}
              </option>
            ))}
          </select>
        </div>
     </div>

      {/* Class timings — drives the timing cards on the course detail page */}
      <div className="border-t border-gray-300 pt-4">
        <label className="mb-2 font-medium text-sm flex items-center gap-2 text-gray-700">
          <Clock className="w-4 h-4" />
          Class Timings
        </label>

        {classTimingLoading ? (
          <p className="text-sm text-gray-500">Loading class timings...</p>
        ) : classTimings.length === 0 ? (
          <p className="text-sm text-gray-500">
            No class timings yet — add them under Courses → Class Timing.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {classTimings.map((timing) => {
              const checked = (formData.classTimingIds ?? []).includes(
                Number(timing.id)
              );
              const range = formatTimeRange(timing);

              return (
                <label
                  key={timing.id}
                  className={`flex items-start gap-3 border rounded-lg px-3 py-2 cursor-pointer transition ${
                    checked
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={checked}
                    disabled={isSubmitting}
                    onChange={() => toggleClassTiming(Number(timing.id))}
                  />
                  <span>
                    <span className="block text-sm font-medium text-gray-800">
                      {timing.name}
                      <span className="ml-2 text-[11px] uppercase text-gray-500">
                        {timing.kind === "LECTURE" ? "Lecture" : "Tutorial"}
                      </span>
                    </span>
                    <span className="block text-xs text-gray-600">
                      {[range, timing.days].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>
      <div className="border-t border-gray-300 pt-4 flex flex-col md:flex-row gap-6">
 <InputField
  icon={<Calendar className="w-5 h-5" />}
  label="Intake"
  value={formData.intake || ""}
  field="intake"
  onChange={onChange}
  placeholder="Select date"
  type="date" // <-- make it a date picker
  isSubmitting={isSubmitting}
/>


    <InputField
      icon={<BookOpen className="w-5 h-5" />}
      label="Brochure"
      value={formData.brochure || ""}
      field="brochure"
      onChange={onChange}
      placeholder="Upload brochure link"
      isSubmitting={isSubmitting}
    />
     <InputField
      icon={<FaMoneyBill className="w-5 h-5" />}
      label="Fee Structure link"
      value={formData.feeStructure || ""}
      field="feeStructure"
      onChange={onChange}
      placeholder="Upload Structure link"
      isSubmitting={isSubmitting}
    />
  </div> 
    </div>
  );
};

export default CoursesBasicForm;
