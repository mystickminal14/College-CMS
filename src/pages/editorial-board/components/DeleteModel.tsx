import React from "react";
import { X, AlertTriangle, Trash2, Loader2 } from "lucide-react";
import useDeleteEditorial from "../hooks/useDelete";
import type { EditorialMember } from "../model/EditoralModel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  member: EditorialMember | null;
}

const DeleteEditorialModal: React.FC<Props> = ({ isOpen, onClose, member }) => {
  const mutation = useDeleteEditorial();
  if (!isOpen || !member) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (member.id) {
      mutation.mutate({ id: member.id }, { onSuccess: onClose });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md mx-4">
        <form onSubmit={handleSubmit} className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-red-600 p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Trash2 className="w-6 h-6 text-white" />
              <div>
                <h2 className="text-xl font-bold text-white">Delete Member</h2>
                <p className="text-white/80 text-sm mt-1">Confirm deletion</p>
              </div>
            </div>
            <button type="button" onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200" disabled={mutation.isPending}>
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete <span className="text-red-600">{member.name}</span>?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">This member will be permanently deleted from the system. This action cannot be undone.</p>

            <div className="flex space-x-3 mt-6">
              <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium" disabled={mutation.isPending}>
                Cancel
              </button>
              <button type="submit" disabled={mutation.isPending} className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />} Delete Member
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteEditorialModal;
