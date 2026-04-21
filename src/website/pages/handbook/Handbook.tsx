import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { APP_URL, IMAGE_URL } from "../../../constants";
import useGetDownloads from "../../../pages/handbook/hooks/useGetAll";
import type { Downloads } from "../../../pages/handbook/model/handbookModel";
import SkeletonCard from "./SkeletonCard";
import { fadeUp } from "../../comp/animation";
import Seo from "../../../context/seo";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";

const PAGE_LIMIT = 15;

const StudentHandbook = () => {
  const [page, setPage] = useState(1);
  const [downloads, setDownloads] = useState<Downloads[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading } = useGetDownloads({
    page,
    limit: PAGE_LIMIT,
  });

  useEffect(() => {
    if (!data?.data) return;
    setDownloads(prev => page === 1 ? data.data ?? [] : [...prev, ...(data.data ?? [])]);
    setHasMore(Boolean(data.pagination?.hasNextPage));
  }, [data, page]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) setPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Student Handbook & Downloads | LBEF College Nepal"
        description="Download official student handbooks, academic documents, policies, and essential resources for students of LBEF College Nepal."
        url={`${APP_URL}/downloads`}
      />
      <HeroTitleWithGif
        title="Student Resources"
        highlightedText="Resources"
        subtitle="Download essential academic documents, handbooks, and resources to help you navigate your studies efficiently."
        badgeText="Student Resources"
      />

      {/* Content */}
      <div className="container mx-auto px-4 pb-20">
        {/* Skeletons */}
        {isLoading && page === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* No Documents */}
        {!isLoading && downloads.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700">No Documents available right now</h3>
            <p className="text-gray-500 mt-2">Please check back later. New documents will be added soon.</p>
          </div>
        )}

        {/* Downloads */}
        {downloads.length > 0 && (
          <>
            <motion.div
              className="grid px-1 md:px-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: {}
              }}
            >
              {downloads.map((download,) => (
                <motion.div
                  key={download.id}
                  // variants={{
                  //   hidden: { opacity: 0, y: 20 },
                  //   visible: { opacity: 1, y: 0 }
                  // }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 cursor-pointer"
                >


                  <div className="p-5">
                    <h3 className="text-md font-bold text-gray-800 mb-3 line-clamp-2">{download.name}</h3>
                    <motion.button
                      onClick={() => {
                        const url = download.file
                          ? `${IMAGE_URL}${download.file}` // local file
                          : download.link;                // external link

                        if (url) {
                          window.open(url, "_blank", "noopener,noreferrer");
                        }
                      }}
                      disabled={!download.file && !download.link}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg
             hover:from-blue-600 hover:to-blue-700 transition text-sm
             disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {download.file ? "Open Document" : "Open Link"}
                    </motion.button>

                  </div>

                  <div className="h-1 bg-linear-to-r from-blue-400 to-blue-600" />
                </motion.div>
              ))}
            </motion.div>

            {/* Load More */}
            {hasMore && (
              <motion.div
                className="flex justify-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isLoading ? "Loading..." : "Load More"}
                </motion.button>
              </motion.div>
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

export default StudentHandbook;
