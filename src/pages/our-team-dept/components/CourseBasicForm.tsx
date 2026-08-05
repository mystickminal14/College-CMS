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
import useGetShiftNameAll from "../../shift/hooks/useGetShiftName";

interface CoursesBasicFormProps {
  formData: {
    title: string;
    prefix: string;
    degree: string;intake?:string;
  brochure?:string;
    credit: string;
    duration: string;
    category: string;feeStructure:string;
    details: string;fullForm:string,
    semester: string;
    shiftId: number | null;
  };
  onChange: (field: string, value: string | number | null) => void;
  isSubmitting?: boolean;
}

const CoursesBasicForm: React.FC<CoursesBasicFormProps> = ({
  formData,
  onChange,
  isSubmitting = false,
}) => {
  const { data: shiftData, isLoading: shiftLoading } = useGetShiftNameAll();
  const shifts = shiftData?.data ?? [];

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
