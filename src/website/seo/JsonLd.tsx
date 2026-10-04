import { Helmet } from "react-helmet-async";

/** Injects a schema.org JSON-LD block into <head>. */
const JsonLd = ({ data }: { data: object | null }) => {
  if (!data) return null;
  // Escape "<" so a "</script>" inside any string can't close the tag early.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <Helmet>
      <script type="application/ld+json">{json}</script>
    </Helmet>
  );
};

export default JsonLd;
