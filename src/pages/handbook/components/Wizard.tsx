import React, { useRef, useState, useContext, useEffect } from "react";
import { X, Loader2, Check, Link as LinkIcon } from "lucide-react";
import { AppContext } from "../../../context/ContextApp";
import type { Downloads } from "../model/handbookModel";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiResponse, ApiErrorResponse } from "../../../services/apiTypes";
import InputField from "../../../utils/InputField";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileAlt,
} from "react-icons/fa";

type TabType = "file" | "link";

interface DownloadPdfUploadFormProps {
  isOpen: boolean;
  onClose: () => void;
  DownloadsToEdit?: Downloads | null;
  updateFileMutation: UseMutationResult<
    ApiResponse<Downloads>,
    ApiErrorResponse,
    { name: string; file?: File; link?: string }
  >;
}

// Allowed file MIME types
const allowedMimeTypes = [
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.ms-powerpoint", // .ppt
];

const getFileIcon = (mime: string) => {
  if (mime === "application/pdf") return <FaFilePdf className="text-red-600 text-4xl" />;
  if (mime.includes("word")) return <FaFileWord className="text-blue-600 text-4xl" />;
  if (mime.includes("excel") || mime.includes("spreadsheet"))
    return <FaFileExcel className="text-green-600 text-4xl" />;
  if (mime.includes("powerpoint"))
    return <FaFilePowerpoint className="text-orange-600 text-4xl" />;
  return <FaFileAlt className="text-gray-600 text-4xl" />;
};

const DownloadPdfUploadForm: React.FC<DownloadPdfUploadFormProps> = ({
  isOpen,
  onClose,
  DownloadsToEdit = null,
  updateFileMutation,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<TabType>("file");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [name, setName] = useState("");

  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("DownloadPdfUploadForm must be used inside AppContext");
  const { showToast } = appContext;

  useEffect(() => {
    if (DownloadsToEdit) {
      setName(DownloadsToEdit.name || "");
      setActiveTab(DownloadsToEdit.link ? "link" : "file");
      setLink(DownloadsToEdit.link || "");
      setPdfFile(null);
    } else {
      setName("");
      setPdfFile(null);
      setLink("");
      setActiveTab("file");
    }
  }, [DownloadsToEdit, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!allowedMimeTypes.includes(file.type)) {
      showToast(
        "Invalid file type. Allowed: PDF, Word, Excel, PowerPoint",
        "error"
      );
      return;
    }

    setPdfFile(file);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleSubmit = () => {
    if (!name.trim()) {
      showToast("Please enter a name", "error");
      return;
    }

    if (activeTab === "file" && !pdfFile) {
      showToast("Please select a file", "error");
      return;
    }

    if (activeTab === "link" && !link.trim()) {
      showToast("Please enter a valid link", "error");
      return;
    }

    updateFileMutation.mutate(
      {
        name: name.trim(),
        file: activeTab === "file" ? pdfFile! : undefined,
        link: activeTab === "link" ? link.trim() : undefined,
      },
      { onSuccess: onClose }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-[#1a7cd3] p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Add Download</h2>
          <button onClick={onClose}>
            <X className="text-white" />
          </button>
        </div>

        {/* TABS */}
        <div className="flex border-b">
          {["file", "link"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as TabType)}
              className={`flex-1 py-3 font-medium ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab === "file" ? "Upload File" : "Add Link"}
            </button>
          ))}
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">
          <InputField
            label="Name"
            value={name}
            field="name"
            placeholder="Enter download name"
            required
            onChange={(_, val) => setName(val)}
            isSubmitting={updateFileMutation.isPending}
          />

          {activeTab === "file" ? (
            <>
              <div
                className="h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer"
                onClick={triggerFileInput}
              >
                {pdfFile ? (
                  <>
                    {getFileIcon(pdfFile.type)}
                    <p className="mt-2 text-sm font-medium text-center px-4">
                      {pdfFile.name}
                    </p>
                    <span className="mt-1 text-xs text-gray-500">
                      {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </>
                ) : (
                  <>
                    <FaFileAlt className="text-4xl text-gray-400 mb-2" />
                    <p className="text-sm text-center px-4">
                      Click to upload document
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, Word, Excel, PowerPoint
                    </p>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept={allowedMimeTypes.join(",")}
                className="hidden"
                onChange={handleFileChange}
              />
            </>
          ) : (
            <InputField
              icon={<LinkIcon className="w-5 h-5" />}
              label="Download Link"
              value={link}
              field="link"
              placeholder="https://example.com/file.pdf"
              onChange={(_, val) => setLink(val)}
            />
          )}

          {/* ACTIONS */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={updateFileMutation.isPending}
              className="flex-1 py-3 bg-green-600 text-white rounded-xl flex justify-center gap-2"
            >
              {updateFileMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Check /> Save
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPdfUploadForm;
