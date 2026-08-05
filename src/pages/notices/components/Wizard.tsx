import React, { useState, useEffect, useContext } from "react";
import { X, UserPlus, Loader2 } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import NoticesBasicInfoForm from "./BasicForm";
import NoticePdfUploadForm from "./ImageUpload";
import { AppContext } from "../../../context/ContextApp";
import type { Notices } from "../model/NoticeModel";

interface AddEditNoticesWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  NoticesToEdit?: Notices | null;
  createMutation?: UseMutationResult<ApiResponse<Notices>, ApiErrorResponse, Notices>;
  editMutation?: UseMutationResult<ApiResponse<Notices>, ApiErrorResponse, Notices>;
  uploadPdfMutation?: UseMutationResult<ApiResponse<Notices>, ApiErrorResponse, { file: File; name: string }>;
  updatePdfMutation?: UseMutationResult<ApiResponse<Notices>, ApiErrorResponse, { file: File; name: string }>;
}

const AddEditNoticesWizardModal: React.FC<AddEditNoticesWizardModalProps> = ({
  isOpen,
  onClose,
  NoticesToEdit,
  createMutation,
  editMutation,
  uploadPdfMutation,
  updatePdfMutation,
}) => {
  const appContext = useContext(AppContext);
  const isEditMode = !!NoticesToEdit;

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<{ title: string; program_name: string; date: string; typeId: number | "" }>({
    title: "",
    program_name: "",
    date: "",
    typeId: "",
  });
  const [noticeId, setNoticeId] = useState<number | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [existingPdfFileName, setExistingPdfFileName] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (NoticesToEdit) {
        setFormData({
          title: NoticesToEdit.title || NoticesToEdit.program_name || "",
          program_name: NoticesToEdit.program_name || "",
          date: NoticesToEdit.date || "",
          typeId: NoticesToEdit.typeId ?? NoticesToEdit.type?.id ?? "",
        });
        setNoticeId(NoticesToEdit.id || null);

        // Extract filename from the file path if it exists
        if (NoticesToEdit.file) {
          const fileName = NoticesToEdit.file.split('/').pop() || '';
          setExistingPdfFileName(fileName);
        } else {
          setExistingPdfFileName(null);
        }

        setStep(1);
        setPdfFile(null);
      } else {
        resetForm();
      }
    }
  }, [isOpen, NoticesToEdit]);

  const resetForm = () => {
    setFormData({ title: "", program_name: "", date: "", typeId: "" });
    setNoticeId(null);
    setPdfFile(null);
    setExistingPdfFileName(null);
    setStep(1);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "typeId" ? (value ? Number(value) : "") : value,
    }));
  };

  const validateStep1 = () => {
    if (!formData.title.trim()) return appContext?.showToast("Title is required", "warn");
    if (!formData.program_name.trim()) return appContext?.showToast("Program name is required", "warn");
    if (!formData.date.trim()) return appContext?.showToast("Date is required", "warn");
    if (!formData.typeId) return appContext?.showToast("Notice type is required", "warn");
    return true;
  };

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;

    const payload: Notices = {
      id: noticeId || undefined,
      title: formData.title,
      program_name: formData.program_name,
      date: formData.date,
      typeId: Number(formData.typeId),
    };

    if (isEditMode && editMutation && noticeId) {
      editMutation.mutate(payload, {
        onSuccess: () => {
          appContext?.showToast("Notice updated successfully", "success");
          setStep(2); // go to PDF step
        },
      });
    } else if (!isEditMode && createMutation) {
      createMutation.mutate(payload, {
        onSuccess: (res) => {
          const newId = res.data?.id ?? (res as any)?.id;
          if (newId) {
            setNoticeId(newId);
            setStep(2); // go to PDF step
          } else appContext?.showToast("Failed to create notice. No ID returned.", "error");
        },
      });
    }
  };

  const handleSubmitStep2 = () => {
    if (!noticeId || !pdfFile) {
      appContext?.showToast("Please select a PDF file", "error");
      return;
    }

    const payload = { file: pdfFile, name: noticeId.toString() };

    if (isEditMode && updatePdfMutation) {
      updatePdfMutation.mutate(payload, {
        onSuccess: () => {
          resetForm();
          onClose();
        },
      });
    } else if (!isEditMode && uploadPdfMutation) {
      uploadPdfMutation.mutate(payload, {
        onSuccess: () => {
          resetForm();
          onClose();
        },
      });
    }
  };

  const handleSkipPdf = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const isStep1Submitting = editMutation?.isPending || createMutation?.isPending;
  const isStep2Uploading = uploadPdfMutation?.isPending || updatePdfMutation?.isPending || false;

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
                    {isEditMode ? "Edit Notice" : "Add New Notice"}
                  </h2>
                  <p className="text-white/90 text-sm mt-1">
                    {step === 1 ? "Step 1: Basic Information" : "Step 2: Upload PDF"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                disabled={isStep1Submitting || isStep2Uploading}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="p-6 md:p-8">
            {step === 1 ? (
              <form onSubmit={handleSubmitStep1} className="space-y-6">
                <NoticesBasicInfoForm
                  formData={formData}
                  onChange={handleFormChange}
                  isSubmitting={isStep1Submitting}
                />
                <div className="pt-4 flex gap-4">
                  <button
                    type="submit"
                    disabled={isStep1Submitting}
                    className="w-full px-6 py-3.5 bg-[#135EAB] text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 font-medium disabled:opacity-50"
                  >
                    {isStep1Submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3.5 bg-gray-200 text-gray-900 rounded-xl hover:bg-gray-300 transition-all font-medium"
                  >
                    Next
                  </button>
                </div>
              </form>
            ) : (
              <NoticePdfUploadForm
                noticeName={formData.program_name}
                pdfFile={pdfFile}
                existingPdfFileName={existingPdfFileName}
                onFileChange={setPdfFile}
                onRemoveFile={() => {
                  setPdfFile(null);
                  setExistingPdfFileName(null);
                }}
                onSubmit={handleSubmitStep2}
                onSkip={handleSkipPdf}
                isUploading={isStep2Uploading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditNoticesWizardModal;