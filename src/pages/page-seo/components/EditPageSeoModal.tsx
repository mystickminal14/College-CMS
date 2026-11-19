import React, { useContext, useEffect, useMemo, useState } from "react";
import { Check, ImagePlus, Loader2, RotateCcw, Trash2, X } from "lucide-react";
import { AppContext } from "../../../context/ContextApp";
import { IMAGE_URL } from "../../../constants";
import type { PageSeo } from "../model/PageSeoModel";
import useSavePageSeo from "../hooks/useSavePageSeo";

const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const inputClass =
  "w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";

interface Props {
  page: PageSeo;
  onClose: () => void;
}

const EditPageSeoModal: React.FC<Props> = ({ page, onClose }) => {
  const { showToast } = useContext(AppContext)!;
  const mutation = useSavePageSeo();

  const [metaTitle, setMetaTitle] = useState(page.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(page.metaDescription ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const imagePreview = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : null),
    [imageFile],
  );

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const shownImage =
    imagePreview ?? (page.ogImage && !removeImage ? `${IMAGE_URL}${page.ogImage}` : null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > MAX_IMAGE_BYTES) {
      showToast("Image must be 5 MB or smaller", "error");
      return;
    }
    setImageFile(file);
    setRemoveImage(false);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setRemoveImage(true);
  };

  const save = (values: { metaTitle: string; metaDescription: string; removeImage: boolean }) => {
    const formData = new FormData();
    formData.append("path", page.path);
    formData.append("metaTitle", values.metaTitle.trim());
    formData.append("metaDescription", values.metaDescription.trim());
    formData.append("removeImage", String(values.removeImage));
    if (imageFile && !values.removeImage) formData.append("ogImage", imageFile);

    mutation.mutate(formData, { onSuccess: onClose });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    save({ metaTitle, metaDescription, removeImage });
  };

  const handleReset = () => {
    save({ metaTitle: "", metaDescription: "", removeImage: true });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4"
      >
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="text-lg font-semibold">{page.label}</h2>
            <p className="text-xs text-gray-500 break-all">{page.path}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm font-medium">
            <label htmlFor="seo-title">Meta Title</label>
            <span className={metaTitle.length > TITLE_LIMIT ? "text-red-500" : "text-gray-400"}>
              {metaTitle.length}/{TITLE_LIMIT}
            </span>
          </div>
          <input
            id="seo-title"
            type="text"
            value={metaTitle}
            maxLength={255}
            onChange={(e) => setMetaTitle(e.target.value)}
            placeholder="Leave blank to use the default title"
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm font-medium">
            <label htmlFor="seo-description">Meta Description</label>
            <span
              className={
                metaDescription.length > DESCRIPTION_LIMIT ? "text-red-500" : "text-gray-400"
              }
            >
              {metaDescription.length}/{DESCRIPTION_LIMIT}
            </span>
          </div>
          <textarea
            id="seo-description"
            value={metaDescription}
            maxLength={500}
            rows={3}
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder="Leave blank to use the default description"
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Social Sharing Image</p>
          {shownImage && (
            <img
              src={shownImage}
              alt="Social sharing preview"
              className="w-full aspect-[1200/630] object-cover rounded-lg border border-gray-200 dark:border-gray-700"
            />
          )}
          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <ImagePlus className="w-4 h-4" />
              {shownImage ? "Replace" : "Upload"}
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {shownImage && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500">JPG, PNG or WebP, up to 5 MB. Best at 1200 × 630.</p>
        </div>

        <div className="flex gap-2 pt-2">
          {page.isCustom && (
            <button
              type="button"
              onClick={handleReset}
              disabled={mutation.isPending}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm disabled:opacity-60"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </button>
          )}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-[#125DAA] hover:bg-[#0f4a8c] text-white rounded-lg disabled:opacity-60"
          >
            {mutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPageSeoModal;
