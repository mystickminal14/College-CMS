import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { motion } from "framer-motion";

import image from "../../../assets/pcpslogo.png";
import decoration from "../../../assets/decoration.png";

import { IMAGE_URL } from "../../../constants";
import useGetDownloads from "../../../pages/handbook/hooks/useGetAll";
import type { Downloads } from "../../../pages/handbook/model/handbookModel";
import SkeletonCard from "./SkeletonCard";
import { fadeUp } from "../../comp/animation";

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
      {/* Header */}
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
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" as const }}
            />
            <span className="text-blue-600 font-medium text-sm">
              Academic Programs & Curriculum
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Student </span>
            <span className="relative inline-block ml-2">
              <span className="text-blue-600 relative z-10">Handbook</span>
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
            transition={{ delay: 0.2 }}
            className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Download essential academic documents, handbooks, and resources to help you navigate your studies efficiently.
          </motion.p>
        </div>
      </motion.div>

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
              {downloads.map((download, index) => (
                <motion.div
                  key={download.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 cursor-pointer"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img src={image} alt={download.name} className="absolute inset-0 w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-blue-100 p-5 rounded-2xl"
                      >
                        <FaFilePdf className="w-14 h-14 text-red-600" />
                      </motion.div>
                    </div>
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs">PDF</div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-md font-bold text-gray-800 mb-3 line-clamp-2">{download.name}</h3>
                    <motion.button
                      onClick={() => window.open(`${IMAGE_URL}${download.file}`, "_blank")}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition text-sm"
                    >
                      Open Document
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
