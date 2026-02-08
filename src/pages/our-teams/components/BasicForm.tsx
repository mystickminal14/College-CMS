import React from "react";
import InputField from "../../../utils/InputField";
import type {  Teams } from "../model/TeamsModel";
import { User, Briefcase, Mail, Phone, FileText } from "lucide-react";
import type { Dept } from "../../our-team-dept/model/DeptModel";

interface TeamsBasicInfoFormProps {
  formData: Teams | Partial<Teams>;
  onChange: (field: string, value: string | number) => void;
  isSubmitting?: boolean;
  departments?: Dept[];
}

const TeamsBasicInfoForm: React.FC<TeamsBasicInfoFormProps> = ({
  formData,
  onChange,
  isSubmitting = false,
  departments = [],
}) => {
  return (
    <div className="space-y-10">
      {/* ================= BASIC INFO ================= */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            icon={<User className="w-5 h-5" />}
            label="Name"
            value={formData.name ?? ""}
            field="name"
            onChange={onChange}
            placeholder="Full Name"
            required
            isSubmitting={isSubmitting}
          />
          <InputField
            icon={<Briefcase className="w-5 h-5" />}
            label="Position"
            value={formData.position ?? ""}
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
    value={formData.departmentId }
    onChange={(e) => onChange("departmentId", Number(e.target.value))}
    disabled={isSubmitting}
  >
    <option value="">Select Department</option>
    {departments.map((dept) => (
      <option key={dept.id} value={dept.id}>
        {dept.name.charAt(0) + dept.name.slice(1).toLowerCase()}
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
            <FileText className="w-4 h-4" /> Short Bio
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

      {/* ================= SOCIAL ================= */}
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
