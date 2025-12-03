import React from 'react';
import { Tooltip } from 'react-tooltip';
import type { LayoutColumnConfig } from './TempleteTypes';

interface EnhancedTableProps<T> {
  data: T[];
  columns: LayoutColumnConfig<T>[];
  actions?: {
    icon: React.ReactNode;
    tooltip: string;
    onClick: (row: T) => void;
    color?: string;
  }[];
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

const EnhancedTable = <T extends { id: string | number }>({
  data,
  columns,
  actions = [],
  onRowClick,
  loading = false,
  emptyMessage = 'No data available',
  className = ''
}: EnhancedTableProps<T>) => {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-200 dark:border-slate-700 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead className="bg-slate-100 dark:bg-slate-700/40">
            <tr>
              <th className="p-4 text-left font-medium text-slate-700 dark:text-slate-300 w-12">
                SN
              </th>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`p-4 text-left font-medium text-slate-700 dark:text-slate-300 ${col.className || ''}`}
                >
                  {col.label}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="p-4 text-left font-medium text-slate-700 dark:text-slate-300">
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
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">Loading...</p>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="p-8 text-center text-slate-500 dark:text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row.id}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
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
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex space-x-2">
                        {actions.map((action, i) => (
                          <button
                            key={i}
                            data-tooltip-id={`tooltip-${row.id}-${i}`}
                            data-tooltip-content={action.tooltip}
                            onClick={() => action.onClick(row)}
                            className={`p-2 rounded-lg cursor-pointer transition ${
                              action.color || "text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                            }`}
                          >
                            {action.icon}
                            <Tooltip id={`tooltip-${row.id}-${i}`} />
                          </button>
                        ))}
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