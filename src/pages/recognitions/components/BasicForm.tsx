import React from "react";
import { User, FileText } from "lucide-react";
import InputField from "../../../utils/InputField";
import type { RecogType } from "../model/RecognitionsModel";

interface RecognitionsBasicInfoFormProps {
  formData: { name: string; description: string; type: RecogType };
  onChange: (field: string, value: string) => void;
  isSubmitting?: boolean;
}

const RecognitionsBasicInfoForm: React.FC<RecognitionsBasicInfoFormProps> = ({
  formData,
  onChange,
  isSubmitting = false
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <InputField
          icon={<User className="w-5 h-5" />}
          label="Name"
          value={formData.name}
          field="name"
          onChange={onChange}
          placeholder="Recognition by tu"
          required
          isSubmitting={isSubmitting}
        />
      </div>

      {/* 🔹 Type Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Type
        </label>
        <select
          value={formData.type}
          onChange={(e) => onChange("type", e.target.value)}
          disabled={isSubmitting}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135EAB]"
        >
          <option value="RECOGNITION">Recognition</option>
          <option value="PERMISSION">Permission</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <FileText className="w-5 h-5 text-[#135EAB]" />
          <span>Story / Bio (Optional)</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          disabled={isSubmitting}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#135EAB]"
          placeholder="Write Description..."
        />
      </div>
    </div>
  );
};

export default RecognitionsBasicInfoForm;
