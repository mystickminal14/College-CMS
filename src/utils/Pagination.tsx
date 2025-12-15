// src/components/Pagination.tsx
import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  hasNextPage?: boolean;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, hasNextPage = true, onPageChange }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200 ${
          page === 1
            ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            : "bg-[#135EAB] text-white hover:bg-[#0f4a8c]"
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Page <strong className="text-[#135EAB] dark:text-blue-400">{page}</strong> of{" "}
          <strong className="text-gray-800 dark:text-white">{totalPages}</strong>
        </span>
      </div>

      <button
        disabled={!hasNextPage || page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200 ${
          !hasNextPage || page === totalPages
            ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            : "bg-[#135EAB] text-white hover:bg-[#0f4a8c]"
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
