import React from "react";
import type { Downloads } from "../model/handbookModel";
import { IMAGE_URL } from "../../../constants";


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
      {downloads.map((download) => {

        return (
          <div
            key={download.id}
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 cursor-pointer transform hover:-translate-y-1"
          >
         

            <div className="p-5">
              <h3 className="text-md font-bold text-gray-800 mb-3 line-clamp-2">
                {download.name}
              </h3>

              <button
  onClick={() => {
    const url = download.file
      ? `${IMAGE_URL}${download.file}` // local file
      : download.link;                // external link

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }}
  disabled={!download.file && !download.link}
  className="w-full py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg
             hover:from-blue-600 hover:to-blue-700 transition text-sm
             disabled:opacity-50 disabled:cursor-not-allowed"
>
  {download.file ? "Open Document" : "Open Link"}
</button>

            </div>

            <div className="h-1 bg-linear-to-r from-blue-400 to-blue-600" />
          </div>
        );
      })}
    </div>
  );
};

export default DownloadsCardView;
