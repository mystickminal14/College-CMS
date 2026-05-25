import React, { useEffect, useRef, useState } from "react";
import { X, Loader2, Briefcase, Upload, Image, ArrowRight, ArrowLeft, Check } from "lucide-react";
import type { CreateVacancyPayload, JobVacancy } from "../model/VacancyModel";
import type useCreateVacancy from "../hooks/useCreate";
import type useEditVacancy from "../hooks/useEdit";
import useChangeVacancyImage from "../hooks/useChangeImage";

type CreateMutation = ReturnType<typeof useCreateVacancy>;
type EditMutation = ReturnType<typeof useEditVacancy>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  vacancyToEdit?: JobVacancy | null;
  createMutation: CreateMutation;
  editMutation: EditMutation;
}

const EMPTY_FORM: CreateVacancyPayload = {
  designation: "",
  description: "",
  status: "OPEN",
  applicationStartDate: "",
  applicationEndDate: "",
  location: "",
  timings: "",
  salary: "",
  employmentType: "",
  experienceRequired: "",
};

const inputClass =
  "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelClass = "block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1";

const VacancyFormModal: React.FC<Props> = ({
  isOpen,
  onClose,
  vacancyToEdit,
  createMutation,
  editMutation,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<CreateVacancyPayload>(EMPTY_FORM);
  const [savedVacancyId, setSavedVacancyId] = useState<string | null>(null);
  const [savedPhpVacancyId, setSavedPhpVacancyId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const changeImageMutation = useChangeVacancyImage();

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setImageFile(null);
      setImagePreview(null);
      setSavedVacancyId(null);
      setSavedPhpVacancyId(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (vacancyToEdit) {
      setForm({
        designation: vacancyToEdit.designation,
        description: vacancyToEdit.description ?? "",
        status: vacancyToEdit.status,
        applicationStartDate: vacancyToEdit.applicationStartDate?.slice(0, 10) ?? "",
        applicationEndDate: vacancyToEdit.applicationEndDate?.slice(0, 10) ?? "",
        location: vacancyToEdit.location,
        timings: vacancyToEdit.timings,
        salary: vacancyToEdit.salary ?? "",
        employmentType: vacancyToEdit.employmentType ?? "",
        experienceRequired: vacancyToEdit.experienceRequired ?? "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [vacancyToEdit, isOpen]);

  if (!isOpen) return null;

  const step1Pending = createMutation.isPending || editMutation.isPending;
  const step2Pending = changeImageMutation.isPending;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateVacancyPayload = {
      ...form,
      applicationEndDate: form.applicationEndDate || null,
    };

    if (vacancyToEdit) {
      editMutation.mutate(
        { id: vacancyToEdit.id, ...payload },
        {
          onSuccess: () => {
            setSavedVacancyId(vacancyToEdit.id);
            setStep(2);
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: (res) => {
          if (res.data?.id) setSavedVacancyId(res.data.id);
          const phpId = (res.data as unknown as { phpId?: number })?.phpId;
          if (phpId !== undefined && phpId !== null) setSavedPhpVacancyId(phpId);
          setStep(2);
        },
      });
    }
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !savedVacancyId) {
      onClose();
      return;
    }
    changeImageMutation.mutate(
      { id: savedVacancyId, phpId: savedPhpVacancyId ?? undefined, image: imageFile },
      { onSuccess: onClose }
    );
  };

  const isEditing = !!vacancyToEdit;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">

        {/* Header */}
        <div className="bg-[#1a7cd3] p-5 flex-shrink-0">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {isEditing ? "Edit Vacancy" : "Add Vacancy"}
                </h2>
                <p className="text-white/70 text-xs mt-0.5">
                  Step {step} of 2 — {step === 1 ? "Vacancy Details" : "Upload Poster"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={step1Pending || step2Pending}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step === 1 ? "bg-white text-[#1a7cd3]" : "bg-green-400 text-white"
              }`}>
                {step > 1 ? <Check className="w-4 h-4" /> : "1"}
              </div>
              <span className="text-white/90 text-xs font-medium">Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-white/30 rounded" />
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step === 2 ? "bg-white text-[#1a7cd3]" : "bg-white/30 text-white"
              }`}>
                2
              </div>
              <span className="text-white/90 text-xs font-medium">Poster</span>
            </div>
          </div>
        </div>

        {/* ─── STEP 1: Form ─── */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Designation *</label>
                  <input name="designation" value={form.designation} onChange={handleChange} required placeholder="e.g. Lecturer, IT Officer" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Location *</label>
                  <input name="location" value={form.location} onChange={handleChange} required placeholder="e.g. Kathmandu" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Timings *</label>
                  <input name="timings" value={form.timings} onChange={handleChange} required placeholder="e.g. 9 AM - 5 PM" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Employment Type</label>
                  <select name="employmentType" value={form.employmentType} onChange={handleChange} className={inputClass}>
                    <option value="">Select type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Application Start Date *</label>
                  <input type="date" name="applicationStartDate" value={form.applicationStartDate} onChange={handleChange} required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Application End Date</label>
                  <input type="date" name="applicationEndDate" value={form.applicationEndDate ?? ""} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Salary</label>
                  <input name="salary" value={form.salary ?? ""} onChange={handleChange} placeholder="e.g. NPR 30,000 - 50,000" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Experience Required</label>
                  <input name="experienceRequired" value={form.experienceRequired ?? ""} onChange={handleChange} placeholder="e.g. 2+ years" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Status</label>
                <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea name="description" value={form.description ?? ""} onChange={handleChange} rows={4} placeholder="Job description, responsibilities, requirements..." className={inputClass} />
              </div>
            </div>

            <div className="flex space-x-3 p-5 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <button type="button" onClick={onClose} disabled={step1Pending}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-sm">
                Cancel
              </button>
              <button type="submit" disabled={step1Pending}
                className="flex-1 px-4 py-2.5 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] transition-colors font-medium text-sm flex items-center justify-center disabled:opacity-50">
                {step1Pending ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving...</>
                ) : (
                  <>{isEditing ? "Update & Next" : "Create & Next"}<ArrowRight className="w-4 h-4 ml-2" /></>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ─── STEP 2: Image Upload ─── */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Optionally upload a poster image for this vacancy. You can skip this step.
              </p>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className="max-h-52 rounded-lg object-contain" />
                ) : (
                  <>
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                      <Image className="w-7 h-7 text-blue-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Click to select a poster image</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP</p>
                  </>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

              {imagePreview && (
                <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); }}
                  className="text-xs text-red-500 hover:underline">
                  Remove selected image
                </button>
              )}
            </div>

            <div className="flex space-x-3 p-5 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <button type="button" onClick={() => setStep(1)} disabled={step2Pending}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-sm flex items-center">
                <ArrowLeft className="w-4 h-4 mr-1" />Back
              </button>
              <button type="button" onClick={onClose} disabled={step2Pending}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-sm">
                Skip
              </button>
              <button type="submit" disabled={!imageFile || step2Pending}
                className="flex-1 px-4 py-2.5 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] transition-colors font-medium text-sm flex items-center justify-center disabled:opacity-50">
                {step2Pending ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" />Uploading...</>
                ) : (
                  <><Upload className="w-4 h-4 mr-2" />Upload Poster</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default VacancyFormModal;
