import { useState } from "react";
import { X, Calendar } from "lucide-react";
import type { Blog } from "../model/BlogsModel";
import useRescheduleBlog from "../hooks/useReschedule";

interface RescheduleModalProps {
  blog: Blog;
  onClose: () => void;
}

const RescheduleModal = ({ blog, onClose }: RescheduleModalProps) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 5); // default 5 min from now
  const defaultDate = now.toISOString().slice(0, 16);

  const [publishDate, setPublishDate] = useState(
    blog.publishDate ? new Date(blog.publishDate).toISOString().slice(0, 16) : defaultDate
  );

  const { mutate: reschedule, isPending } = useRescheduleBlog();

  const handleSubmit = () => {
    if (!blog.id || !publishDate) return;
    reschedule(
      { id: blog.id, publishDate },
      { onSuccess: onClose }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                {blog.status === "SCHEDULED" ? "Reschedule Blog" : "Schedule Blog"}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-55">
                {blog.title}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Current schedule info */}
        {blog.status === "SCHEDULED" && blog.publishDate && (
          <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
            Currently scheduled:{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {new Date(blog.publishDate).toLocaleString()}
            </span>
          </div>
        )}

        {/* Date picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            New Publish Date & Time <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
              rounded-lg px-3 py-2.5 text-sm text-gray-800 dark:text-gray-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700
              text-sm text-gray-600 dark:text-gray-400
              hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending || !publishDate}
            className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700
              text-white text-sm font-semibold transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Saving..." : blog.status === "SCHEDULED" ? "Reschedule" : "Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;