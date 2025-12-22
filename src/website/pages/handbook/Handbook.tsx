import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaFilePdf } from "react-icons/fa";

import image from "../../../assets/pcpsLogo.png";
import decoration from "../../../assets/decoration.png";

import { IMAGE_URL } from "../../../constants";
import useGetDownloads from "../../../pages/handbook/hooks/useGetAll";
import type { Downloads } from "../../../pages/handbook/model/handbookModel";
import SkeletonCard from "./SkeletonCard";

const PAGE_LIMIT = 15;



const StudentHandbook = () => {
  const [page, setPage] = useState(1);
  const [downloads, setDownloads] = useState<Downloads[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading } = useGetDownloads({
    page,
    limit: PAGE_LIMIT,
  });

  /* Merge paginated data */
  useEffect(() => {
    if (!data?.data) return;

    setDownloads(prev =>
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
            <span className="text-blue-600 font-medium text-sm">
             Academic Programs & Curriculum
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Student </span>
            <span className="relative inline-block ml-2">
              <span className="text-blue-600 relative z-10"> Handbook</span>
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2  -bottom-1 sm:bottom:0 w-full h-2 md:h-3"
              />
            </span>
          </h1>

          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Download essential academic documents, handbooks, and resources to help you navigate your studies efficiently.
          </p>
        </div>
      </div>

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
        {!isLoading && downloads.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700">
              No Documents available right now
            </h3>
            <p className="text-gray-500 mt-2">
              Please check back later. New documents will be added soon.
            </p>
          </div>
        )}

        {/* Data */}
        {downloads.length > 0 && (
          <InfiniteScroll
            dataLength={downloads.length}
            next={fetchNextPage}
            hasMore={hasMore}
            loader={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            }

          >
            <div className="grid px-1 md:px-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {downloads.map(download => (
                <div
                  key={download.id}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 cursor-pointer transform hover:-translate-y-1"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={image}
                      alt={download.name}
                      className="absolute inset-0 w-full h-32 "
                    />
                    <div className="absolute inset-0 bg-black/10" />

                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="bg-blue-100 p-5 rounded-2xl group-hover:scale-110 transition">
                        <FaFilePdf className="w-14 h-14 text-red-600" />
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      PDF
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-md font-bold text-gray-800 mb-3 line-clamp-2">
                      {download.name}
                    </h3>

                    <button
                      onClick={() =>
                        window.open(
                          `${IMAGE_URL}${download.file}`,
                          "_blank"
                        )
                      }
                      className="w-full py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition text-sm"
                    >
                      Open Document
                    </button>
                  </div>

                  <div className="h-1 bg-linear-to-r from-blue-400 to-blue-600" />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default StudentHandbook;
