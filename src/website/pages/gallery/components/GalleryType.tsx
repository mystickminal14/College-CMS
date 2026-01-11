// components/GalleryTypeGrid.tsx
import { useNavigate } from "react-router-dom";
import { FaExpand } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import type { GalleryGroup } from "../model/gallery-model";
import { IMAGE_URL } from "../../../../constants";

interface GalleryTypeGridProps {
  galleryGroups: GalleryGroup[];
  isLoading: boolean;
  hasMore: boolean;
  page: number;
  fetchNextPage: () => void;
}

const GalleryTypeGrid = ({
  galleryGroups,
  isLoading,
  hasMore,
  page,
  fetchNextPage
}: GalleryTypeGridProps) => {
  const navigate = useNavigate();

  // Show skeletons while loading on first page
  if (isLoading && page === 1) {
    return (
      <div className="px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-2xl h-64 w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // No gallery groups
  if (!isLoading && galleryGroups.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-block p-6 bg-linear-to-br from-blue-50 to-purple-50 rounded-full mb-6">
          <FaExpand className="w-16 h-16 text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700">
          No Gallery Types Available
        </h3>
        <p className="text-gray-500 mt-2">
          Gallery types will be added here. Check back soon for updates.
        </p>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={galleryGroups.length}
      next={fetchNextPage}
      hasMore={hasMore}
      loader={
        <div className="mt-8 px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl h-64 w-full"></div>
              </div>
            ))}
          </div>
        </div>
      }
      className="overflow-visible"
    >
      <div className="px-4 md:px-8">
        {/* CSS Grid Masonry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[250px] grid-flow-dense">
          {galleryGroups.map((group, index) => {
            const firstImage = group.images[0];
            const imageSrc = firstImage?.link
              ? firstImage.link
              : firstImage?.image
              ? `${IMAGE_URL}${firstImage.image}`
              : "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop";

            // Create varying sizes for masonry effect
            const spans = ["row-span-1", "row-span-2", "row-span-1", "row-span-2"];
            const spanClass = spans[index % spans.length];

            return (
              <div
                key={`${group.type.id}-${index}`}
                className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${spanClass}`}
                onClick={() =>{
                    const title = group.type.name.replace(/ /g, "-"); 
                    navigate(`/media/photo-gallery/${title}/${group.type.id}`)
                }}
              >
                <div className="relative w-full h-full">
                  {/* Image */}
                  <img
                    src={imageSrc}
                    alt={group.type.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop";
                    }}
                  />

                  {/* Overlay linear */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                      <FaExpand className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{group.type.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm opacity-90">View Collection</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default GalleryTypeGrid;