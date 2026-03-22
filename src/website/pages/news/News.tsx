import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import decoration from "../../../assets/decoration.webp";
import { APP_URL, IMAGE_URL } from "../../../constants";
import SkeletonCard from "./SkeletonCard";
import { fadeUp } from "../../comp/animation";
import type { NewsModel } from "../../../pages/news/model/NewsModel";
import useGetNews from "../../../pages/news/hooks/useGetAllNews";
import Seo from "../../../context/seo";

const PAGE_LIMIT = 15;

const NewsPageWeb = () => {
  const [page, setPage] = useState(1);
  const [news, setNews] = useState<NewsModel[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading } = useGetNews({
    page,
    limit: PAGE_LIMIT,
  });

  useEffect(() => {
    if (!data?.data) return;

    setNews(prev =>
      page === 1 ? data.data ?? [] : [...prev, ...(data.data ?? [])]
    );

    setHasMore(Boolean(data.pagination?.hasNextPage));
  }, [data, page]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="LBEF News & Updates | Announcements and Events"
        description="Stay updated with the latest news, announcements, academic events, and institutional updates from LBEF College Nepal."
        url={`${APP_URL}/news`}

      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto sm:px-6 lg:px-8 py-4 md:py-20 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100"
          >
            <motion.span
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut" as const
              }}
            />
            <span className="text-blue-600 font-medium text-sm">
              LBEF News & Updates
            </span>
          </motion.div>


          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">LBEF in  </span>
            <span className="relative inline-block ml-2">
              <span className="text-blue-600 relative z-10"> the News</span>
              <motion.img
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-2 md:h-3"
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest announcements, academic updates, events, and important notices from the institution.
          </motion.p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-20">
        {/* Show skeletons while loading on first page */}
        {isLoading && page === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* No documents */}
        {!isLoading && news.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700">
              No News available right now
            </h3>
            <p className="text-gray-500 mt-2">
              There are no updates at the moment. Please check back later for new announcements and campus news.

            </p>
          </div>
        )}

        {/* Data */}
        {news.length > 0 && (
          <>
            <div className="grid px-1 md:px-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {news.map(item => (
                <div
                  key={item.id}
                  className="flex-none w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transition"
                >
                  <img
                    src={
                      item.image
                        ? `${IMAGE_URL}${item.image}`
                        : "https://via.placeholder.com/400x300"
                    }
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-6">
                    <a href={item.link} target="_blank" >
                      <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600">
                        {item.title}
                      </h2>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                        {item.content}
                      </p>

                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{item.source ?? "LBEF News"}</span>
                        <span>{item.publishedOn}</span>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}

            {/* Next Page Skeleton */}
            {isLoading && page > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsPageWeb;
