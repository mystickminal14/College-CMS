import React, { useState, useEffect, useContext } from "react";
import { X, UserPlus, Loader2 } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";
import type {  Teams } from "../model/TeamsModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import TeamsBasicInfoForm from "./BasicForm";
import TeamImageUploadForm from "./ImageUpload";
import { AppContext } from "../../../context/ContextApp";
import { IMAGE_URL } from "../../../constants";
import useGetDeptNameAll from "../../our-team-dept/hooks/useGetDeptName";
import type { Dept } from "../../our-team-dept/model/DeptModel";

interface AddEditTeamsWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  TeamsToEdit?: Teams | null;
  createMutation?: UseMutationResult<ApiResponse<Teams>, ApiErrorResponse, Teams>;
  editMutation?: UseMutationResult<ApiResponse<Teams>, ApiErrorResponse, Teams>;
  uploadImageMutation?: UseMutationResult<
    ApiResponse<Teams>,
    ApiErrorResponse,
    { id: number; image: File | null; portrait: File | null }
  >;
 
}

const AddEditTeamsWizardModal: React.FC<AddEditTeamsWizardModalProps> = ({
  isOpen,
  onClose,
  TeamsToEdit,
  createMutation,
  editMutation,
  uploadImageMutation,
}) => {
  const appContext = useContext(AppContext);
  const isEditMode = !!TeamsToEdit;
  const { data: yearRes } = useGetDeptNameAll();

  const deptNames: Dept[] = yearRes?.data ?? [];

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<Teams>({
    name: "",
    position: "",
    departmentId: 0,
    bio: "",
    facebook: "",
    insta: "",
    linkedIn: "",
    email: "",
    phone: "",
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [portraitFile, setPortraitFile] = useState<File | null>(null);
  const [portraitPreview, setPortraitPreview] = useState<string | null>(null);

  const [TeamsId, setTeamsId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (TeamsToEdit) {
        setFormData({
          name: TeamsToEdit.name || "",
          position: TeamsToEdit.position || "",
          departmentId: TeamsToEdit.departmentId,
          bio: TeamsToEdit.bio || "",
          facebook: TeamsToEdit.facebook || "",
          insta: TeamsToEdit.insta || "",
          linkedIn: TeamsToEdit.linkedIn || "",
          email: TeamsToEdit.email || "",
          phone: TeamsToEdit.phone || "",
        });
        setTeamsId(TeamsToEdit.id || null);
        setCoverPreview(TeamsToEdit.image ? `${IMAGE_URL}${TeamsToEdit.image}` : null);
        setPortraitPreview(TeamsToEdit.portrait ? `${IMAGE_URL}${TeamsToEdit.portrait}` : null);
        setStep(1);
      } else {
        resetForm();
      }
    }
  }, [isOpen, TeamsToEdit]);

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      departmentId: 0,
      bio: "",
      facebook: "",
      insta: "",
      linkedIn: "",
      email: "",
      phone: "",
    });
    setCoverFile(null);
    setCoverPreview(null);
    setPortraitFile(null);
    setPortraitPreview(null);
    setTeamsId(null);
    setStep(1);
  };

  const handleFormChange = (field: string, value: string|number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCoverChange = (file: File) => {
    setCoverFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setCoverPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handlePortraitChange = (file: File) => {
    setPortraitFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPortraitPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveCover = () => {
    setCoverFile(null);
    setCoverPreview(null);
  };

  const handleRemovePortrait = () => {
    setPortraitFile(null);
    setPortraitPreview(null);
  };

  const validateStep1 = () => {
    if (!formData.name?.trim()) return appContext?.showToast("Name is required", "warn");
    if (!formData.position?.trim()) return appContext?.showToast("Position is required", "warn");
    if (!formData.departmentId) return appContext?.showToast("Department is required", "warn");
    if (!formData.email) return appContext?.showToast("Email is required", "warn");

    return true;
  };

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;

    const payload: Teams = { ...formData, id: TeamsId || undefined };

    if (isEditMode && editMutation && TeamsId) {
      editMutation.mutate(payload, {
        onSuccess: () => setStep(2),
      });
    } else if (!isEditMode && createMutation) {
      createMutation.mutate(payload, {
        onSuccess: (res) => {
          const newId = res.data?.id ?? (res as any)?.id;
          if (newId) {
            setTeamsId(newId);
            setStep(2);
          } else {
            appContext?.showToast("Failed to create Teams. No ID returned.", "error");
          }
        },
      });
    }
  };

  const handleSubmitStep2 = () => {
    if (!TeamsId) {
      resetForm();
      onClose();
      return;
    }

    const imagePayload = { id: TeamsId, image: coverFile, portrait: portraitFile };

  if (  uploadImageMutation) {
      uploadImageMutation.mutate(imagePayload, {
        onSuccess: () => {
          resetForm();
          onClose();
        },
      });
    }
  };

  const handleSkipImage = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col h-[600px] max-h-[90vh]">
          
          {/* HEADER */}
          <div className="bg-linear-to-r rounded-2xl from-[#125DAA] to-[#1a7cd3] p-5 sm:p-6 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white/20 rounded-xl">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {isEditMode ? "Edit Teams" : "Add New Teams"}
                  </h2>
                  <p className="text-white/90 text-sm mt-1">
                    {step === 1
                      ? "Step 1: Basic Information"
                      : isEditMode
                      ? "Step 2: Image Preview / Update"
                      : "Step 2: Upload Images"}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Progress */}
            <div className="flex justify-center mt-5">
              <div className="flex items-center">
                <div className={`w-9 h-9 flex items-center justify-center rounded-full ${step === 1 ? "bg-white text-[#135EAB]" : "bg-white/30 text-white"}`}>1</div>
                <div className={`w-20 h-1 ${step === 2 ? "bg-white" : "bg-white/30"}`} />
                <div className={`w-9 h-9 flex items-center justify-center rounded-full ${step === 2 ? "bg-white text-[#135EAB]" : "bg-white/30 text-white"}`}>2</div>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            {step === 1 ? (
              <form onSubmit={handleSubmitStep1} className="space-y-6">
                <TeamsBasicInfoForm
                  formData={formData}
                  onChange={handleFormChange}
                  departments={deptNames}
                  isSubmitting={editMutation?.isPending || createMutation?.isPending}
                />

                <div className="pt-4 flex gap-4">
                  {isEditMode ? (
                    <>
                      <button type="submit" className="flex-1 px-6 py-3 bg-[#135EAB] text-white rounded-xl">
                        {editMutation?.isPending ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Update"}
                      </button>
                      <button type="button" onClick={() => setStep(2)} className="flex-1 px-6 py-3 bg-gray-200 rounded-xl">Next</button>
                    </>
                  ) : (
                    <button type="submit" className="w-full px-6 py-3 bg-[#135EAB] text-white rounded-xl">
                      {createMutation?.isPending ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Submit & Continue"}
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <TeamImageUploadForm
                coverPreview={coverPreview}
                portraitPreview={portraitPreview}
                onCoverChange={handleCoverChange}
                onPortraitChange={handlePortraitChange}
                onRemoveCover={handleRemoveCover}
                onRemovePortrait={handleRemovePortrait}
                onSubmit={handleSubmitStep2}
                onSkip={handleSkipImage}
                isUploading={uploadImageMutation?.isPending }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditTeamsWizardModal;
