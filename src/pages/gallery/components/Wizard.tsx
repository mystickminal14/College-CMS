import React, { useRef, useState, useContext } from "react";
import { X, Upload, Loader2, Check } from "lucide-react";
import { AppContext } from "../../../context/ContextApp";
import { validateImageFile } from "../../../utils/ImageCompression";
import type { Gallerys } from "../model/GallModel";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiResponse, ApiErrorResponse } from "../../../services/apiTypes";
import { FaImage } from "react-icons/fa";

interface GalleryImageUploadFormProps {
  isOpen: boolean;
  onClose: () => void;
  updateImageMutation: UseMutationResult<
    ApiResponse<Gallerys>,
    ApiErrorResponse,
    { images: File[] }
  >;
}

const GalleryImageUploadForm: React.FC<GalleryImageUploadFormProps> = ({
  isOpen,
  onClose,
  updateImageMutation,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("GalleryImageUploadForm must be used inside AppContext");
  const { showToast } = appContext;

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    // Validate each file
    const invalidFile = files.find((file) => validateImageFile(file));
    if (invalidFile) {
      showToast("One or more files are invalid!", "error");
      return;
    }

    if (files.length + imageFiles.length > 20) {
      showToast("You can upload a maximum of 20 images", "error");
      return;
    }

    setImageFiles((prev) => [...prev, ...files]);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleSubmit = () => {
    if (!imageFiles.length) {
      showToast("Please select at least one image", "error");
      return;
    }

    updateImageMutation.mutate(
      { images: imageFiles },
      {
        onSuccess: () => {
          setImageFiles([]);
          onClose();
        },
      }
    );
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* HEADER */}
          <div className="bg-linear-to-r from-[#125DAA] to-[#1a7cd3] p-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/20 rounded-xl cursor-pointer">
                <FaImage className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Upload Images</h2>
            </div>
            <button
              onClick={onClose}
              disabled={updateImageMutation.isPending}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 disabled:opacity-50 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col items-center">
              <div
                className="w-full h-56 border-2 border-dashed rounded-2xl flex flex-wrap items-center justify-start gap-2 p-2 mb-4 bg-gray-50 dark:bg-gray-700/50 cursor-pointer overflow-auto"
                onClick={triggerFileInput}
              >
                {imageFiles.length ? (
                  <>
                    {imageFiles.map((file, idx) => (
                      <div key={idx} className="relative w-24 h-24">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${idx}`}
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          disabled={updateImageMutation.isPending}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center w-full">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">No image selected</p>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                disabled={updateImageMutation.isPending}
              />

              <p className="text-gray-500 text-sm mt-1">
                {imageFiles.length
                  ? `You have selected ${imageFiles.length} image(s)`
                  : "You can select up to 20 images"}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <button
                onClick={onClose}
                disabled={updateImageMutation.isPending}
                className="px-4 py-3 text-[#1a7cd3] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors font-medium disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={updateImageMutation.isPending}
                className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {updateImageMutation.isPending ? (
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
  );
};

export default GalleryImageUploadForm;
