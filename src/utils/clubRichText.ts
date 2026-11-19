import DOMPurify from "dompurify";

// Club mission, vision and past experiences are written in a small rich-text
// editor, so they are stored as HTML. Only what that editor produces is allowed.
const ALLOWED_TAGS = ["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "a"];
const ALLOWED_ATTR = ["href", "target", "rel"];

const looksLikeHtml = (raw: string) => /<[a-z][\s\S]*>/i.test(raw);

// Text saved before the editor existed is plain, so its newlines become <br>.
export const toClubHtml = (raw?: string | null): string => {
  const value = raw?.trim();
  if (!value) return "";

  const html = looksLikeHtml(value) ? value : value.replace(/\n/g, "<br>");
  return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
};

// Tailwind resets lists and paragraphs, so both the editor and the website
// restore them here. An empty paragraph keeps its height: that is a blank line.
export const clubRichTextClass =
  "[&_p:empty]:min-h-[1em] [&_p+p]:mt-2 [&_strong]:font-bold [&_em]:italic [&_u]:underline " +
  "[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_ul]:my-2 [&_ol]:my-2 [&_li_p]:mt-0 " +
  "[&_a]:text-[#135EAB] [&_a]:underline [&_a]:break-words";
