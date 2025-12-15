import React, { useContext, useRef } from "react";
import { X, Upload, Loader2, Check } from "lucide-react";
import { AppContext } from "../../../context/ContextApp";
import { FaFilePdf } from "react-icons/fa";

interface NoticePdfUploadFormProps {
  noticeName: string;
  pdfFile: File | null;
  onFileChange: (file: File | null) => void;
  onRemoveFile: () => void;
  isUploading?: boolean;
  onSkip: () => void;
  onSubmit: () => void;
}

const NoticePdfUploadForm: React.FC<NoticePdfUploadFormProps> = ({
  noticeName,
  pdfFile,
  onFileChange,
  onRemoveFile,
  isUploading = false,
  onSkip,
  onSubmit,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const appContext = useContext(AppContext);

  if (!appContext) throw new Error("NoticePdfUploadForm must be used inside AppContext");
  const { showToast } = appContext;

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      showToast("Only PDF files are allowed", "error");
      return;
    }

    onFileChange(file);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {pdfFile ? "Selected PDF / Upload New" : "Upload PDF for Notice"}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {pdfFile ? `Selected file for ${noticeName}` : `Choose a PDF file for ${noticeName}`}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="relative mb-6">
          <div className="w-56 h-56 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-700/50 cursor-pointer"
               onClick={triggerFileInput}>
            {pdfFile ? (
              <div className="text-center">
                <FaFilePdf className="w-12 h-12 text-red-600 mx-auto mb-2" />
                <p className="text-sm">{pdfFile.name}</p>
                <button type="button" onClick={onRemoveFile} disabled={isUploading} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center px-4">
                <FaFilePdf className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">{`No PDF selected for ${noticeName}`}</p>
                <p className="text-xs text-gray-400 mt-1">Only PDF files allowed</p>
              </div>
            )}
          </div>
        </div>

        <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" disabled={isUploading} />

        <button type="button" onClick={triggerFileInput} disabled={isUploading} className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2 font-medium disabled:opacity-50">
          <Upload className="w-5 h-5" />
          <span>{pdfFile ? "Change PDF" : "Choose PDF"}</span>
        </button>

        {!pdfFile && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
            PDF is optional. You can skip this step.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <button type="button" onClick={onSkip} disabled={isUploading} className="px-4 py-3 text-[#135EAB] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors font-medium disabled:opacity-50">
          Skip
        </button>

        <button type="button" onClick={onSubmit} disabled={isUploading || !pdfFile} className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50">
          {isUploading ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Uploading...</span></> : <><Check className="w-5 h-5" /><span>Save</span></>}
        </button>
      </div>
    </div>
  );
};

export default NoticePdfUploadForm;
