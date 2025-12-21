import React, { useRef, useState, useContext, useEffect } from "react";
import { X, ImageIcon, Loader2, Check } from "lucide-react";
import { validateImageFile } from "../../../utils/ImageCompression";
import { AppContext } from "../../../context/ContextApp";

interface ImageUploadProps {
  initialImage?: string | null;
  label?: string;
  onUpload: (file: File) => void;
  isUploading?: boolean;
  onSkip?: () => void;
  onCancel?: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  initialImage = null,
  label = "Upload Image",
  onUpload,
  isUploading = false,
  onSkip,
  onCancel,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialImage);
  const appContext = useContext(AppContext);

  if (!appContext)
    throw new Error("ImageUpload must be used inside AppContext");
  const { showToast } = appContext;

  useEffect(() => {
    setPreview(initialImage);
  }, [initialImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validationError = validateImageFile(selectedFile);
    if (validationError) {
      showToast(validationError);
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const triggerFileInput = () => fileInputRef.current?.click();
  const handleRemove = () => {
    setFile(null);
    setPreview(null);
  };
  const handleSubmit = () => {
    if (!file) {
      onSkip?.();
      return;
    }
    onUpload(file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {preview ? "Current Image / Upload New" : label}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {preview ? "Preview of the current image" : "Add an image"}
        </p>
      </div>

      {/* Image Box */}
      <div className="flex flex-col items-center justify-center">
        <div
          className="w-48 h-48 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-700/50 cursor-pointer"
          onClick={triggerFileInput}
        >
          {preview ? (
            <>
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                disabled={isUploading}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="text-center p-6">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No image selected</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Recommended: 500×500px</p>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
          disabled={isUploading}
        />

        {!file && onSkip && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
            Image is optional. You can skip this step.
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            disabled={isUploading}
            className="px-4 py-3 text-[#135EAB] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors font-medium disabled:opacity-50"
          >
            Skip
          </button>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isUploading || (!file && !onSkip)}
          className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isUploading ? (
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

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
