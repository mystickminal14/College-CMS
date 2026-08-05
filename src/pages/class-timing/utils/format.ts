import type { ClassTiming } from "../model/ClassTimingModel";

/** "06:30" → "6:30 AM", "17:30" → "5:30 PM" */
export const formatTime = (value?: string | null) => {
  if (!value) return "";

  const [rawHour, rawMinute] = value.split(":");
  const hour = Number(rawHour);
  if (Number.isNaN(hour)) return value;

  const suffix = hour < 12 ? "AM" : "PM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${displayHour}:${rawMinute} ${suffix}`;
};

/** "6:30 AM – 11:00 AM", or "" when the timing only carries days */
export const formatTimeRange = (timing: Pick<ClassTiming, "startTime" | "endTime">) => {
  if (!timing.startTime || !timing.endTime) return "";
  return `${formatTime(timing.startTime)} – ${formatTime(timing.endTime)}`;
};

export const isLecture = (timing: Pick<ClassTiming, "kind">) =>
  timing.kind === "LECTURE";

export const isTutorial = (timing: Pick<ClassTiming, "kind">) =>
  timing.kind === "TUTORIAL";
