import { clubRichTextClass, toClubHtml } from "../../../../utils/clubRichText";

// Shows text written in the admin club editor, sanitised before it is injected.
const ClubRichText = ({ html, className = "" }: { html?: string | null; className?: string }) => (
  <div className={`${clubRichTextClass} ${className}`} dangerouslySetInnerHTML={{ __html: toClubHtml(html) }} />
);

export default ClubRichText;
