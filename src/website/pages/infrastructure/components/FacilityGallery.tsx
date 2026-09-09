import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import {
  facilityCategories,
  facilityImages,
  type FacilityCategory,
} from "../data";

type Filter = "All" | FacilityCategory;

const filters: Filter[] = ["All", ...facilityCategories];

const FacilityGallery = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleImages = useMemo(
    () =>
      activeFilter === "All"
        ? facilityImages
        : facilityImages.filter((image) => image.category === activeFilter),
    [activeFilter],
  );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setLightboxIndex((current) => {
        if (current === null) return current;
        const total = visibleImages.length;
        return (current + direction + total) % total;
      });
    },
    [visibleImages.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [lightboxIndex, closeLightbox, step]);

  const activeImage =
    lightboxIndex === null ? null : visibleImages[lightboxIndex];

  return (
    <section className="mb-16 md:mb-20">
      <SectionHeading
        title="Inside the"
        highlightedText="Campus"
        subtitle="Classrooms, laboratories, technology infrastructure and student services — the spaces where day-to-day college life happens."
      />

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 sm:gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => {
              setActiveFilter(filter);
              setLightboxIndex(null);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              activeFilter === filter
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibleImages.map((image, index) => (
            <motion.button
              key={image.src}
              type="button"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightboxIndex(index)}
              className="relative overflow-hidden text-left border border-gray-200 shadow-lg group rounded-2xl aspect-4/3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <img
                src={image.src}
                alt={image.title}
                loading="lazy"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-base font-semibold">{image.title}</p>
                <p className="text-xs opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-90 group-hover:translate-y-0 line-clamp-2">
                  {image.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.title}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute p-2 text-white rounded-full top-4 right-4 bg-white/10 hover:bg-white/25"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(-1);
              }}
              aria-label="Previous image"
              className="absolute p-2 text-white -translate-y-1/2 rounded-full left-2 sm:left-6 top-1/2 bg-white/10 hover:bg-white/25"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(1);
              }}
              aria-label="Next image"
              className="absolute p-2 text-white -translate-y-1/2 rounded-full right-2 sm:right-6 top-1/2 bg-white/10 hover:bg-white/25"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            <motion.figure
              key={activeImage.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl w-full"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={activeImage.src}
                alt={activeImage.title}
                className="w-full max-h-[75vh] object-contain rounded-xl"
              />
              <figcaption className="mt-4 text-center text-white">
                <p className="text-lg font-semibold">{activeImage.title}</p>
                <p className="mt-1 text-sm text-white/75">
                  {activeImage.caption}
                </p>
                <p className="mt-2 text-xs text-white/50">
                  {(lightboxIndex ?? 0) + 1} / {visibleImages.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FacilityGallery;
