import React, { useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { validateImageFile } from "../../../utils/ImageCompression";
import ImageCropModal from "./ImageCropModal";

interface Props {
  label: string;
  preview: string | null;
  // Receives the cropped image.
  onChange: (file: File) => void;
  onRemove: () => void;
  onError: (message: string) => void;
  // Exact size of the saved image and the smallest source image accepted, in pixels.
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
}

const ImagePicker: React.FC<Props> = ({ label, preview, onChange, onRemove, onError, width = 800, height = 800, minWidth = 400, minHeight = 400 }) => {
  const input = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<{ src: string; name: string } | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const error = validateImageFile(file);
    if (error) return onError(error);

    const reader = new FileReader();
    reader.onloadend = () => {
      const src = reader.result as string;
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth < minWidth || img.naturalHeight < minHeight) {
          return onError(
            `Image is ${img.naturalWidth} × ${img.naturalHeight} px. Please upload at least ${minWidth} × ${minHeight} px.`
          );
        }
        setPending({ src, name: file.name });
      };
      img.onerror = () => onError("Could not read the image");
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div
        className="relative mx-auto w-full max-w-60 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-700"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {preview ? (
          <>
            <img src={preview} alt={label} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 p-2 bg-black/60 text-white rounded-full hover:bg-black"
            >
              <Trash2 size={16} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center text-gray-400 text-sm">
            <ImagePlus className="w-8 h-8 mb-2" />
            No image selected
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 text-center">
        Saved at {width} × {height} px. Upload at least {minWidth} × {minHeight} px (JPG, PNG or WebP, up to 5MB).
      </p>
      <input ref={input} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      <div className="text-center">
        <button
          type="button"
          onClick={() => input.current?.click()}
          className="px-4 py-2 text-sm rounded-lg bg-[#135EAB] text-white hover:bg-blue-700"
        >
          {preview ? "Change image" : "Upload image"}
        </button>
      </div>

      {pending && (
        <ImageCropModal
          src={pending.src}
          fileName={pending.name}
          width={width}
          height={height}
          onCancel={() => setPending(null)}
          onDone={(f) => {
            setPending(null);
            onChange(f);
          }}
        />
      )}
    </div>
  );
};

export default ImagePicker;
