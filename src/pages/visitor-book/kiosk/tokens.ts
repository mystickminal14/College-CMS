/* Kiosk styling ------------------------------------------------------------
   The kiosk reads as part of lbef.org, but leans harder on the college's own
   palette than the marketing site does: brand blue #125DAA (deepening to
   #062A4E) and the red #E01B2E accent, on a slate-50 ground so white cards
   have something to sit on. Inter throughout, same as the rest of the site.

   Two kiosk-specific departures:

   * Scale. Targets are 56px+ and no *content* text is under 14px, because this
     is used standing at arm's length from a wall tablet. Uppercase eyebrow
     labels are the one exception: they run at 12px, where the extra weight and
     letter-spacing carry the legibility.

   * Softness. Controls are pill/2xl-round with a hairline slate ring and a wide
     low-opacity focus halo rather than a hard 2px outline — at tablet distance
     a thick ring reads as a *change of shape*, which makes the whole form feel
     like it is twitching as the visitor tabs through it.

   Everything here is a class string rather than a component so the pickers,
   which have to draw their own trigger button to fake a <select>, can wear the
   exact same skin as a real <input>.
--------------------------------------------------------------------------- */

/** The ground colour the kiosk sits on. */
export const GROUND = "bg-slate-50";

export const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#125DAA] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/* -- fields ---------------------------------------------------------------- */

const fieldBase =
  "w-full rounded-2xl border border-slate-200 bg-white text-base text-slate-900 shadow-xs placeholder:text-slate-400 transition duration-150 hover:border-slate-300 focus:outline-none focus:border-[#125DAA] focus:ring-4 focus:ring-[#125DAA]/12";

/** Shorter on a phone, full kiosk height from `sm` up — 64px of chrome per row
 *  is right at arm's length and overbearing on a 375px screen. */
export const fieldClass = `${fieldBase} h-14 sm:h-16 px-4 sm:px-5`;

export const textareaClass = `${fieldBase} px-4 sm:px-5 py-3.5 leading-relaxed resize-none`;

/** Appended to a field that failed validation. Same geometry, red halo. */
export const fieldErrorClass =
  "border-red-300 ring-4 ring-red-500/10 hover:border-red-300 focus:border-red-400 focus:ring-red-500/15";

export const labelClass = "block text-[15px] font-semibold text-slate-800";

/* -- surfaces -------------------------------------------------------------- */

/** White surface for content sitting on the slate ground. The shadow is two
 *  layers — a 1px contact edge plus a wide, very soft drop — which lifts the
 *  card without the grey smudge a single large shadow leaves behind. */
export const panelClass =
  "rounded-3xl bg-white ring-1 ring-slate-900/5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-16px_rgba(15,23,42,0.16)]";

/** Popover surface for the two pickers that draw their own option list. */
export const popoverClass =
  "rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_16px_-8px_rgba(15,23,42,0.12),0_24px_48px_-16px_rgba(15,23,42,0.24)]";

/* -- buttons --------------------------------------------------------------- */

const buttonBase =
  "inline-flex items-center justify-center gap-2.5 h-14 sm:h-16 rounded-full text-base sm:text-lg font-semibold whitespace-nowrap transition active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export const primaryButtonClass = `${buttonBase} px-7 sm:px-10 bg-linear-to-b from-[#1668BD] to-[#125DAA] text-white ring-1 ring-inset ring-white/15 shadow-lg shadow-[#125DAA]/25 hover:from-[#1B74CE] hover:to-[#0F4E8F] hover:shadow-xl hover:shadow-[#125DAA]/30 disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none disabled:ring-0 disabled:hover:from-slate-300 disabled:hover:to-slate-300 focus-visible:ring-[#125DAA]`;

export const ghostButtonClass = `${buttonBase} px-6 sm:px-8 bg-white border border-slate-200 text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 focus-visible:ring-[#125DAA]`;

export const linkButtonClass =
  "rounded-lg text-[15px] font-semibold text-[#125DAA] hover:text-[#0F4E8F] hover:underline underline-offset-4 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#125DAA] focus-visible:ring-offset-2";

export const iconButtonClass =
  "w-14 h-14 shrink-0 flex items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-xs hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 active:scale-95 disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#125DAA] focus-visible:ring-offset-2";

/* -- small type ------------------------------------------------------------ */

export const eyebrowClass = "text-xs font-bold uppercase tracking-[0.18em]";

/** Tag that marks a field as skippable, so "optional" never has to be smuggled
 *  into the label text in a smaller, quieter weight. */
export const optionalTagClass =
  "shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500";
