import React, { useEffect } from "react";
import {
  Newspaper,
  Link as LinkIcon,
  User,
  Calendar,
  FileText,
} from "lucide-react";
import { adDateToBsString } from "../../../utils/bs-converter";
import InputField from "./InputField";


interface NewsFormShape {
  title: string;
  content: string;
  link: string;
  source: string;
  publishedOn: string;    // AD (YYYY-MM-DD)
  publishedOnBS: string;  // BS (auto)
}

interface NewsBasicInfoFormProps {
  formData: NewsFormShape;
  onChange: (field: string, value: string) => void;
  isSubmitting?: boolean;
}

const NewsBasicInfoForm: React.FC<NewsBasicInfoFormProps> = ({
  formData,
  onChange,
  isSubmitting = false,
}) => {
  // Whenever AD date changes, auto convert and set BS
  useEffect(() => {
    if (formData.publishedOn) {
      const bs = adDateToBsString(formData.publishedOn);
      onChange("publishedOnBS", bs);
    } else {
      onChange("publishedOnBS", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.publishedOn]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          icon={<Newspaper className="w-5 h-5" />}
          label="Title"
          value={formData.title}
          field="title"
          onChange={onChange}
          placeholder="Enter news title"
          required
          isSubmitting={isSubmitting}
        />

        <InputField
          icon={<LinkIcon className="w-5 h-5" />}
          label="External Link"
          value={formData.link}
          field="link"
          onChange={onChange}
          placeholder="https://example.com/news"
          isSubmitting={isSubmitting}
          type="url"
        />

        <InputField
          icon={<User className="w-5 h-5" />}
          label="Source"
          value={formData.source}
          field="source"
          onChange={onChange}
          placeholder="e.g. Kathmandu Post"
          required
          isSubmitting={isSubmitting}
        />

        <InputField
          icon={<Calendar className="w-5 h-5" />}
          label="Published On (AD)"
          value={formData.publishedOn}
          field="publishedOn"
          onChange={onChange}
          placeholder="Select AD date"
          required
          isSubmitting={isSubmitting}
          type="date"
        />

        <InputField
          icon={<Calendar className="w-5 h-5" />}
          label="Published On (BS)"
          value={formData.publishedOnBS}
          field="publishedOnBS"
          onChange={onChange}
          placeholder="Auto converted BS date"
          readOnly
          isSubmitting={isSubmitting}
        />
      </div>

      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <FileText className="w-5 h-5 text-[#135EAB]" />
          <span>Content</span>
        </label>

        <textarea
          value={formData.content}
          onChange={(e) => onChange("content", e.target.value)}
          disabled={isSubmitting}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135EAB] min-h-[120px] disabled:opacity-50"
          placeholder="Write the news content..."
        />
      </div>
    </div>
  );
};

export default NewsBasicInfoForm;
