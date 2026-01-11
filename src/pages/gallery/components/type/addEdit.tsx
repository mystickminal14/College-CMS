import React, { useState, useEffect, useContext } from "react";

import type { UseMutationResult } from "@tanstack/react-query";
import type { GalleryType } from "../../model/GallModel";
import { Check, Loader2, Plus, X } from "lucide-react";
import { AppContext } from "../../../../context/ContextApp";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type?: GalleryType;
  isEdit?: boolean;
  mutation?: UseMutationResult<any, any, { name: string }>;
  editMutation?: UseMutationResult<any, any, { id: number; name: string }>;
}

const AddEditGalleryTypeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  type,
  isEdit,
  mutation,
  editMutation,
}) => {
  const { showToast } = useContext(AppContext)!;
  const [name, setName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(isEdit && type ? type.name : "");
    }
  }, [isOpen, isEdit, type]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return showToast("Type name is required", "error");

    if (isEdit && type && editMutation) {
      editMutation.mutate({ id: type.id, name });
    } else if (mutation) {
      mutation.mutate({ name });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Gallery Type" : "Add Gallery Type"}
          </h2>
          <button type="button" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter type name"
          className="w-full px-4 py-2 border rounded-lg mb-4"
          required
        />

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-[#125DAA] hover:bg-[#0f4a8c] text-white rounded-lg"
        >
          {isEdit && editMutation?.isPending
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : isEdit
            ? <Check className="w-4 h-4" />
            : <Plus className="w-4 h-4" />}
          {isEdit ? "Update Type" : "Add Type"}
        </button>
      </form>
    </div>
  );
};

export default AddEditGalleryTypeModal;
