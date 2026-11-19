import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { facilityCategories, facilityImages, type FacilityCategory } from "../data";

type Filter = "All" | FacilityCategory;

const filters: Filter[] = ["All", ...facilityCategories];

/** How many photos a filter shows before the "View all" button. */
const INITIAL_COUNT = 8;

/** Uniform 4:3 photo grid with category filters and a full-size lightbox. */
const FacilityBento = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["All", facilityImages.length]]);
    facilityCategories.forEach((category) =>
      map.set(category, facilityImages.filter((image) => image.category === category).length)
    );
    return map;
  }, []);

  const filteredImages = useMemo(
    () =>
      activeFilter === "All"
        ? facilityImages
        : facilityImages.filter((image) => image.category === activeFilter),
    [activeFilter]
  );

  const visibleImages = showAll ? filteredImages : filteredImages.slice(0, INITIAL_COUNT);
  const hiddenCount = filteredImages.length - visibleImages.length;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  // The lightbox steps through every photo in the current filter, not just the visible ones.
  const step = useCallback(
    (direction: 1 | -1) => {
      setLightboxIndex((current) => {
        if (current === null) return current;
        const total = filteredImages.length;
        return (current + direction + total) % total;
      });
    },
    [filteredImages.length]
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

  const activeImage = lightboxIndex === null ? null : filteredImages[lightboxIndex];

  return (
    <section className="mb-20 md:mb-28">
      <SectionHeading
        eyebrow="Photo gallery"
        title="What the campus actually looks"
        highlightedText="like"
        subtitle={`${facilityImages.length} photographs of the rooms students use every day. Filter by what you want to see, then open any photo full size.`}
      />

      {/* Filters */}
      <div className="flex gap-2 pb-2 mb-8 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 sm:flex-wrap [scrollbar-width:none]">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setActiveFilter(filter);
                setShowAll(false);
                setLightboxIndex(null);
              }}
              aria-pressed={isActive}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                isActive
                  ? "bg-[#0B1220] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter}
              <span
                className={`rounded-full px-1.5 text-xs tabular-nums ${
                  isActive ? "bg-white/15 text-white" : "bg-white text-gray-500"
                }`}
              >
                {counts.get(filter)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
        <AnimatePresence mode="popLayout">
          {visibleImages.map((image, index) => (
            <motion.button
              key={image.src}
              type="button"
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightboxIndex(index)}
              className="relative overflow-hidden text-left bg-gray-100 shadow-sm group aspect-4/3 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <img
                src={image.src}
                alt={image.title}
                loading="lazy"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/75 via-black/25 to-transparent" />

              <span className="absolute grid transition-opacity duration-300 rounded-full opacity-0 top-3 right-3 size-8 place-items-center bg-white/90 group-hover:opacity-100">
                <Expand className="w-4 h-4 text-[#0B1220]" />
              </span>

              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <p className="hidden sm:block text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-200">
                  {image.category}
                </p>
                <p className="mt-0.5 text-sm font-semibold leading-tight text-white sm:text-base">
                  {image.title}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {hiddenCount > 0 && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-blue-600 transition-colors border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white"
          >
            View all {filteredImages.length} photos
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B1220]/95 backdrop-blur-sm"
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
              className="w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={activeImage.src}
                alt={activeImage.title}
                className="w-full max-h-[72vh] object-contain rounded-xl"
              />
              <figcaption className="mt-5 text-center text-white">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-300">
                  {activeImage.category}
                </span>
                <p className="mt-2 text-lg font-semibold">{activeImage.title}</p>
                <p className="max-w-xl mx-auto mt-1 text-sm text-white/70">{activeImage.caption}</p>
                <p className="mt-3 text-xs text-white/40 tabular-nums">
                  {(lightboxIndex ?? 0) + 1} / {filteredImages.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FacilityBento;
