import React from "react";
import { Trash2 } from "lucide-react";
import type { Downloads } from "../model/handbookModel";
import { IMAGE_URL } from "../../../constants";
import { FaFilePdf } from "react-icons/fa";

interface Props {
  downloads: Downloads[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (downloads: Downloads) => void;
}

const DownloadsCardView: React.FC<Props> = ({
  downloads,
  isLoading,
  isError,
  onDelete,
}) => {
  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow animate-pulse h-44"
          ></div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-600 dark:text-red-400 text-center py-8">
        Failed to load downloads
      </p>
    );
  }

  if (downloads.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center py-8">
        No downloads available.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {downloads.map((item) => {
        const fileName =
          item.file?.split("/").pop() || item.name || "Untitled PDF";

        return (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative w-full overflow-hidden rounded-lg group">
              <a
                href={item.file ? `${IMAGE_URL}${item.file}` : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-40 cursor-pointer overflow-hidden rounded-lg bg-linear-to-b from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 flex flex-col items-center justify-center transition-all hover:brightness-105"
                title={fileName}
              >
                <FaFilePdf className="w-16 h-16 text-red-600 dark:text-red-400 cursor-pointer" />
              </a>

              {/* Delete Button */}
              <div className="absolute bottom-2 right-2 z-10">
                <button
                  onClick={() => onDelete(item)}
                  className="p-2 cursor-pointer bg-white/95 dark:bg-gray-800/95 rounded-lg shadow hover:bg-white dark:hover:bg-gray-700 transition"
                  title="Delete"
                >
                  <Trash2 size={16} className="text-red-600 dark:text-red-400 cursor-pointer" />
                </button>
              </div>
            </div>

            {/* File Name */}
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mt-2 line-clamp-2 cursor-default">
              {item.name ?? fileName}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default DownloadsCardView;
