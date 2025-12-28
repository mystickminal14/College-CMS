import React, { useState, useEffect, useContext } from "react";
import { X, UserPlus, Loader2 } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { AppContext } from "../../../context/ContextApp";
import EditorialBasicInfoForm from "./BasicForm";
import type { EditorialMember } from "../model/EditoralModel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  memberToEdit?: EditorialMember | null;
  createMutation?: UseMutationResult<ApiResponse<EditorialMember>, ApiErrorResponse, EditorialMember>;
  editMutation?: UseMutationResult<ApiResponse<EditorialMember>, ApiErrorResponse, EditorialMember>;
}

const AddEditEditorialWizardModal: React.FC<Props> = ({
  isOpen,
  onClose,
  memberToEdit,
  createMutation,
  editMutation,
}) => {
  const appContext = useContext(AppContext);
  const isEditMode = !!memberToEdit;

  const [formData, setFormData] = useState<EditorialMember>({
    name: "",
    designation: "",
    honoraryPosition: "EDITORIAL_BOARD_MEMBER",
    department: "",
    institution: "",
    country: "",
  } as EditorialMember);

  useEffect(() => {
    if (isOpen) {
      if (memberToEdit) {
        setFormData({ ...memberToEdit });
      } else resetForm();
    }
  }, [isOpen, memberToEdit]);

  const resetForm = () => {
    setFormData({
      name: "",
      designation: "",
      honoraryPosition: "EDITORIAL_BOARD_MEMBER",
      department: "",
      institution: "",
      country: "",
    });
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.designation.trim()) {
      return appContext?.showToast("Name & Designation required", "warn");
    }

    if (isEditMode && editMutation && memberToEdit?.id) {
      editMutation.mutate({ ...formData, id: memberToEdit.id }, { onSuccess: () => { resetForm(); onClose(); } });
    } else if (!isEditMode && createMutation) {
      createMutation.mutate(formData, { onSuccess: () => { resetForm(); onClose(); } });
    }
  };

  if (!isOpen) return null;

  const isSubmitting = editMutation?.isPending || createMutation?.isPending;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-linear-to-r from-[#125DAA] to-[#1a7cd3] p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <UserPlus className="w-7 h-7 text-white" />
              <div>
                <h2 className="text-2xl font-bold text-white">{isEditMode ? "Edit Member" : "Add New Member"}</h2>
                <p className="text-white/90 text-sm mt-1">Fill basic info</p>
              </div>
            </div>
            <button onClick={onClose} disabled={isSubmitting} className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <EditorialBasicInfoForm formData={formData} onChange={handleFormChange} isSubmitting={isSubmitting} />
              <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3.5 bg-[#135EAB] text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 font-medium disabled:opacity-50">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditEditorialWizardModal;
