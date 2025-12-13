import React, { useRef, useState, useContext, useEffect } from "react";
import { X, Upload, Loader2, Check } from "lucide-react";
import { AppContext } from "../../../context/ContextApp";
import type { Downloads } from "../model/handbookModel";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiResponse, ApiErrorResponse } from "../../../services/apiTypes";
import InputField from "../../../utils/InputField";
import { FaFilePdf } from "react-icons/fa";

interface DownloadPdfUploadFormProps {
  isOpen: boolean;
  onClose: () => void;
  DownloadsToEdit?: Downloads | null;
  updateFileMutation: UseMutationResult<ApiResponse<Downloads>, ApiErrorResponse, { name: string; file: File }>;
}

const DownloadPdfUploadForm: React.FC<DownloadPdfUploadFormProps> = ({
  isOpen,
  onClose,
  DownloadsToEdit = null,
  updateFileMutation,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");

  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("DownloadPdfUploadForm must be used inside AppContext");
  const { showToast } = appContext;

  useEffect(() => {
    if (DownloadsToEdit) {
      setName(DownloadsToEdit.name || "");
      setPdfFile(null);
    } else {
      setName("");
      setPdfFile(null);
    }
  }, [DownloadsToEdit, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      showToast("Only PDF files are allowed", "error");
      return;
    }

    setPdfFile(file);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleSubmit = () => {
    if (!name.trim()) {
      showToast("Please enter a name for the download", "error");
      return;
    }

    if (!pdfFile) {
      showToast("Please select a PDF file", "error");
      return;
    }

    updateFileMutation.mutate(
      {
        name: name.trim(),
        file: pdfFile,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const handleCancel = () => onClose();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* HEADER */}
          <div className="bg-linear-to-r from-[#125DAA] to-[#1a7cd3] p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white/20 rounded-xl cursor-pointer">
                  <FaFilePdf className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Add Download</h2>
                  <p className="text-white/90 text-sm mt-1">Upload a PDF for users to download</p>
                </div>
              </div>

              <button
                onClick={onClose}
                disabled={updateFileMutation.isPending}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 disabled:opacity-50 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="p-6 md:p-8">
            <div className="space-y-6">
              {/* Name Field */}
              <InputField
                icon={<FaFilePdf className="w-5 h-5" />}
                label="File Name"
                value={name}
                field="name"
                placeholder="Enter download name"
                required
                onChange={(_, val) => setName(val)}
                isSubmitting={updateFileMutation.isPending}
              />

              {/* PDF Upload Box */}
              <div className="flex flex-col items-center">
                <div
                  className="w-56 h-56 border-2 border-dashed rounded-2xl flex items-center justify-center mb-4 bg-gray-50 dark:bg-gray-700/50 cursor-pointer"
                  onClick={triggerFileInput}
                >
                  {pdfFile ? (
                    <div className="text-center">
                      <FaFilePdf className="w-12 h-12 text-red-600 mx-auto mb-2" />
                      <p className="text-sm">{pdfFile.name}</p>
                    </div>
                  ) : (
                    <div className="text-center px-4">
                      <FaFilePdf className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">
                        {DownloadsToEdit ? "Choose a new PDF to replace (optional)" : "No PDF selected"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Only PDF files allowed</p>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={updateFileMutation.isPending}
                />

                <div className="flex items-center gap-3">
                  <button
                    onClick={triggerFileInput}
                    disabled={updateFileMutation.isPending}
                    className="px-5 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    {pdfFile ? "Change PDF" : "Choose PDF"}
                  </button>

                  <button
                    onClick={() => {
                      setPdfFile(null);
                      fileInputRef.current!.value = "";
                    }}
                    disabled={updateFileMutation.isPending || !pdfFile}
                    className="px-4 py-2 rounded-xl border hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <button
                  onClick={handleCancel}
                  disabled={updateFileMutation.isPending}
                  className="px-4 py-3 text-[#135EAB] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors font-medium disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={updateFileMutation.isPending}
                  className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  {updateFileMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPdfUploadForm;
