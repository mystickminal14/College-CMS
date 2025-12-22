import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaFilePdf, FaCalendarAlt } from "react-icons/fa";

import image from "../../../assets/pcpsLogo.png";
import decoration from "../../../assets/decoration.png";

import { IMAGE_URL } from "../../../constants";
import SkeletonCard from "../handbook/SkeletonCard";
import type { Connects } from "../../../pages/lbef-connect/model/Connects";
import useGetConnects from "../../../pages/lbef-connect/hooks/useGetAll";

const PAGE_LIMIT = 15;

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

    setConnects(prev =>
      page === 1 ? data.data ?? [] : [...prev, ...(data.data ?? [])]
    );

    setHasMore(Boolean(data.pagination?.hasNextPage));
  }, [data, page]);

  const fetchNextPage = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">


     <div className="container mx-auto sm:px-6 lg:px-8 py-4 md:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
             <FaFilePdf className="text-blue-500" />
            <span className="text-blue-600 font-medium text-sm">Digital Archive</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">LBEF  </span>
            <span className="relative inline-block ml-2">
              <span className="text-blue-600 relative z-10"> Connect</span>
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2  -bottom-1 sm:bottom:0 w-full h-2 md:h-3"
              />
            </span>
          </h1>

          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our digital collection of LBEF Connect publications. Browse through volumes, issues, and access comprehensive archives.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {isLoading && page === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!isLoading && connects.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-blue-50 rounded-full mb-6">
              <FaFilePdf className="w-16 h-16 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">
              No Publications Available
            </h3>
            <p className="text-gray-500 mt-2">
              LBEF Connect publications will be added here. Check back soon for updates.
            </p>
          </div>
        )}

        {/* Data */}
        {connects.length > 0 && (
          <InfiniteScroll
            dataLength={connects.length}
            next={fetchNextPage}
            hasMore={hasMore}
            loader={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            }
          >
            <div className="grid px-1 md:px-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {connects.map(connect => (
                <div
                  key={connect.id}
                  className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 cursor-pointer h-[400px]" // Increased height to 400px
                >
                  <div className="absolute inset-0">
                    {connect.image ? (
                      <img
                        src={`${IMAGE_URL}${connect.image}`}
                        alt={`Volume ${connect.volume} - Issue ${connect.issue}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = image;
                        }}
                      />
                    ) : (
                      <img
                        src={image}
                        alt={`Volume ${connect.volume} - Issue ${connect.issue}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    
                    {/* FIXED: Changed bg-linear-to-t to bg-linear-to-t */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/50 to-transparent" />
                    
                    {/* FIXED: Changed bg-linear-to-t to bg-linear-to-t */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black/80 via-black/40 to-transparent group-hover:h-48 transition-all duration-300" />
                  </div>

                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg z-20">
                    {connect.volume}
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg z-20">
                    <FaFilePdf className="w-3 h-3" />
                    PDF
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10 transition-all duration-300 group-hover:-translate-y-12">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {connect.volume}, {connect.issue}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-white/90">
                        <FaCalendarAlt className="w-4 h-4" />
                        <span className="text-sm font-medium">{connect.duration}</span>
                      </div>
                    </div>

                    {/* FIXED: Changed bg-linear-to-r to bg-linear-to-r */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          `${IMAGE_URL}${connect.file}`,
                          "_blank"
                        );
                      }}
                      className="w-full py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
                    >
                      <FaFilePdf className="w-4 h-4" />
                      Open Publication
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default LBEFConnectWeb;