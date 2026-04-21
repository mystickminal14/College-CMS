import { useEffect, useState } from "react";
import { APP_URL, IMAGE_URL } from "../../../constants";
import SkeletonCard from "./SkeletonCard";
import type { NewsModel } from "../../../pages/news/model/NewsModel";
import useGetNews from "../../../pages/news/hooks/useGetAllNews";
import Seo from "../../../context/seo";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";

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

      <HeroTitleWithGif
        title="LBEF in the News"
        highlightedText="the News"
        subtitle="Stay informed with the latest announcements, academic updates, events, and important notices from the institution."
        badgeText="LBEF News & Updates"
      />

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
