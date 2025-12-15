import React from "react";
import { X, AlertTriangle, Trash2, Loader2 } from "lucide-react";
import type { CourseDetailBlock } from "../courses/model/CourseDetailModel";
import useDeleteCourseBlock from "../courses/hooks/useDeleteCourseBlock";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  block: CourseDetailBlock | null;
  onSuccess?: () => void;
}

const DeleteBlockModal: React.FC<Props> = ({
  isOpen,
  onClose,
  block,
  onSuccess,
}) => {
  const mutation = useDeleteCourseBlock();

  if (!isOpen || !block) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!block.id) return;

    mutation.mutate(
      { id: block.id },
      {
        onSuccess: () => {
          onSuccess?.();
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md mx-4">
        <form
          onSubmit={handleSubmit}
          className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* HEADER */}
          <div className="bg-red-600 p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Trash2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Delete Block
                </h2>
                <p className="text-white/80 text-sm mt-1">
                  Confirm deletion
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={mutation.isPending}
              className="p-2 hover:bg-white/20 rounded-lg transition"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Delete this block?
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mt-2">
                This course detail block will be permanently deleted.
              </p>

              <p className="text-sm text-red-600 mt-3">
                This action cannot be undone.
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={mutation.isPending}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium flex items-center justify-center disabled:opacity-50"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Block
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

export default DeleteBlockModal;
