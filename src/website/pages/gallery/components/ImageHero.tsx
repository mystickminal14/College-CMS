import { useEffect, useState } from "react";
import type { Gallerys } from "../../../../pages/gallery/model/GallModel";
import { IMAGE_URL } from "../../../../constants";

interface ImageHeroProps {
  galleryImages: Gallerys[];
}

export default function ImageHero({ galleryImages }: ImageHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Take first 10 images from gallery
  const heroImages = galleryImages.slice(0, 10).map(img => img.image);

  // Auto-scroll effect every 3 seconds
  useEffect(() => {
    if (heroImages.length <= 5) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Manual navigation
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  const visibleImages = Array.from({ length: 5 }, (_, i) => {
    const index = (currentIndex + i) % heroImages.length;
    return { url: heroImages[index], index };
  });

  // Container classes for varying heights
  const containerClasses = [
    "w-90 mt-20",
    "w-90",
    "w-90 -mt-20",
    "w-90",
    "w-90 mt-20",
  ];

  // Render skeleton if no images
  if (heroImages.length === 0) {
    return (
      <div>
       
      </div>
    );
  }

  return (
    <div className="relative w-full flex justify-center overflow-hidden mb-8 sm:mb-40">
      {/* Navigation arrows */}
      {heroImages.length > 5 && (
        <>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            onClick={prevImage}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            onClick={nextImage}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Image containers */}
      <div className="flex items-center gap-6 transition-transform duration-700 ease-in-out">
        {visibleImages.map((image, index) => (
          <div key={`${image.index}-${index}`} className={containerClasses[index]}>
            <img
              src={IMAGE_URL + image.url}
              alt={`Gallery image ${image.index + 1}`}
              className="w-full h-95 object-cover rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex % heroImages.length
                ? "bg-blue-600 w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Current position */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {heroImages.length}
      </div>
    </div>
  );
}
