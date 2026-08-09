import DOMPurify from "dompurify";

// The "How to Cite" field is authored in a small rich-text editor, so it holds
// HTML. Only the inline formatting a citation actually needs is allowed
// through — italic journal titles, super/subscript, and a DOI link.
const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "sup",
  "sub",
  "a",
];
const ALLOWED_ATTR = ["href", "target", "rel"];

const looksLikeHtml = (raw: string) => /<[a-z][\s\S]*>/i.test(raw);

/**
 * Normalises a stored citation into HTML that is safe to inject.
 *
 * Citations saved before the rich-text editor existed are plain text whose
 * line breaks are bare newlines; those get promoted to <br> so they still read
 * the way the author typed them.
 */
export const toCitationHtml = (raw?: string): string => {
  const value = raw?.trim();
  if (!value) return "";

  const html = looksLikeHtml(value) ? value : value.replace(/\n/g, "<br>");

  return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
};

/**
 * Flattens a stored citation to plain text for the clipboard, so pasting into
 * Word or a reference manager yields the citation rather than markup.
 */
export const toCitationText = (raw?: string): string => {
  const html = toCitationHtml(raw);
  if (!html) return "";

  const container = document.createElement("div");
  container.innerHTML = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n");

  return (container.textContent || "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};
