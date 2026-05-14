import type { Courses } from "../model/CourseModel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  course: Courses | null;
  onConfirm: () => void;
  loading: boolean;
}

const ToggleStatusModal = ({ isOpen, onClose, course, onConfirm, loading }: Props) => {
  if (!isOpen || !course) return null;

  const isEnabled = course.status === "ENABLED";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        {/* Icon */}
        <div className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
          isEnabled ? "bg-red-100 dark:bg-red-900/30" : "bg-green-100 dark:bg-green-900/30"
        }`}>
          <span className="text-2xl">{isEnabled ? "🔴" : "🟢"}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
          {isEnabled ? "Disable Course?" : "Enable Course?"}
        </h2>

        {/* Description */}
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
          {isEnabled ? (
            <>
              Are you sure you want to <span className="font-medium text-red-500">disable</span>{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-200">"{course.title}"</span>?
              <br />
              <span className="text-xs mt-1 block">It will be hidden from the public.</span>
            </>
          ) : (
            <>
              Are you sure you want to <span className="font-medium text-green-500">enable</span>{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-200">"{course.title}"</span>?
              <br />
              <span className="text-xs mt-1 block">It will become visible to the public.</span>
            </>
          )}
        </p>

        {/* Status badge */}
        <div className="flex justify-center mb-6">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
            isEnabled
              ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isEnabled ? "bg-green-500" : "bg-red-500"}`} />
            Currently {isEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 px-4 py-2.5 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50 ${
              isEnabled
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Updating..." : isEnabled ? "Yes, Disable" : "Yes, Enable"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleStatusModal;