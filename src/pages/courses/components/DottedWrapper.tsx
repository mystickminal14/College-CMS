// DottedBorderWrapper.tsx
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
    <div className="
      relative 
      border-2 
      border-dashed 
      border-slate-300 
      dark:border-slate-600 
      rounded-2xl 
      p-1.5
      w-full
      mx-auto
    ">
      <div className="absolute -top-2 -right-2 flex gap-1.5 z-10">
        {onView && (
          <button
            onClick={onView}
            className="
              p-2.5
              bg-white 
              dark:bg-slate-700 
              rounded-full 
              shadow-lg
              hover:bg-blue-50 
              dark:hover:bg-blue-900/30
              transition-all
              hover:scale-110
              border border-gray-200
              dark:border-slate-600
            "
            title="View"
          >
            <FaEye className="text-blue-600 dark:text-blue-400 w-5 h-5" />
          </button>
        )}

        {onEdit && (
          <button
            onClick={onEdit}
            className="
              p-2.5
              bg-white 
              dark:bg-slate-700 
              rounded-full 
              shadow-lg
              hover:bg-blue-50 
              dark:hover:bg-blue-900/30
              transition-all
              hover:scale-110
              border border-gray-200
              dark:border-slate-600
            "
            title="Edit"
          >
            <FaEdit className="text-blue-600 dark:text-blue-400 w-5 h-5" />
          </button>
        )}

        {onDelete && (
          <button
            onClick={onDelete}
            className="
              p-2.5
              bg-white 
              dark:bg-slate-700 
              rounded-full 
              shadow-lg
              hover:bg-red-50 
              dark:hover:bg-red-900/30
              transition-all
              hover:scale-110
              border border-gray-200
              dark:border-slate-600
            "
            title="Delete"
          >
            <FaTrash className="text-red-600 dark:text-red-400 w-3 h-3" />
          </button>
        )}
      </div>

      {children}
    </div>
  );
};

export default DottedBorderWrapper;