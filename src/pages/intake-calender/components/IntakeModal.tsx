import React, { useState, useEffect, useContext } from "react";
import { X, UserPlus, Loader2 } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { AppContext } from "../../../context/ContextApp";
import IntakeBasicInfoForm from "./IntakeBasicForm";
import type { Intakes, IntakeStatus } from "../model/IntakeModel";

interface AddEditIntakesModalProps {
  isOpen: boolean;
  onClose: () => void;
  IntakesToEdit?: Intakes | null;
  createMutation?: UseMutationResult<ApiResponse<Intakes>, ApiErrorResponse, Intakes>;
  editMutation?: UseMutationResult<ApiResponse<Intakes>, ApiErrorResponse, Partial<Intakes>>;
}

const AddEditIntakesModal: React.FC<AddEditIntakesModalProps> = ({
  isOpen,
  onClose,
  IntakesToEdit,
  createMutation,
  editMutation,
}) => {
  const appContext = useContext(AppContext);
  const isEditMode = !!IntakesToEdit;

  const [formData, setFormData] = useState({
    intake: "",
    duration: "",
    lastdate: "",
    status: "OPEN" as IntakeStatus,
  });
  const [IntakesId, setIntakesId] = useState<number | null>(null);

  // Prefill form in edit mode
  useEffect(() => {
    if (isOpen && IntakesToEdit) {
      setFormData({
        intake: IntakesToEdit.intake || "",
        lastdate: IntakesToEdit.lastdate || "",
        duration: IntakesToEdit.duration || "",
        status: IntakesToEdit.status || "OPEN",
      });
      setIntakesId(IntakesToEdit.id ?? null);
    } else if (isOpen) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, IntakesToEdit]);

  const resetForm = () => {
    setFormData({
      intake: "",
      lastdate: "",
      duration: "",
      status: "OPEN",
    });
    setIntakesId(null);
  };

  const handleFormChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const validateForm = () => {
    if (!formData.intake.trim()) return appContext?.showToast("Intake is required", "warn");
    if (!formData.lastdate.trim()) return appContext?.showToast("Last date is required", "warn");
    if (!formData.duration.trim()) return appContext?.showToast("Duration is required", "warn");
    if (!formData.status.trim()) return appContext?.showToast("Status is required", "warn");
    return true;
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  if (isEditMode && editMutation && IntakesId) {
    editMutation.mutate(
      { id: IntakesId, ...formData },
      {
        onSuccess: () => {
          onClose(); // Close the modal
        },
     
      }
    );
  } else if (!isEditMode && createMutation) {
    createMutation.mutate(formData, {
      onSuccess: () => {
        onClose(); // Close the modal
      },
     
    });
  }
};


  const isAnyPending = !!createMutation?.isPending || !!editMutation?.isPending;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* HEADER */}
          <div className="bg-linear-to-r from-[#125DAA] to-[#1a7cd3] p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white/20 rounded-xl">
                  <UserPlus className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-white text-lg font-medium">{isEditMode ? "Edit Intake" : "Add Intake"}</h2>
              </div>
              <button
                onClick={onClose}
                disabled={isAnyPending}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <IntakeBasicInfoForm
                formData={formData}
                onChange={handleFormChange}
                isSubmitting={isAnyPending}
              />
              <div className="pt-4 flex gap-4">
                <button
                  type="submit"
                  disabled={isAnyPending}
                  className="w-full px-6 py-3.5 bg-[#1a7cd3] text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 font-medium disabled:opacity-50"
                >
                  {isAnyPending ? <Loader2 className="w-5 h-5 animate-spin" /> : isEditMode ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditIntakesModal;
