import { Helmet } from "react-helmet-async";
import { APP_URL } from "../constants";
interface SeoProps {
  title: string;
  description?: string;
  url?: string;
  image?: string;
}

const Seo: React.FC<SeoProps> = ({
  title,
  description = "Lord Buddha Education Foundation – The First IT College of Nepal",
  url,
  image = `${APP_URL}/assets/lbefhd.webp`,
}) => {
  const canonicalUrl = url || APP_URL;

  return (
    <Helmet>
      {/* Basic */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="lbef.org" />
      <meta name="keywords" content="LBEF, IT College Nepal, Education, Institute" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content="LBEF: The First IT College of Nepal" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/webp" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default Seo;
