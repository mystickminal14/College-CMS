import React, { useRef, useState, useContext } from "react";
import { X, Loader2, Check, Image as ImageIcon, Link2 } from "lucide-react";
import { AppContext } from "../../../context/ContextApp";
import { validateImageFile } from "../../../utils/ImageCompression";
import type { Gallerys, GalleryType } from "../model/GallModel";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiResponse, ApiErrorResponse } from "../../../services/apiTypes";
import useGetGalleryTypes from "../hooks/type/useGetGalleryType";

type TabType = "images" | "links";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  updateImageMutation: UseMutationResult<
    ApiResponse<Gallerys>,
    ApiErrorResponse,
    { images?: File[]; links?: string[]; typeId: number; slug: string }
  >;
}

const GalleryImageUploadForm: React.FC<Props> = ({
  isOpen,
  onClose,
  updateImageMutation,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<TabType>("images");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");
  const [selectedType, setSelectedType] = useState<GalleryType | null>(null);

  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("Must be inside AppContext");
  const { showToast } = appContext;

  const { data } = useGetGalleryTypes();
  const galleryTypes: GalleryType[] = data?.data ?? [];

  if (!isOpen) return null;

  /* ---------- IMAGES ---------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    const invalid = files.find((f) => validateImageFile(f));
    if (invalid) {
      showToast("Invalid image file", "error");
      return;
    }

    if (files.length + imageFiles.length > 20) {
      showToast("Maximum 20 images allowed", "error");
      return;
    }

    setImageFiles((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------- LINKS ---------- */
  const addLink = () => {
    if (!linkInput.trim()) return;
    setLinks((prev) => [...prev, linkInput.trim()]);
    setLinkInput("");
  };

  const removeLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = () => {
    if (!selectedType) {
      showToast("Gallery type is required", "error");
      return;
    }

    if (!imageFiles.length && !links.length) {
      showToast("Add at least one image or link", "error");
      return;
    }

    updateImageMutation.mutate(
      {
        typeId: selectedType.id,
        slug: selectedType.slug, // ✅ SLUG FROM DB
        images: imageFiles.length ? imageFiles : undefined,
        links: links.length ? links : undefined,
      },
      {
        onSuccess: () => {
          setImageFiles([]);
          setLinks([]);
          setSelectedType(null);
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center p-5 bg-blue-600 text-white">
          <h2 className="text-xl font-bold">Upload Gallery</h2>
          <button onClick={onClose}><X /></button>
        </div>

        {/* TABS */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("images")}
            className={`flex-1 py-3 flex justify-center gap-2 ${
              activeTab === "images" && "border-b-2 border-blue-600 text-blue-600"
            }`}
          >
            <ImageIcon size={18} /> Images
          </button>

          <button
            onClick={() => setActiveTab("links")}
            className={`flex-1 py-3 flex justify-center gap-2 ${
              activeTab === "links" && "border-b-2 border-blue-600 text-blue-600"
            }`}
          >
            <Link2 size={18} /> Links
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-5">

          {/* TYPE SELECT */}
          <select
            value={selectedType?.id ?? ""}
            onChange={(e) => {
              const type = galleryTypes.find(
                (t) => t.id === Number(e.target.value)
              );
              setSelectedType(type ?? null);
            }}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select Gallery Type *</option>
            {galleryTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          {/* IMAGE TAB */}
          {activeTab === "images" && (
            <>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed rounded-xl p-4 flex flex-wrap gap-3 cursor-pointer"
              >
                {imageFiles.length ? (
                  imageFiles.map((file, i) => (
                    <div key={i} className="relative w-24 h-24">
                      <img
                        src={URL.createObjectURL(file)}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 w-full text-center">
                    Click to select images (max 20)
                  </p>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          )}

          {/* LINKS TAB */}
          {activeTab === "links" && (
            <>
              <div className="flex gap-2">
                <input
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  placeholder="Paste image / video link"
                  className="flex-1 border rounded-lg px-3 py-2"
                />
                <button
                  onClick={addLink}
                  className="bg-blue-600 text-white px-4 rounded-lg"
                >
                  Add
                </button>
              </div>

              <ul className="space-y-2">
                {links.map((link, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded"
                  >
                    <span className="truncate text-sm">{link}</span>
                    <button onClick={() => removeLink(i)}>
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* SAVE */}
          <button
            onClick={handleSubmit}
            disabled={updateImageMutation.isPending}
            className="w-full bg-green-600 text-white py-3 rounded-xl flex justify-center gap-2"
          >
            {updateImageMutation.isPending ? (
              <>
                <Loader2 className="animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Check /> Save
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryImageUploadForm;
