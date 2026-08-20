import React from "react";
import { LogOut, Loader2, X } from "lucide-react";
import type { Visitor } from "../model/VisitorModel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  visitor?: Visitor | null;
  onConfirm: () => void;
  loading?: boolean;
}

const CheckOutVisitorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  visitor,
  onConfirm,
  loading = false,
}) => {
  if (!isOpen || !visitor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md overflow-hidden">
        <div className="bg-[#1a7cd3] p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <LogOut className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Check Out Visitor</h2>
          </div>
          <button type="button" onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6 text-sm text-gray-700 dark:text-gray-300">
          Mark <span className="font-semibold">{visitor.name}</span> as checked out now?
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] font-medium flex items-center justify-center disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Check Out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutVisitorModal;
