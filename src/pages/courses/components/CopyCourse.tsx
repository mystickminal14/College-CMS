import type { Courses } from "../model/CourseModel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  course: Courses | null;
  onConfirm: () => void;
  loading?: boolean;
}

const CopyCourseModal = ({ isOpen, onClose, course, onConfirm, loading }: Props) => {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[400px] shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Copy Course</h2>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Do you want to duplicate <b>{course.title}</b> with all details?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {loading ? "Copying..." : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyCourseModal;
