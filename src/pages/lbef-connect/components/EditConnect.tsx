import React, { useRef, useState, useContext } from "react";
import {
  X, Upload, Loader2, Check, Layers, Clock, FileText, 
} from "lucide-react";
import { FaFilePdf } from "react-icons/fa";
import { AppContext } from "../../../context/ContextApp";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiResponse, ApiErrorResponse } from "../../../services/apiTypes";
import type { Connects } from "../model/Connects";
import InputField from "../../../utils/InputField";

interface EditConnectFormProps {
  isOpen: boolean;
  onClose: () => void;
  connect: Connects;
  editConnectMutation: UseMutationResult<ApiResponse<Connects>, ApiErrorResponse, {
    id: number;
    issue?: number;
    duration?: string;
    volume?: number;
    pdf?: File;
  }>;
  
}

const EditConnectForm: React.FC<EditConnectFormProps> = ({
  isOpen,
  onClose,
  connect,
  editConnectMutation,
}) => {
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const [issue, setIssue] = useState(connect.issue.toString());
  const [duration, setDuration] = useState(connect.duration);
  const [volume, setVolume] = useState(connect.volume.toString());
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("EditConnectForm must be used inside AppContext");
  const { showToast } = appContext;

  if (!isOpen) return null;

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf")
      return showToast("Only PDF files are allowed", "error");
    setPdfFile(file);
  };


  const handleSubmit = () => {
    const issueNum = parseInt(issue.trim());
    const volumeNum = parseInt(volume.trim());

    if (!issue.trim() || isNaN(issueNum))
      return showToast("Issue must be a valid number", "error");
    if (!volume.trim() || isNaN(volumeNum))
      return showToast("Volume must be a valid number", "error");
    if (!duration.trim())
      return showToast("Duration is required", "error");

    editConnectMutation.mutate(
      {
        id: connect.id!,
        issue: issueNum,
        duration: duration.trim(),
        volume: volumeNum,
        ...(pdfFile && { pdf: pdfFile }),
      },
      { onSuccess: onClose }
    );
  };

  const isPending = editConnectMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="relative w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col"
        style={{ maxHeight: "80vh" }}
      >
        {/* HEADER */}
        <div className="bg-[#135EAB] p-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">Edit Connect</h2>
          <button
            onClick={onClose}
            disabled={isPending}
            className="p-2 hover:bg-white/20 rounded-xl"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {/* Text fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputField
              icon={<FileText className="w-5 h-5" />}
              label="Issue"
              value={issue}
              field="issue"
              placeholder="Issue 1..."
              required
              onChange={(_, val) => setIssue(val)}
              isSubmitting={isPending}
            />
            <InputField
              icon={<Layers className="w-5 h-5" />}
              label="Volume"
              value={volume}
              field="volume"
              placeholder="Volume 1..."
              required
              onChange={(_, val) => setVolume(val)}
              isSubmitting={isPending}
            />
          </div>
          <InputField
            icon={<Clock className="w-5 h-5" />}
            label="Duration"
            value={duration}
            field="duration"
            placeholder="Jan / Feb Issue..."
            required
            onChange={(_, val) => setDuration(val)}
            isSubmitting={isPending}
          />

          {/* PDF upload */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              PDF File{" "}
              <span className="text-xs text-gray-400">(leave empty to keep current)</span>
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-20 h-20 border-2 border-dashed rounded-xl flex items-center justify-center bg-gray-50 dark:bg-gray-700 cursor-pointer shrink-0"
                onClick={() => pdfInputRef.current?.click()}
              >
                <FaFilePdf
                  className={`w-8 h-8 ${pdfFile ? "text-red-600" : "text-gray-400"}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                {pdfFile ? (
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                    {pdfFile.name}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    Current: {connect.file.split("/").pop()}
                  </p>
                )}
                <button
                  onClick={() => pdfInputRef.current?.click()}
                  className="mt-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm flex items-center gap-1.5 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <Upload className="w-4 h-4" />
                  {pdfFile ? "Change PDF" : "Replace PDF"}
                </button>
              </div>
            </div>
            <input
              ref={pdfInputRef}
              type="file"
              accept="application/pdf"
              onChange={handlePdfChange}
              className="hidden"
            />
          </div>

        </div>

        {/* FOOTER */}
        <div className="p-4 grid grid-cols-2 gap-3 border-t dark:border-gray-700">
          <button
            onClick={onClose}
            disabled={isPending}
            className="py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="py-2 bg-green-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-green-700"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Check className="w-5 h-5" />
            )}
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditConnectForm;