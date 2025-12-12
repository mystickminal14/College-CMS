import React from "react";
import { User, Briefcase } from "lucide-react";
import InputField from "../../../utils/InputField";
import type { Department } from "../model/TeamsModel";

interface TeamsBasicInfoFormProps {
  formData: { 
    name: string; 
    position: string; 
    department: Department; 
  };
  onChange: (field: string, value: string) => void;
  isSubmitting?: boolean;
}

const Departments: Department[] = ["ADMINISTRATION", "COMPUTING", "MANAGEMENT"];

const TeamsBasicInfoForm: React.FC<TeamsBasicInfoFormProps> = ({
  formData,
  onChange,
  isSubmitting = false,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <InputField
          icon={<User className="w-5 h-5" />}
          label="Name"
          value={formData.name}
          field="name"
          onChange={onChange}
          placeholder="Team Name"
          required
          isSubmitting={isSubmitting}
        />

        {/* Position Field */}
        <InputField
          icon={<Briefcase className="w-5 h-5" />}
          label="Position"
          value={formData.position}
          field="position"
          onChange={onChange}
          placeholder="Team Lead"
          required
          isSubmitting={isSubmitting}
        />

        {/* Department Select */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-sm">Department</label>
          <select
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={formData.department}
            onChange={(e) => onChange("department", e.target.value as Department)}
            disabled={isSubmitting}
          >
            <option value="">Select Department</option>
            {Departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept.charAt(0) + dept.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TeamsBasicInfoForm;
