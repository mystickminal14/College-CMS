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
import useUploadJournalDetailsImage, {
  useDeleteJournalDetailsImage,
} from "../hooks/details/useUploadImage";

import JournalFileUpload from "./JournalFileUpload";
import JournalImageUpload from "./JournalImageUpload";
import JournalDetailsForm from "./JournalDetailForm";

type WizardStep = 1 | 2 | 3;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  journalId: number;
  detailsToEdit?: JournalDetailsPayload | null;
  volume?: string;
  issue?: string;
  /** Jump straight to a step — used by the "Upload Issue Image" table action */
  initialStep?: WizardStep;
}

const JournalDetailsWizardModal: React.FC<Props> = ({
  isOpen,
  onClose,
  journalId,
  detailsToEdit,
  volume,
  issue,
  initialStep = 1,
}) => {
  const isEdit = Boolean(detailsToEdit?.id);
  const { showToast } = useContext(AppContext)!;

  const [step, setStep] = useState<WizardStep>(initialStep);
  const [detailsId, setDetailsId] = useState<number | null>(null);

  const [formData, setFormData] = useState<JournalDetailsPayload>({
    title: "",
    authors: [],
    pages: "",
    pageNo: "",
    subject: "",
    country: "",
    abstract: "",
    keywords: [],
    availableOnline: "",
    link: "",
    doi: "",
    howToCite: "",
  });

  const createMutation = useCreateJournalDetails({ parentId: journalId });
  const editMutation = useEditJournalDetails();
  const fileMutation = useUpdateJournalDetailsFile();
  const imageMutation = useUploadJournalDetailsImage();
  const removeImageMutation = useDeleteJournalDetailsImage();

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
        image: detailsToEdit.image || "",
        doi: detailsToEdit.doi || "",
        howToCite: detailsToEdit.howToCite || "",
      });
      setDetailsId(detailsToEdit.id!);
    } else {
      setFormData({
        title: "",
        authors: [],
        pages: "",
        pageNo: "",
        subject: "",
        country: "",
        abstract: "",
        keywords: [],
        availableOnline: "",
        link: "",
        image: "",
        doi: "",
        howToCite: "",
      });
      setDetailsId(null);
    }

    setStep(initialStep);
  }, [detailsToEdit, isEdit, isOpen, initialStep]);

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

    const autoPageNo = (volume && issue && formData.pages)
      ? `${volume} (${issue}) - ${formData.pages}`
      : (formData.pageNo ?? "");

    const payload: EditJournalDetailsPayload["journal"] = {
      title: formData.title,
      authors: formData.authors,
      pages: formData.pages,
      pageNo: autoPageNo,
      subject: formData.subject,
      country: formData.country,
      abstract: formData.abstract,
      availableOnline: formData.availableOnline,
      keywords: formData.keywords,
      link: formData.link,
      doi: formData.doi,
      howToCite: formData.howToCite,
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

  // The PDF is step 2 of 3, so a successful upload moves on to the image step
  // rather than closing the wizard.
  const handleUpload = (file: File) => {
    if (!detailsId) return;
    fileMutation.mutate(
      { id: detailsId, file },
      { onSuccess: () => setStep(3) }
    );
  };

  const handleImageUpload = (file: File) => {
    if (!detailsId) return;
    imageMutation.mutate(
      { id: detailsId, file },
      {
        onSuccess: res => {
          setFormData(prev => ({ ...prev, image: res.data?.image || "" }));
          onClose();
        },
      }
    );
  };

  const handleImageRemove = () => {
    if (!detailsId) return;
    removeImageMutation.mutate(detailsId, {
      onSuccess: () => setFormData(prev => ({ ...prev, image: "" })),
    });
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
              <p className="text-sm">
                Step {step} of 3 —{" "}
                {step === 1
                  ? "Article details"
                  : step === 2
                  ? "PDF upload"
                  : "Image upload (optional)"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="cursor-pointer">
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
                      className="flex-1 px-6 py-3.5 bg-[#135EAB] text-white rounded-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 px-6 py-3.5 bg-gray-200 text-gray-900 rounded-xl cursor-pointer"
                    >
                      Next
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleSubmitStep1}
                    disabled={createMutation.isPending}
                    className="w-full px-6 py-3.5 bg-[#135EAB] text-white rounded-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Continue
                  </button>
                )}
              </div>
            </>
          ) : step === 2 ? (
            <>
              {isEdit && (
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg w-fit cursor-pointer"
                >
                  ← Back
                </button>
              )}

              <JournalFileUpload
                onUpload={handleUpload}
                isUploading={fileMutation.isPending}
                onSkip={() => setStep(3)}
              />
            </>
          ) : (
            <>
              {initialStep !== 3 && (
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg w-fit cursor-pointer"
                >
                  ← Back
                </button>
              )}

              <JournalImageUpload
                onUpload={handleImageUpload}
                onSkip={onClose}
                onRemove={handleImageRemove}
                isUploading={imageMutation.isPending}
                isRemoving={removeImageMutation.isPending}
                currentImage={formData.image || undefined}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalDetailsWizardModal;
