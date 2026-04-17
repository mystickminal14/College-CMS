import { Trash2 } from "lucide-react";
import type { Blog } from "../model/BlogsModel";
import useDeleteBlog from "../hooks/useDeleteBlog";

interface DeleteBlogModalProps {
  blog: Blog;
  onClose: () => void;
}

const DeleteBlogModal = ({ blog, onClose }: DeleteBlogModalProps) => {
  const { mutate: deleteBlog, isPending } = useDeleteBlog();


  const handleConfirm = () => {
    if (!blog.id) return;
    deleteBlog(blog.id, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 space-y-5">
        {/* Icon + title */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
            <Trash2 size={18} className="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Delete Blog</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">"{blog.title}"</span>?
              This action cannot be undone.
            </p>
          </div>
        </div>

        {blog.status === "PUBLISHED" && (
          <div className="text-xs bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg px-3 py-2 text-yellow-700 dark:text-yellow-400">
            ⚠️ This blog is currently published and live. Deleting it will remove it from public view.
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
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
            onClick={handleConfirm}
            disabled={isPending}
            className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700
              text-white text-sm font-semibold transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogModal;