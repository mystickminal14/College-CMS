import React from "react";
import { Trash2 } from "lucide-react";
import type { Downloads } from "../model/handbookModel";
import { IMAGE_URL } from "../../../constants";
import { FaFilePdf } from "react-icons/fa";
import image from "../../../assets/pcpsLogo.png";

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
      {downloads.map((download) => {
       
        return (
           <div
                  key={download.id}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 cursor-pointer transform hover:-translate-y-1"
                >
                  <div className="relative h-34 overflow-hidden">
                    <img
                      src={image}
                      alt={download.name}
                      className="absolute inset-0 w-full h-34 "
                    />
                    <div className="absolute inset-0 bg-black/20" />

                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="bg-blue-100 p-5 rounded-2xl group-hover:scale-110 transition">
                        <FaFilePdf className="w-14 h-14 text-red-600" />
                      </div>
                    </div>
 <div className="absolute bottom-2 right-2 z-10">
                <button
                  onClick={() => onDelete(download)}
                  className="p-2 cursor-pointer bg-white/95 dark:bg-gray-800/95 rounded-lg shadow hover:bg-white dark:hover:bg-gray-700 transition"
                  title="Delete"
                >
                  <Trash2 size={16} className="text-red-600 dark:text-red-400 cursor-pointer" />
                </button>
              </div>
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      PDF
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-md font-bold text-gray-800 mb-3 line-clamp-2">
                      {download.name}
                    </h3>

                    <button
                      onClick={() =>
                        window.open(
                          `${IMAGE_URL}${download.file}`,
                          "_blank"
                        )
                      }
                      className="w-full py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition text-sm"
                    >
                      Open Document
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
