import React, { useRef, useState } from "react";
import { X, Upload, Loader2, Image } from "lucide-react";
import useChangeVacancyImage from "../hooks/useChangeImage";
import type { JobVacancy } from "../model/VacancyModel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  vacancy: JobVacancy | null;
}

const ImageUploadModal: React.FC<Props> = ({ isOpen, onClose, vacancy }) => {
  const mutation = useChangeVacancyImage();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !vacancy) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    mutation.mutate({ id: vacancy.id, image: file }, { onSuccess: () => { onClose(); setPreview(null); setFile(null); } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md mx-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="bg-[#1a7cd3] p-5 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Image className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Update Poster</h2>
                <p className="text-white/70 text-sm">{vacancy.designation}</p>
              </div>
            </div>
            <button type="button" onClick={onClose} disabled={mutation.isPending} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            <div
              onClick={() => inputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
            >
              {preview ? (
                <img src={preview} alt="preview" className="max-h-48 rounded-lg object-contain" />
              ) : (
                <>
                  <Upload className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Click to select an image</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP</p>
                </>
              )}
            </div>
            <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

            <div className="flex space-x-3">
              <button type="button" onClick={onClose} disabled={mutation.isPending}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-sm">
                Cancel
              </button>
              <button type="submit" disabled={!file || mutation.isPending}
                className="flex-1 px-4 py-2.5 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] transition-colors font-medium text-sm flex items-center justify-center disabled:opacity-50">
                {mutation.isPending ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" />Uploading...</>
                ) : (
                  <><Upload className="w-4 h-4 mr-2" />Upload</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageUploadModal;
