import React, { useState, useEffect, useContext } from "react";
import { X, UserPlus, Loader2 } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Recognitions, RecogType } from "../model/RecognitionsModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import RecognitionsBasicInfoForm from "./BasicForm";
import { AppContext } from "../../../context/ContextApp";
import { IMAGE_URL } from "../../../constants";
import RecognitionImageUploadForm from "./ImageUpload";

interface AddEditRecognitionsWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  recognitionsToEdit?: Recognitions;
  createMutation?: UseMutationResult<ApiResponse<Recognitions>, ApiErrorResponse, Recognitions>;
  editMutation?: UseMutationResult<ApiResponse<Recognitions>, ApiErrorResponse, Partial<Recognitions>>;
  uploadImageMutation?: UseMutationResult<ApiResponse<Recognitions>, ApiErrorResponse, { id: number; image: File }>;
  updateImageMutation?: UseMutationResult<ApiResponse<Recognitions>, ApiErrorResponse, { id: number; image: File }>;
}

const AddEditRecognitionsWizardModal: React.FC<AddEditRecognitionsWizardModalProps> = ({
  isOpen,
  onClose,
  recognitionsToEdit,
  createMutation,
  editMutation,
  uploadImageMutation,
  updateImageMutation
}) => {
  const appContext = useContext(AppContext);
  const isEditMode = !!recognitionsToEdit;

  const [step, setStep] = useState<1 | 2>(1);

  // 🔹 ONLY ADDITION: type
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    type: RecogType;
  }>({
    name: "",
    description: "",
    type: "RECOGNITION",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [RecognitionsId, setRecognitionsId] = useState<number | null>(null);

  // Prefill form in edit mode
  useEffect(() => {
    if (isOpen) {
      if (recognitionsToEdit) {
        setFormData({
          name: recognitionsToEdit.name || "",
          description: recognitionsToEdit.description || "",
          type: recognitionsToEdit.type || "RECOGNITION", // 🔹 added
        });
        setRecognitionsId(recognitionsToEdit.id || null);
        setImagePreview(
          recognitionsToEdit.image
            ? `${IMAGE_URL}${recognitionsToEdit.image}`
            : null
        );
        setStep(1);
      } else {
        resetForm();
      }
    }
  }, [isOpen, recognitionsToEdit]);

  const resetForm = () => {
    setFormData({ name: "", description: "", type: "RECOGNITION" });
    setImageFile(null);
    setImagePreview(null);
    setRecognitionsId(null);
    setStep(1);
  };

  const handleFormChange = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleImageChange = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) return appContext?.showToast("Name is required", "warn");
    if (!formData.description.trim()) return appContext?.showToast("Description is required", "warn");
    return true;
  };

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;

    if (isEditMode && editMutation && RecognitionsId) {
      editMutation.mutate({ id: RecognitionsId, ...formData });
    } else if (!isEditMode && createMutation) {
      createMutation.mutate(formData, {
        onSuccess: (res) => {
          const newId = res.data?.id ?? (res as any)?.id;
          if (newId) {
            setRecognitionsId(newId);
            setStep(2);
          } else {
            appContext?.showToast("Failed to create Recognitions. No ID returned.", "error");
          }
        }
      });
    }
  };

  const handleSubmitStep2 = () => {
    if (!RecognitionsId || !imageFile) {
      resetForm();
      onClose();
      return;
    }

    if (isEditMode && updateImageMutation) {
      updateImageMutation.mutate(
        { id: RecognitionsId, image: imageFile },
        { onSuccess: () => { resetForm(); onClose(); } }
      );
    } else if (!isEditMode && uploadImageMutation) {
      uploadImageMutation.mutate(
        { id: RecognitionsId, image: imageFile },
        { onSuccess: () => { resetForm(); onClose(); } }
      );
    }
  };

  const handleSkipImage = () => {
    resetForm();
    onClose();
  };

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
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {isEditMode ? "Edit Recognitions" : "Add New Recognitions"}
                  </h2>
                  <p className="text-white/90 text-sm mt-1">
                    {step === 1
                      ? "Step 1: Basic Information"
                      : isEditMode
                      ? "Step 2: Image Preview / Update"
                      : "Step 2: Upload Image"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                disabled={
                  editMutation?.isPending ||
                  createMutation?.isPending ||
                  uploadImageMutation?.isPending ||
                  updateImageMutation?.isPending
                }
                className="p-2 hover:bg-white/20 rounded-xl disabled:opacity-50"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="p-6 md:p-8">
            {step === 1 ? (
              <form onSubmit={handleSubmitStep1} className="space-y-6">
                <RecognitionsBasicInfoForm
                  formData={formData}
                  onChange={handleFormChange}
                  isSubmitting={editMutation?.isPending || createMutation?.isPending}
                />

                <div className="pt-4 flex gap-4">
                  {isEditMode ? (
                    <>
                      <button
                        type="button"
                        onClick={handleSubmitStep1}
                        disabled={editMutation?.isPending}
                        className="flex-1 px-6 py-3.5 bg-[#1a7cd3] text-white rounded-xl"
                      >
                        {editMutation?.isPending ? <Loader2 className="animate-spin" /> : "Update"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 px-6 py-3.5 bg-gray-200 rounded-xl"
                      >
                        Next
                      </button>
                    </>
                  ) : (
                    <button
                      type="submit"
                      disabled={createMutation?.isPending}
                      className="w-full px-6 py-3.5 bg-[#1a7cd3] text-white rounded-xl"
                    >
                      {createMutation?.isPending ? <Loader2 className="animate-spin" /> : "Submit & Continue"}
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  ← Back to Basic Info
                </button>

                <RecognitionImageUploadForm
                  reccognitionName={formData.name}
                  imagePreview={imagePreview}
                  imageFile={imageFile}
                  onImageChange={handleImageChange}
                  onRemoveImage={handleRemoveImage}
                  isUploading={uploadImageMutation?.isPending || updateImageMutation?.isPending || false}
                  onSkip={handleSkipImage}
                  onSubmit={handleSubmitStep2}
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddEditRecognitionsWizardModal;
