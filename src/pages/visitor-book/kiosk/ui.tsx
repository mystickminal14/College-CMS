import { type ReactNode } from "react";
import { AlertCircle } from "lucide-react";

import { eyebrowClass, labelClass, optionalTagClass } from "./tokens";

/**
 * Question at the top of every step. The red rule under the heading gives each
 * screen the same anchor line, so the eye lands in the same place every time
 * the step changes — which matters more on a kiosk than on a page someone
 * reads at their own pace. It tapers to transparent rather than stopping dead,
 * so it reads as an underline for the words above it and not as a divider
 * cutting the screen in half.
 */
export const StepHeading: React.FC<{
  eyebrow?: string;
  title: string;
  hint?: string;
  aside?: ReactNode;
}> = ({ eyebrow, title, hint, aside }) => (
  <header className="mb-5 sm:mb-7">
    <div className="flex items-end justify-between gap-6">
      <div className="min-w-0">
        {eyebrow && <p className={`${eyebrowClass} text-[#125DAA] mb-2.5`}>{eyebrow}</p>}
        <h1 className="text-2xl sm:text-3xl xl:text-[2.125rem] font-bold tracking-[-0.02em] text-slate-900 text-balance leading-[1.15]">
          {title}
        </h1>
        {hint && (
          <p className="text-[15px] sm:text-base text-slate-500 mt-2 leading-snug max-w-2xl">
            {hint}
          </p>
        )}
      </div>
      {aside && <div className="hidden lg:block shrink-0">{aside}</div>}
    </div>
    <div className="mt-4 sm:mt-5 h-1 w-20 rounded-full bg-linear-to-r from-[#E01B2E] to-[#E01B2E]/0" />
  </header>
);

/**
 * A labelled band inside a form card, so one long form reads as a few short
 * ones. Numbered because the bands really are answered top to bottom.
 */
export const FormSection: React.FC<{
  index: number;
  title: string;
  hint?: string;
  children: ReactNode;
}> = ({ index, title, hint, children }) => (
  <section>
    <div className="flex items-center gap-3 mb-4">
      <span className="w-7 h-7 shrink-0 rounded-lg bg-[#125DAA]/10 text-[#125DAA] text-[13px] font-bold flex items-center justify-center tabular-nums">
        {index}
      </span>
      <h2 className="text-[13px] font-bold uppercase tracking-[0.14em] text-slate-500">{title}</h2>
      <span aria-hidden="true" className="flex-1 h-px bg-linear-to-r from-slate-200 to-transparent" />
    </div>
    {hint && <p className="text-sm text-slate-500 -mt-1.5 mb-4 leading-snug">{hint}</p>}
    {children}
  </section>
);

/**
 * Label + control + error, in one place. Every field on the kiosk wears the
 * same 8px gap and the same red line underneath, and "optional" is a tag beside
 * the label rather than a quieter clause inside it — at tablet distance a
 * smaller weight mid-sentence just reads as noise.
 */
export const Field: React.FC<{
  label: string;
  htmlFor?: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  errorId?: string;
  className?: string;
  children: ReactNode;
}> = ({ label, htmlFor, optional, hint, error, errorId, className = "", children }) => {
  const Label = htmlFor ? "label" : "p";
  // min-w-0 because a Field is nearly always a grid cell, and a grid item
  // refuses to shrink below its content's min-content width — which for a bare
  // <input> is its `size` attribute, around 380px. Without this the fields
  // hang out over the right edge of the card on any narrow screen.
  return (
    <div className={`min-w-0 ${className}`}>
      <div className="flex items-center gap-2.5 mb-2">
        <Label className={labelClass} {...(htmlFor ? { htmlFor } : {})}>
          {label}
        </Label>
        {optional && <span className={optionalTagClass}>Optional</span>}
      </div>
      {hint && <p className="text-sm text-slate-500 -mt-1 mb-2 leading-snug">{hint}</p>}
      {children}
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
};

export const FieldError: React.FC<{ id?: string; children: ReactNode }> = ({ id, children }) => (
  <p id={id} role="alert" className="flex items-start gap-1.5 mt-2 text-[15px] font-medium text-red-600">
    <AlertCircle className="w-4 h-4 shrink-0 mt-[3px]" />
    <span>{children}</span>
  </p>
);

/** Whole-step failure — the register call came back with something to say. */
export const Alert: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    role="alert"
    className={`flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-[15px] text-red-700 ${className}`}
  >
    <AlertCircle className="w-5 h-5 shrink-0 mt-px" />
    <span className="leading-snug">{children}</span>
  </div>
);
