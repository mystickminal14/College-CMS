import React from "react";
import { User, Briefcase, Calendar, GraduationCap, FileText } from "lucide-react";
import InputField from "../../../utils/InputField";
import { FaViadeo } from "react-icons/fa";

interface AlumniBasicInfoFormProps {
  formData: { name: string; position: string; batch: string; course: string;link:string, story: string };
  onChange: (field: string, value: string) => void;
  isSubmitting?: boolean;
}

const AlumniBasicInfoForm: React.FC<AlumniBasicInfoFormProps> = ({ formData, onChange, isSubmitting = false }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField icon={<User className="w-5 h-5" />} label="Full Name" value={formData.name} field="name" onChange={onChange} placeholder="John Doe" required isSubmitting={isSubmitting} />
        <InputField icon={<Briefcase className="w-5 h-5" />} label="Position" value={formData.position} field="position" onChange={onChange} placeholder="Software Engineer" required isSubmitting={isSubmitting} />
        <InputField icon={<Calendar className="w-5 h-5" />} label="Batch" value={formData.batch} field="batch" onChange={onChange} placeholder="2020" required isSubmitting={isSubmitting} />
        <InputField icon={<GraduationCap className="w-5 h-5" />} label="Course" value={formData.course} field="course" onChange={onChange} placeholder="Computer Science" required isSubmitting={isSubmitting} />
        <InputField icon={<FaViadeo className="w-5 h-5" />} label="Video Link" value={formData.link} field="link" onChange={onChange} placeholder="https://video.com"  isSubmitting={isSubmitting} />
     
      </div>

      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <FileText className="w-5 h-5 text-[#135EAB]" />
          <span>Story / Bio (Optional)</span>
        </label>
        <textarea value={formData.story} onChange={(e) => onChange("story", e.target.value)} disabled={isSubmitting} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135EAB] min-h-[120px] disabled:opacity-50" placeholder="Share the alumni's story..." />
      </div>
    </div>
  );
};

export default AlumniBasicInfoForm;
