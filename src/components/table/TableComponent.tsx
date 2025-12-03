import React from "react";
import { Tooltip } from "react-tooltip";

interface Column<T> {
  label: string;
  accessor: keyof T | string;
  render?: (row: T) => React.ReactNode;
}

interface ActionButton<T> {
  icon: React.ReactNode;
  tooltip: string;
  onClick: (row: T) => void;
  color?: string;
}

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: ActionButton<T>[];
}

const CustomTable = <T extends { id: string | number }>({
  data,
  columns,
  actions = []
}: CustomTableProps<T>) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-200 dark:border-slate-700 overflow-hidden">

      <div className="overflow-x-auto">
        <table className="w-full">

          {/* HEADER */}
          <thead className="bg-slate-100 dark:bg-slate-700/40">
            <tr>
              {/* SN COLUMN */}
              <th className="p-4 text-left font-medium text-slate-700 dark:text-slate-300 w-12">
                SN
              </th>

              {/* Dynamic Columns */}
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="p-4 text-left font-medium text-slate-700 dark:text-slate-300"
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

          {/* BODY */}
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {data.map((row, index) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
              >
                {/* SN CELL */}
                <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">
                  {index + 1}
                </td>

                {/* Dynamic Columns */}
                {columns.map((col, i) => (
                  <td key={i} className="p-4 text-slate-800 dark:text-slate-200">
                    {col.render ? col.render(row) : (row as any)[col.accessor]}
                  </td>
                ))}

                {/* ACTIONS */}
                {actions.length > 0 && (
                  <td className="p-4">
                    <div className="flex space-x-2">
                      {actions.map((action, i) => (
                        <button
                          key={i}
                          data-tooltip-id={action.tooltip}
                          data-tooltip-content={action.tooltip}
                          onClick={() => action.onClick(row)}
                          className={`p-2 rounded-lg cursor-pointer transition ${
                            action.color || "text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          }`}
                        >
                          {action.icon}
                          <Tooltip id={action.tooltip} />
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default CustomTable;
