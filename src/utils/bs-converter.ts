// utils/dateConverter.ts
import { ADToBS } from "bikram-sambat-js";

/**
 * Convert AD date string "YYYY-MM-DD" to a readable BS string.
 * Returns a formatted string like "YYYY-MM-DD (BS)" or "YYYY/MM/DD" depending on adToBs result.
 */
export function adDateToBsString(adDate: string): string {
  if (!adDate) return "";
  const parts = adDate.split("-");
  if (parts.length < 3) return "";

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  try {
    // adToBs usually returns an object. handle both cases gracefully.
    // Example object shape: { bsYear: 2079, bsMonth: 8, bsDate: 10 } (varies by lib version)
    // or it may return a string.
    const bs = (ADToBS as any)(year, month, day);

    if (!bs) return "";

    if (typeof bs === "string") {
      return bs;
    }

    // If object, try common keys
    const y = bs.bsYear ?? bs.year ?? bs.BSYear ?? bs[0];
    const m = bs.bsMonth ?? bs.month ?? bs.BSMonth ?? bs[1];
    const d = bs.bsDate ?? bs.date ?? bs.BSDate ?? bs[2];

    if (y && m && d) {
      // pad month/day to 2 digits
      const mm = String(m).padStart(2, "0");
      const dd = String(d).padStart(2, "0");
      return `${y}-${mm}-${dd}`;
    }

    // fallback to JSON string
    return typeof bs === "object" ? JSON.stringify(bs) : String(bs);
  } catch (err) {
    // if conversion fails, return empty string
    // Optionally log error in dev
    // console.error("BS conversion error", err);
    return "";
  }
}
