import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { campusBlocks } from "../data";
import SectionHeading from "./SectionHeading";

const pad = (value: number) => String(value + 1).padStart(2, "0");

const BlockDirectory = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = campusBlocks[activeIndex];
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /** Up/down (and left/right) walk the list the way a real listbox does. */
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const step =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? 1
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
        ? -1
        : 0;
    if (!step) return;

    event.preventDefault();
    const next = (index + step + campusBlocks.length) % campusBlocks.length;
    setActiveIndex(next);
    buttonRefs.current[next]?.focus();
  };

  return (
    <section className="mb-20 md:mb-28">
      <SectionHeading
        align="center"
        eyebrow="The six blocks"
        title="Every block is named after a Nepali flower or"
        highlightedText="bird"
      />

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-10">
        {/* Panel — sits above the list on mobile so a tap is visible at once,
            and to the right of the names on desktop. */}
        <div className="lg:col-span-7 lg:order-last">
          <div className="relative overflow-hidden bg-[#0B1220] rounded-3xl aspect-4/3 lg:sticky lg:top-24 ring-1 ring-black/5">
            <AnimatePresence>
              <motion.div
                key={active.name}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {active.image ? (
                  <img
                    src={active.image}
                    alt={`${active.name} block at LBEF College`}
                    loading="lazy"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-start justify-center w-full h-full pt-16 sm:pt-20 bg-gradient-to-br from-[#12203a] to-[#0B1220]">
                    {/* No photograph yet, so the name carries the panel — held
                        clear of the caption below it. */}
                    <span className="px-6 text-4xl font-bold text-center text-white/10 sm:text-6xl">
                      {active.name}
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0B1220] via-[#0B1220]/65 via-45% to-transparent" />

            {/* Position in the set, so the panel reads as one of six. */}
            <div className="absolute flex items-center gap-2 top-5 right-5 sm:top-6 sm:right-7">
              <span className="text-sm font-bold text-white tabular-nums">
                {pad(activeIndex)}
              </span>
              <span className="w-6 h-px bg-white/30" />
              <span className="text-sm font-medium text-white/50 tabular-nums">
                {pad(campusBlocks.length - 1)}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.name}-caption`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-x-0 bottom-0 p-5 sm:p-7"
              >
                {/* Namesake reads as a typographic credit line rather than a
                    pill — the panel already has enough rounded shapes. */}
                <span className="flex items-center gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                    {active.namesake}
                  </span>
                  <span className="w-px h-3 bg-white/25" />
                  <span className="text-xs text-white/55">
                    {active.namesakeNote}
                  </span>
                </span>
                <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                  {active.name}
                </h3>
                <p className="max-w-lg mt-3 text-sm leading-relaxed text-white/70">
                  {active.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium border rounded-full text-white/85 border-white/20 bg-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {!active.image && (
                  <p className="mt-4 text-xs text-white/40">
                    Photograph of this block is on its way.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Directory — pick a name, the panel follows. */}
        <ul className="lg:col-span-5" role="listbox" aria-label="Campus blocks">
          {campusBlocks.map((block, index) => {
            const isActive = index === activeIndex;

            return (
              <li
                key={block.name}
                className="border-t border-gray-200 last:border-b"
              >
                <button
                  ref={(node) => {
                    buttonRefs.current[index] = node;
                  }}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={`relative flex items-center w-full gap-4 px-3 py-4 text-left transition-colors rounded-lg group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive ? "bg-blue-50/70" : "hover:bg-gray-50"
                  }`}
                >
                  {/* One rail slides between rows rather than six fading in. */}
                  {isActive && (
                    <motion.span
                      layoutId="block-rail"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                      className="absolute left-0 w-[3px] rounded-full bg-blue-600 inset-y-2"
                    />
                  )}

                  <span
                    className={`text-xs font-semibold tabular-nums shrink-0 transition-colors ${
                      isActive ? "text-blue-600" : "text-gray-300"
                    }`}
                  >
                    {pad(index)}
                  </span>

                  <span className="flex-1 min-w-0">
                    <span
                      className={`block text-lg font-bold transition-colors sm:text-xl ${
                        isActive
                          ? "text-blue-600"
                          : "text-[#0B1220] group-hover:text-blue-600"
                      }`}
                    >
                      {block.name}
                    </span>
                    <span className="block mt-0.5 text-sm text-gray-500">
                      {block.namesake}
                    </span>
                  </span>

                  {/* A thumbnail on the row makes the choice concrete before
                      the panel catches up. */}
                  {block.image && (
                    <span
                      className={`hidden w-12 h-12 overflow-hidden shrink-0 rounded-lg sm:block ring-1 transition-all ${
                        isActive
                          ? "ring-blue-500/40 opacity-100"
                          : "ring-black/5 opacity-55 group-hover:opacity-100"
                      }`}
                    >
                      <img
                        src={block.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="object-cover w-full h-full"
                      />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default BlockDirectory;
