import React from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

interface WrapperProps {
  children: React.ReactNode;
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
}

const DottedBorderWrapper = ({ children, onEdit, onView, onDelete }: WrapperProps) => {
  return (
    <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-2">

      <div className="absolute top-3 right-3 flex gap-2">

        {onView && (
          <button
            onClick={onView}
            className="p-2 bg-white dark:bg-slate-700 rounded-full shadow hover:bg-blue-50 dark:hover:bg-blue-900/30"
            title="View"
          >
            <FaEye className="text-blue-600 dark:text-blue-400 w-4 h-4" />
          </button>
        )}

        {onEdit && (
          <button
            onClick={onEdit}
            className="p-2 bg-white dark:bg-slate-700 rounded-full shadow hover:bg-blue-50 dark:hover:bg-blue-900/30"
            title="Edit"
          >
            <FaEdit className="text-blue-600 dark:text-blue-400 w-4 h-4" />
          </button>
        )}

        {onDelete && (
          <button
            onClick={onDelete}
            className="p-2 bg-white dark:bg-slate-700 rounded-full shadow hover:bg-red-50 dark:hover:bg-red-900/30"
            title="Delete"
          >
            <FaTrash className="text-red-600 dark:text-red-400 w-4 h-4" />
          </button>
        )}

      </div>

      {children}
    </div>
  );
};

export default DottedBorderWrapper;
