import type { NoticeType } from "../model/NoticeTypeModel";

/**
 * Notice types are user-defined, so badge colours cycle through a fixed palette
 * keyed on the type id. Academic and Administrative keep the colours they had
 * back when the type was an enum.
 */
const PALETTE = [
  "bg-blue-100 text-blue-800",
  "bg-red-100 text-red-800",
  "bg-emerald-100 text-emerald-800",
  "bg-purple-100 text-purple-800",
  "bg-amber-100 text-amber-800",
  "bg-cyan-100 text-cyan-800",
];

const SOLID_PALETTE = [
  "bg-blue-500",
  "bg-red-500",
  "bg-emerald-500",
  "bg-purple-500",
  "bg-amber-500",
  "bg-cyan-500",
];

// Softer gradient pills used on the public website
const WEB_PALETTE = [
  "bg-linear-to-r from-green-100 to-green-50 text-green-800 border border-green-200",
  "bg-linear-to-r from-purple-100 to-purple-50 text-purple-800 border border-purple-200",
  "bg-linear-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200",
  "bg-linear-to-r from-amber-100 to-amber-50 text-amber-800 border border-amber-200",
  "bg-linear-to-r from-rose-100 to-rose-50 text-rose-800 border border-rose-200",
  "bg-linear-to-r from-cyan-100 to-cyan-50 text-cyan-800 border border-cyan-200",
];

const paletteIndex = (type?: NoticeType | null) =>
  ((type?.id ?? 1) - 1 + PALETTE.length) % PALETTE.length;

export const noticeTypeBadgeClass = (type?: NoticeType | null) =>
  PALETTE[paletteIndex(type)];

export const noticeTypeSolidClass = (type?: NoticeType | null) =>
  SOLID_PALETTE[paletteIndex(type)];

export const noticeTypeWebBadgeClass = (type?: NoticeType | null) =>
  WEB_PALETTE[paletteIndex(type)];

export const noticeTypeLabel = (type?: NoticeType | null) => type?.name ?? "—";
