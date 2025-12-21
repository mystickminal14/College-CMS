import React, { useRef, useState, useContext } from "react";
import {
  X,
  Upload,
  Loader2,
  Check,
  Layers,
  Clock,
  FileText,
} from "lucide-react";
import { AppContext } from "../../../context/ContextApp";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiResponse, ApiErrorResponse } from "../../../services/apiTypes";
import InputField from "../../../utils/InputField";
import { FaFilePdf } from "react-icons/fa";
import type { Connects } from "../model/Connects";

interface ConnectPdfUploadFormProps {
  isOpen: boolean;
  onClose: () => void;
  createConnectMutation: UseMutationResult<
    ApiResponse<Connects>,
    ApiErrorResponse,
    {
      issue: string;
      duration: string;
      volumne: string;
      file: File;
    }
  >;
}

const ConnectPdfUploadForm: React.FC<ConnectPdfUploadFormProps> = ({
  isOpen,
  onClose,
  createConnectMutation,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [issue, setIssue] = useState("");
  const [duration, setDuration] = useState("");
  const [volumne, setVolumne] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("ConnectPdfUploadForm must be used inside AppContext");
  }
  const { showToast } = appContext;

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

  const handleSubmit = () => {
    if (!issue.trim()) {
      showToast("Issue is required", "error");
      return;
    }
    if (!volumne.trim()) {
      showToast("Volume is required", "error");
      return;
    }
    if (!duration.trim()) {
      showToast("Duration is required", "error");
      return;
    }
    if (!pdfFile) {
      showToast("Please select a PDF file", "error");
      return;
    }

    createConnectMutation.mutate(
      {
        issue: issue.trim(),
        duration: duration.trim(),
        volumne: volumne.trim(),
        file: pdfFile,
      },
      {
        onSuccess: () => {
          onClose();
          setIssue("");
          setDuration("");
          setVolumne("");
          setPdfFile(null);
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border overflow-hidden">

          {/* HEADER */}
          <div className="bg-linear-to-r from-[#1a7cd3] to-[#1a7cd3] p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white/20 rounded-xl">
                  <FaFilePdf className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Add Connect
                  </h2>
                  <p className="text-white/90 text-sm mt-1">
                    Upload Connect PDF
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                disabled={createConnectMutation.isPending}
                className="p-2 hover:bg-white/20 rounded-xl"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="p-6 md:p-8 space-y-6">

            {/* Issue + Volume */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                icon={<FileText className="w-5 h-5" />}
                label="Issue"
                value={issue}
                field="issue"
                placeholder="Issue 1..."
                required
                onChange={(_, val) => setIssue(val)}
                isSubmitting={createConnectMutation.isPending}
              />

              <InputField
                icon={<Layers className="w-5 h-5" />}
                label="Volume"
                value={volumne}
                field="volumne"
                placeholder="Volume 1..."
                required
                onChange={(_, val) => setVolumne(val)}
                isSubmitting={createConnectMutation.isPending}
              />
            </div>

            {/* Duration */}
            <InputField
              icon={<Clock className="w-5 h-5" />}
              label="Duration"
              value={duration}
              field="duration"
              placeholder="Jan / Feb Issue..."
              required
              onChange={(_, val) => setDuration(val)}
              isSubmitting={createConnectMutation.isPending}
            />

            {/* PDF Upload */}
            <div className="flex flex-col items-center">
              <div
                className="w-56 h-56 border-2 border-dashed rounded-2xl flex items-center justify-center mb-4 bg-gray-50 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {pdfFile ? (
                  <div className="text-center">
                    <FaFilePdf className="w-12 h-12 text-red-600 mx-auto mb-2" />
                    <p className="text-sm">{pdfFile.name}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <FaFilePdf className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Choose PDF</p>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2 rounded-xl bg-gray-100 flex items-center gap-2"
              >
                <Upload className="w-5 h-5" />
                {pdfFile ? "Change PDF" : "Choose PDF"}
              </button>
            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-3 rounded-xl text-[#135EAB] hover:bg-blue-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={createConnectMutation.isPending}
                className="px-4 py-3 bg-green-600 text-white rounded-xl flex items-center justify-center gap-2"
              >
                {createConnectMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Save
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectPdfUploadForm;
