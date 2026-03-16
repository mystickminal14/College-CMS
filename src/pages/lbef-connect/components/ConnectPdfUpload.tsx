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
      issue: number;
      duration: string;
      volumne: number;
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
  if (!appContext) throw new Error("ConnectPdfUploadForm must be used inside AppContext");
  const { showToast } = appContext;

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") return showToast("Only PDF files are allowed", "error");
    setPdfFile(file);
  };

const handleSubmit = () => {
  const issueNum = parseInt(issue.trim());
  const volumeNum = parseInt(volumne.trim());

  if (!issue.trim() || isNaN(issueNum)) return showToast("Issue must be a valid number", "error");
  if (!volumne.trim() || isNaN(volumeNum)) return showToast("Volume must be a valid number", "error");
  if (!duration.trim()) return showToast("Duration is required", "error");
  if (!pdfFile) return showToast("Please select a PDF file", "error");

  createConnectMutation.mutate(
    { issue: issueNum, duration: duration.trim(), volumne: volumeNum, file: pdfFile },
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
      <div className="relative w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col" style={{ maxHeight: "75vh" }}>
        {/* HEADER */}
        <div className="bg-[#135EAB] p-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">Add Connect</h2>
          <button onClick={onClose} disabled={createConnectMutation.isPending} className="p-2 hover:bg-white/20 rounded-xl">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputField icon={<FileText className="w-5 h-5" />} label="Issue" value={issue} field="issue" placeholder="Issue 1..." required onChange={(_, val) => setIssue(val)} isSubmitting={createConnectMutation.isPending} />
            <InputField icon={<Layers className="w-5 h-5" />} label="Volume" value={volumne} field="volumne" placeholder="Volume 1..." required onChange={(_, val) => setVolumne(val)} isSubmitting={createConnectMutation.isPending} />
          </div>
          <InputField icon={<Clock className="w-5 h-5" />} label="Duration" value={duration} field="duration" placeholder="Jan / Feb Issue..." required onChange={(_, val) => setDuration(val)} isSubmitting={createConnectMutation.isPending} />

          {/* PDF UPLOAD */}
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 border-2 border-dashed rounded-2xl flex items-center justify-center mb-2 bg-gray-50 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              {pdfFile ? (
                <div className="text-center">
                  <FaFilePdf className="w-12 h-12 text-red-600 mx-auto mb-1" />
                  <p className="text-sm truncate w-40">{pdfFile.name}</p>
                </div>
              ) : (
                <div className="text-center">
                  <FaFilePdf className="w-12 h-12 text-gray-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Choose PDF</p>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 rounded-xl bg-gray-100 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              {pdfFile ? "Change PDF" : "Choose PDF"}
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 grid grid-cols-2 gap-3">
          <button onClick={onClose} className="py-2 bg-gray-200 text-gray-900 rounded-xl hover:bg-gray-300">Cancel</button>
          <button onClick={handleSubmit} disabled={createConnectMutation.isPending} className="py-2 bg-green-600 text-white rounded-xl flex items-center justify-center gap-2">
            {createConnectMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectPdfUploadForm;
