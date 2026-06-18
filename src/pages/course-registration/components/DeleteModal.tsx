import { Loader2, Trash2, X } from "lucide-react";
import type { CourseRegistration } from "../model/CourseRegistrationModel";
import useDeleteCourseRegistration from "../hooks/useDelete";

interface Props {
  registration: CourseRegistration | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteRegistrationModal({ registration, isOpen, onClose }: Props) {
  const { mutate: deleteReg, isPending } = useDeleteCourseRegistration();

  if (!isOpen || !registration) return null;

  const handleDelete = () => {
    deleteReg({ id: registration.id }, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Registration</h3>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete the registration from{" "}
          <span className="font-semibold text-gray-700">{registration.fullName}</span>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold text-sm flex items-center justify-center gap-2 transition"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isPending ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
