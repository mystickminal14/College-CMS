import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useCreateBlog from "../hooks/useCreateBlog";
import type { Blog, BlogFAQ } from "../model/BlogsModel";
import BlogEditor from "./BlogEditor";
import BlogFaqs from "./BlogFaqs";
import BlogPublish from "./BlogPublish";
import BlogMeta from "./BlogMeta";
import BlogFeaturedImage from "./BlogFeaturedImage";

const generateSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const AddBlogPage = () => {
  const navigate = useNavigate();
  const { mutate: createBlog, isPending, data: createdBlog } = useCreateBlog();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [featuredImageAlt, setFeaturedImageAlt] = useState("");
  const [status, setStatus] = useState<Blog["status"]>("DRAFT");
  const [publishDate, setPublishDate] = useState("");
  const [content, setContent] = useState("");
  const [faqs, setFaqs] = useState<BlogFAQ[]>([]);
  const savedBlogId = createdBlog?.data?.id;

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === generateSlug(title)) setSlug(generateSlug(val));
  };

  const handleMetaChange = (field: string, value: string) => {
    if (field === "slug") setSlug(value);
    if (field === "metaTitle") setMetaTitle(value);
    if (field === "metaDescription") setMetaDescription(value);
  };

  const handlePublishChange = (field: string, value: string) => {
    if (field === "status") setStatus(value as Blog["status"]);
    if (field === "publishDate") setPublishDate(value);
  };

  const handleSubmit = () => {
    if (!title.trim() || !slug.trim()) return;
    if (status === "SCHEDULED" && !publishDate) return;
    const payload: Blog = {
      title, slug,
      metaTitle: metaTitle || undefined,
      metaDescription: metaDescription || undefined,
      featuredImageAlt: featuredImageAlt || undefined,
      status,
      publishDate: publishDate || undefined,
      content,
      faqs: faqs.filter((f) => f.question.trim() && f.answer.trim()),
    };
    createBlog(payload);
  };

  const isSlugLocked = status === "PUBLISHED";
  const wordCount = content.replace(/<[^>]*>/g, "").trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />

      {/* Top Bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-3
        bg-white/80 dark:bg-gray-950/80 backdrop-blur
        border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <button
          type="button"
          onClick={() => navigate("/admin/blogs")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} /> Back to Blogs
        </button>

        <h1 className="text-base font-bold tracking-tight text-gray-900 dark:text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          {savedBlogId ? "Upload Featured Image" : "New Blog Post"}
        </h1>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{wordCount} words</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!savedBlogId && (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter your blog title..."
                  className="w-full bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-700
                    focus:border-gray-900 dark:focus:border-white
                    text-2xl font-bold text-gray-900 dark:text-white
                    placeholder-gray-300 dark:placeholder-gray-700
                    focus:outline-none py-2 transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Content</label>
                <BlogEditor onChange={setContent} />
              </div>

              <BlogFaqs faqs={faqs} onChange={setFaqs} />
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              
              <BlogMeta
                slug={slug}
                metaTitle={metaTitle}
                metaDescription={metaDescription}
                onChange={handleMetaChange}
                isPublished={isSlugLocked}
              />
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 space-y-3 transition-colors duration-300">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Featured Image Alt Text
                </h3>
                <input
                  type="text"
                  value={featuredImageAlt}
                  onChange={(e) => setFeaturedImageAlt(e.target.value)}
                  placeholder="Describe image for accessibility & SEO"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                    rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200
                    focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white
                    placeholder-gray-400 dark:placeholder-gray-600 transition-colors"
                />
                <p className="text-xs text-gray-400 dark:text-gray-600">You'll upload the image in the next step.</p>
              </div>
                <BlogPublish
                status={status}
                publishDate={publishDate}
                onChange={handlePublishChange}
                onSubmit={handleSubmit}
                isPending={isPending}
              />
            </div>
          
          </div>
        )}

        {savedBlogId && (
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-500/10 border border-green-300 dark:border-green-500/30
                flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Blog saved! Upload featured image
              </h2>
              <p className="text-sm text-gray-500">
                This step is optional — you can also upload later from the blog list.
              </p>
            </div>

            <BlogFeaturedImage blogId={savedBlogId} altText={featuredImageAlt} onAltChange={setFeaturedImageAlt} />

          
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBlogPage;