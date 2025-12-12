import React, { useState, useEffect, useContext } from "react";
import { X, UserPlus, Loader2,  } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Department, Teams } from "../model/TeamsModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import TeamsBasicInfoForm from "./BasicForm";
import { AppContext } from "../../../context/ContextApp";
import { IMAGE_URL } from "../../../constants";
import TeamImageUploadForm from "./ImageUpload";

interface AddEditTeamsWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  TeamsToEdit?: Teams|null;
  createMutation?: UseMutationResult<ApiResponse<Teams>, ApiErrorResponse, Teams>;
  editMutation?: UseMutationResult<ApiResponse<Teams>, ApiErrorResponse, Teams>;
  uploadImageMutation?: UseMutationResult<ApiResponse<Teams>, ApiErrorResponse, { id: number; image: File }>;
  updateImageMutation?: UseMutationResult<ApiResponse<Teams>, ApiErrorResponse, { id: number; image: File }>;
}


const AddEditTeamsWizardModal: React.FC<AddEditTeamsWizardModalProps> = ({
  isOpen,
  onClose,
  TeamsToEdit,
  createMutation,
  editMutation,
  uploadImageMutation,
  updateImageMutation,
}) => {
  const appContext = useContext(AppContext);
  const isEditMode = !!TeamsToEdit;

  const [step, setStep] = useState<1 | 2>(1);
 const [formData, setFormData] = useState<{ name: string; position: string; department: Department }>({
  name: "",
  position: "",
  department: "ADMINISTRATION",
});

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [TeamsId, setTeamsId] = useState<number | null>(null);

  // Prefill form in edit mode
  useEffect(() => {
    if (isOpen) {
      if (TeamsToEdit) {
        setFormData({
          name: TeamsToEdit.name || "",
          position: TeamsToEdit.position || "",
          department: TeamsToEdit.department,
        });
        setTeamsId(TeamsToEdit.id || null);
        setImagePreview(TeamsToEdit.image ? `${IMAGE_URL}${TeamsToEdit.image}` : null);
        setStep(1);
      } else {
        resetForm();
      }
    }
  }, [isOpen, TeamsToEdit]);

  const resetForm = () => {
    setFormData({ name: "", position: "", department: 'ADMINISTRATION' as Department });
    setImageFile(null);
    setImagePreview(null);
    setTeamsId(null);
    setStep(1);
  };

  const handleFormChange = (field: string, value: string) => {
  if (field === "department") {
    setFormData(prev => ({ ...prev, [field]: value as Department }));
  } else {
    setFormData(prev => ({ ...prev, [field]: value }));
  }
};


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
    if (!formData.position.trim()) return appContext?.showToast("Position is required", "warn");
    if (!formData.department) return appContext?.showToast("Department is required", "warn");
    return true;
  };

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;

    const payload: Teams = {
      id: TeamsId || undefined,
      name: formData.name,
      position: formData.position,
      department: formData.department,
    };

    if (isEditMode && editMutation && TeamsId) {
      editMutation.mutate(payload);
      setStep(2); // move to image step
    } else if (!isEditMode && createMutation) {
      createMutation.mutate(payload as Teams, {
        onSuccess: (res) => {
          const newId = res.data?.id ?? (res as any)?.id;
          if (newId) {
            setTeamsId(newId);
            setStep(2);
          } else appContext?.showToast("Failed to create Teams. No ID returned.", "error");
        },
      });
    }
  };

  const handleSubmitStep2 = () => {
    if (!TeamsId || !imageFile) {
      resetForm();
      onClose();
      return;
    }

    const imagePayload = { id: TeamsId, image: imageFile };
    if (isEditMode && updateImageMutation) {
      updateImageMutation.mutate(imagePayload, { onSuccess: () => { resetForm(); onClose(); } });
    } else if (!isEditMode && uploadImageMutation) {
      uploadImageMutation.mutate(imagePayload, { onSuccess: () => { resetForm(); onClose(); } });
    }
  };

  const handleSkipImage = () => { resetForm(); onClose(); };

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
                  <h2 className="text-2xl font-bold text-white">{isEditMode ? "Edit Teams" : "Add New Teams"}</h2>
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
                disabled={editMutation?.isPending || createMutation?.isPending || uploadImageMutation?.isPending || updateImageMutation?.isPending}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-center mt-6">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 1 ? 'bg-white text-[#135EAB]' : 'bg-white/30 text-white'}`}><span className="font-bold">1</span></div>
                <div className={`w-24 h-1 ${step === 2 ? 'bg-white' : 'bg-white/30'}`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 2 ? 'bg-white text-[#135EAB]' : 'bg-white/30 text-white'}`}><span className="font-bold">2</span></div>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="p-6 md:p-8">
            {step === 1 ? (
              <form onSubmit={handleSubmitStep1} className="space-y-6">
                <TeamsBasicInfoForm
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
                        className="flex-1 px-6 py-3.5 bg-[#135EAB] text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 font-medium disabled:opacity-50"
                      >
                        {editMutation?.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 px-6 py-3.5 bg-gray-200 text-gray-900 rounded-xl hover:bg-gray-300 transition-all font-medium"
                      >
                        Next
                      </button>
                    </>
                  ) : (
                    <button
                      type="submit"
                      disabled={createMutation?.isPending}
                      className="w-full px-6 py-3.5 bg-[#135EAB] text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 font-medium disabled:opacity-50"
                    >
                      {createMutation?.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit & Continue"}
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-start mb-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    ← Back to Basic Info
                  </button>
                </div>

                <TeamImageUploadForm
                  teamName={formData.name}
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

export default AddEditTeamsWizardModal;
