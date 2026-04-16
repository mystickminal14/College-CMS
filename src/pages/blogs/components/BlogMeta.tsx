interface BlogMetaProps {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  onChange: (field: string, value: string) => void;
  isPublished?: boolean;
  isEdit?: boolean;

}

const BlogMeta = ({ metaTitle, metaDescription, slug, onChange, isPublished, isEdit }: BlogMetaProps) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 space-y-4 transition-colors duration-300">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        SEO & Meta
      </h3>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          URL Slug {isPublished && isEdit &&  <span className="text-red-500 ml-1">(Locked)</span>}
        </label>
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 transition-colors">
          <span className="text-gray-400 dark:text-gray-500 text-xs shrink-0">/blog/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => onChange("slug", e.target.value)}
            disabled={isPublished}
            placeholder="your-blog-slug"
            className="flex-1 bg-transparent text-gray-800 dark:text-gray-200 text-sm outline-none
              disabled:text-gray-400 disabled:cursor-not-allowed"
          />
        </div>
        {isPublished && (
          <p className="text-xs text-red-500">Slug is locked after publishing to protect SEO rankings.</p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Meta Title</label>
          <span className={`text-xs ${metaTitle.length > 60 ? "text-red-500" : "text-gray-400"}`}>
            {metaTitle.length}/60
          </span>
        </div>
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => onChange("metaTitle", e.target.value)}
          placeholder="SEO title (defaults to blog title)"
          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
            rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200
            focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white
            focus:border-gray-900 dark:focus:border-white
            placeholder-gray-400 dark:placeholder-gray-600 transition-colors"
        />
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Meta Description</label>
          <span className={`text-xs ${metaDescription.length > 160 ? "text-red-500" : "text-gray-400"}`}>
            {metaDescription.length}/160
          </span>
        </div>
        <textarea
          value={metaDescription}
          onChange={(e) => onChange("metaDescription", e.target.value)}
          placeholder="Brief description for search engines..."
          rows={3}
          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
            rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200
            focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white
            focus:border-gray-900 dark:focus:border-white
            placeholder-gray-400 dark:placeholder-gray-600 resize-none transition-colors"
        />
      </div>
    </div>
  );
};

export default BlogMeta;