import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, Calendar, User, ArrowUpRight } from "lucide-react";

import butterflyGif from "../../../assets/butter.gif";

import { APP_URL, IMAGE_URL } from "../../../constants";
import useGetBlogs from "../../../pages/blogs/hooks/useGetBlog";
import type { Blog } from "../../../pages/blogs/model/BlogsModel";

import { fadeUp } from "../../comp/animation";
import Seo from "../../../context/seo";
import SkeletonCard from "../handbook/SkeletonCard";

const BlogsPage = () => {
  const navigate = useNavigate();

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

  const getReadTime = (content?: string) => {
    if (!content) return "5 min read";
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

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
      <div className="relative">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src={butterflyGif} alt="background" className="w-full h-full object-cover opacity-70" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-3 mb-6 relative"
              style={{ padding: "10px 24px 10px 12px" }}
            >
              {/* wavy blue dashed lines — matches page's blue-600 theme */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 300 52" preserveAspectRatio="none">
                <path d="M0 51 Q50 44 100 49 Q150 54 200 47 Q250 41 300 51"
                  fill="none" stroke="#2563eb" strokeWidth="0.8" strokeDasharray="5 4" opacity="0.25" />
                <path d="M0 1 Q50 8 100 3 Q150 -2 200 5 Q250 11 300 1"
                  fill="none" stroke="#2563eb" strokeWidth="0.8" strokeDasharray="5 4" opacity="0.25" />
                <circle cx="55" cy="50" r="1.8" fill="#3b82f6" opacity="0.4" />
                <circle cx="160" cy="48" r="1.4" fill="#6366f1" opacity="0.35" />
                <circle cx="265" cy="50" r="1.8" fill="#3b82f6" opacity="0.4" />
                <circle cx="100" cy="2" r="1.4" fill="#3b82f6" opacity="0.35" />
                <circle cx="220" cy="3" r="1.8" fill="#6366f1" opacity="0.4" />
              </svg>

              {/* butterfly in blue/indigo */}
              <svg width="46" height="46" viewBox="0 0 52 52" fill="none">
                <path d="M26 28 C20 10,2 6,2 18 C2 26,14 28,26 28Z" fill="#bfdbfe" stroke="#2563eb" strokeWidth="0.7" />
                <path d="M26 28 C16 34,4 46,8 50 C12 53,22 44,26 28Z" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.5" />
                <path d="M26 28 C32 10,50 6,50 18 C50 26,38 28,26 28Z" fill="#bfdbfe" stroke="#2563eb" strokeWidth="0.7" />
                <path d="M26 28 C36 34,48 46,44 50 C40 53,30 44,26 28Z" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.5" />
                <ellipse cx="26" cy="28" rx="2" ry="11" fill="#1e40af" />
                <path d="M25 17 C22 9,17 5,15 2" fill="none" stroke="#1e40af" strokeWidth="0.9" strokeLinecap="round" />
                <circle cx="15" cy="2" r="1.8" fill="#1e40af" />
                <path d="M27 17 C30 9,35 5,37 2" fill="none" stroke="#1e40af" strokeWidth="0.9" strokeLinecap="round" />
                <circle cx="37" cy="2" r="1.8" fill="#1e40af" />
                <circle cx="17" cy="20" r="2.2" fill="#3b82f6" opacity="0.45" />
                <circle cx="35" cy="20" r="2.2" fill="#3b82f6" opacity="0.45" />
                <circle cx="13" cy="37" r="1.5" fill="#6366f1" opacity="0.35" />
                <circle cx="39" cy="37" r="1.5" fill="#6366f1" opacity="0.35" />
              </svg>

              <div className="flex flex-col gap-0.5 relative z-10">
                <span className="text-sm font-medium text-blue-900">LBEF Blog</span>
              </div>
            </motion.div>
            {/* 🔥 MAIN TITLE */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              <span className="text-gray-900">Explore Our </span>
              <span className="text-blue-600">Stories, Ideas & Insights</span>
            </h1>

            {/* 🔥 SUBTITLE OPTIONS */}
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover knowledge, inspiration, and updates from our team shaping the future of education.
            </p>

          </motion.div>
        </div>
      </div>

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
                className="group/card flex-none w-[320px] md:w-90 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100"
              >
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
                      <span>{getReadTime(blog.content)}</span>
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

                  <h3 
                  onClick={()=>navigate(`/blogs/${blog.slug}`)}
                  
                  className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover/card:text-[#474AFF] transition-colors duration-200">
                    {blog.title}
                  </h3>

                  

                  <div 
                  onClick={()=>navigate(`/blogs/${blog.slug}`)}
                  className="flex items-center cursor-pointer justify-between mt-2 pt-2 border-t border-gray-100">
                    <button className="flex items-center gap-1 text-[#474AFF] text-sm font-medium hover:gap-2 transition-all duration-200">
                      Read Article
                      <ArrowUpRight className="w-4 cursor-pointer h-4" />
                    </button>
                  </div>
                </div>
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