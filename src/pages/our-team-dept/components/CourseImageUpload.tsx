import React, { useContext, useRef } from "react";
import { X, ImageIcon, Upload, Loader2, Check } from "lucide-react";
import { validateImageFile } from "../../../utils/ImageCompression";
import { AppContext } from "../../../context/ContextApp";

interface CourseImageUploadFormProps {
  courseName: string;
  imagePreview: string | null;
  imageFile: File | null;
  onImageChange: (file: File) => void;
  onRemoveImage: () => void;
  isUploading?: boolean;
  onSkip: () => void;
  onSubmit: () => void;
}

const CourseImageUploadForm: React.FC<CourseImageUploadFormProps> = ({
  courseName,
  imagePreview,
  imageFile,
  onImageChange,
  onRemoveImage,
  isUploading = false,
  onSkip,
  onSubmit,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const appContext = useContext(AppContext);

  if (!appContext)
    throw new Error("useEditCourse must be used inside AppContext");
  const { showToast } = appContext;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validationError = validateImageFile(file);
      if (validationError) {
        showToast(validationError, 'error');
        return;
      }
      onImageChange(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {imagePreview ? "Current Image / Upload New" : "Upload Course Photo"}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {imagePreview ? `Current image for ${courseName}` : `Add a professional photo for ${courseName}`}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="relative mb-6">
          <div className="w-48 h-48 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-700/50">
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <button type="button" onClick={onRemoveImage} disabled={isUploading} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50">
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
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={isUploading} />

        <button type="button" onClick={triggerFileInput} disabled={isUploading} className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2 font-medium disabled:opacity-50">
          <Upload className="w-5 h-5" />
          <span>{imagePreview ? "Change Image" : "Choose Image"}</span>
        </button>

        {!imageFile && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
            Image is optional. You can skip this step.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <button type="button" onClick={onSkip} disabled={isUploading} className="px-4 py-3 text-[#135EAB] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors font-medium disabled:opacity-50">
          Skip
        </button>

        <button type="button" onClick={onSubmit} disabled={isUploading} className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50">
          {isUploading ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Uploading...</span></> : <><Check className="w-5 h-5" /><span>Save</span></>}
        </button>
      </div>
    </div>
  );
};

export default CourseImageUploadForm;
