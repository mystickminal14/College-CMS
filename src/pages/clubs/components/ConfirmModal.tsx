import React from "react";
import { Loader2 } from "lucide-react";
import ModalShell from "./ModalShell";

interface Props {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  confirmLabel: string;
  danger?: boolean;
  isPending?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<Props> = ({ isOpen, title, message, confirmLabel, danger, isPending, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalShell title={title} onClose={onClose} tone={danger ? "red" : "blue"}>
      <p className="text-gray-700 dark:text-gray-300 text-center">{message}</p>
      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isPending}
          className={`flex-1 px-4 py-3 text-white rounded-lg flex items-center justify-center disabled:opacity-50 ${
            danger ? "bg-red-600 hover:bg-red-700" : "bg-[#135EAB] hover:bg-blue-700"
          }`}
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : confirmLabel}
        </button>
      </div>
    </ModalShell>
  );
};

export default ConfirmModal;
