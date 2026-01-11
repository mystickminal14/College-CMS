import React, { useState } from "react";
import { IMAGE_URL } from "../../../../constants";
import type { Recognitions } from "../../../../pages/recognitions/model/RecognitionsModel";

interface Props {
  recognitions: Recognitions[] | [];
  isLoading: boolean;
  isError: boolean;
}

const RecognitionsCardView: React.FC<Props> = ({ recognitions, isLoading }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow animate-pulse w-full sm:w-[300px]"
          >
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
          </div>
        ))}
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
              Please check back later. New Recognitions will be added soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full p-4">
            <img
              src={`${IMAGE_URL}${selectedImage}`}
              alt="Recognition"
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {recognitions.map((item, idx) => (
          <div
            key={item.id || idx}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 w-full sm:w-[300px] hover:-translate-y-1"
          >
            {/* IMAGE CONTAINER */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
              {item.image && (
                <img
                  src={`${IMAGE_URL}${item.image}`}
                  alt={item.name}
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onClick={() => setSelectedImage(item.image!)}
                />
              )}
            </div>

            {/* CONTENT */}
            <div className="p-3">
              <div className="mb-1">
                <h2 className="font-bold text-gray-900 dark:text-white text-md mb-2 line-clamp-3">
                  {item?.name
                    ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
                    : "Recognition"}
                </h2>
                <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed line-clamp-8">
                {item?.description
                  ? item.description.charAt(0).toUpperCase() +
                    item.description.slice(1)
                  : "No description available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecognitionsCardView;
