import React from "react";
import { ImagePlus, Trash2 } from "lucide-react";

interface Props {
  coverPreview: string | null;
  portraitPreview: string | null;
  onCoverChange: (file: File) => void;
  onPortraitChange: (file: File) => void;
  onRemoveCover?: () => void;
  onRemovePortrait?: () => void;
  onSubmit: () => void;
  onSkip: () => void;
  isUploading?: boolean;
}

interface ImageBoxProps {
  title: string;
  preview: string | null;
  onChange: (file: File) => void;
  onRemove?: () => void;
}

const ImageBox: React.FC<ImageBoxProps> = ({ title, preview, onChange, onRemove }) => (
  <div className="space-y-3">
    <h4 className="font-medium text-gray-800 dark:text-gray-200">{title}</h4>
    <div className="relative w-full h-48 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-700">
      {preview ? (
        <>
          <img src={preview} alt={title} className="w-full h-full object-cover" />
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 p-2 bg-black/60 text-white rounded-full hover:bg-black"
            >
              <Trash2 size={16} />
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center text-gray-400 text-sm">
          <ImagePlus className="w-8 h-8 mb-2" />
          No Image Selected
        </div>
      )}
    </div>

    <input
      type="file"
      accept="image/*"
      onChange={(e) => e.target.files && onChange(e.target.files[0])}
      className="block w-full text-sm
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:bg-[#135EAB] file:text-white
        hover:file:bg-blue-700
        cursor-pointer"
    />
  </div>
);

const TeamImageUploadForm: React.FC<Props> = ({
  coverPreview,
  portraitPreview,
  onCoverChange,
  onPortraitChange,
  onRemoveCover,
  onRemovePortrait,
  onSubmit,
  onSkip,
  isUploading = false,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageBox
          title="Cover Image"
          preview={coverPreview}
          onChange={onCoverChange}
          onRemove={onRemoveCover}
        />
        <ImageBox
          title="Portrait Image"
          preview={portraitPreview}
          onChange={onPortraitChange}
          onRemove={onRemovePortrait}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          type="button"
          onClick={onSkip}
          disabled={isUploading}
          className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
        >
          Skip
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isUploading}
          className="flex-1 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center justify-center disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Save Images"}
        </button>
      </div>
    </div>
  );
};

export default TeamImageUploadForm;
