// Gallery.tsx
import { useEffect, useState } from "react";
import GalleryHeader from "./components/Head";
import useGroupGet from "./hook/useGalleryByType";
import ImageHero from "./components/ImageHero";
import useGetGallerys from "../../../pages/gallery/hooks/useGetAll";
import type { GalleryGroup } from "./model/gallery-model";
import GalleryTypeGrid from "./components/GalleryType";
import Seo from "../../../context/seo";
import { APP_URL } from "../../../constants";

const PAGE_LIMIT = 12;

const Gallery = () => {
  const [page, setPage] = useState(1);
  const [galleryGroups, setGalleryGroups] = useState<GalleryGroup[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading } = useGroupGet({
    page,
    limit: PAGE_LIMIT,
  });

  const { data: galleryImages } = useGetGallerys({
    page: 1,
    limit: 15,
  });

  const galImages = galleryImages?.data ?? [];

  useEffect(() => {
    if (!data?.data) return;

    setGalleryGroups(prev =>
      page === 1 ? data.data ?? [] : [...prev, ...(data.data ?? [])]
    );

    setHasMore(Boolean(data.pagination?.hasNextPage));
  }, [data, page]);

  const fetchNextPage = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  };



  return (
  <>
    <Seo
  title="Photo Gallery | Campus Life & Events at LBEF College"
  description="Explore photos of campus life, events, activities, and memorable moments at LBEF College Nepal through our official gallery."
  url={`${APP_URL}/media/photo-gallery`}
/>

    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100">
      <GalleryHeader  />
      <ImageHero galleryImages={galImages} />

      <div className="container mx-auto px-2 sm:px-4 pb-20">
        <GalleryTypeGrid
          galleryGroups={galleryGroups}
          isLoading={isLoading}
          hasMore={hasMore}
          page={page}
          fetchNextPage={fetchNextPage}
        />
      </div>
    </div>
  </>
  );
};

export default Gallery;