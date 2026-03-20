import { useEffect, useState } from "react";
import { FaFilePdf, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

import image from "../../../assets/pcpslogo.webp";
import decoration from "../../../assets/decoration.webp";

import { APP_URL, IMAGE_URL } from "../../../constants";
import SkeletonCard from "../handbook/SkeletonCard";
import type { Connects } from "../../../pages/lbef-connect/model/Connects";
import useGetConnects from "../../../pages/lbef-connect/hooks/useGetAll";
import { fadeUp } from "../../comp/animation";
import Seo from "../../../context/seo";

const PAGE_LIMIT = 10;

const LBEFConnectWeb = () => {
  const [page, setPage] = useState(1);
  const [connects, setConnects] = useState<Connects[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading } = useGetConnects({
    page,
    limit: PAGE_LIMIT,
  });

  useEffect(() => {
    if (!data?.data) return;

    if (page === 1) {
      setConnects(data.data ?? []);
    } else {
      setConnects(prev => {
        const existingIds = new Set(prev.map(c => c.id));
        const newItems = (data.data ?? []).filter(c => !existingIds.has(c.id));
        return [...prev, ...newItems];
      });
    }

    setHasMore(Boolean(data.pagination?.hasNextPage));
  }, [data]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  // Group by volume (now a number)
  const groupedConnects = connects.reduce((acc: Record<number, Connects[]>, item) => {
    if (!acc[item.volume]) {
      acc[item.volume] = [];
    }
    acc[item.volume].push(item);
    return acc;
  }, {});

  // Sort groups: Volume 8 first, Volume 1 last
  const sortedGroups = Object.entries(groupedConnects)
    .map(([vol, issues]) => ({
      volume: Number(vol),
      issues: [...issues].sort((a, b) => b.issue - a.issue), // Issue 4 first
    }))
    .sort((a, b) => b.volume - a.volume); // Volume 8 first

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="LBEF Connect Publications | Digital Academic Archive"
        description="Browse LBEF Connect, the digital archive of academic publications, magazines, and institutional documents from LBEF College Nepal."
        url={`${APP_URL}/lbef-connect`}
      />

      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
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
            <FaFilePdf className="text-blue-500" />
            <span className="text-blue-600 font-medium text-sm">Digital Archive</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">LBEF</span>
            <span className="relative inline-block ml-2">
              <span className="text-blue-600 relative z-10"> Connect</span>
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
            Explore our quarterly newletter - LBEF Connect, which captures the vibrancy of campus life at LBEF. Browser through past volumes and issues, and acces the complete digital archive.
          </motion.p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-20">
        {/* Initial Loading */}
        {isLoading && page === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* No Data */}
        {!isLoading && connects.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-blue-50 rounded-full mb-6">
              <FaFilePdf className="w-16 h-16 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">No Publications Available</h3>
            <p className="text-gray-500 mt-2">
              LBEF Connect publications will be added here. Check back soon.
            </p>
          </div>
        )}

        {/* Cards */}
        {connects.length > 0 && (
          <>
            {sortedGroups.map(({ volume, issues }) => (
              <div key={volume} className="mb-16">
                <div className="grid px-1 md:px-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {issues.map((connect) => (
                    <div
                      key={connect.id}
                      className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 cursor-pointer h-[400px] w-[300px]"
                    >
                      <div className="absolute inset-0">
                        <img
                          src={connect.image ? `${IMAGE_URL}${connect.image}` : image}
                          alt={`Volume ${connect.volume} Issue ${connect.issue}`}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = image;
                          }}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black/80 via-black/40 to-transparent group-hover:h-48 transition-all duration-300" />
                      </div>

                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg z-20">
                        Volume {connect.volume}
                      </div>

                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg z-20">
                        <FaFilePdf className="w-3 h-3" />
                        PDF
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 group-hover:-translate-y-12 transition-all duration-300">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          Volume {connect.volume}, Issue {connect.issue}
                        </h3>

                        <div className="flex items-center gap-2 text-white/90 mb-4">
                          <FaCalendarAlt className="w-4 h-4" />
                          <span className="text-md font-medium">
                            {connect.duration}
                          </span>
                        </div>

                        <button
                          onClick={() => window.open(`${IMAGE_URL}${connect.file}`, "_blank")}
                          className="w-full py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-300 text-sm font-semibold"
                        >
                          Open Publication
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
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

export default LBEFConnectWeb;





