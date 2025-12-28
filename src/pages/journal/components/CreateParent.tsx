import React, { useState, useEffect } from "react";
import { X, RefreshCw, Loader2 } from "lucide-react";
import useCreateParent from "../hooks/useCreate";
import useEditSession from "../hooks/useEdit";
import type { CreateParentPayload } from "../model/JournalModel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CreateParentPayload; // for edit
  parentId?: number; // edit mode if present
}

const CreateEditParentJournalModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialData,
  parentId,
}) => {
  const [form, setForm] = useState<CreateParentPayload>({
    issue: "",
    year: "",
  });

  const [error, setError] = useState("");

  const createMutation = useCreateParent();
  const editMutation = useEditSession();

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({ issue: "", year: "" });
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

    if (!form.issue.trim() || !form.year.trim()) {
      setError("Issue and Year are required");
      return;
    }

    if (parentId) {
      // EDIT
      editMutation.mutate(
        {
          id: parentId,
          journal: form,
        },
        {
          onSuccess: () => onClose(),
        }
      );
    } else {
      // CREATE
      createMutation.mutate(form, {
        onSuccess: () => onClose(),
      });
    }
  };

  const isPending = parentId
    ? editMutation.isPending
    : createMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* HEADER */}
          <div className="bg-linear-to-r from-[#1a7cd3] to-[#1a7cd3] p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              {parentId ? "Edit Journal Issue" : "Create Journal Issue"}
            </h2>
            <button type="button" onClick={onClose}>
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {/* Issue */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Issue *
              </label>
              <input
                type="text"
                value={form.issue}
                onChange={(e) => handleChange("issue", e.target.value)}
                placeholder="eg: Issue 1"
                className="w-full px-4 py-2.5 border rounded-lg"
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Year *
              </label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => handleChange("year", e.target.value)}
                placeholder="eg: 2025"
                className="w-full px-4 py-2.5 border rounded-lg"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Buttons */}
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
                    {parentId ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {parentId ? "Update Issue" : "Create Issue"}
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

export default CreateEditParentJournalModal;
