import butterfiles from "../../../../assets/butterfiles.webp"
import { motion } from "framer-motion";
import graduation from "../../../../assets/front.webp"
import { useState, useEffect, useRef, useCallback } from "react";
import { IMAGE_URL,  } from "../../../../constants";
import useGetHeroImages from "../../../../pages/hero-section/hooks/useGetHeroImages";

const AUTO_SCROLL_INTERVAL = 4000;

export function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [page] = useState(1);
  const PAGE_LIMIT = 10;
  const touchStartX = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { data,  } = useGetHeroImages({ page, limit: PAGE_LIMIT });

  const images = (data?.data ?? []).filter((img) => img.status === "ENABLED");

  const hasImages = images.length > 0;

  const goTo = useCallback(
    (index: number) => {
      if (!hasImages) return;
      setCurrent((index + images.length) % images.length);
    },
    [images.length, hasImages]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Auto-scroll
  useEffect(() => {
    if (!hasImages || images.length <= 1) return;
    intervalRef.current = setInterval(next, AUTO_SCROLL_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next, hasImages, images.length]);

  // Reset on slide change
  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (hasImages && images.length > 1) {
      intervalRef.current = setInterval(next, AUTO_SCROLL_INTERVAL);
    }
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
      resetInterval();
    }
    touchStartX.current = null;
  };

  return (
    <>
      <section className="bg-white flex flex-col lg:flex-row items-center justify-center lg:justify-between p-4 md:p-6 lg:p-10 lg:pt-12">
        <div className="hidden lg:flex items-center">
          <div className="w-3 h-3 bg-[#0F183F] rotate-45"></div>
          <div className="h-0.5 bg-[#0F183F] w-[10vw]"></div>
        </div>

        <div
          className="
          font-bold
          text-[21px]
          [@media(min-width:380px)]:text-[7vw]
          text-center lg:text-left
          font-size
          "
        >
          <div className="inline-block">
            <span className="relative inline-block">
              <span className="text-md  lg:text-[6vw]">
                Welcome
              </span>

              <motion.span
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.3 }}
                className="absolute text-[6px] md:text-[1vw] left-0 -top-0.5 font-normal"
              >
                The First IT College of Nepal
              </motion.span>
            </span>
          </div>

          <span className="relative">
            <span className="lg:text-[6vw]"> to {""}</span>
            <motion.span
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.4 }}
              className="absolute text-[5px] md:text-[1vw] left-0 -top-0.5 font-normal"
            >
              Evolve With
            </motion.span>
          </span>

          <span
            className="text-white pl-2 pr-2 sm:pl-3 sm:pr-3 inline-block relative mx-1 sm:mx-2"
            style={{
              backgroundColor: "#474AFF",
              borderTopRightRadius: "50px",
              borderBottomLeftRadius: "50px",
              padding: "0 8px sm:0 12px",
            }}
          >
            <motion.span
              className="absolute h-[2vh] w-[2vw] left-[8.5vw] top-[1.5vw]"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.5 }}
            >
              <img src={butterfiles} alt="Butterflies" />
            </motion.span>
            <span>LBEF</span>
          </span>

          <span className="inline-block ml-1 sm:ml-2">{" "}</span>

          <span className="relative">
            <span className="md:text-[5vw]">College</span>
          </span>
        </div>

        {/* Right line - hidden on mobile */}
        <div className="hidden lg:flex items-center">
          <div className="h-0.5 bg-[#0F183F] w-[10vw]"></div>
          <div className="w-3 h-3 bg-[#0F183F] rotate-45"></div>
        </div>
      </section>

      <section
        className="w-90vw h-[40vw] md:h-[22vw] relative overflow-hidden bg-gray-100"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ── Slides from API ── */}
        {hasImages ? (
          <>
            {images.map((img, idx) => (
              <img
                key={img.id}
                src={`${IMAGE_URL}${img.thumbnail}`}
                alt={`Hero banner ${idx + 1}`}
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover object-[50%_42%] transition-opacity duration-500 ${
                  idx === current ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { goTo(idx); resetInterval(); }}
                    className={`rounded-full transition-all duration-300 ${
                      idx === current
                        ? "bg-white w-5 h-2"
                        : "bg-white/50 w-2 h-2"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          /* ── Fallback ── */
          <img
            src={graduation}
            alt="Graduation"
            loading="eager"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover object-[50%_42%] transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </section>
    </>
  );
}