import { useEffect, useState } from "react";
import useGetGallerys from "../../../pages/gallery/hooks/useGetAll";
import type { Gallerys } from "../../../pages/gallery/model/GallModel";
import ImageModal from "./components/ImageModel";
import GalleryHeader from "./components/Head";
import GalleryGrid from "./components/GalleryGrid";
import ImageHero from "./components/ImageHero";

const PAGE_LIMIT = 15;

const Gallery = () => {
  const [page, setPage] = useState(1);
  const [galleryImages, setGalleryImages] = useState<Gallerys[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Gallerys | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetGallerys({
    page,
    limit: PAGE_LIMIT,
  });

  useEffect(() => {
    if (!data?.data) return;

    setGalleryImages(prev =>
      page === 1 ? data.data ?? [] : [...prev, ...(data.data ?? [])]
    );

    setHasMore(Boolean(data.pagination?.hasNextPage));
  }, [data, page]);

  const fetchNextPage = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const handleImageClick = (image: Gallerys) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    if (currentIndex < galleryImages.length - 1) {
      setSelectedImage(galleryImages[currentIndex + 1]);
    }
  };

  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    if (currentIndex > 0) {
      setSelectedImage(galleryImages[currentIndex - 1]);
    }
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, selectedImage]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100">
      <GalleryHeader />
      <ImageHero galleryImages={galleryImages} />
      <div className="container mx-auto px-4 pb-20">
        <GalleryGrid
          images={galleryImages}
          isLoading={isLoading}
          hasMore={hasMore}
          page={page}
          onImageClick={handleImageClick}
          fetchNextPage={fetchNextPage}
        />
      </div>

      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        images={galleryImages}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />


    </div>
  );
};

export default Gallery;