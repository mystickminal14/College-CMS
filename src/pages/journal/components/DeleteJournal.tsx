import React from "react";
import { X, AlertTriangle, Trash2, Loader2 } from "lucide-react";
import type { Journals } from "../model/JournalModel";
import useDeleteJournal from "../hooks/useDelete";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  journal: Journals | null;
}

const DeleteJournalModal: React.FC<Props> = ({ isOpen, onClose, journal }) => {
  const mutation = useDeleteJournal();

  if (!isOpen || !journal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (journal.id) {
      mutation.mutate(
        { id: journal.id },
        { onSuccess: () => onClose() }
      );
    }
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md mx-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* HEADER */}
          <div className="bg-red-600 p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Trash2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Delete Journal</h2>
                <p className="text-white/80 text-sm mt-1">Are you sure you wanna delete this journal?</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg"
              disabled={mutation.isPending}
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Are you sure you want to delete{" "}
              <span className="text-red-600">{journal.issue}-{journal.year}</span>?
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              This action cannot be undone.
            </p>

            {/* BUTTONS */}
            <div className="flex space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
                disabled={mutation.isPending}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteJournalModal;
