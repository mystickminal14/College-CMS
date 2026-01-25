import { Helmet } from "react-helmet-async";
import { APP_URL } from "../constants";

interface SeoProps {
  title: string;
  description?: string;
  url?: string;
}

const Seo: React.FC<SeoProps> = ({ title, description, url }) => {
  const canonicalUrl = url || APP_URL;

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
    </Helmet>
  );
};

export default Seo;
