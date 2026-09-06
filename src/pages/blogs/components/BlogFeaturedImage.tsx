import { useRef, useState, useEffect } from "react";
import { ImageIcon, Pencil } from "lucide-react";
import { useUploadBlogImage } from "../hooks/useUploadBlogImage";
import { useNavigate } from "react-router-dom";

interface BlogFeaturedImageProps {
  blogId: number;
  currentImage?: string | null;
  altText: string;
  onAltChange: (val: string) => void;
  inlineMode?: boolean;
}

const BlogFeaturedImage = ({
  blogId,
  currentImage,
  altText,
  onAltChange,
  inlineMode = false,
}: BlogFeaturedImageProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [preview, setPreview] = useState<string | null>(currentImage ?? null);
  const [localAlt, setLocalAlt] = useState<string>(altText);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [saved, setSaved] = useState(false);

  const { mutate: uploadImage, isPending } = useUploadBlogImage();

  const isUpdate = Boolean(currentImage);

  useEffect(() => {
    setLocalAlt(altText);
  }, [altText]);

  useEffect(() => {
    setPreview(currentImage ?? null);
  }, [currentImage]);

  const handleFile = (file: File) => {
    setPendingFile(file);
    setSaved(false);

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (pendingFile) {
      uploadImage(
        { id: blogId, image: pendingFile, isUpdate },
        {
          onSuccess: () => {
            setPendingFile(null);
            setSaved(true);

            if (!inlineMode) navigate("/app/media/blogs");
          },
        }
      );
      return;
    }

    onAltChange(localAlt);

    if (!inlineMode) navigate("/app/media/blogs");
  };

  const handleSkip = () => {
    setPendingFile(null);
    setPreview(currentImage ?? null);
    setSaved(false);

    if (!inlineMode) navigate("/app/media/blogs");
  };

  const isDisabled =
    isPending ||
    (!pendingFile && preview === currentImage && localAlt === altText);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 space-y-4">

      {/* HEADER */}
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        Featured Image
      </h3>

      {/* IMAGE UPLOAD BOX */}
      <div
        onClick={() => fileRef.current?.click()}
        className="relative cursor-pointer rounded-lg border-2 border-dashed
          border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white transition group"
      >
        {preview ? (
          <>
            <img
              src={preview}
              className="w-full h-48 object-cover rounded-lg"
              alt={localAlt || "Featured"}
            />

            {/* HOVER OVERLAY */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center gap-2">
              <Pencil size={16} className="text-white" />
              <span className="text-white text-sm font-medium">
                Click to update image
              </span>
            </div>
          </>
        ) : (
          <div className="h-48 flex flex-col items-center justify-center text-gray-400">
            <ImageIcon size={28} />
            <p className="text-sm mt-2">Click to upload or update image</p>
          </div>
        )}
      </div>

      {/* HELPER TEXT */}
      <p className="text-xs text-gray-400">
        You can click the image anytime to update it
      </p>

      {/* HIDDEN FILE INPUT */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*,.tif,.tiff,.avif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {/* ALT TEXT */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Alt Text
        </label>

        <input
          type="text"
          value={localAlt}
          onChange={(e) => {
            setLocalAlt(e.target.value);
            onAltChange(e.target.value);
          }}
          disabled={isPending}
          className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-gray-800 text-sm
            border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white"
          placeholder="Describe the image"
        />
      </div>

      {/* ACTION BUTTONS */}
      {inlineMode ? (
        <button
          type="button"
          onClick={handleSave}
          disabled={isDisabled}
          className="w-full py-2.5 rounded-lg bg-gray-900 dark:bg-white
            hover:bg-gray-700 dark:hover:bg-gray-200
            text-white dark:text-gray-900 text-sm font-bold transition-colors
            disabled:opacity-50"
        >
          {isPending
            ? "Uploading..."
            : saved
              ? "Image Saved ✓"
              : pendingFile
                ? "Upload Image"
                : "Update Image"}
        </button>
      ) : (
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleSkip}
            className="flex-1 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700
              text-sm text-gray-600 dark:text-gray-400
              hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Skip for now
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="flex-1 py-2.5 rounded-lg bg-gray-900 dark:bg-white
              hover:bg-gray-700 dark:hover:bg-gray-200
              text-white dark:text-gray-900 text-sm font-bold transition-colors
              disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save & Finish"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogFeaturedImage;