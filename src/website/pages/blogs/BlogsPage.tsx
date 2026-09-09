import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Calendar, User, ArrowUpRight } from "lucide-react";

import { APP_URL, IMAGE_URL } from "../../../constants";
import useGetBlogs from "../../../pages/blogs/hooks/useGetBlog";
import type { Blog } from "../../../pages/blogs/model/BlogsModel";

import Seo from "../../../context/seo";
import SkeletonCard from "../handbook/SkeletonCard";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";
import { motion } from "framer-motion";

const BlogsPage = () => {
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isError } = useGetBlogs({
    page,
    limit: 8,
    status: "PUBLISHED",
  });

  useEffect(() => {
    if (!data?.data) return;

    setBlogs((prev) =>
      page === 1 ? data.data ?? [] : [...prev, ...(data.data ?? [])]
    );

    setHasMore(Boolean(data.pagination?.hasNextPage));
  }, [data, page]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) setPage((prev) => prev + 1);
  };

  const getReadTime = (blog: Blog) => `${blog.readTime ?? 1} min read`;

  const formatToNepalTime = (date?: string) => {
    if (!date) return "Recent";
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Blogs & Insights | LBEF College Nepal"
        description="Explore the latest blogs, stories, and insights from LBEF College."
        url={`${APP_URL}/blogs`}
      />

      {/* HERO */}
      <HeroTitleWithGif
        title="Explore Our Stories, Ideas & Insights"
        highlightedText={["Stories", "Insights"]}
        subtitle="Discover knowledge, inspiration, and updates from our team shaping the future of education."
        badgeText="LBEF Blog"
      />

      {/* CONTENT */}
      <div className="container mx-auto px-4 pb-20">

        {/* Loading Skeleton */}
        {isLoading && page === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && blogs.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700">
              No blogs available
            </h3>
            <p className="text-gray-500 mt-2">
              Please check back later.
            </p>
          </div>
        )}

        {/* BLOG GRID */}
        {!isLoading && !isError && blogs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id || index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="group/card flex-none w-[320px] md:w-90 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <Link to={`/blogs/${blog.slug}`} className="block cursor-pointer">
                  {/* Image Container */}
                  <div className="relative h-60 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
                    {blog.featuredImage ? (
                      <img
                        src={blog.featuredImage.startsWith('http') ? blog.featuredImage : `${IMAGE_URL}${blog.featuredImage}`}
                        alt={blog.featuredImageAlt || blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}


                    {/* Read time badge */}
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                      <div className="flex items-center gap-1 text-white text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{getReadTime(blog)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Date and Author placeholder */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={blog.publishDate || blog.createdAt}>
                          {formatToNepalTime(blog.publishDate || blog.createdAt)}
                        </time>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        <span>LBEF Team</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover/card:text-[#474AFF] transition-colors duration-200">
                      {blog.title}
                    </h3>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      <span className="flex items-center gap-1 text-[#474AFF] text-sm font-medium hover:gap-2 transition-all duration-200">
                        Read Article
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {/* LOAD MORE */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Load More Blogs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;