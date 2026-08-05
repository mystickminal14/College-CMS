import type { Courses } from "../model/CourseModel";

/**
 * MBA programs run on the weekend (Friday evening + Saturday), so they never
 * use the weekday morning/day session and tutorial timings.
 *
 * The shift relation is the intended source of truth, but it is not filled in
 * consistently for every MBA course, so the slug/prefix are used as a fallback.
 */
export const isWeekendMbaCourse = (course: Pick<Courses, "slug" | "prefix" | "shift">) => {
  if (course.shift?.name?.toLowerCase() === "weekend") return true;

  const slug = course.slug?.toLowerCase().trim() ?? "";
  if (slug === "mba" || slug.startsWith("mba-")) return true;

  const prefix = course.prefix?.toLowerCase().trim() ?? "";
  return prefix === "mba" || prefix.startsWith("mba ");
};

/**
 * Shift label to display for a course. Weekend MBAs are forced to "Weekend"
 * because several of them still carry a stale shift row in the database, and a
 * "Morning" label would contradict the Friday/Saturday timings shown next to it.
 */
export const courseShiftName = (course: Pick<Courses, "slug" | "prefix" | "shift">) =>
  isWeekendMbaCourse(course) ? "Weekend" : course.shift?.name?.trim() || "";

