import React from "react";
import type { Downloads } from "../model/handbookModel";
import { IMAGE_URL } from "../../../constants";
import { ToggleLeft, ToggleRight } from "lucide-react";

interface Props {
  downloads: Downloads[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (downloads: Downloads) => void;
  onToggle: (downloads: Downloads) => void;
}

const DownloadsCardView: React.FC<Props> = ({ downloads, isLoading, isError, onDelete, onToggle }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow animate-pulse h-44" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-600 dark:text-red-400 text-center py-8">Failed to load downloads</p>;
  }

  if (downloads.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400 text-center py-8">No downloads available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {downloads.map((download) => {
        const isEnabled = download.status === "ENABLED";
        return (
          <div
            key={download.id}
            className={`group bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden border ${isEnabled ? "border-gray-100" : "border-gray-200 opacity-70"}`}
          >
            <div className="p-4">
              {/* Status badge + toggle row */}
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isEnabled ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {isEnabled ? "Enabled" : "Disabled"}
                </span>
                <button
                  onClick={() => onToggle(download)}
                  title={isEnabled ? "Disable" : "Enable"}
                  className="text-gray-400 hover:text-gray-700 transition"
                >
                  {isEnabled
                    ? <ToggleRight className="w-6 h-6 text-green-500" />
                    : <ToggleLeft className="w-6 h-6 text-gray-400" />}
                </button>
              </div>

              <h3 className="text-sm font-bold text-gray-800 mb-3 line-clamp-2">{download.name}</h3>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const url = download.file ? `${IMAGE_URL}${download.file}` : download.link;
                    if (url) window.open(url, "_blank", "noopener,noreferrer");
                  }}
                  disabled={!download.file && !download.link}
                  className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {download.file ? "Open File" : "Open Link"}
                </button>
                <button
                  onClick={() => onDelete(download)}
                  className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className={`h-1 ${isEnabled ? "bg-gradient-to-r from-blue-400 to-blue-600" : "bg-gray-200"}`} />
          </div>
        );
      })}
    </div>
  );
};

export default DownloadsCardView;
