import React from "react";
import InputField from "../../../utils/InputField";
import type { Department, Teams } from "../model/TeamsModel";

import { User, Briefcase, Mail, Phone, FileText } from "lucide-react";

interface TeamsBasicInfoFormProps {
  formData:Teams|Partial<Teams>;
  onChange: (field: string, value: string) => void;
  isSubmitting?: boolean;
}

const Departments: Department[] = [
  "ADMINISTRATION",
  "COMPUTING",
  "MANAGEMENT",
];

const TeamsBasicInfoForm: React.FC<TeamsBasicInfoFormProps> = ({
  formData,
  onChange,
  isSubmitting = false,
}) => {
  return (
    <div className="space-y-10">
      {/* ================= BASIC INFO ================= */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <InputField
            icon={<User className="w-5 h-5" />}
            label="Name"
            value={formData.name??''}
            field="name"
            onChange={onChange}
            placeholder="Full Name"
            required
            isSubmitting={isSubmitting}
          />

          {/* Position */}
          <InputField
            icon={<Briefcase className="w-5 h-5" />}
            label="Position"
            value={formData.position??''}
            field="position"
            onChange={onChange}
            placeholder="Team Lead"
            required
            isSubmitting={isSubmitting}
          />

          {/* Department */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-sm">Department</label>
            <select
              className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              value={formData.department}
              onChange={(e) =>
                onChange("department", e.target.value as Department)
              }
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

      {/* ================= BIO ================= */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Bio</h3>

        <div className="flex flex-col">
          <label className="mb-2 font-medium text-sm flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Short Bio
          </label>
          <textarea
            rows={4}
            value={formData.bio || ""}
            onChange={(e) => onChange("bio", e.target.value)}
            placeholder="Write a short bio about the team member..."
            disabled={isSubmitting}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 resize-none"
          />
        
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Social Links</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Facebook"
            field="facebook"
            value={formData.facebook || ""}
            onChange={onChange}
            placeholder="https://facebook.com/username"
            isSubmitting={isSubmitting}
          />

          <InputField
            label="Instagram"
            field="insta"
            value={formData.insta || ""}
            onChange={onChange}
            placeholder="https://instagram.com/username"
            isSubmitting={isSubmitting}
          />

          <InputField
            label="LinkedIn"
            field="linkedIn"
            value={formData.linkedIn || ""}
            onChange={onChange}
            placeholder="https://linkedin.com/in/username"
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {/* ================= CONTACT ================= */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            icon={<Mail className="w-5 h-5" />}
            label="Email"
            field="email"
            value={formData.email || ""}
            onChange={onChange}
            placeholder="example@email.com"
            isSubmitting={isSubmitting}
          />

          <InputField
            icon={<Phone className="w-5 h-5" />}
            label="Phone"
            field="phone"
            value={formData.phone || ""}
            onChange={onChange}
            placeholder="+977-XXXXXXXXXX"
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamsBasicInfoForm;
