import { useRef, useState } from "react";
import type { Gallerys } from "../../../../pages/gallery/model/GallModel";
import { IMAGE_URL } from "../../../../constants";

interface ImageHeroProps {
  galleryImages: Gallerys[];
}

export default function ImageHero({ galleryImages }: ImageHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false); // ⭐

  const heroImages = galleryImages.slice(0, 10).map(img => img.image);

  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(prev =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  // =======================
  // DRAG HANDLERS
  // =======================

  const startDrag = (x: number) => {
    startXRef.current = x;
    isDraggingRef.current = true;
  };

  const endDrag = (x: number) => {
    if (!isDraggingRef.current || startXRef.current === null) return;

    const diff = x - startXRef.current;

    if (diff > 60) prevImage();      // drag right
    if (diff < -60) nextImage();     // drag left

    startXRef.current = null;
    isDraggingRef.current = false;
  };

  // Mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    startDrag(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    endDrag(e.clientX);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (isDraggingRef.current) endDrag(e.clientX); // ⭐
  };

  // Touch
  const handleTouchStart = (e: React.TouchEvent) => {
    startDrag(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    endDrag(e.changedTouches[0].clientX);
  };

  const visibleImages = Array.from({ length: 5 }, (_, i) => {
    const index = (currentIndex + i) % heroImages.length;
    return { url: heroImages[index], index };
  });

  const containerClasses = [
    "w-90 mt-20",
    "w-90",
    "w-90 -mt-20",
    "w-90",
    "w-90 mt-20",
  ];

  if (heroImages.length === 0) return null;

  return (
    <div
      className="relative w-full flex justify-center overflow-hidden mb-8 sm:mb-40
                 cursor-grab active:cursor-grabbing select-none touch-pan-y"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ARROWS */}
      {heroImages.length > 5 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                       bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
            onClick={prevImage}
          >
            ←
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                       bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
            onClick={nextImage}
          >
            →
          </button>
        </>
      )}

      {/* IMAGES */}
      <div className="flex items-center gap-6 transition-transform duration-700 ease-in-out">
        {visibleImages.map((image, index) => (
          <div key={`${image.index}-${index}`} className={containerClasses[index]}>
            <img
              src={IMAGE_URL + image.url}
              alt={`Gallery image ${image.index + 1}`}
              draggable={false} // ⭐ prevents ghost drag image
              className="w-full h-95 object-cover rounded-2xl shadow-lg
                         transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all ${index === currentIndex
                ? "bg-blue-600 w-8 h-2 rounded-full"
                : "bg-gray-300 w-2 h-2 rounded-full"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
