import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { APP_URL, PAGE_SEO_LOOKUP_CACHE_KEY } from "../constants";
import APIClient from "../services/apiClient";

interface ResolvedPageSeo {
  path: string;
  found: boolean;
  isCustom?: boolean;
  title?: string;
  description?: string;
  image?: string;
}

declare global {
  interface Window {
    __SEO__?: ResolvedPageSeo;
  }
}

const lookupApi = new APIClient<ResolvedPageSeo>("/page-seo/lookup");

// Admin-saved values win over the text passed to <Seo>. page-seo.php embeds them
// for the first page load; later in-app navigation asks the API.
const useSavedPageSeo = () => {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "") || "/";
  const embedded = window.__SEO__?.path === path ? window.__SEO__ : undefined;

  const { data } = useQuery({
    queryKey: [PAGE_SEO_LOOKUP_CACHE_KEY, path],
    queryFn: () => lookupApi.get(`?path=${encodeURIComponent(path)}`),
    enabled: !embedded && !/^\/(app|admin)(\/|$)/.test(path),
    staleTime: 5 * 60 * 1000,
    refetchInterval: false,
    retry: false,
  });

  const seo = embedded ?? data?.data;
  return seo?.isCustom ? seo : undefined;
};

interface SeoProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const Seo: React.FC<SeoProps> = ({
  title = "LBEF College Nepal | The First IT College of Nepal",
  description = "Lord Buddha Education Foundation – The First IT College of Nepal",
  url,
  image = `${APP_URL}/og-default.jpg`,
}) => {
  const saved = useSavedPageSeo();
  const finalTitle = saved?.title ?? title;
  const finalDescription = saved?.description ?? description;
  const finalImage = saved?.image ?? image;
  const canonicalUrl = url || APP_URL;

  // Helmet does not know about the tags page-seo.php sent, so drop them once its
  // own are in place. Otherwise the page ends up with two of each.
  useEffect(() => {
    document.querySelectorAll("head [data-server-seo]").forEach((node) => node.remove());
  }, []);

  return (
    <Helmet>
      {/* Basic */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="lbef.org" />
      <meta name="keywords" content="LBEF, IT College Nepal, Education, Institute" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content="LBEF: The First IT College of Nepal" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
    </Helmet>
  );
};

export default Seo;
