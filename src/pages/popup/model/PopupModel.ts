export type PopupSize = "SMALL" | "MEDIUM" | "LARGE" | "XL" | "CUSTOM";
export type PopupStatus = "OPEN" | "CLOSED";

export interface Popup {
  id: number;
  title: string;
  image: string;
  size: PopupSize;
  width: number;
  height: number;
  closesAt: number | null;
  status: PopupStatus;
  createdAt: string;
  updatedAt: string;
}

export const POPUP_SIZE_PRESETS: Record<Exclude<PopupSize, "CUSTOM">, { width: number; height: number }> = {
  SMALL: { width: 400, height: 225 },
  MEDIUM: { width: 600, height: 338 },
  LARGE: { width: 800, height: 450 },
  XL: { width: 1200, height: 675 },
};
