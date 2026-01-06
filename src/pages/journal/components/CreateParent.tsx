import React, { useEffect, useState } from "react";
import { X, RefreshCw, Loader2 } from "lucide-react";
import useCreateJournal from "../hooks/useCreate";
import useEditJournal from "../hooks/useEdit";
import type { CreateParentPayload } from "../model/JournalModel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CreateParentPayload;
  journalId?: number; // edit mode if present
}


const CreateEditJournalModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialData,
  journalId,
}) => {
  const [form, setForm] = useState<CreateParentPayload>({
    year: "",
    month: "",
    issue: "",
    volume: "",
  });

  const [error, setError] = useState("");

  const createMutation = useCreateJournal();
  const editMutation = useEditJournal();

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        year: "",
        month: "",
        issue: "",
        volume: "",
      });
    }
    setError("");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: keyof CreateParentPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !form.year.trim() ||
      !form.month.trim() ||
      !form.issue.trim() ||
      !form.volume.trim()
    ) {
      setError("All fields are required");
      return;
    }

    if (journalId) {
      editMutation.mutate(
        { id: journalId, journal: form },
        { onSuccess: onClose }
      );
    } else {
      createMutation.mutate(form, { onSuccess: onClose });
    }
  };

  const isPending = journalId
    ? editMutation.isPending
    : createMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border overflow-hidden"
        >
          {/* HEADER */}
          <div className="bg-[#1a7cd3] p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              {journalId ? "Edit Journal" : "Create Journal"}
            </h2>
            <button type="button" onClick={onClose}>
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {/* YEAR */}
            <div>
              <label className="block text-sm font-medium mb-1">Year *</label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => handleChange("year", e.target.value)}
                placeholder="e.g. 2025"
                className="w-full px-4 py-2.5 border rounded-lg"
              />
            </div>

            {/* MONTH */}
            <div>
              <label className="block text-sm font-medium mb-1">Month *</label>
              <input
                type="text"
                value={form.month}
                onChange={(e) => handleChange("month", e.target.value)}
                placeholder="e.g. January"
                className="w-full px-4 py-2.5 border rounded-lg"
              />
            </div>

            {/* ISSUE */}
            <div>
              <label className="block text-sm font-medium mb-1">Issue *</label>
              <input
                type="text"
                value={form.issue}
                onChange={(e) => handleChange("issue", e.target.value)}
                placeholder="e.g. Issue 1"
                className="w-full px-4 py-2.5 border rounded-lg"
              />
            </div>

            {/* VOLUME */}
            <div>
              <label className="block text-sm font-medium mb-1">Volume *</label>
              <input
                type="text"
                value={form.volume}
                onChange={(e) => handleChange("volume", e.target.value)}
                placeholder="e.g. Volume 12"
                className="w-full px-4 py-2.5 border rounded-lg"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex space-x-3 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="flex-1 px-4 py-3 bg-[#1a7cd3] text-white rounded-lg flex items-center justify-center"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    {journalId ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {journalId ? "Update Journal" : "Create Journal"}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditJournalModal;
