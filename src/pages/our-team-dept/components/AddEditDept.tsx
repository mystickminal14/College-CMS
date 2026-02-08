import React, { useState, useEffect, useContext } from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import { Check, Loader2, Plus, X } from "lucide-react";
import type { Dept,  } from "../model/DeptModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  type?: Dept;
  isEdit?: boolean;mutation?: UseMutationResult<ApiResponse<Dept>, ApiErrorResponse  , Dept>;
    editMutation?: UseMutationResult<ApiResponse<Dept>, ApiErrorResponse, Partial<Dept> & { id: number }>;
    
}


const AddEditDeptModal: React.FC<Props> = ({
  isOpen,
  onClose,
  type,
  isEdit = false,
  mutation,
  editMutation,
}) => {
  const { showToast } = useContext(AppContext)!;

  const [name, setName] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (isEdit && type) {
      setName(type.name.replace(/ \(.*\) name/, ""));
    } else {
      setName("");
    }
  }, [isOpen, isEdit, type]);

  if (!isOpen) return null;

  /* ---------- Submit ---------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      return showToast("Name is required", "error");
    }

    const payload = {
      name: `${name}`, 
    };

    if (isEdit && type && editMutation) {
      editMutation.mutate({
        id: Number(type.id),
        ...payload,
      });
    } else if (mutation) {
      mutation.mutate(payload);
    }

    onClose();
  };

  const isLoading =
    (isEdit && editMutation?.isPending) ||
    (!isEdit && mutation?.isPending);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Department Name" : "Add Department Name"}
          </h2>
          <button type="button" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Computing"
          className="w-full px-4 py-2 border rounded-lg mb-3"
          required
        />

        

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-[#125DAA] hover:bg-[#0f4a8c] text-white rounded-lg disabled:opacity-60"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isEdit ? (
            <Check className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {isEdit ? "Update " : "Add "}
        </button>
      </form>
    </div>
  );
};

export default AddEditDeptModal;
