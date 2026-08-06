// Helpers for building journal article URLs from the `pageNo` field,
// which looks like "Vol 6 (Issue 1) - 1 - 12".
const PAGE_NO_REGEX = /Vol\s*(\d+)\s*\(Issue\s*(\d+)\)\s*-\s*(\d+)\s*-\s*(\d+)/;

/** "Vol 6 (Issue 1) - 1 - 12" -> "6-1-1-12" (empty string when unparseable). */
export function makeJournalSlug(pageStr?: string | null) {
  if (!pageStr) return "";
  const match = pageStr.match(PAGE_NO_REGEX);
  if (!match) return "";
  const [, vol, issue, start, end] = match;
  return `${vol}-${issue}-${start}-${end}`;
}

/** Public PDF location for an article, derived from its `pageNo`. */
export function makeJournalUrl(pageStr?: string | null) {
  const slug = makeJournalSlug(pageStr);
  if (!slug) return "";
  const [vol, issue] = slug.split("-");
  return `https://www.lbef.org/journal/${vol}-${issue}/download/${slug}.pdf`;
}
