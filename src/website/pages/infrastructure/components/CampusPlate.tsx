import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import avRoom from "../../../../assets/infrastructure/av-room-01.webp";
import { campusBlocks, campusHero } from "../data";

/** Counts up to `target` once the element scrolls into view. */
const useCountUp = (target: number, active: boolean) => {
  const prefersReducedMotion = useReducedMotion();
  const [counted, setCounted] = useState(0);

  useEffect(() => {
    if (!active || prefersReducedMotion) return;

    let frame = 0;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out so the number settles rather than stopping dead.
      setCounted(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, prefersReducedMotion]);

  // Reduced motion skips straight to the final figure.
  return prefersReducedMotion ? target : counted;
};

/** A caption sitting over the bottom of a plate — kicker, rule, then note. */
const PlateCaption = ({ kicker, note }: { kicker: string; note: string }) => (
  <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5 sm:p-6">
    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
      {kicker}
    </span>
    <span className="w-px h-3 bg-white/30" />
    <span className="text-xs text-white/65">{note}</span>
  </figcaption>
);

/**
 * The page opens on a diptych rather than a photo grid: one wide look inside a
 * teaching space, one tall look at the building it sits in.
 */
const CampusPlate = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  const land = useCountUp(7, inView);

  // A single settling zoom gives the plates life without turning into a slideshow.
  const settle = prefersReducedMotion
    ? {}
    : {
        initial: { scale: 1.08 },
        whileInView: { scale: 1 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section ref={sectionRef} className="mb-20 md:mb-28">
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <motion.figure
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative m-0 overflow-hidden bg-gray-100 lg:col-span-8 rounded-3xl aspect-4/3 lg:aspect-auto lg:h-[30rem] ring-1 ring-black/5"
        >
          <motion.img
            {...settle}
            src={avRoom}
            alt="Audio-visual room at LBEF College"
            loading="eager"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <PlateCaption kicker="Inside" note="Audio-visual room" />
        </motion.figure>

        <motion.figure
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative m-0 overflow-hidden bg-gray-100 lg:col-span-4 rounded-3xl aspect-4/5 lg:aspect-auto lg:h-[30rem] ring-1 ring-black/5"
        >
          <motion.img
            {...settle}
            src={campusHero}
            alt="LBEF College campus building in Kathmandu"
            loading="eager"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <PlateCaption kicker="Outside" note="The campus" />
        </motion.figure>
      </div>

      <div className="flex flex-col gap-2 pt-4 mt-5 text-sm border-t border-gray-200 sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 font-medium text-blue-600">
            <MapPin className="w-4 h-4" />
            Kathmandu, Nepal
          </span>
          <span className="w-px h-3 bg-gray-300" />
          <span className="text-gray-500 tabular-nums">
            {land} ropani, one site
          </span>
        </span>
        <span className="text-gray-500">
          {campusBlocks.map((block) => block.name).join(" · ")}
        </span>
      </div>
    </section>
  );
};

export default CampusPlate;
