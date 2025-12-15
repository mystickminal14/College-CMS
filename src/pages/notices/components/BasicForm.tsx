import React from "react";
import { User, Calendar } from "lucide-react";
import InputField from "../../../utils/InputField";
import type { ENotice } from "../model/NoticeModel";

interface NoticesBasicInfoFormProps {
  formData: { 
    program_name: string; 
    date: string; 
    title:string;
    type: ENotice; 
  };
  onChange: (field: string, value: string) => void;
  isSubmitting?: boolean;
}

const Notices: ENotice[] = ["ADMINISTRATIVE", "ACADEMIC"];

const NoticesBasicInfoForm: React.FC<NoticesBasicInfoFormProps> = ({
  formData,
  onChange,
  isSubmitting = false,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Program Name Field */}
        <InputField
          icon={<User className="w-5 h-5" />}
          label="Title"
          value={formData.title}
          field="title"
          onChange={onChange}
          placeholder="eg: Examination Schedule"
          required
          isSubmitting={isSubmitting}
        />
        <InputField
          icon={<User className="w-5 h-5" />}
          label="Program Name"
          value={formData.program_name}
          field="program_name"
          onChange={onChange}
          placeholder="eg: examination schedule for msc it"
          required
          isSubmitting={isSubmitting}
        />
 

        {/* Notice Type Field */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-sm">Notice Type</label>
          <select
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={formData.type}
            onChange={(e) => onChange("type", e.target.value as ENotice)}
            disabled={isSubmitting}
          >
            <option value="">Select Notice Type</option>
            {Notices.map((dept) => (
              <option key={dept} value={dept}>
                {dept.charAt(0) + dept.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Notice Date Field */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-sm">Notice Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="date"
              className="border rounded px-10 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
              value={formData.date}
              onChange={(e) => onChange("date", e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticesBasicInfoForm;
