import React, { useState, useEffect, useContext } from "react";
import { X, BookOpen,  } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { NewsModel } from "../model/NewsModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import NewsBasicInfoForm from "./NewsBasicForm";
import NewsImageUploadForm from "./NewsImageUpload";
import { AppContext } from "../../../context/ContextApp";
import { IMAGE_URL } from "../../../constants";

interface AddEditNewsWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsToEdit?: NewsModel;
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
  const [newsId, setNewsId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "", link: "", source: "", publishedOn: "", publishedOnBS: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
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
    } else resetForm();
  }, [isOpen, newsToEdit]);

  const resetForm = () => {
    setFormData({ title: "", content: "", link: "", source: "", publishedOn: "", publishedOnBS: "" });
    setImageFile(null);
    setImagePreview(null);
    setNewsId(null);
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
    if (!formData.title.trim()) return appContext?.showToast("Title is required", "warn");
    if (!formData.source.trim()) return appContext?.showToast("Source is required", "warn");
    if (!formData.publishedOn.trim()) return appContext?.showToast("Published On is required", "warn");
    return true;
  };

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;

    if (isEditMode && editMutation && newsId) {
      editMutation.mutate({ id: newsId, ...formData });
    } else if (!isEditMode && createMutation) {
      createMutation.mutate(formData, {
        onSuccess: (res) => {
          const newId = res.data?.id;
          if (newId) { setNewsId(newId); setStep(2); }
          else appContext?.showToast("Failed to create news. No ID returned.", "error");
        }
      });
    }
  };

  const handleSubmitStep2 = () => {
    if (!newsId || !imageFile) { resetForm(); onClose(); return; }
    const mutation = isEditMode ? updateImageMutation : uploadImageMutation;
    mutation?.mutate({ id: newsId, image: imageFile }, { onSuccess: () => { resetForm(); onClose(); } });
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
            <BookOpen className="w-7 h-7 text-white" />
            <div>
              <h2 className="text-2xl font-bold text-white">{isEditMode ? "Edit News" : "Add News"}</h2>
              <p className="text-white/90 text-sm">{step === 1 ? "Step 1: Basic Info" : "Step 2: Upload Image"}</p>
            </div>
          </div>
          <button onClick={onClose} disabled={isAnyPending} className="p-2 hover:bg-white/20 rounded-xl"><X className="text-white"/></button>
        </div>

        {/* BODY */}
        <div className="p-6 md:p-8 overflow-y-auto" style={{ maxHeight: 'calc(75vh - 96px)' }}>
          {step === 1 ? (
            <form onSubmit={handleSubmitStep1} className="space-y-6">
              <NewsBasicInfoForm formData={formData} onChange={handleFormChange} isSubmitting={isAnyPending} />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 py-3.5 bg-[#135EAB] text-white rounded-xl font-medium flex justify-center items-center">
                  {isEditMode ? "Update" : "Submit & Continue"}
                </button>
                {isEditMode && (
                  <button type="button" onClick={onClose} className="flex-1 py-3.5 bg-gray-200 text-gray-900 rounded-xl font-medium">Cancel</button>
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

export default AddEditNewsWizardModal;
