import React from "react";
import { User, Briefcase, Globe, Building } from "lucide-react";
import InputField from "../../../utils/InputField";
import type { EditorialMember, HonoraryPosition } from "../model/EditoralModel";

interface EditorialBasicInfoFormProps {
  formData: EditorialMember;
  onChange: (field: string, value: string) => void;
  isSubmitting?: boolean;
}

const Positions: HonoraryPosition[] = [
  "CHIEF_PATRON",
  "PATRON",
  "EDITOR_IN_CHIEF",
  "ASSOCIATE_EDITOR",
  "MANAGING_EDITOR",
  "EDITORIAL_BOARD_MEMBER",
  "ADVISOR",
];


const EditorialBasicInfoForm: React.FC<EditorialBasicInfoFormProps> = ({
  formData,
  onChange,
  isSubmitting = false,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          icon={<User className="w-5 h-5" />}
          label="Full Name"
          value={formData.name}
          field="name"
          onChange={onChange}
          placeholder="Member Name"
          required
          isSubmitting={isSubmitting}
        />

        <InputField
          icon={<Briefcase className="w-5 h-5" />}
          label="Designation"
          value={formData.designation}
          field="designation"
          onChange={onChange}
          placeholder="e.g. Senior Editor"
          required
          isSubmitting={isSubmitting}
        />

        <div className="flex flex-col">
          <label className="mb-2 font-medium text-sm">Honorary Position</label>
          <select
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={formData.honoraryPosition}
            onChange={(e) => onChange("honoraryPosition", e.target.value as HonoraryPosition)}
            disabled={isSubmitting}
          >
            <option value="">Select Position</option>
            {Positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

  

        <InputField
          icon={<Building className="w-5 h-5" />}
          label="Institution"
          value={formData.institution}
          field="institution"
          onChange={onChange}
          placeholder="University / Organization"
          isSubmitting={isSubmitting}
        />

        <InputField
          icon={<Globe className="w-5 h-5" />}
          label="Country"
          value={formData.country}
          field="country"
          onChange={onChange}
          placeholder="Country Name"
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditorialBasicInfoForm;
