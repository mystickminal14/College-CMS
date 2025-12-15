import React from "react";
import { Trash2, Eye, Calendar } from "lucide-react";
import type { Recognitions } from "../model/RecognitionsModel";
import { IMAGE_URL } from "../../../constants";

interface Props {
  Recognitions: Recognitions[] | [];
  isLoading: boolean;
  isError: boolean;
  onDelete: (recognition: Recognitions) => void;
}

const RecognitionsCardView: React.FC<Props> = ({
  Recognitions,
  isLoading,
  isError,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow animate-pulse"
          >
            <div className="h-72 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-red-600 dark:text-red-400 text-lg font-medium mb-2">
          Failed to load Recognitions
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Please try again later
        </p>
      </div>
    );
  }

  if (!Recognitions.length) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-5">
          <Calendar className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          No Recognitions uploaded yet
        </h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Recognitions.map((item, idx) => (
        <div
          key={item.id || idx}
          className="group bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* IMAGE */}
          <div className="relative h-60 md:h-64 lg:h-72 xl:h-80 bg-gray-50 dark:bg-gray-900 overflow-hidden">
            {item.image && (
              <a
                href={`${IMAGE_URL}${item.image}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <img
                  src={`${IMAGE_URL}${item.image}`}
                  alt={item.name}
                  className="
                    w-full h-full
                    object-cover object-top
                    transition-transform duration-300
                    group-hover:scale-105
                  "
                />
              </a>
            )}

            {/* VIEW BUTTON */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href={`${IMAGE_URL}${item.image}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 shadow-lg"
              >
                <Eye className="w-4 h-4" />
                View Image
              </a>
            </div>

            {/* BIGGER DELETE BUTTON */}
            <button
              onClick={() => onDelete(item)}
              className="
                absolute top-3 right-3
                p-3
                bg-white/95 dark:bg-gray-800/95
                backdrop-blur-sm
                rounded-xl
                shadow-md
                hover:shadow-xl
                hover:scale-105
                transition-all
                duration-200
              "
              title="Delete recognition"
            >
              <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
            </button>
          </div>

          {/* CONTENT */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
              {item?.description
                ? item.description.charAt(0).toUpperCase() +
                  item.description.slice(1).toLowerCase()
                : "Recognition"}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecognitionsCardView;
