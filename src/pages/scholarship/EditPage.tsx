import { useEffect, useState } from "react";
import type { ScholarshipSchedule } from "./model";
import InputField from "../../utils/InputField";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: ScholarshipSchedule | null;
  mutation: any;
  isAddMode: boolean;
}

const ScholarshipModal = ({ isOpen, onClose, data, mutation, isAddMode }: Props) => {
  const [form, setForm] = useState<Partial<ScholarshipSchedule>>({});

  useEffect(() => {
    if (data && !isAddMode) {
      setForm(data);
    } else {
      setForm({});
    }
  }, [data, isAddMode]);

  if (!isOpen) return null;

  const handleFieldChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form, { onSuccess: () => onClose() });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-2xl p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {isAddMode ? "Add Scholarship Schedule" : "Edit Scholarship Schedule"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Schedule Year" field="scheduleYear" value={form.scheduleYear || ""} onChange={handleFieldChange} required />
          <InputField label="Registration Opens" field="regisrationOpenDate" value={form.regisrationOpenDate || ""} onChange={handleFieldChange} required />
          <InputField label="Last Date" field="lastDate" value={form.lastDate || ""} onChange={handleFieldChange} required />
          <InputField label="Exam Date" field="examDate" value={form.examDate || ""} onChange={handleFieldChange} required />
          <InputField label="Final Result Date" field="canDate" value={form.canDate || ""} onChange={handleFieldChange} required />
          <InputField label="Admission Date" field="admissionDate" value={form.admissionDate || ""} onChange={handleFieldChange} required />

          <div className="col-span-full flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              Cancel
            </button>
            <button type="submit" disabled={mutation.isLoading} className={`px-6 py-2 ${isAddMode ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-lg disabled:opacity-60`}>
              {mutation.isLoading ? "Saving..." : isAddMode ? "Add" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScholarshipModal;
