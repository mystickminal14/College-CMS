import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";

import butterfly from "../../../assets/butterfiles.webp";
import lbefLogo from "../../../assets/lbef_white.webp";
import { GROUND, eyebrowClass, focusRing } from "./tokens";

/* Steps declare their own buttons, but those buttons render into the frame's
   fixed action bar so Back and Continue never move between steps — on a wall
   tablet a target that shifts is a target the visitor has to hunt for. */
const ActionSlot = createContext<HTMLElement | null>(null);

export const KioskActions: React.FC<{ children: ReactNode }> = ({ children }) => {
  const slot = useContext(ActionSlot);
  return slot ? createPortal(children, slot) : null;
};

export interface KioskStep {
  label: string;
  /** What the visitor answered, echoed back so they can check it at a glance. */
  answer?: string | null;
}

interface Props {
  /** Omit (or pass []) for a single-screen flow — the ledger only earns its
   *  keep once there is more than one step to track. */
  steps?: KioskStep[];
  activeIndex?: number;
  /** Hides progress once the pass is issued — there is nothing left to do. */
  finished?: boolean;
  onStepClick?: (index: number) => void;
  children: ReactNode;
}

const useClock = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(timer);
  }, []);
  return now;
};

const KioskFrame: React.FC<Props> = ({
  steps = [],
  activeIndex = 0,
  finished,
  onStepClick,
  children,
}) => {
  const now = useClock();
  const [actionSlot, setActionSlot] = useState<HTMLElement | null>(null);
  const hasSteps = steps.length > 0;

  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" });
  // Phones give the clock a corner, not a column, so the long weekday is
  // abbreviated rather than wrapped or clipped.
  const shortDate = now.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });

  return (
    <ActionSlot.Provider value={actionSlot}>
      <div className={`h-dvh flex flex-col lg:flex-row ${GROUND} text-slate-900`}>
        {/* Identity rail. Full height on landscape tablets — the orientation a
            wall-mounted kiosk lives in — so the screen reads as an LBEF
            check-in station from across the lobby, not as a web form. */}
        <aside className="relative shrink-0 overflow-hidden bg-linear-to-b from-[#125DAA] via-[#0E4A87] to-[#062A4E] lg:w-80 xl:w-96 lg:flex lg:flex-col border-b-4 lg:border-b-0 lg:border-r-4 border-[#E01B2E]">
          {/* Two soft lights over the gradient: the red one picks the accent
              back up at the top, the pale one keeps the deep bottom from going
              flat. Decorative, and behind everything. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -left-20 w-80 h-80 rounded-full bg-[#E01B2E]/25 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-sky-300/15 blur-3xl"
          />

          <div className="relative flex items-center gap-4 px-4 py-3.5 sm:px-6 lg:block lg:px-10 lg:pt-12 lg:pb-0">
            <img
              src={lbefLogo}
              alt="LBEF College"
              className="h-9 lg:h-auto lg:w-56 w-auto object-contain"
            />

            <p className={`${eyebrowClass} hidden lg:block text-blue-100/90 mt-7`}>
              Welcome to LBEF
            </p>

            {/* The clock the desk staff and the visitor both glance at. It used
                to be landscape-only, which left a phone with no time at all —
                the one screen where the visitor cannot look up at a wall
                clock instead. */}
            <div className="ml-auto flex items-center gap-3.5 lg:hidden">
              <span aria-hidden="true" className="h-9 w-px bg-white/20" />
              <div className="text-right">
                <p className="text-xl font-bold leading-none text-white tabular-nums">{time}</p>
                <p className="mt-1.5 text-[11px] font-medium leading-none text-blue-100/80">
                  {shortDate}
                </p>
              </div>
            </div>
          </div>

          {/* Portrait and phone: one thin progress strip instead of the ledger,
              captioned so the bars say where the visitor is rather than just
              how far along they are. */}
          {hasSteps && !finished && (
            <div className="relative lg:hidden px-4 pb-3.5 sm:px-6">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-100/70 tabular-nums">
                  Step {activeIndex + 1} of {steps.length}
                </p>
                <p className="text-[12px] font-semibold text-white/90 truncate">
                  {steps[activeIndex]?.label}
                </p>
              </div>
              <div className="flex gap-1.5">
                {steps.map((step, index) => (
                  <span
                    key={step.label}
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                      index <= activeIndex ? "bg-[#E01B2E]" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Landscape: a numbered ledger that reads like a front-desk checklist.
              Numbering is honest here — this really is a fixed sequence — and
              each completed line shows the answer so it can be corrected. */}
          {hasSteps && (
            <ol className="relative hidden lg:block px-10 mt-12 space-y-1">
              {steps.map((step, index) => {
                const isDone = finished || index < activeIndex;
                const isActive = !finished && index === activeIndex;
                const canReturn = isDone && !finished && !!onStepClick;

                const line = (
                  <>
                    <span
                      className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold transition duration-200 ${
                        isActive
                          ? "bg-white text-[#125DAA] ring-4 ring-white/20 shadow-lg shadow-[#062A4E]/40"
                          : isDone
                            ? "bg-white/20 text-white ring-1 ring-inset ring-white/25"
                            : "bg-white/10 text-white/50 ring-1 ring-inset ring-white/10"
                      }`}
                    >
                      {isDone ? <Check className="w-5 h-5" strokeWidth={3} /> : index + 1}
                    </span>
                    <span className="min-w-0 pt-1.5">
                      <span
                        className={`block text-base font-semibold transition-colors ${
                          isActive ? "text-white" : isDone ? "text-white/90" : "text-white/50"
                        }`}
                      >
                        {step.label}
                      </span>
                      {isDone && step.answer && (
                        <span className="block text-sm text-blue-100/80 truncate">{step.answer}</span>
                      )}
                    </span>
                  </>
                );

                return (
                  <li key={step.label}>
                    {canReturn ? (
                      <button
                        type="button"
                        onClick={() => onStepClick(index)}
                        className={`${focusRing} focus-visible:ring-white focus-visible:ring-offset-[#0E4A87] w-full flex gap-3.5 items-start text-left p-2 -ml-2 rounded-2xl hover:bg-white/10 transition`}
                      >
                        {line}
                      </button>
                    ) : (
                      <div
                        className="flex gap-3.5 items-start p-2 -ml-2"
                        aria-current={isActive ? "step" : undefined}
                      >
                        {line}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          )}

          <div className="relative hidden lg:block mt-auto px-10 pb-10">
            <div className="h-px w-full bg-linear-to-r from-white/25 to-transparent mb-7" />
            <p className="text-[2.75rem] leading-none font-bold text-white tabular-nums tracking-tight">
              {time}
            </p>
            <p className="text-sm text-blue-100/80 mt-2">{date}</p>
          </div>
        </aside>

        {/* One scroll container for content + action bar, rather than two
            independently-sized panes. A fixed split can leave the bottom of
            a tall step (the QR pass card, on a short viewport) with nowhere
            to scroll to; sticking the action bar to the bottom of a single
            scrollable region guarantees everything above it stays reachable
            on any screen size. */}
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <div className="relative min-h-full flex flex-col">
            {/* LBEF's butterfly as a watermark in the corner of the working
                surface. Decorative only, so it is hidden from assistive tech.

                It hangs off the bottom-right corner on purpose, and it has to
                be clipped by a box of its own: `main` scrolls, so anything
                overhanging its edges counts toward its scroll extent. Left
                loose, this one 40px overhang gave the right-hand pane 40px of
                scroll on every screen where the content already fitted — the
                pane twitched under a finger with nothing below to reach. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <img
                src={butterfly}
                alt=""
                className="select-none absolute -bottom-10 -right-10 w-72 xl:w-96 opacity-[0.07]"
              />
            </div>

            <div className="relative flex-1 px-4 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
              {/* Left-aligned against the rail rather than centred, so the
                  reading edge stays put as steps change length. */}
              {/* Centring a max-w-4xl block inside a wider max-w-6xl track
                  parks the content just left of centre. */}
              <div className="max-w-6xl mx-auto">
                <div className="max-w-4xl">{children}</div>
              </div>
            </div>

            <div className="sticky bottom-0 z-10 shrink-0 border-t border-slate-200/70 bg-white/85 backdrop-blur-xl px-4 py-3.5 sm:px-8 sm:py-4 lg:px-12">
              <div className="max-w-6xl mx-auto">
                <div ref={setActionSlot} className="max-w-4xl flex flex-wrap items-center gap-3" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ActionSlot.Provider>
  );
};

export default KioskFrame;
