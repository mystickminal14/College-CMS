import React, { useRef, useState, useContext } from "react";
import {  Upload, Loader2, Check } from "lucide-react";
import { AppContext } from "../../../context/ContextApp";
import { FaFilePdf } from "react-icons/fa";

interface JournalFileUploadProps {
  onUpload: (file: File) => void;
  onSkip: () => void;
  isUploading: boolean;
}

const JournalFileUpload: React.FC<JournalFileUploadProps> = ({ onUpload, onSkip, isUploading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const { showToast } = useContext(AppContext)!;

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      showToast("Only PDF files are allowed", "error");
      return;
    }

    setPdfFile(file);
  };

  const handleUploadClick = () => {
    if (!pdfFile) {
      showToast("Please select a PDF to upload", "warn");
      return;
    }
    onUpload(pdfFile);
  };

  const handleRemove = () => {
    setPdfFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <div
        className="w-56 h-56 border-2 border-dashed rounded-2xl flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 cursor-pointer"
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
            <p className="text-sm text-gray-400">Click to select a PDF file</p>
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
        disabled={isUploading}
      />

      <div className="flex items-center gap-3">
        <button
          onClick={triggerFileInput}
          disabled={isUploading}
          className="px-5 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2 transition"
        >
          <Upload className="w-5 h-5" />
          {pdfFile ? "Change PDF" : "Choose PDF"}
        </button>
        <button
          onClick={handleRemove}
          disabled={isUploading || !pdfFile}
          className="px-4 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 transition"
        >
          Remove
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <button
          onClick={onSkip}
          disabled={isUploading}
          className="px-4 py-3 text-[#135EAB] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors font-medium"
        >
          Skip
        </button>
        <button
          onClick={handleUploadClick}
          disabled={isUploading || !pdfFile}
          className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              <span>Upload</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default JournalFileUpload;
