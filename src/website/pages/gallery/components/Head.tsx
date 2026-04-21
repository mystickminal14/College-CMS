import HeroTitleWithGif from "../../../../components/AnimatedTitleWithGif";

const GalleryHeader = () => {
  return (
    <>
      <HeroTitleWithGif
        title="Image Gallery"
        highlightedText="Gallery"
        subtitle="Browse through our collection of images. Click on any image to view it in full size and navigate through the gallery."
        badgeText="Image Gallery"
      />
    </>
  );
};

export default GalleryHeader;
