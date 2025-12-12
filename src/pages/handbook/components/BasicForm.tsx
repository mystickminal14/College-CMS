import React from "react";
import { User, FileText } from "lucide-react";
import InputField from "../../../utils/InputField";

interface RecognitionsBasicInfoFormProps {
  formData: { name: string; description: string};
  onChange: (field: string, value: string) => void;
  isSubmitting?: boolean;
}

const RecognitionsBasicInfoForm: React.FC<RecognitionsBasicInfoFormProps> = ({ formData, onChange, isSubmitting = false }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1  gap-6">
        <InputField icon={<User className="w-5 h-5" />} label="Name" value={formData.name} field="name" onChange={onChange} placeholder="Recognition by tu" required isSubmitting={isSubmitting} />
         </div>

      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <FileText className="w-5 h-5 text-[#135EAB]" />
          <span>Story / Bio (Optional)</span>
        </label>
        <textarea value={formData.description} onChange={(e) => onChange("description", e.target.value)} disabled={isSubmitting} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135EAB] min-h-[120px] disabled:opacity-50" placeholder="Write Description..." />
      </div>
    </div>
  );
};

export default RecognitionsBasicInfoForm;
