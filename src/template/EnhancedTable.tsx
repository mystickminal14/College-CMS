import React from "react";
import { Tooltip } from "react-tooltip";
import type { LayoutColumnConfig } from "./TempleteTypes";

interface EnhancedTableProps<T> {
  data: T[];
  columns: LayoutColumnConfig<T>[];
  actions?: {
    icon: React.ReactNode | ((row: T) => React.ReactNode);
    tooltip: string | ((row: T) => string);
    onClick: (row: T) => void;
    color?: string;
    condition?: (row: T) => boolean; // <-- optional condition to show action
  }[];
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

const EnhancedTable = <T extends { id?: string | number }>({
  data,
  columns,
  actions = [],
  onRowClick,
  loading = false,
  emptyMessage = "No data available",
  className = "",
}: EnhancedTableProps<T>) => {
  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white bg-[#1a7cd3]">
                <div className="flex items-center">
                  <span className="font-bold">#</span>
                </div>
              </th>

              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`px-6 py-4 text-left text-sm font-semibold text-white bg-[#1a7cd3] ${col.className || ""}`}
                >
                  <div className="flex items-center">
                    <span>{col.label}</span>
                  </div>
                </th>
              ))}

              {actions.length > 0 && (
                <th className="px-6 py-4 text-left text-sm font-semibold text-white bg-[#1a7cd3]">
                  <div className="flex items-center">
                    <span>Actions</span>
                  </div>
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
                      <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-[#1a7cd3] border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading data...</p>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#1a7cd3]/10 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-[#1a7cd3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row.id ?? index}
                  className={`group transition-all duration-200 ${onRowClick ? "hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer" : ""} ${index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-900/30"}`}
                  onClick={() => onRowClick?.(row)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md bg-[#1a7cd3] flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{index + 1}</span>
                      </div>
                    </div>
                  </td>

                  {columns.map((col, i) => (
                    <td key={i} className="px-6 py-4">
                      <div className="text-gray-700 dark:text-gray-300 font-medium">
                        {col.render ? col.render(row) : (row as any)[col.accessor] ?? <span className="text-gray-400 dark:text-gray-500 italic">—</span>}
                      </div>
                    </td>
                  ))}

                  {actions.length > 0 && (
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center space-x-2">
                        {actions
                          .filter(action => !action.condition || action.condition(row)) // <-- condition check
                          .map((action, i) => {
                            const iconEl = typeof action.icon === "function" ? action.icon(row) : action.icon;
                            const tooltipContent = typeof action.tooltip === "function" ? action.tooltip(row) : action.tooltip;

                            return (
                              <button
                                key={i}
                                data-tooltip-id={`tooltip-${row.id ?? index}-${i}`}
                                data-tooltip-content={tooltipContent}
                                onClick={() => action.onClick(row)}
                                className={`p-2.5 rounded-lg border transition-all duration-200 transform hover:scale-105 ${action.color || "text-[#1a7cd3] hover:bg-[#1a7cd3] hover:text-white border-[#1a7cd3]/20 hover:border-[#1a7cd3]"}`}
                              >
                                {iconEl}
                                <Tooltip
                                  id={`tooltip-${row.id ?? index}-${i}`}
                                  className="z-50 bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-200 text-xs px-2 py-1 rounded shadow-lg"
                                />
                              </button>
                            );
                          })}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnhancedTable;
