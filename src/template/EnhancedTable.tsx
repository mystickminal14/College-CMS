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
      className={`bg-white dark:bg-slate-800 rounded-2xl shadow border border-slate-200 dark:border-slate-700 overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="p-4 text-left font-semibold text-white bg-[#125DAA] rounded-tl-2xl">
                SN
              </th>

              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`p-4 text-left font-semibold text-white bg-[#125DAA] ${col.className || ""}`}
                >
                  {col.label}
                </th>
              ))}

              {actions.length > 0 && (
                <th className="p-4 text-left font-semibold text-white bg-[#125DAA] rounded-tr-2xl">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 2} className="p-8 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#125DAA]"></div>
                  </div>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">Loading...</p>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="p-8 text-center text-slate-500 dark:text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row.id ?? index}
                  className={`transition cursor-pointer ${
                    onRowClick ? "hover:bg-[#125DAA]/10 dark:hover:bg-[#125DAA]/20" : ""
                  } ${index % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-slate-50 dark:bg-slate-800/50"}`}
                  onClick={() => onRowClick?.(row)}
                >
                  <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">
                    {index + 1}
                  </td>

                  {columns.map((col, i) => (
                    <td key={i} className="p-4 text-slate-800 dark:text-slate-200">
                      {col.render ? col.render(row) : (row as any)[col.accessor]}
                    </td>
                  ))}

                  {actions.length > 0 && (
                    <td className="p-4 flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      {actions.map((action, i) => {
                        const iconEl =
                          typeof action.icon === "function"
                            ? action.icon(row)
                            : action.icon;

                        const tooltipContent =
                          typeof action.tooltip === "function"
                            ? action.tooltip(row)
                            : action.tooltip;

                        return (
                          <button
                            key={i}
                            data-tooltip-id={`tooltip-${row.id ?? index}-${i}`}
                            data-tooltip-content={tooltipContent}
                            onClick={() => action.onClick(row)}
                            className={`p-2 rounded-lg cursor-pointer transition font-semibold ${
                              action.color ||
                              "text-[#125DAA] hover:bg-[#125DAA] hover:text-white"
                            }`}
                          >
                            {iconEl}
                            <Tooltip id={`tooltip-${row.id ?? index}-${i}`} />
                          </button>
                        );
                      })}
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
