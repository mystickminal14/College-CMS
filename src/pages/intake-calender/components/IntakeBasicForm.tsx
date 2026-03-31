import {
  Newspaper,
  Link as LinkIcon,
  Calendar,
} from "lucide-react";
import InputField from "./InputField";
import type { IntakeStatus } from "../model/IntakeModel";


interface NewsFormShape {
  intake: string;
  status: IntakeStatus;
  lastdate: string;
  duration: string;
}

interface IntakeBasicInfoFormProps {
  formData: NewsFormShape;
  onChange: (field: string, value: string) => void;
  isSubmitting?: boolean;
}

const IntakeBasicInfoForm: React.FC<IntakeBasicInfoFormProps> = ({
  formData,
  onChange,
  isSubmitting = false,
}) => {

  const IntakeStatus: IntakeStatus[] = ["OPEN", "CLOSED","UPCOMING"];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          icon={<Newspaper className="w-5 h-5" />}
          label="Intake Name"
          value={formData.intake}
          field="intake"
          onChange={onChange}
          placeholder="eg: Spring Intake"
          required
          isSubmitting={isSubmitting}
        />

        <InputField
          icon={<LinkIcon className="w-5 h-5" />}
          label="duration"
          value={formData.duration}
          field="duration"
          onChange={onChange}
          placeholder="(Jun/Jul) 2023"
          isSubmitting={isSubmitting}
        />



        <InputField
          icon={<Calendar className="w-5 h-5" />}
          label="Last Date"
          value={formData.lastdate}
          field="lastdate"
          onChange={onChange}
          placeholder="19th sept,2025"
          required
          isSubmitting={isSubmitting}
          type="date"
        />

      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-medium text-sm">Intake Status</label>
        <select
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          value={formData.status}
          onChange={(e) => onChange("status", e.target.value as IntakeStatus)}
          disabled={isSubmitting}
        >
          <option value="">Select Department</option>
          {IntakeStatus.map((dept) => (
            <option key={dept} value={dept}>
              {dept.charAt(0) + dept.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default IntakeBasicInfoForm;
