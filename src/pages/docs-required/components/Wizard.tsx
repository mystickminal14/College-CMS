import React, { useState, useEffect, useContext } from "react";
import { X, BookOpen, Loader2 } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Documents, EDegree } from "../model/DocsModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { AppContext } from "../../../context/ContextApp";

interface DocumentFormProps {
  isOpen: boolean;
  onClose: () => void;
  documentToEdit?: Documents | null;

  createMutation?: UseMutationResult<ApiResponse<Documents>, ApiErrorResponse, Documents>;
  editMutation?: UseMutationResult<ApiResponse<Documents>, ApiErrorResponse, Partial<Documents> & { id: number }>;
}

const DocumentForm: React.FC<DocumentFormProps> = ({
  isOpen,
  onClose,
  documentToEdit,
  createMutation,
  editMutation,
}) => {
  const appContext = useContext(AppContext);
  const isEditMode = !!documentToEdit;

  const [formData, setFormData] = useState<{ type: EDegree; document: string }>({
    type: "BACHELOR",
    document: "",
  });

  const [docId, setDocId] = useState<number | null>(null);

  // Prefill edit mode
  useEffect(() => {
    if (!isOpen) return;

    if (documentToEdit) {
      setFormData({
        type: documentToEdit.type,
        document: documentToEdit.document,
      });
      setDocId(documentToEdit.id ?? null);
    } else {
      setFormData({ type: "BACHELOR", document: "" });
      setDocId(null);
    }
  }, [isOpen, documentToEdit]);

  const handleChange = (field: "type" | "document", value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    if (!formData.document.trim()) return appContext?.showToast("Document is required", "warn");
    if (!formData.type.trim()) return appContext?.showToast("Degree type is required", "warn");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditMode && editMutation && docId) {
      editMutation.mutate({ id: docId, ...formData });
    } else if (!isEditMode && createMutation) {
      createMutation.mutate(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-[#135EAB] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-white" />
            <h2 className="text-2xl font-bold text-white">
              {isEditMode ? "Edit Document" : "Add Document"}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl">
            <X className="text-white" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Document Type */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Degree Type</label>
              <select
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="BACHELOR">Bachelor</option>
                <option value="MASTER">Master</option>
              </select>
            </div>

            {/* Document Name */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Document Name</label>
              <input
                type="text"
                value={formData.document}
                onChange={(e) => handleChange("document", e.target.value)}
                placeholder="Enter document name"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#135EAB] text-white rounded-xl font-medium hover:bg-blue-700 flex justify-center items-center"
            >
              {(createMutation?.isPending || editMutation?.isPending) && (
                <Loader2 className="animate-spin mr-2 w-5 h-5" />
              )}
              {isEditMode ? "Update Document" : "Add Document"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocumentForm;
