import React, { useState, useEffect, useContext } from "react";
import { X, UserPlus, Loader2 } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { AppContext } from "../../../context/ContextApp";
import { IMAGE_URL } from "../../../constants";
import NewsBasicInfoForm from "./NewsBasicForm";
import NewsImageUploadForm from "./NewsImageUpload";
import type { NewsModel } from "../model/NewsModel";


interface AddEditNewsWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsToEdit?: NewsModel|null ;
    createMutation?: UseMutationResult<ApiResponse<NewsModel>, ApiErrorResponse, NewsModel>;
    editMutation?: UseMutationResult<ApiResponse<NewsModel>, ApiErrorResponse, Partial<NewsModel>>;
    uploadImageMutation?: UseMutationResult<ApiResponse<NewsModel>, ApiErrorResponse, { id: number; image: File }>;
    updateImageMutation?: UseMutationResult<ApiResponse<NewsModel>, ApiErrorResponse, { id: number; image: File }>;
}

const AddEditNewsWizardModal: React.FC<AddEditNewsWizardModalProps> = ({
  isOpen,
  onClose,
  newsToEdit,
  createMutation,
  editMutation,
  uploadImageMutation,
  updateImageMutation,
}) => {
  const appContext = useContext(AppContext);
  const isEditMode = !!newsToEdit;

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    link: "",
    source: "",
    publishedOn: "",
    publishedOnBS: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newsId, setNewsId] = useState<number | null>(null);

  // Prefill form in edit mode
  useEffect(() => {
    if (isOpen) {
      if (newsToEdit) {
        setFormData({
          title: newsToEdit.title || "",
          content: newsToEdit.content || "",
          link: newsToEdit.link || "",
          source: newsToEdit.source || "",
          publishedOn: newsToEdit.publishedOn || "",
          publishedOnBS: newsToEdit.publishedOnBS || "",
        });
        setNewsId(newsToEdit.id ?? null);
        setImagePreview(newsToEdit.image ? `${IMAGE_URL}${newsToEdit.image}` : null);
        setStep(1);
      } else {
        resetForm();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, newsToEdit]);

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      link: "",
      source: "",
      publishedOn: "",
      publishedOnBS: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setNewsId(null);
    setStep(1);
  };

  const handleFormChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

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

  // validation same as your original logic (adapted for fields)
  const validateStep1 = () => {
    if (!formData.title.trim()) return appContext?.showToast("Title is required", "warn");
    if (!formData.source.trim()) return appContext?.showToast("Source is required", "warn");
    if (!formData.publishedOn.trim()) return appContext?.showToast("Published On (AD) is required", "warn");
    return true;
  };

  // Step 1 submission
  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;

    if (isEditMode && editMutation && newsId) {
      editMutation.mutate({ id: newsId, ...formData });
    } else if (!isEditMode && createMutation) {
      createMutation.mutate(formData, {
        onSuccess: (res) => {
          const newId = res.data?.id ?? (res as any)?.id;
          if (newId) {
            setNewsId(newId);
            setStep(2);
          } else appContext?.showToast("Failed to create news. No ID returned.", "error");
        }
      });
    }
  };
  // Step 2 submission
  const handleSubmitStep2 = () => {
    if (!newsId || !imageFile) {
      // No image provided — finish
      resetForm();
      onClose();
      return;
    }

    if (isEditMode && updateImageMutation) {
      updateImageMutation.mutate(
        { id: newsId, image: imageFile },
        {
          onSuccess: () => {
            resetForm();
            onClose();
          },
        }
      );
    } else if (!isEditMode && uploadImageMutation) {
      uploadImageMutation.mutate(
        { id: newsId, image: imageFile },
        {
          onSuccess: () => {
            resetForm();
            onClose();
          },
        }
      );
    }
  };

  const handleSkipImage = () => {
    resetForm();
    onClose();
  };

  // Close guard: disable close while any mutation pending
  const isAnyPending =
    !!createMutation?.isPending ||
    !!editMutation?.isPending ||
    !!uploadImageMutation?.isPending ||
    !!updateImageMutation?.isPending;

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
                  <h2 className="text-2xl font-bold text-white">{isEditMode ? "Edit News" : "Add New News"}</h2>
                  <p className="text-white/90 text-sm mt-1">
                    {step === 1 ? "Step 1: Basic Information" : isEditMode ? "Step 2: Image Preview / Update" : "Step 2: Upload Image"}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                disabled={isAnyPending}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-center mt-6">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 1 ? 'bg-white text-[#1a7cd3]' : 'bg-white/30 text-white'}`}><span className="font-bold">1</span></div>
                <div className={`w-24 h-1 ${step === 2 ? 'bg-white' : 'bg-white/30'}`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 2 ? 'bg-white text-[#1a7cd3]' : 'bg-white/30 text-white'}`}><span className="font-bold">2</span></div>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="p-6 md:p-8">
            {step === 1 ? (
              <form onSubmit={handleSubmitStep1} className="space-y-6">
                <NewsBasicInfoForm
                  formData={formData}
                  onChange={handleFormChange}
                  isSubmitting={!!editMutation?.isPending || !!createMutation?.isPending}
                />

                <div className="pt-4 flex gap-4">
                  {isEditMode ? (
                    <>
                      <button
                        type="button"
                        onClick={handleSubmitStep1}
                        disabled={!!editMutation?.isPending}
                        className="flex-1 px-6 py-3.5 bg-[#1a7cd3] text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 font-medium disabled:opacity-50"
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
                      disabled={!!createMutation?.isPending}
                      className="w-full px-6 py-3.5 bg-[#1a7cd3] text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 font-medium disabled:opacity-50"
                    >
                      {createMutation?.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit & Continue"}
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <NewsImageUploadForm
                newsName={formData.title}
                imagePreview={imagePreview}
                imageFile={imageFile}
                onImageChange={handleImageChange}
                onRemoveImage={handleRemoveImage}
                isUploading={!!uploadImageMutation?.isPending || !!updateImageMutation?.isPending}
                onSkip={handleSkipImage}
                onSubmit={handleSubmitStep2}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditNewsWizardModal;
