import React, { useRef, useState } from "react";
import { X, Loader2, Check, Upload } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { Popup, PopupSize } from "../model/PopupModel";
import { POPUP_SIZE_PRESETS } from "../model/PopupModel";
import type { AddPopupPayload } from "../hooks/useAddPopup";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mutation: UseMutationResult<ApiResponse<Popup>, ApiErrorResponse, AddPopupPayload>;
}

const SIZE_OPTIONS: PopupSize[] = ["SMALL", "MEDIUM", "LARGE", "XL", "CUSTOM"];

const AddPopupModal: React.FC<Props> = ({ isOpen, onClose, mutation }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [size, setSize] = useState<PopupSize>("MEDIUM");
  const [width, setWidth] = useState<number>(POPUP_SIZE_PRESETS.MEDIUM.width);
  const [height, setHeight] = useState<number>(POPUP_SIZE_PRESETS.MEDIUM.height);
  const [closesAt, setClosesAt] = useState<string>("");

  if (!isOpen) return null;

  const reset = () => {
    setFile(null);
    setPreview(null);
    setTitle("");
    setSize("MEDIUM");
    setWidth(POPUP_SIZE_PRESETS.MEDIUM.width);
    setHeight(POPUP_SIZE_PRESETS.MEDIUM.height);
    setClosesAt("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSizeChange = (next: PopupSize) => {
    setSize(next);
    if (next !== "CUSTOM") {
      setWidth(POPUP_SIZE_PRESETS[next].width);
      setHeight(POPUP_SIZE_PRESETS[next].height);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) return;

    mutation.mutate(
      {
        title: title.trim(),
        size,
        width,
        height,
        closesAt: closesAt ? Number(closesAt) : undefined,
        file,
      },
      { onSuccess: () => { reset(); onClose(); } }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* HEADER */}
          <div className="bg-blue-600 p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Add Popup</h2>
                <p className="text-white/80 text-sm mt-1">Create a new site popup</p>
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
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Admission Open for Fall 2026"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Size (16:9)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {SIZE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSizeChange(option)}
                    className={`px-2 py-2 text-xs font-medium rounded-lg border transition-colors ${
                      size === option
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-400"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom dimensions */}
            {size === "CUSTOM" ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {width} x {height} px
              </p>
            )}

            {/* Auto-close */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Auto-close after (seconds)
              </label>
              <input
                type="number"
                min={1}
                value={closesAt}
                onChange={(e) => setClosesAt(e.target.value)}
                placeholder="Leave empty to require manual close"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 cursor-pointer hover:border-blue-400 transition-colors flex items-center justify-center min-h-[160px] bg-gray-50 dark:bg-gray-700/30"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-40 w-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Click to select an image
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP supported</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

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
                disabled={mutation.isPending || !file || !title.trim()}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Create Popup
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

export default AddPopupModal;
