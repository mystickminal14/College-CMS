import React from "react";
import { Trash2, Edit, Power, ArrowUpDown, Eye } from "lucide-react";
import type { HeroSectionImage } from "../model/HeroModel";
import { IMAGE_URL } from "../../../constants";

interface Props {
  images: HeroSectionImage[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (image: HeroSectionImage) => void;
  onToggle: (image: HeroSectionImage) => void;
  onDelete: (image: HeroSectionImage) => void;
  onChangeOrder: (image: HeroSectionImage) => void;
}

const HeroImageCardView: React.FC<Props> = ({
  images,
  isLoading,
  isError,
  onEdit,
  onToggle,
  onDelete,
  onChangeOrder,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow animate-pulse overflow-hidden"
          >
            <div className="h-52 bg-gray-200 dark:bg-gray-700" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-red-600 dark:text-red-400 text-lg font-medium">Failed to load hero images</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Please try again later</p>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-5">
          <Eye className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No hero images yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Add your first hero banner image to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <div
          key={image.id}
          className="group bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* Image */}
          <div className="relative h-52 bg-gray-50 dark:bg-gray-900 overflow-hidden">
            <img
              src={`${IMAGE_URL}${image.thumbnail}`}
              alt={`Hero image #${image.order}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Order badge */}
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold rounded-lg">
              #{image.order}
            </div>

            {/* Status badge */}
            <div
              className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                image.status === "ENABLED"
                  ? "bg-green-500/90 text-white"
                  : "bg-red-500/90 text-white"
              }`}
            >
              {image.status === "ENABLED" ? "Enabled" : "Disabled"}
            </div>

            {/* View overlay */}
            <a
              href={`${IMAGE_URL}${image.thumbnail}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20"
            >
              <span className="px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 shadow-lg">
                <Eye className="w-4 h-4" />
                View Full
              </span>
            </a>
          </div>

          {/* Footer */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {new Date(image.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(image)}
                title="Replace Image"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200"
              >
                <Edit className="w-3.5 h-3.5" />
                Replace
              </button>

              <button
                onClick={() => onChangeOrder(image)}
                title="Change Order"
                className="p-2 rounded-lg border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200"
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggle(image)}
                title={image.status === "ENABLED" ? "Disable" : "Enable"}
                className={`p-2 rounded-lg border transition-all duration-200 ${
                  image.status === "ENABLED"
                    ? "border-yellow-200 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-600 hover:text-white hover:border-yellow-600"
                    : "border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white hover:border-green-600"
                }`}
              >
                <Power className="w-4 h-4" />
              </button>

              <button
                onClick={() => onDelete(image)}
                title="Delete"
                className="p-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroImageCardView;