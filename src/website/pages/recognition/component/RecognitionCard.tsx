import React from "react";
import { Eye } from "lucide-react";
import type { Recognitions } from "../../../../pages/recognitions/model/RecognitionsModel";
import { IMAGE_URL } from "../../../../constants";

interface Props {
  recognitions: Recognitions[] | [];
  isLoading: boolean;
  isError: boolean;
}

const RecognitionsCardView: React.FC<Props> = ({
  recognitions,
  isLoading,
  isError,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow animate-pulse w-full sm:w-[340px]"
          >
            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
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

  if (!recognitions.length) {
    return (
      <div className="col-span-3 text-center py-12">
        <div className="w-full flex justify-center items-center">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700">
              No recognition available right now
            </h3>
            <p className="text-gray-500 mt-2">
              Please check back later. New courses will be added soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {recognitions.map((item, idx) => (
        <div
          key={item.id || idx}
          className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full sm:w-[340px]"
        >
          {/* IMAGE */}
          <div className="relative h-72 md:h-80 w-full overflow-hidden">
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
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
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
          </div>

          {/* CONTENT */}
          <div className="p-5">
            <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
              {item?.name
                ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
                : "Recognition"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-5">
              {item?.description
                ? item.description.charAt(0).toUpperCase() + item.description.slice(1)
                : ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};


export default RecognitionsCardView;
