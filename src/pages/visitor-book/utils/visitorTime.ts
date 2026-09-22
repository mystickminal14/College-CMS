/* ---------------------------------------------------------------------------
   The PHP register stamps inTime, outTime and visitedDate with date('Y-m-d
   H:i:s') under a php.ini whose date.timezone is UTC, so every value arrives
   5h45m behind the wall clock reception actually reads. The stamps also carry
   no offset, which browsers parse as *local* time — printing 07:22 for a 13:07
   arrival. Both halves are corrected here: the stamp is read as UTC and
   printed in Nepal time, whichever zone the kiosk or the admin's laptop is on.
--------------------------------------------------------------------------- */

const VISITOR_TIME_ZONE = "Asia/Kathmandu";

const HAS_ZONE = /(?:[zZ]|[+-]\d{2}:?\d{2})$/;

/** Parses a register stamp, reading an offset-less value as UTC. */
const parseStamp = (value?: string | null) => {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  // "2026-09-22 07:22:07" -> "2026-09-22T07:22:07Z"; a value that already
  // carries an offset (should the API ever start sending one) is left alone.
  const iso = trimmed.replace(" ", "T");
  const date = new Date(HAS_ZONE.test(iso) ? iso : `${iso}Z`);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatVisitorTime = (value?: string | null) => {
  const date = parseStamp(value);
  return date
    ? date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: VISITOR_TIME_ZONE,
      })
    : "--";
};

export const formatVisitorDate = (
  value?: string | null,
  options: Intl.DateTimeFormatOptions = {},
) => {
  const date = parseStamp(value);
  return date ? date.toLocaleDateString([], { ...options, timeZone: VISITOR_TIME_ZONE }) : "--";
};
