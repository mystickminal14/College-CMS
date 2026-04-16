import { Globe} from "lucide-react";
import type { Blog } from "../model/BlogsModel";
import usePublishBlog from "../hooks/usePublishBlog";

interface PublishBlogModalProps {
  blog: Blog;
  onClose: () => void;
}

const PublishBlogModal = ({ blog, onClose }: PublishBlogModalProps) => {
  const { mutate: publishBlog, isPending } = usePublishBlog();

  const handleConfirm = () => {
    if (!blog.id) return;
    publishBlog(blog.id, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 space-y-5">
        {/* Icon + title */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
            <Globe size={18} className="text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Publish Blog</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Publish{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">"{blog.title}"</span>{" "}
              now? It will be immediately visible to the public.
            </p>
          </div>
        </div>

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
            className="flex-1 py-2.5 rounded-lg bg-green-600 hover:bg-green-700
              text-white text-sm font-semibold transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Publishing..." : "Publish Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishBlogModal;