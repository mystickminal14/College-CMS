import React, { useState, useEffect, useContext } from "react";
import { X, BookOpen, Loader2 } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Courses, EShift } from "../model/CourseModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

import { AppContext } from "../../../context/ContextApp";
import { IMAGE_URL } from "../../../constants";
import CoursesBasicForm from "./CourseBasicForm";
import CourseImageUploadForm from "./CourseImageUpload";

interface AddEditCoursesWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseToEdit?: Courses | null;

  createMutation?: UseMutationResult<ApiResponse<Courses>, ApiErrorResponse, Courses>;
  editMutation?: UseMutationResult<ApiResponse<Courses>, ApiErrorResponse, Partial<Courses> & { id: number }>;
  uploadImageMutation?: UseMutationResult<ApiResponse<Courses>, ApiErrorResponse, { id: number; image: File }>;
  updateImageMutation?: UseMutationResult<ApiResponse<Courses>, ApiErrorResponse, { id: number; image: File }>;
}

const AddEditCoursesWizardModal: React.FC<AddEditCoursesWizardModalProps> = ({
  isOpen,
  onClose,
  courseToEdit,
  createMutation,
  editMutation,
  uploadImageMutation,
  updateImageMutation,
}) => {
  const appContext = useContext(AppContext);
  const isEditMode = !!courseToEdit;

  const [step, setStep] = useState<1 | 2>(1);
  const [courseId, setCourseId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    degree:"",
    prefix:"",
    credit: "",
    duration: "",
    semester: "",
    shift: "" as EShift,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  /* ---------------- PREFILL EDIT MODE ---------------- */
  useEffect(() => {
    if (!isOpen) return;

    if (courseToEdit) {
      setFormData({
        title: courseToEdit.title ?? "",
        category: courseToEdit.category ?? "",
        degree: courseToEdit.degree ?? "",

        prefix: courseToEdit.prefix ?? "",

        credit: String(courseToEdit.credit ?? ""),
        duration: courseToEdit.duration ?? "",
        semester: String(courseToEdit.semester ?? ""),
        shift: courseToEdit.shift ?? "MORNING",
      });

      setCourseId(courseToEdit.id ?? null);
      setImagePreview(courseToEdit.image ? `${IMAGE_URL}${courseToEdit.image}` : null);
      setStep(1);
    } else {
      resetForm();
    }
  }, [isOpen, courseToEdit]);

  const resetForm = () => {
    setFormData({
      title: "",
      prefix:"",
      degree:"",
      category: "",
      credit: "",
      duration: "",
      semester: "",
      shift: "" as EShift,
    });
    setImageFile(null);
    setImagePreview(null);
    setCourseId(null);
    setStep(1);
  };

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (field: string, value: string) =>
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

  /* ---------------- VALIDATION ---------------- */
  const validateStep1 = () => {
    if (!formData.title.trim()) return appContext?.showToast("Course title is required", "warn");
    if (!formData.degree.trim()) return appContext?.showToast("Degree  is required", "warn");
    if (!formData.prefix.trim()) return appContext?.showToast("Degree Prefix is required", "warn");

    if (!formData.category.trim()) return appContext?.showToast("Category is required", "warn");
    if (!formData.credit.trim()) return appContext?.showToast("Credit is required", "warn");
    if (!formData.duration.trim()) return appContext?.showToast("Duration is required", "warn");
    if (!formData.semester.trim()) return appContext?.showToast("Semester is required", "warn");
    if (!formData.shift) return appContext?.showToast("Shift is required", "warn");
    return true;
  };

  /* ---------------- STEP 1 SUBMIT ---------------- */
  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;

    if (isEditMode && editMutation && courseId) {
      editMutation.mutate({ id: courseId, ...formData });
    } else if (!isEditMode && createMutation) {
      createMutation.mutate(formData as Courses, {
        onSuccess: (res) => {
          const newId = res.data?.id;
          if (!newId) {
            appContext?.showToast("Failed to create course", "error");
            return;
          }
          setCourseId(newId);
          setStep(2);
        },
      });
    }
  };

  /* ---------------- STEP 2 SUBMIT ---------------- */
  const handleSubmitStep2 = () => {
    if (!courseId || !imageFile) {
      resetForm();
      onClose();
      return;
    }

    const mutation = isEditMode ? updateImageMutation : uploadImageMutation;

    mutation?.mutate(
      { id: courseId, image: imageFile },
      { onSuccess: () => { resetForm(); onClose(); } }
    );
  };

  if (!isOpen) return null;

  /* ======================= UI ======================= */
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-[#135EAB] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-white" />
            <div>
              <h2 className="text-2xl font-bold text-white">
                {isEditMode ? "Edit Course" : "Add New Course"}
              </h2>
              <p className="text-white/90 text-sm">
                {step === 1 ? "Step 1: Basic Information" : "Step 2: Course Image"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl">
            <X className="text-white" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 md:p-8">
          {step === 1 ? (
            <form onSubmit={handleSubmitStep1} className="space-y-6">
              <CoursesBasicForm
                formData={formData}
                onChange={handleChange}
                isSubmitting={createMutation?.isPending || editMutation?.isPending}
              />

              <div className="flex gap-3">
                {/* Primary Save/Update Button */}
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-[#135EAB] text-white rounded-xl font-medium hover:bg-blue-700 flex justify-center items-center"
                >
                  {(createMutation?.isPending || editMutation?.isPending)
                    ? <Loader2 className="animate-spin" />
                    : isEditMode ? "Update Course" : "Save & Continue"}
                </button>

                {/* Next Image Button for Edit Mode */}
                {isEditMode && (
                  <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 px-6 py-3.5 bg-gray-200 text-gray-900 rounded-xl hover:bg-gray-300 transition-all font-medium"
            >
              Next
            </button>
                )}
              </div>
            </form>
          ) : (
            <CourseImageUploadForm
              courseName={formData.title}
              imagePreview={imagePreview}
              imageFile={imageFile}
              onImageChange={handleImageChange}
              onRemoveImage={handleRemoveImage}
                    isUploading={uploadImageMutation?.isPending || updateImageMutation?.isPending || false}
              onSkip={() => { resetForm(); onClose(); }}
              onSubmit={handleSubmitStep2}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEditCoursesWizardModal;
