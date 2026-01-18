import React, { useState, useEffect, useContext } from "react";
import { X, UserPlus, Loader2 } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Alumni } from "../model/AlumniModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import AlumniBasicInfoForm from "./AlumniBasicForm";
import AlumniImageUploadForm from "./AlumniImageUpload";
import { AppContext } from "../../../context/ContextApp";
import { IMAGE_URL } from "../../../constants";

interface AddEditAlumniWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  alumniToEdit?: Alumni;
  createMutation?: UseMutationResult<ApiResponse<Alumni>, ApiErrorResponse, Alumni>;
  editMutation?: UseMutationResult<ApiResponse<Alumni>, ApiErrorResponse, Partial<Alumni>>;
  uploadImageMutation?: UseMutationResult<ApiResponse<Alumni>, ApiErrorResponse, { id: number; image: File }>;
  updateImageMutation?: UseMutationResult<ApiResponse<Alumni>, ApiErrorResponse, { id: number; image: File }>;
}

const AddEditAlumniWizardModal: React.FC<AddEditAlumniWizardModalProps> = ({
  isOpen,
  onClose,
  alumniToEdit,
  createMutation,
  editMutation,
  uploadImageMutation,
  updateImageMutation,
}) => {
  const appContext = useContext(AppContext);
  const isEditMode = !!alumniToEdit;

  const [step, setStep] = useState<1 | 2>(1);
  const [alumniId, setAlumniId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", position: "", batch: "", course: "", story: "", link: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Prefill in edit mode
  useEffect(() => {
    if (!isOpen) return;

    if (alumniToEdit) {
      setFormData({
        name: alumniToEdit.name || "",
        position: alumniToEdit.position || "",
        batch: alumniToEdit.batch || "",
        link: alumniToEdit.link || "",
        course: alumniToEdit.course || "",
        story: alumniToEdit.story || "",
      });
      setAlumniId(alumniToEdit.id || null);
      setImagePreview(alumniToEdit.image ? `${IMAGE_URL}${alumniToEdit.image}` : null);
      setStep(1);
    } else resetForm();
  }, [isOpen, alumniToEdit]);

  const resetForm = () => {
    setFormData({ name: "", position: "", batch: "", course: "", story: "", link: "" });
    setImageFile(null);
    setImagePreview(null);
    setAlumniId(null);
    setStep(1);
  };

  const handleFormChange = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleImageChange = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };
  const handleRemoveImage = () => { setImageFile(null); setImagePreview(null); };

  const validateStep1 = () => {
    if (!formData.name.trim()) return appContext?.showToast("Name is required", "warn");
    if (!formData.position.trim()) return appContext?.showToast("Position is required", "warn");
    if (!formData.batch.trim()) return appContext?.showToast("Batch is required", "warn");
    if (!formData.course.trim()) return appContext?.showToast("Course is required", "warn");
    return true;
  };

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;

    if (isEditMode && editMutation && alumniId) {
      editMutation.mutate({ id: alumniId, ...formData });
    } else if (!isEditMode && createMutation) {
      createMutation.mutate(formData, {
        onSuccess: (res) => {
          const newId = res.data?.id;
          if (newId) { setAlumniId(newId); setStep(2); }
          else appContext?.showToast("Failed to create alumni. No ID returned.", "error");
        }
      });
    }
  };

  const handleSubmitStep2 = () => {
    if (!alumniId || !imageFile) { resetForm(); onClose(); return; }

    const mutation = isEditMode ? updateImageMutation : uploadImageMutation;
    mutation?.mutate({ id: alumniId, image: imageFile }, { onSuccess: () => { resetForm(); onClose(); } });
  };

  const handleSkipImage = () => { resetForm(); onClose(); };

  const isAnyPending =
    !!createMutation?.isPending ||
    !!editMutation?.isPending ||
    !!uploadImageMutation?.isPending ||
    !!updateImageMutation?.isPending;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ maxHeight: '75vh' }}>
        {/* HEADER */}
        <div className="bg-[#135EAB] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserPlus className="w-7 h-7 text-white" />
            <div>
              <h2 className="text-2xl font-bold text-white">{isEditMode ? "Edit Alumni" : "Add New Alumni"}</h2>
              <p className="text-white/90 text-sm">{step === 1 ? "Step 1: Basic Information" : "Step 2: Upload Image"}</p>
            </div>
          </div>
          <button onClick={onClose} disabled={isAnyPending} className="p-2 hover:bg-white/20 rounded-xl"><X className="text-white"/></button>
        </div>

        {/* BODY */}
        <div className="p-6 md:p-8 overflow-y-auto" style={{ maxHeight: 'calc(75vh - 96px)' }}>
          {step === 1 ? (
            <form onSubmit={handleSubmitStep1} className="space-y-6">
              <AlumniBasicInfoForm formData={formData} onChange={handleFormChange} isSubmitting={isAnyPending} />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 py-3.5 bg-[#135EAB] text-white rounded-xl font-medium flex justify-center items-center">
                  {editMutation?.isPending || createMutation?.isPending ? <Loader2 className="animate-spin" /> : isEditMode ? "Update" : "Submit & Continue"}
                </button>
                {isEditMode && (
                  <button type="button" onClick={onClose} className="flex-1 py-3.5 bg-gray-200 text-gray-900 rounded-xl font-medium">Cancel</button>
                )}
              </div>
            </form>
          ) : (
            <AlumniImageUploadForm
              alumniName={formData.name}
              imagePreview={imagePreview}
              imageFile={imageFile}
              onImageChange={handleImageChange}
              onRemoveImage={handleRemoveImage}
              isUploading={uploadImageMutation?.isPending || updateImageMutation?.isPending || false}
              onSkip={handleSkipImage}
              onSubmit={handleSubmitStep2}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEditAlumniWizardModal;
