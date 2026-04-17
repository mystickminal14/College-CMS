import type { Blog } from "../model/BlogsModel";

interface BlogPublishProps {
  status: Blog["status"];
  publishDate: string;
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  isPending: boolean;
  isEdit?: boolean;

  // NEW 👇
  onDelete?: () => void;
  isDeleting?: boolean;
}

const BlogPublish = ({
  status,
  publishDate,
  onChange,
  onSubmit,
  isPending,
  isEdit,
  onDelete,
  isDeleting,
}: BlogPublishProps) => {
  const isPublished = status === "PUBLISHED";

  return (
    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 space-y-4 transition-colors duration-300">

      {/* HEADER */}
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        Publish
      </h3>

      {/* STATUS */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Status
        </label>

        <select
          value={status}
          onChange={(e) => onChange("status", e.target.value)}
          disabled={isPublished && isEdit} // optional: lock if published
          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
            rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200
            focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white
            cursor-pointer transition-colors disabled:opacity-60"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="SCHEDULED">Scheduled</option>
        </select>
      </div>

      {/* SCHEDULE INPUT */}
      {status === "SCHEDULED" && (
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Schedule Date & Time *
          </label>

          <input
            type="datetime-local"
            value={publishDate}
            onChange={(e) => onChange("publishDate", e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
              rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200
              focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white transition-colors"
          />
        </div>
      )}

      {/* ACTION BUTTON */}
      {isPublished && isEdit ? (
        <>
       <button
          type="button"
          onClick={onDelete}
          disabled={isDeleting}
          className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700
            text-white text-sm font-bold tracking-wide transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? "Deleting..." : "Delete Blog"}
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isPending}
          className="w-full py-2.5 rounded-lg bg-gray-900 dark:bg-white
            hover:bg-gray-700 dark:hover:bg-gray-200
            text-white dark:text-gray-900
            text-sm font-bold tracking-wide transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving..." : isEdit ? "Update Blog" : "Save Blog"}
        </button> 
        </>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isPending}
          className="w-full py-2.5 rounded-lg bg-gray-900 dark:bg-white
            hover:bg-gray-700 dark:hover:bg-gray-200
            text-white dark:text-gray-900
            text-sm font-bold tracking-wide transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving..." : isEdit ? "Update Blog" : "Save Blog"}
        </button>
      )}
    </div>
  );
};

export default BlogPublish;