import InputField from "../../../utils/InputField";
import ChipInputField from "./ChipInput";
import { User, BookOpen, Globe, Hash, Calendar, FileText } from "lucide-react";
import type { JournalDetailsPayload } from "../model/JournalModel";

interface Props {
  formData: JournalDetailsPayload;
  onChange: (field: string, value: any) => void;
  isSubmitting: boolean;
}

const JournalDetailsForm: React.FC<Props> = ({ formData, onChange, isSubmitting,  }) => {
  return (
    <div className="space-y-5">
      <InputField
        icon={<BookOpen size={18} />}
        label="Title"
        field="title"
        value={formData.title || ""}
        placeholder="Journal title"
        required
        isSubmitting={isSubmitting}
        onChange={onChange}
      />

      <ChipInputField
        icon={<User size={18} />}
        label="Authors"
        field="authors"
        value={formData.authors || []}
        placeholder="Type author name & press Enter"
        required
        isSubmitting={isSubmitting}
        onChange={onChange}
      />

   

      <InputField
        icon={<FileText size={18} />}
        label="Pages"
        field="pages"
        value={formData.pages || ""}
        placeholder="e.g. 12-25"
        isSubmitting={isSubmitting}
        onChange={onChange}
      />

      <InputField
        icon={<Hash size={18} />}
        label="Page No (auto-generated from Pages)"
        field="pageNo"
        value={formData.pageNo || ""}
        placeholder="Auto-filled when Pages is entered"
        isSubmitting={isSubmitting}
        disabled={true}
        onChange={onChange}
      />

      <InputField
        icon={<BookOpen size={18} />}
        label="Subject"
        field="subject"
        value={formData.subject || ""}
        placeholder="Journal subject"
        isSubmitting={isSubmitting}
        onChange={onChange}
      />

      <InputField
        icon={<Globe size={18} />}
        label="Country"
        field="country"
        value={formData.country || ""}
        placeholder="Country"
        isSubmitting={isSubmitting}
        onChange={onChange}
      />

      <InputField
  icon={<Calendar size={18} />}
  label="Available Online"
  field="availableOnline"
  type="date"
  value={
    formData.availableOnline
      ? new Date(formData.availableOnline).toISOString().split("T")[0]
      : ""
  }
  placeholder="Available online date"
  isSubmitting={isSubmitting}
  onChange={onChange}
/>


      <InputField
        icon={<FileText size={18} />}
        label="Abstract"
        field="abstract"
        value={formData.abstract || ""}
        placeholder="Journal abstract"
        isSubmitting={isSubmitting}
        onChange={onChange}
      />

      <ChipInputField
        icon={<Hash size={18} />}
        label="Keywords"
        field="keywords"
        value={formData.keywords || []}
        placeholder="Type keyword & press Enter"
        isSubmitting={isSubmitting}
        onChange={onChange}
      />


    </div>
  );
};

export default JournalDetailsForm;
