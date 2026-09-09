import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import {
  facilityCategories,
  facilityImages,
  type FacilityCategory,
} from "../data";

type Filter = "All" | FacilityCategory;

const filters: Filter[] = ["All", ...facilityCategories];

/**
 * Repeating bento rhythm — one hero tile, a tall one and a wide one per run of
 * eight. Combined with dense flow the grid stays gapless as filters change.
 */
const spans = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

const FacilityBento = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["All", facilityImages.length]]);
    facilityCategories.forEach((category) =>
      map.set(
        category,
        facilityImages.filter((image) => image.category === category).length
      )
    );
    return map;
  }, []);

  const visibleImages = useMemo(
    () =>
      activeFilter === "All"
        ? facilityImages
        : facilityImages.filter((image) => image.category === activeFilter),
    [activeFilter]
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
    [visibleImages.length]
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
    <section className="mb-20 md:mb-28">
      <SectionHeading
        eyebrow="Photo index"
        title="What the campus actually looks"
        highlightedText="like"
        subtitle={`${facilityImages.length} photographs of the rooms students use every day. Filter by what you want to see, then open any frame full size.`}
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setActiveFilter(filter);
                setLightboxIndex(null);
              }}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                isActive
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {filter}
              <span
                className={`text-xs tabular-nums ${
                  isActive ? "text-white/70" : "text-gray-400"
                }`}
              >
                {counts.get(filter)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4 grid-flow-row-dense auto-rows-[8rem] sm:auto-rows-[9.5rem] lg:auto-rows-[11rem]">
        <AnimatePresence mode="popLayout">
          {visibleImages.map((image, index) => (
            <motion.button
              key={image.src}
              type="button"
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.32 }}
              onClick={() => setLightboxIndex(index)}
              className={`group relative overflow-hidden rounded-2xl bg-gray-100 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                spans[index % spans.length]
              }`}
            >
              <img
                src={image.src}
                alt={image.title}
                loading="lazy"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/15 to-transparent group-hover:from-black/90" />

              <span className="absolute grid transition-all duration-300 rounded-full opacity-0 top-3 right-3 size-8 place-items-center bg-white/15 backdrop-blur-sm group-hover:opacity-100">
                <Expand className="w-4 h-4 text-white" />
              </span>

              <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-4">
                <p className="text-sm font-semibold leading-tight sm:text-base">
                  {image.title}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-white/75 opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-16">
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
                <p className="mt-2 text-lg font-semibold">
                  {activeImage.title}
                </p>
                <p className="max-w-xl mx-auto mt-1 text-sm text-white/70">
                  {activeImage.caption}
                </p>
                <p className="mt-3 text-xs text-white/40 tabular-nums">
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

export default FacilityBento;
