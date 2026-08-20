import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";

import butterfly from "../../../assets/butterfiles.webp";
import lbefLogo from "../../../assets/lbef_white.webp";
import { focusRing } from "./tokens";

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
  steps: KioskStep[];
  activeIndex: number;
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
  steps,
  activeIndex,
  finished,
  onStepClick,
  children,
}) => {
  const now = useClock();
  const [actionSlot, setActionSlot] = useState<HTMLElement | null>(null);

  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" });

  return (
    <ActionSlot.Provider value={actionSlot}>
      <div className="h-dvh flex flex-col lg:flex-row bg-white text-gray-900">
        {/* Identity rail. Full height on landscape tablets — the orientation a
            wall-mounted kiosk lives in — so the screen reads as an LBEF
            reception station from across the lobby, not as a web form. */}
        <aside className="shrink-0 bg-linear-to-b from-[#125DAA] to-[#062A4E] lg:w-80 xl:w-96 lg:flex lg:flex-col border-b-4 lg:border-b-0 lg:border-r-4 border-[#E01B2E]">
          <div className="flex items-center gap-4 px-5 py-4 lg:block lg:px-10 lg:pt-12 lg:pb-0">
            <img
              src={lbefLogo}
              alt="LBEF College"
              className="h-9 lg:h-auto lg:w-56 w-auto object-contain"
            />
            <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-100 lg:mt-7 ml-auto lg:ml-0 text-right lg:text-left">
              Reception
              <span className="hidden lg:inline"> check-in</span>
            </p>
          </div>

          {/* Portrait and phone: one thin progress strip instead of the ledger. */}
          {!finished && (
            <div className="lg:hidden flex gap-1 px-5 pb-4">
              {steps.map((step, index) => (
                <span
                  key={step.label}
                  className={`h-1 flex-1 rounded-full ${
                    index <= activeIndex ? "bg-[#E01B2E]" : "bg-white/25"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Landscape: a numbered ledger that reads like a reception checklist.
              Numbering is honest here — this really is a fixed sequence — and
              each completed line shows the answer so it can be corrected. */}
          <ol className="hidden lg:block px-10 mt-12 space-y-1">
            {steps.map((step, index) => {
              const isDone = finished || index < activeIndex;
              const isActive = !finished && index === activeIndex;
              const canReturn = isDone && !finished && !!onStepClick;

              const line = (
                <>
                  <span
                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold transition ${
                      isActive
                        ? "bg-white text-[#125DAA] ring-4 ring-white/25"
                        : isDone
                          ? "bg-white/25 text-white"
                          : "bg-white/15 text-white/60"
                    }`}
                  >
                    {isDone ? <Check className="w-5 h-5" strokeWidth={3} /> : index + 1}
                  </span>
                  <span className="min-w-0 pt-1.5">
                    <span
                      className={`block text-base font-semibold ${
                        isActive ? "text-white" : isDone ? "text-white/90" : "text-white/55"
                      }`}
                    >
                      {step.label}
                    </span>
                    {isDone && step.answer && (
                      <span className="block text-sm text-blue-100 truncate">{step.answer}</span>
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
                      className={`${focusRing} focus-visible:ring-white focus-visible:ring-offset-[#125DAA] w-full flex gap-3.5 items-start text-left p-2 -ml-2 rounded-xl hover:bg-white/10 transition`}
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

          <div className="hidden lg:block mt-auto px-10 pb-10">
            <p className="text-4xl font-bold text-white tabular-nums">{time}</p>
            <p className="text-sm text-blue-100 mt-1">{date}</p>
            <p className="text-[13px] text-white/70 mt-6 leading-relaxed">
              Need a hand? The reception desk is right here.
            </p>
          </div>
        </aside>

        <main className="flex-1 flex flex-col min-h-0">
          <div className="relative flex-1 min-h-0 overflow-hidden">
            {/* LBEF's butterfly as a watermark in the corner of the working
                surface. Decorative only, so it is hidden from assistive tech. */}
            <img
              src={butterfly}
              alt=""
              aria-hidden="true"
              className="pointer-events-none select-none absolute -bottom-10 -right-10 w-72 xl:w-96 opacity-10"
            />

            <div className="relative h-full overflow-y-auto px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
              {/* Left-aligned against the rail rather than centred, so the
                  reading edge stays put as steps change length. */}
              {/* Centring a max-w-4xl block inside a wider max-w-6xl track
                  parks the content just left of centre. */}
              <div className="max-w-6xl mx-auto">
                <div className="max-w-4xl">{children}</div>
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:px-8 lg:px-10">
            <div className="max-w-6xl mx-auto">
              <div ref={setActionSlot} className="max-w-4xl flex flex-wrap items-center gap-3" />
            </div>
          </div>
        </main>
      </div>
    </ActionSlot.Provider>
  );
};

export default KioskFrame;
