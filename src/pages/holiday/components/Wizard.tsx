import React, { useRef, useState, useContext, } from "react";
import { X, Upload, Loader2, Check } from "lucide-react";
import { AppContext } from "../../../context/ContextApp";
import { validateImageFile } from "../../../utils/ImageCompression";
import type { Holidays, HolidayType } from "../model/HolidayModel";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiResponse, ApiErrorResponse } from "../../../services/apiTypes";
import { FaImage } from "react-icons/fa";

interface HolidayImageUploadFormProps {
  isOpen: boolean;
  onClose: () => void;
  updateImageMutation: UseMutationResult<
    ApiResponse<Holidays>,
    ApiErrorResponse,
    { type: HolidayType; image: File }
  >;
}

const HolidayImageUploadForm: React.FC<HolidayImageUploadFormProps> = ({
  isOpen,
  onClose,
  updateImageMutation,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [holidayType, setHolidayType] = useState<HolidayType>("ADMINISTRATIVE");
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("HolidayImageUploadForm must be used inside AppContext");
  const { showToast } = appContext;


  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    setImageFile(file);
    setExistingImageUrl(null); // clear previous image preview if user selects new file
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleSubmit = () => {
    if (!imageFile && !existingImageUrl) {
      showToast("Please select an image file", "error");
      return;
    }

    updateImageMutation.mutate(
      { type: holidayType, image: imageFile! },
      {
        onSuccess: () => {
          setImageFile(null);
        setExistingImageUrl(null);
        setHolidayType("ADMINISTRATIVE");
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
                  <FaImage className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Upload Holiday Image</h2>
                  <p className="text-white/90 text-sm mt-1">{holidayType} Holiday</p>
                </div>
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
          </div>

          {/* BODY */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Holiday Type Selector */}
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Holiday Type
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                focus:border-transparent
                transition-all duration-200
                cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed
                disabled:bg-gray-100 dark:disabled:bg-gray-900
                appearance-none"
                  value={holidayType}
                  onChange={(e) => setHolidayType(e.target.value as HolidayType)}
                  disabled={updateImageMutation.isPending}
                >
                  <option value="ADMINISTRATIVE">ADMINISTRATIVE</option>
                  <option value="ACADEMIC">ACADEMIC</option>
                </select>

                {/* Custom dropdown arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-5 w-5 text-gray-400 dark:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Helper text (optional) */}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Select the type of holiday
              </p>
            </div>

            {/* Image Upload Box */}
            <div className="flex flex-col items-center">
              <div
                className="w-56 h-56 border-2 border-dashed rounded-2xl flex items-center justify-center mb-4 bg-gray-50 dark:bg-gray-700/50 cursor-pointer overflow-hidden"
                onClick={triggerFileInput}
              >
                {imageFile ? (
                  <div className="relative w-full h-full">
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setImageFile(null)}
                      disabled={updateImageMutation.isPending}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : existingImageUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={existingImageUrl}
                      alt="Existing"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-center px-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">No image selected</p>
                    <p className="text-xs text-gray-400 mt-1">Recommended: 500×500px</p>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={updateImageMutation.isPending}
              />

              <div className="flex items-center gap-3">
                <button
                  onClick={triggerFileInput}
                  disabled={updateImageMutation.isPending}
                  className="px-5 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-5 h-5" />
                  {imageFile || existingImageUrl ? "Change Image" : "Choose Image"}
                </button>


              </div>
            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <button
                onClick={handleCancel}
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

export default HolidayImageUploadForm;
