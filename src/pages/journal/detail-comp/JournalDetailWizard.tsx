import { useEffect, useState, useContext } from "react";
import { X, FilePlus } from "lucide-react";
import { AppContext } from "../../../context/ContextApp";

import type {
  JournalDetailsPayload,
  EditJournalDetailsPayload,
} from "../model/JournalModel";

import useCreateJournalDetails from "../hooks/details/useCreateDetails";
import useEditJournalDetails from "../hooks/details/useEditJournalDetails";
import useUpdateJournalDetailsFile from "../hooks/details/useUploadFile";

import JournalFileUpload from "./JournalFileUpload";
import JournalDetailsForm from "./JournalDetailForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  journalId: number;
  detailsToEdit?: JournalDetailsPayload | null;
}

const JournalDetailsWizardModal: React.FC<Props> = ({
  isOpen,
  onClose,
  journalId,
  detailsToEdit,
}) => {
  const isEdit = Boolean(detailsToEdit?.id); // ✅ safer check
  const { showToast } = useContext(AppContext)!;

  const [step, setStep] = useState<1 | 2>(1);
  const [detailsId, setDetailsId] = useState<number | null>(null);

  const [formData, setFormData] = useState<JournalDetailsPayload>({
    title: "",
    authors: [],
    pages: "",
    subject: "",
    country: "",
    abstract: "",
    keywords: [],
    availableOnline: "",
    link: "",
  });

  const createMutation = useCreateJournalDetails({ parentId: journalId });
  const editMutation = useEditJournalDetails();
  const fileMutation = useUpdateJournalDetailsFile();

  /* ------------------ PREFILL / RESET ------------------ */
  useEffect(() => {
    if (!isOpen) return;

    if (isEdit && detailsToEdit) {
      setFormData({
        ...detailsToEdit,
        authors: detailsToEdit.authors || [],
        keywords: detailsToEdit.keywords || [],
        availableOnline: detailsToEdit.availableOnline
          ? new Date(detailsToEdit.availableOnline)
              .toISOString()
              .split("T")[0]
          : "",
        link: detailsToEdit.link || "",
      });
      setDetailsId(detailsToEdit.id!);
    } else {
      setFormData({
        title: "",
        authors: [],
        pages: "",
        subject: "",
        country: "",
        abstract: "",
        keywords: [],
        availableOnline: "",
        link: "",
      });
      setDetailsId(null);
    }

    setStep(1); // always start from step 1
  }, [detailsToEdit, isEdit, isOpen]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (!formData.title?.trim()) {
      showToast("Title is required", "warn");
      return false;
    }
    if ((formData.authors?.length ?? 0) === 0) {
      showToast("At least one author is required", "warn");
      return false;
    }
    return true;
  };

  const handleSubmitStep1 = () => {
    if (!validateStep1()) return;

    const payload: EditJournalDetailsPayload["journal"] = {
      title: formData.title,
      authors: formData.authors,
      pages: formData.pages,
      subject: formData.subject,
      country: formData.country,
      abstract: formData.abstract,
      availableOnline: formData.availableOnline,
      keywords: formData.keywords,
      link: formData.link,
    };

    if (isEdit && detailsId) {
      editMutation.mutate(
        { id: detailsId, journal: payload },
        { onSuccess: () => setStep(2) }
      );
    } else {
      createMutation.mutate(
        { ...payload, journalId },
        {
          onSuccess: res => {
            setDetailsId(res.data?.id!);
            setStep(2);
          },
        }
      );
    }
  };

  const handleUpload = (file: File) => {
    if (!detailsId) return;
    fileMutation.mutate({ id: detailsId, file }, { onSuccess: onClose });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#1a7cd3] p-5 flex justify-between text-white">
          <div className="flex gap-3 items-center">
            <FilePlus />
            <div>
              <h2 className="text-xl font-bold">
                {isEdit ? "Edit Journal Details" : "Add Journal Details"}
              </h2>
              <p className="text-sm">Step {step} of 2</p>
            </div>
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col space-y-4">
          {step === 1 ? (
            <>
              <JournalDetailsForm
                formData={formData}
                onChange={handleChange}
                isSubmitting={
                  createMutation.isPending || editMutation.isPending
                }
              />

              {/* Step 1 Buttons */}
              <div className="flex gap-4 mt-4">
                {isEdit ? (
                  <>
                    <button
                      onClick={handleSubmitStep1}
                      disabled={editMutation.isPending}
                      className="flex-1 px-6 py-3.5 bg-[#135EAB] text-white rounded-xl"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 px-6 py-3.5 bg-gray-200 text-gray-900 rounded-xl"
                    >
                      Next
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleSubmitStep1}
                    disabled={createMutation.isPending}
                    className="w-full px-6 py-3.5 bg-[#135EAB] text-white rounded-xl"
                  >
                    Continue
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              {isEdit && (
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg w-fit"
                >
                  ← Back
                </button>
              )}

              <JournalFileUpload
                onUpload={handleUpload}
                isUploading={fileMutation.isPending}
                onSkip={onClose}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalDetailsWizardModal;
