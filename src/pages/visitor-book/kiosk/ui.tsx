import type { ReactNode } from "react";
import { Check } from "lucide-react";

import { focusRing } from "./tokens";

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  media?: ReactNode;
  muted?: boolean;
}

/** One tappable choice — a department, or a member of staff. */
export const OptionCard: React.FC<OptionCardProps> = ({
  selected,
  onClick,
  title,
  subtitle,
  media,
  muted,
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`${focusRing} relative flex flex-col items-center text-center gap-3 px-4 py-6 min-h-36 rounded-2xl border-2 bg-white transition active:scale-[0.98] ${
      selected
        ? "border-blue-600 bg-blue-50 shadow-md"
        : muted
          ? "border-dashed border-gray-300 hover:border-blue-400 hover:shadow-sm"
          : "border-gray-200 hover:border-blue-400 hover:shadow-sm"
    }`}
  >
    {selected && (
      <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
        <Check className="w-4 h-4 text-white" strokeWidth={3} />
      </span>
    )}

    {media}

    <span className="text-[17px] font-semibold text-gray-900 leading-tight text-balance">
      {title}
    </span>
    {subtitle && <span className="text-sm text-gray-500 leading-snug line-clamp-2">{subtitle}</span>}
  </button>
);

/** Question at the top of every step. */
export const StepHeading: React.FC<{ eyebrow: string; title: string; hint?: string }> = ({
  eyebrow,
  title,
  hint,
}) => (
  <header className="mb-7">
    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">{eyebrow}</p>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-balance">{title}</h1>
    {hint && <p className="text-base text-gray-600 mt-2 leading-relaxed">{hint}</p>}
  </header>
);
