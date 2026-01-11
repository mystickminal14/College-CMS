import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";
import type { Gallerys } from "../../../../pages/gallery/model/GallModel";
import { IMAGE_URL } from "../../../../constants";

interface ImageModalProps {
  image: Gallerys | null;
  images: Gallerys[];
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal = ({ image, images, isOpen, onClose, onNext, onPrev }: ImageModalProps) => {
  if (!isOpen || !image) return null;

  const currentIndex = images.findIndex(img => img.id === image.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  // Determine image source: if link exists, use it directly, otherwise use IMAGE_URL + image
  const imageSrc = image.link 
    ? image.link 
    : image.image 
      ? `${IMAGE_URL}${image.image}`
      : "https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=Image";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl h-[80vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-20"
        >
          <FaTimes className="w-8 h-8" />
        </button>

        {/* Navigation buttons */}
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all z-20 hover:scale-110"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all z-20 hover:scale-110"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Image container - Fixed height */}
        <div className="relative w-full h-full overflow-hidden rounded-2xl bg-black">
          <img
            src={imageSrc}
            alt="Gallery image"
            className="w-full h-full object-contain animate-scaleIn"
            style={{ maxHeight: 'calc(80vh - 120px)' }}
          />
          
          {/* Action buttons */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <button
              onClick={() => window.open(imageSrc, "_blank")}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all hover:scale-105"
            >
              <FaExpand className="w-4 h-4" />
              Open Full Size
            </button>
          </div>
        </div>

        {/* Image counter */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white text-lg font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;