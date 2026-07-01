// src/components/Pagination.tsx
import React from "react";
import { PAGE_LIMIT_OPTIONS, PAGE_LIMIT_ALL } from "../constants";

interface PaginationProps {
  page: number;
  totalPages: number;
  hasNextPage?: boolean;
  onPageChange: (page: number) => void;
  limit?: number;
  onLimitChange?: (limit: number) => void;
  total?: number;
  limitOptions?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  hasNextPage = true,
  onPageChange,
  limit,
  onLimitChange,
  total,
  limitOptions = PAGE_LIMIT_OPTIONS,
}) => {
  const rangeStart = total === 0 ? 0 : (page - 1) * (limit ?? 0) + 1;
  const rangeEnd = limit ? Math.min(page * limit, total ?? page * limit) : total;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
      <div className="flex items-center gap-4">
        {limit !== undefined && onLimitChange && (
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span>Rows per page</span>
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            >
              {limitOptions.map((opt: number) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
              <option value={PAGE_LIMIT_ALL}>All</option>
            </select>
          </label>
        )}

        {total !== undefined && (
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {limit !== undefined ? (
              <>
                Showing <strong className="text-gray-800 dark:text-white">{rangeStart}-{rangeEnd}</strong> of{" "}
                <strong className="text-gray-800 dark:text-white">{total}</strong> records
              </>
            ) : (
              <>
                Total <strong className="text-gray-800 dark:text-white">{total}</strong> records
              </>
            )}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-2">
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

        <span className="text-sm text-gray-600 dark:text-gray-300 px-2">
          Page <strong className="text-[#135EAB] dark:text-blue-400">{page}</strong> of{" "}
          <strong className="text-gray-800 dark:text-white">{totalPages}</strong>
        </span>

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
    </div>
  );
};

export default Pagination;
