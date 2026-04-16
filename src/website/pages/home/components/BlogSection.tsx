import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock, User, ArrowUpRight } from "lucide-react";
import { motion } from 'framer-motion';
import decoration from "../../../../assets/decoration.webp";
import { IMAGE_URL } from "../../../../constants";
import useGetBlogs from "../../../../pages/blogs/hooks/useGetBlog";
import type { Blog } from "../../../../pages/blogs/model/BlogsModel";
import { useNavigate } from "react-router-dom";




const formatToNepalTime = (dateString: string | null | undefined): string => {
  if (!dateString) return "Date not available";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Helper to get relative time (e.g., "5 min read")
const getReadTime = (content?: string): string => {
  if (!content) return "1 min read";
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${readTime} min read`;
};

const BlogSECTION = () => {
  const { data, isLoading, isError } = useGetBlogs({
    page: 1,
    limit: 6,
    status: "PUBLISHED",
  });

  const newsList = data?.data ?? [];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scrollLeftFn = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRightFn = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;

    const startX = e.pageX;
    const scrollLeft = scrollRef.current.scrollLeft;
    let isDragging = true;

    const move = (e: MouseEvent) => {
      if (!isDragging) return;
      const x = e.pageX;
      const walk = (x - startX) * 2;
      scrollRef.current!.scrollLeft = scrollLeft - walk;
    };

    const up = () => {
      isDragging = false;
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [newsList]);

const navigate=useNavigate()
  return (
    <section className="bg-linear-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            LBEF
            <span className="relative inline-block text-[#474AFF] ml-2">
              Blogs
              <motion.img
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.2 }}
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 w-full h-3 -bottom-2"
              />
            </span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Insights, stories, and perspectives from our community
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-gray-200"></div>
              <div className="w-12 h-12 rounded-full border-4 border-[#474AFF] border-t-transparent animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="ml-4 text-gray-500">Loading inspiring stories...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && newsList?.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">No articles available</h3>
            <p className="text-gray-400 mt-2 max-w-md mx-auto">
              Please check back later. New blog posts will be added soon.
            </p>
          </motion.div>
        )}

        {/* Blog Cards Carousel */}
        {!isLoading && !isError && newsList.length > 0 && (
          <div className="relative group">
            {/* Left Arrow */}
            <button
              onClick={scrollLeftFn}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 transition-all duration-300 
                ${!canScrollLeft
                  ? "opacity-0 cursor-not-allowed"
                  : "opacity-0 group-hover:opacity-100 hover:scale-110 hover:shadow-xl"
                } focus:opacity-100`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRightFn}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 transition-all duration-300
                ${!canScrollRight
                  ? "opacity-0 cursor-not-allowed"
                  : "opacity-0 group-hover:opacity-100 hover:scale-110 hover:shadow-xl"
                } focus:opacity-100`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              onMouseDown={handleMouseDown}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing pb-6 pt-2 px-1"
            >
              {newsList.map((blog: Blog, index: number) => (
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

                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover/card:text-[#474AFF] transition-colors duration-200">
                      {blog.title}
                    </h3>

                    

                    {/* Read More Link */}
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
          </div>
        )}

        {/* View All Button */}
        {!isLoading && newsList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <button
                    onClick={()=>navigate(`/blogs`)}
            
            className="group relative px-8 py-3 border-2 cursor-pointer border-[#474AFF] text-[#474AFF] font-semibold rounded-full hover:bg-[#474AFF] hover:text-white transition-all duration-300 overflow-hidden">
              <span className="relative z-10">View All Articles</span>
              <div className="absolute inset-0 bg-[#474AFF] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
          </motion.div>
        )}
      </div>

      {/* Hide scrollbar styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default BlogSECTION;