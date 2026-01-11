// GalleryView.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import decoration from "../../../assets/decoration.webp";
import { fadeUp } from "../../comp/animation";
import { useParams } from 'react-router-dom';
import { PAGE_LIMIT } from "../../../constants";
import useGetGallerys from "../../../pages/gallery/hooks/useGetAll";
import type { Gallerys } from "../../../pages/gallery/model/GallModel";
import GalleryGrid from "./components/GalleryGrid";
import ImageModal from "./components/ImageModel";
import { FaImages } from "react-icons/fa";

const GalleryView = () => {
  const [page, setPage] = useState(1);
  const [galleryImages, setGalleryImages] = useState<Gallerys[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Gallerys | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { name, id } = useParams<{ name: string; id: string }>();
  const typeId = id ? Number(id) : undefined;

  const { data: galleryData, isLoading } = useGetGallerys({
    page,
    limit: PAGE_LIMIT,
    typeId: typeId,
  });

  const galleryTypeName = galleryImages[0]?.type?.name || "Gallery";

  useEffect(() => {
    if (!galleryData?.data) return;

    setGalleryImages(prev =>
      page === 1 ? galleryData.data ?? [] : [...prev, ...(galleryData.data ?? [])]
    );

    setHasMore(Boolean(galleryData.pagination?.hasNextPage));
  }, [galleryData, page]);

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

  const formattedName = name 
    ? name.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Image Gallery";

  const getFormattedTitle = (title: string) => {
    if (!title) return { otherWords: '', lastWord: 'Gallery' };
    
    const words = title.trim().split(/\s+/);
    
    if (words.length === 0) return { otherWords: '', lastWord: 'Gallery' };
    
    if (words.length === 1) {
      return { otherWords: '', lastWord: words[0] };
    }
    
    const otherWords = words.slice(0, -1).join(' ');
    const lastWord = words[words.length - 1];
    
    return { otherWords, lastWord };
  };

  const getNameToDisplay = () => {
    if (galleryTypeName && galleryTypeName !== "Gallery") {
      return galleryTypeName;
    }
    
    if (formattedName && formattedName !== "Image Gallery") {
      return formattedName;
    }
    
    return "Image Gallery";
  };

  const displayName = getNameToDisplay();
  const { otherWords, lastWord } = getFormattedTitle(displayName);

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-8xl mx-auto text-center py-8 md:py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100"
        >
          <motion.span
            className="w-2 h-2 bg-blue-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut" as const
            }}
          />
          <FaImages className="text-blue-500" />
          <span className="text-blue-600 font-medium text-sm">Explore</span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
          {otherWords && (
            <span className="text-gray-900">{otherWords} </span>
          )}
          <span className="relative inline-block ml-2">
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent relative z-10">
              {lastWord}
            </span>
            <motion.img
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              src={decoration}
              alt="Decoration"
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-3"
            />
          </span>
        </h1>

      
      </motion.div>

      <div className="container mx-auto px-2 sm:px-4 pb-20">
        <GalleryGrid
          images={galleryImages}
          isLoading={isLoading}
          hasMore={hasMore}
          page={page}
          onImageClick={handleImageClick}
          fetchNextPage={fetchNextPage}
        />
      </div>

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

export default GalleryView;