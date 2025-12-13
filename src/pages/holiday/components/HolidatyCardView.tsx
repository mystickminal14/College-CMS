import React from "react";
import { Trash2, Eye, Calendar } from "lucide-react";
import type { Holidays } from "../model/HolidayModel";
import { IMAGE_URL } from "../../../constants";

interface Props {
  holidays: Holidays[] | [];
  isLoading: boolean;
  isError: boolean;
  onDelete: (holiday: Holidays) => void;
}

const HolidaysCardView: React.FC<Props> = ({
  holidays,
  isLoading,
  isError,
  onDelete
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow animate-pulse"
          >
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
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
        <p className="text-red-600 dark:text-red-400 text-lg font-medium mb-2">
          Failed to load holidays
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Please try again later
        </p>
      </div>
    );
  }

  if (!holidays.length) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-5">
          <Calendar className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No holidays uploaded yet
        </h3>
        
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {holidays.map((item, idx) => (
        <div
          key={item.id || idx}
          className="group bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <div className="relative h-52 bg-gray-50 dark:bg-gray-900 overflow-hidden">
            {item.image && (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <a
                  href={`${IMAGE_URL}${item.image}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center"
                  title={`View ${item.type} holiday image`}
                >
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <img
                      src={`${IMAGE_URL}${item.image}`}
                      alt={item.type}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // If image fails to load, show fallback icon
                        e.currentTarget.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'w-full h-full flex items-center justify-center';
                        fallback.innerHTML = `
              <div class="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <svg class="w-10 h-10 text-[#135EAB] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </div>
            `;
                        e.currentTarget.parentElement.appendChild(fallback);
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                {/* View Button */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={`${IMAGE_URL}${item.image}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors flex items-center space-x-2 shadow-lg"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Image</span>
                  </a>
                </div>
              </div>
            )}

            <button
              onClick={() => onDelete(item)}
              className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg transition-all duration-200"
              title="Delete holiday"
            >
              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>

            {/* Type Badge */}
            <div className="absolute top-3 left-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.type === 'ADMINISTRATIVE'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                }`}>
                {item.type}
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
              {item.type.charAt(0) + item.type.slice(1).toLowerCase()} Holiday
            </h3>
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default HolidaysCardView;