import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

import useCreateBlog from "../hooks/useCreateBlog";
import useEditBlog from "../hooks/useEditBlog";
import useDeleteBlog from "../hooks/useDeleteBlog";
import useGetBlogById from "../hooks/useGetById";

import type { Blog, BlogFAQ } from "../model/BlogsModel";

import BlogEditor from "./BlogEditor";
import BlogFaqs from "./BlogFaqs";
import BlogPublish from "./BlogPublish";
import BlogMeta from "./BlogMeta";
import BlogFeaturedImage from "./BlogFeaturedImage";

import { IMAGE_URL } from "../../../constants";

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const BlogFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const isEdit = !!id;
  const blogId = id ? parseInt(id) : undefined;

  // API hooks
  const { data: existingData, isLoading: isFetching } =
    useGetBlogById(id?.toString() || "");

  const existingBlog = existingData?.data;

  const { mutate: createBlog, isPending: isCreating, data: createdBlog } =
    useCreateBlog();

  const { mutate: editBlog, isPending: isUpdating } = useEditBlog();

  const { mutate: deleteBlog, isPending: isDeleting } = useDeleteBlog();

  const isPending = isCreating || isUpdating;

  // form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [featuredImageAlt, setFeaturedImageAlt] = useState("");
  const [status, setStatus] = useState<Blog["status"]>("DRAFT");
  const [publishDate, setPublishDate] = useState("");
  const [content, setContent] = useState("");
  const [faqs, setFaqs] = useState<BlogFAQ[]>([]);
  const [isSlugManual, setIsSlugManual] = useState(false);

  const savedBlogId = createdBlog?.data?.id;

  // load existing blog
  useEffect(() => {
    if (existingBlog) {
      setTitle(existingBlog.title);
      setSlug(existingBlog.slug);
      setMetaTitle(existingBlog.metaTitle ?? "");
      setMetaDescription(existingBlog.metaDescription ?? "");
      setFeaturedImageAlt(existingBlog.featuredImageAlt ?? "");
      setStatus(existingBlog.status);
      setPublishDate(
        existingBlog.publishDate
          ? new Date(existingBlog.publishDate).toISOString().slice(0, 16)
          : ""
      );
      setContent(existingBlog.content ?? "");
      setFaqs(existingBlog.faqs ?? []);
      setIsSlugManual(true);
    }
  }, [existingBlog]);

  // slug auto generate
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit && (!isSlugManual || slug === generateSlug(title))) {
      setSlug(generateSlug(val));
    }
  };

  const handleMetaChange = (field: string, value: string) => {
    if (field === "slug") {
      setSlug(value);
      setIsSlugManual(true);
    }
    if (field === "metaTitle") setMetaTitle(value);
    if (field === "metaDescription") setMetaDescription(value);
  };

  const handlePublishChange = (field: string, value: string) => {
    if (field === "status") setStatus(value as Blog["status"]);
    if (field === "publishDate") setPublishDate(value);
  };

  // CREATE / UPDATE
  const handleSubmit = () => {
    if (!title.trim() || !slug.trim()) return;
    if (status === "SCHEDULED" && !publishDate) return;

    const payload: Blog = {
      title,
      slug,
      metaTitle: metaTitle || undefined,
      metaDescription: metaDescription || undefined,
      featuredImageAlt: featuredImageAlt || undefined,
      status,
      publishDate: publishDate || undefined,
      content,
      faqs: faqs.filter((f) => f.question.trim() && f.answer.trim()),
    };

    if (isEdit && blogId) {
      editBlog(
        { ...payload, id: blogId },
        { onSuccess: () => navigate("/app/lbef/blogs") }
      );
    } else {
      createBlog(payload);
    }
  };

  // DELETE
  const handleDelete = () => {
    if (!blogId) return;

    deleteBlog(blogId, {
      onSuccess: () => navigate("/app/lbef/blogs"),
    });
  };

  const isSlugLocked = status === "PUBLISHED";

  const wordCount = content
    .replace(/<[^>]*>/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  // loading
  if (isEdit && isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <Loader2 className="animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">

      {/* TOP BAR */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b">
        <button
          onClick={() => navigate("/app/lbef/blogs")}
          className="flex items-center gap-2 text-sm text-gray-500"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <h1 className="text-base font-bold">
          {savedBlogId
            ? "Upload Featured Image"
            : isEdit
            ? "Edit Blog"
            : "New Blog"}
        </h1>

        <span className="text-xs text-gray-400">{wordCount} words</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {!savedBlogId && (
          <div className="grid xl:grid-cols-[1fr_320px] gap-6">

            {/* LEFT */}
            <div className="space-y-6">

              <input
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Title"
                className="text-2xl font-bold border-b w-full py-2 bg-transparent"
              />

              <BlogEditor
                onChange={setContent}
                initialContent={content}
              />

              <BlogFaqs faqs={faqs} onChange={setFaqs} />
            </div>

            {/* RIGHT */}
            <div className="space-y-4">

              <BlogMeta
                slug={slug}
                metaTitle={metaTitle}
                metaDescription={metaDescription}
                onChange={handleMetaChange}
                isPublished={isSlugLocked}
                isEdit={isEdit}
              />

              {!isEdit ? (
                <input
                  value={featuredImageAlt}
                  onChange={(e) => setFeaturedImageAlt(e.target.value)}
                  placeholder="Image alt text"
                />
              ) : (
                blogId && (
                  <BlogFeaturedImage
                    blogId={blogId}
                    currentImage={
                      existingBlog?.featuredImage
                        ? IMAGE_URL + existingBlog.featuredImage
                        : null
                    }
                    altText={featuredImageAlt}
                    onAltChange={setFeaturedImageAlt}
                    inlineMode
                  />
                )
              )}

              <BlogPublish
                status={status}
                publishDate={publishDate}
                onChange={handlePublishChange}
                onSubmit={handleSubmit}
                isPending={isPending}
                isEdit={isEdit}
                onDelete={handleDelete}
                isDeleting={isDeleting}
              />
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {savedBlogId && (
          <div className="max-w-lg mx-auto">
            <BlogFeaturedImage
              blogId={savedBlogId}
              altText={featuredImageAlt}
              onAltChange={setFeaturedImageAlt}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogFormPage;