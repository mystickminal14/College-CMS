import React, { useEffect, useRef, useState, useContext } from "react";
import { Upload, Loader2, Check, ImageIcon, Trash2 } from "lucide-react";
import { AppContext } from "../../../context/ContextApp";
import { IMAGE_URL } from "../../../constants";

interface JournalImageUploadProps {
  onUpload: (file: File) => void;
  onSkip: () => void;
  onRemove?: () => void;
  isUploading: boolean;
  isRemoving?: boolean;
  /** Image already saved on the article, if any */
  currentImage?: string;
}

const MAX_SIZE_MB = 5;

const JournalImageUpload: React.FC<JournalImageUploadProps> = ({
  onUpload,
  onSkip,
  onRemove,
  isUploading,
  isRemoving = false,
  currentImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { showToast } = useContext(AppContext)!;

  // Object URLs must be released or the blob stays in memory for the session.
  useEffect(() => {
    if (!imageFile) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Only image files are allowed", "error");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      showToast(`Image must be smaller than ${MAX_SIZE_MB}MB`, "error");
      return;
    }

    setImageFile(file);
  };

  const handleUploadClick = () => {
    if (!imageFile) {
      showToast("Please select an image to upload", "warn");
      return;
    }
    onUpload(imageFile);
  };

  const handleClear = () => {
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const shownImage = preview || (currentImage ? `${IMAGE_URL}${currentImage}` : null);
  const busy = isUploading || isRemoving;

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <div
        className="w-56 h-56 border-2 border-dashed rounded-2xl flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-700/50 cursor-pointer"
        onClick={triggerFileInput}
      >
        {shownImage ? (
          <img
            src={shownImage}
            alt="Article"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center px-4">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Click to select an image</p>
            <p className="text-xs text-gray-400 mt-1">
              JPG / PNG / WebP, max {MAX_SIZE_MB}MB
            </p>
          </div>
        )}
      </div>

      {currentImage && !imageFile && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Current image — uploading a new one replaces it
        </p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={busy}
      />

      <div className="flex items-center gap-3">
        <button
          onClick={triggerFileInput}
          disabled={busy}
          className="px-5 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Upload className="w-5 h-5" />
          {imageFile || currentImage ? "Change Image" : "Choose Image"}
        </button>

        {imageFile ? (
          <button
            onClick={handleClear}
            disabled={busy}
            className="px-4 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 transition cursor-pointer disabled:cursor-not-allowed"
          >
            Clear
          </button>
        ) : (
          currentImage &&
          onRemove && (
            <button
              onClick={onRemove}
              disabled={busy}
              className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 transition flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isRemoving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Remove
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <button
          onClick={onSkip}
          disabled={busy}
          className="px-4 py-3 text-[#135EAB] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors font-medium cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          {currentImage ? "Done" : "Skip"}
        </button>
        <button
          onClick={handleUploadClick}
          disabled={busy || !imageFile}
          className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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

export default JournalImageUpload;
