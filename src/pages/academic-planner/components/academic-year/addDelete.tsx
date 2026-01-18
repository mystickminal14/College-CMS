import React from "react";
import { X, Trash2, Loader2 } from "lucide-react";
import type { AcademicYear } from "../../model/PlannerModel";
import useDeleteAcademicYear from "../../hooks/year/useDelete";



interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: AcademicYear | null;
}

const DeleteGalleryTypeModal: React.FC<Props> = ({ isOpen, onClose, type }) => {
  const deleteMutation = useDeleteAcademicYear();

  if (!isOpen || !type) return null;

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    deleteMutation.mutate(type.id, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleDelete}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-red-600">Delete Planner Year</h2>
          <button type="button" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
          Are you sure you want to delete <strong>{type.session}</strong>?
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            disabled={deleteMutation.isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" /> Delete
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteGalleryTypeModal;
