import { FaExpand } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import type { Gallerys } from "../../../../pages/gallery/model/GallModel";
import { IMAGE_URL } from "../../../../constants";

interface GalleryGridProps {
  images: Gallerys[];
  isLoading: boolean;
  hasMore: boolean;
  page: number;
  onImageClick: (image: Gallerys) => void;
  fetchNextPage: () => void;
}

// Masonry breakpoints
const breakpointColumnsObj = {
  default: 4,
  1536: 4, // 2xl
  1280: 3, // xl
  1024: 3, // lg
  768: 2,  // md
  640: 2,  // sm
  0: 1     // xs
};

const GalleryGrid = ({
  images,
  isLoading,
  hasMore,
  page,
  onImageClick,
  fetchNextPage
}: GalleryGridProps) => {
  // Show skeletons while loading on first page
  if (isLoading && page === 1) {
    return (
      <div className="px-1 md:px-8">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-6 w-auto"
          columnClassName="ml-6 bg-clip-padding"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="mb-6 animate-pulse">
              <div className="bg-gray-200 rounded-2xl aspect-square"></div>
            </div>
          ))}
        </Masonry>
      </div>
    );
  }

  // No images
  if (!isLoading && images.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-block p-6 bg-linear-to-br from-blue-50 to-purple-50 rounded-full mb-6">
          <FaExpand className="w-16 h-16 text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700">
          No Images Available
        </h3>
        <p className="text-gray-500 mt-2">
          Gallery images will be added here. Check back soon for updates.
        </p>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={images.length}
      next={fetchNextPage}
      hasMore={hasMore}
      loader={
        <div className="mt-8 px-1 md:px-8">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex -ml-6 w-auto"
            columnClassName="ml-6 bg-clip-padding"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="mb-6 animate-pulse">
                <div className="bg-gray-200 rounded-2xl aspect-square"></div>
              </div>
            ))}
          </Masonry>
        </div>
      }
      className="overflow-visible"
    >
      <div className="px-1 md:px-8">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-6 w-auto"
          columnClassName="ml-6 bg-clip-padding"
        >
          {images.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer mb-6"
              onClick={() => onImageClick(image)}
            >
              {/* Image with overlay */}
              <div className="relative">
                <img
                  src={`${IMAGE_URL}${image.image}`}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  onLoad={(e) => {
                    // Image loaded successfully
                    const img = e.target as HTMLImageElement;
                    img.style.opacity = '1';
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Image";
                  }}
                  style={{ opacity: 0, transition: 'opacity 0.3s' }}
                />
                
                {/* Linear overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 rounded-2xl">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full">
                  <FaExpand className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Image indicator */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                #{index + 1}
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </InfiniteScroll>
  );
};

export default GalleryGrid;