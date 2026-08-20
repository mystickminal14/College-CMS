/* Kiosk styling ------------------------------------------------------------
   These follow the public website's theme so the kiosk reads as part of
   lbef.org: gray-50 page, white rounded-2xl cards with a soft shadow,
   blue-600 pill buttons like the navbar CTA, Inter throughout.

   The only kiosk-specific departure is scale — targets are 56px+ and no text
   is under 14px, because this is used standing at arm's length from a tablet.
--------------------------------------------------------------------------- */

export const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const fieldBase =
  "w-full px-4 py-3.5 text-base rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

export const fieldClass = `${fieldBase} h-16`;

export const textareaClass = fieldBase;

export const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

export const primaryButtonClass =
  "inline-flex items-center justify-center gap-2.5 h-16 px-10 min-w-56 bg-blue-600 text-white text-lg font-semibold whitespace-nowrap rounded-full shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.99] disabled:bg-gray-300 disabled:shadow-none disabled:hover:bg-gray-300 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

export const ghostButtonClass =
  "inline-flex items-center justify-center gap-2 h-16 px-8 bg-white border border-gray-300 text-gray-700 text-lg font-semibold whitespace-nowrap rounded-full hover:bg-gray-50 active:scale-[0.99] disabled:opacity-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

export const linkButtonClass =
  "rounded-lg text-[15px] font-semibold text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

export const iconButtonClass =
  "w-16 h-16 shrink-0 flex items-center justify-center rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:scale-95 disabled:opacity-40 disabled:hover:bg-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
