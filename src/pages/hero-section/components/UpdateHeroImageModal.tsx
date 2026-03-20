import React, { useRef, useState } from "react";
import { X, Loader2, Check, RefreshCw } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { HeroSectionImage } from "../model/HeroModel";
import { IMAGE_URL } from "../../../constants";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  image: HeroSectionImage | null;
  mutation: UseMutationResult<
    ApiResponse<HeroSectionImage>,
    ApiErrorResponse,
    { id: number; file: File }
  >;
}

const UpdateHeroImageModal: React.FC<Props> = ({ isOpen, onClose, image, mutation }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen || !image) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleClose = () => {
    setFile(null);
    setPreview(null);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    mutation.mutate(
      { id: image.id, file },
      {
        onSuccess: () => {
          setFile(null);
          setPreview(null);
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md mx-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* HEADER */}
          <div className="bg-indigo-600 p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Replace Image</h2>
                <p className="text-white/80 text-sm mt-1">Hero Image #{image.order}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              disabled={mutation.isPending}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 space-y-5">
            {/* Current vs New */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 text-center">
                  Current
                </p>
                <img
                  src={`${IMAGE_URL}${image.thumbnail}`}
                  alt="Current"
                  className="w-full h-28 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 text-center">
                  New
                </p>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-28 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-indigo-400 transition-colors overflow-hidden"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="New preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">Click to select</span>
                  )}
                </div>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* BUTTONS */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={mutation.isPending}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isPending || !file}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Replacing...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Replace
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateHeroImageModal;