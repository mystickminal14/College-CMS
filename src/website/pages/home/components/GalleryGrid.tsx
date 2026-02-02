import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mountain, Sunrise, Droplet, Sunset, MapPin, Globe, TreeDeciduous, X } from "lucide-react";
import bg1 from '../../../../assets/test.webp';
import butterfly from '../../../../assets/butterfiles.webp';
import decoration from "../../../../assets/decoration.webp";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import useGetGallerys from "../../../../pages/gallery/hooks/useGetAll";
import { IMAGE_URL } from "../../../../constants";

const PAGE_LIMIT = 50;
const MOBILE_CIRCLE_IMAGES = 8; // Single circle with 8 images

// Define more compact grid patterns for each letter (4x4 grid instead of 5x5)
const LETTER_PATTERNS = {
  L: [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1]
  ],
  B: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1]
  ],
  E: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1]
  ],
  F: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0]
  ]
} as const;

const SkeletonLoader = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex justify-center items-center">
      {isDesktop ? (
        // Desktop skeleton - Compact LBEF pattern
        <div className="relative w-full max-w-5xl mx-auto h-[400px] flex items-center justify-center">
          <div className="flex gap-6 md:gap-8 lg:gap-10">
            {['L', 'B', 'E', 'F'].map((letter) => (
              <div key={letter} className="grid grid-rows-4 gap-1.5 md:gap-2">
                {LETTER_PATTERNS[letter as keyof typeof LETTER_PATTERNS].map((row, rowIndex) => (
                  <div key={`${letter}-row-${rowIndex}`} className="flex gap-1.5 md:gap-2">
                    {row.map((cell, colIndex) => (
                      <div
                        key={`${letter}-${rowIndex}-${colIndex}`}
                        className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg overflow-hidden ${
                          cell === 1 
                            ? `bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 ${shouldReduceMotion ? '' : 'animate-pulse'}` 
                            : 'invisible'
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Mobile skeleton - single circular layout
        <div className="relative w-[320px] h-80 sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]">
          {Array.from({ length: MOBILE_CIRCLE_IMAGES }).map((_, index) => {
            const angle = (index * 360) / MOBILE_CIRCLE_IMAGES;
            const radian = (angle * Math.PI) / 180;
            const radius = 120; // Single circle radius
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;
            
            return (
              <div
                key={`mobile-skeleton-${index}`}
                className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 sm:border-3 border-white shadow-md"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className={`absolute inset-0 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 ${shouldReduceMotion ? '' : 'animate-pulse'}`} />
              </div>
            );
          })}
          
          {/* Center circle */}
          <div className={`absolute inset-0 m-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 ${shouldReduceMotion ? '' : 'animate-pulse'}`} />
        </div>
      )}
    </div>
  );
};

const GalleryGrid = () => {
  // For desktop LBEF layout
  const [imageMap, setImageMap] = useState<Record<string, Record<string, any>>>({});
  const [randomIndices, setRandomIndices] = useState<Record<string, Record<string, number>>>({});
  
  // For mobile single circular layout
  const [mobileCircleImages, setMobileCircleImages] = useState<any[]>([]);
  const [mobileRandomIndices, setMobileRandomIndices] = useState<number[]>([]);
  
  // Common states
  const [expandedImage, setExpandedImage] = useState<{ type: 'desktop' | 'mobile'; letter?: string; position?: string; index?: number } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<{ letter: string; position: string } | null>(null);
  const [hoveredMobileIndex, setHoveredMobileIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [page] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { data, isLoading } = useGetGallerys({
    page,
    limit: PAGE_LIMIT,
  });

  const navigate = useNavigate();

  const icons = useMemo(() => [
    <Mountain size={18} className="w-4 h-4 sm:w-5 sm:h-5" />,
    <Globe size={18} className="w-4 h-4 sm:w-5 sm:h-5" />,
    <Sunrise size={18} className="w-4 h-4 sm:w-5 sm:h-5" />,
    <TreeDeciduous size={18} className="w-4 h-4 sm:w-5 sm:h-5" />,
    <Droplet size={18} className="w-4 h-4 sm:w-5 sm:h-5" />,
    <Sunset size={18} className="w-4 h-4 sm:w-5 sm:h-5" />,
    <MapPin size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
  ], []);

  // Check if desktop on mount and resize
  useEffect(() => {
    const checkIsDesktop = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsDesktop(width >= 1024);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Function to distribute images for desktop LBEF layout
  const distributeDesktopImages = useCallback((images: any[]) => {
    if (!images || images.length === 0) return { 
      imageMap: {}, 
      randomIndices: {} 
    };
    
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    let imageIndex = 0;
    
    const newImageMap: Record<string, Record<string, any>> = {};
    const newRandomIndices: Record<string, Record<string, number>> = {};
    
    // For each letter, assign images to positions where pattern has 1
    Object.keys(LETTER_PATTERNS).forEach(letter => {
      const pattern = LETTER_PATTERNS[letter as keyof typeof LETTER_PATTERNS];
      newImageMap[letter] = {};
      newRandomIndices[letter] = {};
      
      pattern.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell === 1 && imageIndex < shuffled.length) {
            const position = `${rowIndex}-${colIndex}`;
            newImageMap[letter][position] = shuffled[imageIndex];
            newRandomIndices[letter][position] = Math.floor(Math.random() * icons.length);
            imageIndex++;
          }
        });
      });
    });
    
    return { 
      imageMap: newImageMap, 
      randomIndices: newRandomIndices 
    };
  }, [icons.length]);

  // Function to distribute images for mobile single circular layout
  const distributeMobileImages = useCallback((images: any[]) => {
    if (!images || images.length === 0) return [];
    
    // Take up to MOBILE_CIRCLE_IMAGES images for the single circle
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, MOBILE_CIRCLE_IMAGES);
  }, []);

  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      if (isDesktop) {
        // Desktop layout - LBEF pattern
        const { imageMap: newImageMap, randomIndices: newRandomIndices } = distributeDesktopImages(data.data);
        setImageMap(newImageMap);
        setRandomIndices(newRandomIndices);
      } else {
        // Mobile layout - Single circular pattern
        const mobileImages = distributeMobileImages(data.data);
        setMobileCircleImages(mobileImages);
        setMobileRandomIndices(Array.from({ length: mobileImages.length }, () => Math.floor(Math.random() * icons.length)));
      }
    }
  }, [data, isDesktop, distributeDesktopImages, distributeMobileImages, icons.length]);

  // Function to construct full image URL
  const getImageUrl = useCallback((imagePath: string) => {
    if (!imagePath) return '';
    
    const cleanPath = imagePath.trim();
    const formattedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    return `${IMAGE_URL}${formattedPath}`;
  }, []);

  // Get image URL based on type
  const getImageSrc = useCallback((type: 'desktop' | 'mobile', letter?: string, position?: string, index?: number) => {
    if (type === 'desktop' && letter && position) {
      const image = imageMap[letter]?.[position];
      return image?.link ? image.link : getImageUrl(image?.image);
    } else if (type === 'mobile' && index !== undefined) {
      const image = mobileCircleImages[index];
      return image?.link ? image.link : getImageUrl(image?.image);
    }
    return '';
  }, [imageMap, mobileCircleImages, getImageUrl]);

  const handleDesktopImageClick = useCallback((letter: string, position: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (expandedImage?.type === 'desktop' && expandedImage?.letter === letter && expandedImage?.position === position) {
      setExpandedImage(null);
    } else {
      setExpandedImage({ type: 'desktop', letter, position });
    }
    
    setTimeout(() => setIsAnimating(false), 250);
  }, [isAnimating, expandedImage]);

  const handleMobileImageClick = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (expandedImage?.type === 'mobile' && expandedImage?.index === index) {
      setExpandedImage(null);
    } else {
      setExpandedImage({ type: 'mobile', index });
    }
    
    setTimeout(() => setIsAnimating(false), 250);
  }, [isAnimating, expandedImage]);

  const closeExpandedImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setExpandedImage(null);
    setTimeout(() => setIsAnimating(false), 250);
  }, [isAnimating]);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && expandedImage !== null) {
        closeExpandedImage();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [expandedImage, closeExpandedImage]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (expandedImage !== null && containerRef.current && 
          !containerRef.current.contains(event.target as Node)) {
        closeExpandedImage();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [expandedImage, closeExpandedImage]);

  // Get total images count for desktop
  const totalDesktopImages = useMemo(() => 
    Object.values(imageMap).reduce((sum, letterMap) => 
      sum + Object.keys(letterMap || {}).length, 0
    ), [imageMap]
  );

  // Get total images count for mobile
  const totalMobileImages = useMemo(() => 
    mobileCircleImages.length
  , [mobileCircleImages]);

  // Get global index for desktop
  const getGlobalIndex = useCallback((letter: string, position: string) => {
    const letterOrder = ['L', 'B', 'E', 'F'];
    let index = 0;
    
    for (const l of letterOrder) {
      if (l === letter) {
        const positions = Object.keys(imageMap[l] || {});
        const positionIndex = positions.indexOf(position);
        return index + positionIndex + 1;
      }
      index += Object.keys(imageMap[l] || {}).length;
    }
    
    return 0;
  }, [imageMap]);

  // Calculate radial positions for mobile single circle
  const getRadialPosition = useCallback((index: number, total: number, isExpanded = false) => {
    if (isExpanded) return { x: 0, y: 0, scale: 1 };
    
    const angle = (index * 360) / total;
    const radian = (angle * Math.PI) / 180;
    
    // Single circle radius based on screen size
    let radius;
    if (windowWidth < 640) {
      radius = 100; // Smaller radius for small screens
    } else if (windowWidth < 768) {
      radius = 120; // Medium radius for medium screens
    } else {
      radius = 140; // Larger radius for larger mobile screens
    }
    
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    
    return { x, y, scale: 1 }; // Consistent scale for single circle
  }, [windowWidth]);

  // Desktop layout helpers
  const getDesktopImageSize = useCallback(() => {
    if (windowWidth >= 1280) return 'w-14 h-14 lg:w-16 lg:h-16';
    if (windowWidth >= 1024) return 'w-12 h-12 lg:w-14 lg:h-14';
    return 'w-10 h-10 md:w-12 md:h-12';
  }, [windowWidth]);

  const getLetterSpacing = useCallback(() => {
    if (windowWidth >= 1280) return 'gap-8 lg:gap-10';
    if (windowWidth >= 1024) return 'gap-6 lg:gap-8';
    return 'gap-4 md:gap-6';
  }, [windowWidth]);

  const getRowGap = useCallback(() => {
    if (windowWidth >= 1280) return 'gap-1.5 lg:gap-2';
    if (windowWidth >= 1024) return 'gap-1.5';
    return 'gap-1';
  }, [windowWidth]);

  const getColumnGap = useCallback(() => {
    if (windowWidth >= 1280) return 'gap-1.5 lg:gap-2';
    if (windowWidth >= 1024) return 'gap-1.5';
    return 'gap-1';
  }, [windowWidth]);

  // Mobile layout helpers
  const getMobileImageSize = useCallback((isExpanded = false) => {
    if (isExpanded) {
      return 'w-[80vw] h-[80vw] sm:w-[60vw] sm:h-[60vw] max-w-[300px] max-h-[300px]';
    }
    
    // Single circle image sizes
    if (windowWidth < 640) {
      return 'w-16 h-16';
    } else if (windowWidth < 768) {
      return 'w-20 h-20';
    } else {
      return 'w-24 h-24';
    }
  }, [windowWidth]);

  const getMobileContainerHeight = useCallback(() => {
    if (windowWidth < 640) return 'h-[300px]';
    if (windowWidth < 768) return 'h-[350px]';
    return 'h-[420px]';
  }, [windowWidth]);

  // Optimized hover handlers for desktop
  const handleDesktopHoverStart = useCallback((letter: string, position: string) => {
    if (!expandedImage && !shouldReduceMotion) {
      setHoveredImage({ letter, position });
    }
  }, [expandedImage, shouldReduceMotion]);

  const handleDesktopHoverEnd = useCallback(() => {
    if (!expandedImage && !shouldReduceMotion) {
      setHoveredImage(null);
    }
  }, [expandedImage, shouldReduceMotion]);

  // Hover handlers for mobile
  const handleMobileHoverStart = useCallback((index: number) => {
    if (!expandedImage && windowWidth >= 768 && !shouldReduceMotion) {
      setHoveredMobileIndex(index);
    }
  }, [expandedImage, windowWidth, shouldReduceMotion]);

  const handleMobileHoverEnd = useCallback(() => {
    if (!expandedImage && windowWidth >= 768) {
      setHoveredMobileIndex(null);
    }
  }, [expandedImage, windowWidth]);

  // Helper function to get specific border radius for letter B
  const getBorderRadiusClass = useCallback((letter: string, rowIndex: number, colIndex: number) => {
    if (letter !== 'B') return 'rounded-lg';
    
    const pattern = LETTER_PATTERNS.B;
    const totalRows = pattern.length;
    const totalCols = pattern[0].length;
    
    // Top-right corners (first row, last column)
    if (rowIndex === 0 && colIndex === totalCols - 1) {
      // Using custom pixel values in square brackets
      return 'rounded-tr-[70px]'; // Custom value instead of rounded-tr-lg
    }
    
    // Bottom-right corners (last row, last column)
    if (rowIndex === totalRows - 1 && colIndex === totalCols - 1) {
      return 'rounded-br-[70px]'; // Custom value instead of rounded-br-lg
    }
    
    // For cells on the rightmost column that form the B curve
    if (colIndex === totalCols - 1) {
      // For cells that are at the top or bottom of the curve in the middle rows
      if ((rowIndex === 1 || rowIndex === 3) && pattern[rowIndex][colIndex] === 1) {
        return 'rounded-tr-lg rounded-br-lg';
      }
      
      // For cells in the middle row (row 2)
      if (rowIndex === 2 && pattern[rowIndex][colIndex] === 1) {
        // For the middle row, we only want top curvature since it's the horizontal part of B
        return 'rounded-tr-lg';
      }
    }
    
    // Default for other cells
    return 'rounded-lg';
  }, []);

  return (
    <section className="relative py-6 sm:py-8 md:py-10 overflow-hidden min-h-[350px] sm:min-h-[400px] md:min-h-screen">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg1})` }}
      />
      <div className="absolute inset-0 bg-black opacity-65" />

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Title section */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          className="text-center mb-4 lg-mb-10"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-6xl font-bold text-white mb-1 sm:mb-5 ">
            <span>Student </span>
            <span className="relative inline-block">
              <span className="text-white relative z-10">Life</span>
              <motion.img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 sm:-bottom-1 w-full h-1 sm:h-1.5"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: shouldReduceMotion ? 0 : 0.1, 
                  duration: shouldReduceMotion ? 0 : 0.2 
                }}
              />
            </span>
          </h2>
          
          <button
            onClick={() => navigate("/media/photo-gallery")}
            className="bg-white cursor-pointer text-indigo-600 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-indigo-50 transition-colors shadow-sm sm:shadow-md"
          >
            View Full Gallery
          </button>
        </motion.div>

        {/* Loading state with skeleton */}
        {isLoading && (
          <div className="space-y-3 sm:space-y-4">
            <SkeletonLoader />
          </div>
        )}

        {/* No images state */}
        {!isLoading && (!data?.data || data.data.length === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            className="text-center py-6 sm:py-8"
          >
            <div className="text-white text-base sm:text-lg font-medium bg-white/10 backdrop-blur-sm rounded p-4 sm:p-6 inline-block">
              <p className="mb-1 sm:mb-2">No images available</p>
              <p className="text-xs sm:text-sm text-gray-300">Check back later for student life photos</p>
            </div>
          </motion.div>
        )}

        {/* Gallery Container */}
        {!isLoading && ((isDesktop && totalDesktopImages > 0) || (!isDesktop && totalMobileImages > 0)) && (
          <div ref={containerRef} className="relative">
            <AnimatePresence>
              {/* Expanded image overlay */}
              {expandedImage && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    className="fixed inset-0 bg-black/90 z-50"
                    onClick={closeExpandedImage}
                  />
                  
                  {/* Expanded image container */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
                    onClick={closeExpandedImage}
                  >
                    <div className="relative w-full max-w-sm sm:max-w-md h-full max-h-[55vh] sm:max-h-[60vh]">
                      <motion.img
                        src={getImageSrc(
                          expandedImage.type,
                          expandedImage.letter,
                          expandedImage.position,
                          expandedImage.index
                        )}
                        alt="Expanded gallery image"
                        className="w-full h-full object-contain rounded-lg shadow-lg sm:shadow-xl"
                        initial={{ scale: 0.4 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: shouldReduceMotion ? "tween" : "spring", 
                          damping: shouldReduceMotion ? 0 : 20, 
                          stiffness: shouldReduceMotion ? 0 : 180 
                        }}
                      />
                      
                      {/* Close button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          closeExpandedImage();
                        }}
                        className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/60 text-white p-1.5 sm:p-2 rounded-full hover:bg-black/80 transition-colors z-50"
                        aria-label="Close expanded image"
                      >
                        <X size={16} className="sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {isDesktop ? (
              /* DESKTOP LAYOUT - LBEF pattern */
              <div className="relative min-h-[350px] lg:min-h-[480px] flex items-center justify-center">
                <div className={`flex ${getLetterSpacing()}`}>
                  {Object.entries(LETTER_PATTERNS).map(([letter, pattern]) => (
                    <div key={letter} className={`grid grid-rows-4 ${getRowGap()}`}>
                      {pattern.map((row, rowIndex) => (
                        <div key={`${letter}-row-${rowIndex}`} className={`flex ${getColumnGap()} relative`}>
                          {row.map((cell, colIndex) => {
                            const position = `${rowIndex}-${colIndex}`;
                            const image = imageMap[letter]?.[position];
                            const hasImage = cell === 1 && image;
                            const isExpanded = expandedImage?.type === 'desktop' && 
                                              expandedImage?.letter === letter && 
                                              expandedImage?.position === position;
                            const isHovered = hoveredImage?.letter === letter && hoveredImage?.position === position;
                            
                            // Add butterfly image above the first row last image of letter 'E'
                            const showButterfly = letter === 'E' && rowIndex === 0 && colIndex === 3 && hasImage;
                            
                            if (!hasImage) {
                              return cell === 1 ? (
                                <div
                                  key={`${letter}-${rowIndex}-${colIndex}`}
                                  className={`${getDesktopImageSize()} ${getBorderRadiusClass(letter, rowIndex, colIndex)} overflow-hidden bg-white/10 backdrop-blur-sm`}
                                />
                              ) : (
                                <div
                                  key={`${letter}-${rowIndex}-${colIndex}`}
                                  className={`${getDesktopImageSize()} invisible`}
                                />
                              );
                            }
                            
                            const globalIndex = getGlobalIndex(letter, position);
                            const borderRadiusClass = getBorderRadiusClass(letter, rowIndex, colIndex);
                            
                            return (
                              <motion.div
                                key={`${letter}-${rowIndex}-${colIndex}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ 
                                  opacity: isExpanded ? 1 : 
                                           expandedImage ? 0.3 : 1,
                                  scale: isExpanded ? 1.1 : 1
                                }}
                                transition={{
                                  delay: shouldReduceMotion ? 0 : (rowIndex * 4 + colIndex) * 0.01 + (letter.charCodeAt(0) - 76) * 0.05,
                                  type: shouldReduceMotion ? "tween" : "spring",
                                  stiffness: shouldReduceMotion ? 0 : 200,
                                  damping: shouldReduceMotion ? 0 : 20
                                }}
                                className={`relative cursor-pointer group ${
                                  isExpanded ? 'z-30' : ''
                                }`}
                                onClick={() => handleDesktopImageClick(letter, position)}
                                onMouseEnter={() => handleDesktopHoverStart(letter, position)}
                                onMouseLeave={handleDesktopHoverEnd}
                              >
                                {/* Butterfly image for letter E, first row, last column */}
                                {showButterfly && (
                              <motion.img
  src={butterfly}
  alt="Butterfly decoration"
  className="absolute w-14 h-14 lg:w-16 lg:h-16 -top-13 -right-9 z-20 pointer-events-none"
  initial={{ opacity: 0, y: -100, rotate: -20 }}
  whileInView={{ 
    opacity: 1, 
    y: 0, 
    rotate: 0 
  }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{
    delay: shouldReduceMotion ? 0 : 0.3,
    type: shouldReduceMotion ? "tween" : "spring",
    stiffness: shouldReduceMotion ? 0 : 200,
    damping: shouldReduceMotion ? 0 : 20,
    mass: 0.8,
    bounce: 0.5
  }}
  whileHover={{
    y: -5,
    rotate: 5,
    scale: 1.05,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }}
/>
                                )}
                                
                                <div className={`relative overflow-hidden border-2 border-white/80 shadow-lg transition-all duration-150 ease-out
                                  ${getDesktopImageSize()}
                                  ${borderRadiusClass}
                                  ${isHovered && !expandedImage && !shouldReduceMotion 
                                    ? 'scale-120 ring-1 ring-white/50 ring-offset-1' 
                                    : 'scale-100'}`}
                                >
                                  <img
                                    src={image?.link ? image.link : getImageUrl(image?.image)}
                                    alt={`Gallery image ${globalIndex}`}
                                    className="w-full h-full object-cover transition-transform duration-150 ease-out"
                                    style={{
                                      transform: isHovered && !expandedImage && !shouldReduceMotion ? 'scale(1.10)' : 'scale(1)'
                                    }}
                                  />
                                  
                                  <div 
                                    className="absolute inset-0 bg-linear-to-t from-black/30 via-black/15 to-transparent transition-opacity duration-150"
                                    style={{
                                      opacity: isExpanded ? 0.5 : 
                                               isHovered && !expandedImage ? 0.25 : 0.15
                                    }}
                                  />
                                  
                                  <div 
                                    className="absolute bottom-1 left-1 text-white transition-opacity duration-150"
                                    style={{
                                      opacity: isExpanded ? 1 : 
                                               isHovered && !expandedImage ? 0.8 : 0.5,
                                      transform: isExpanded || (isHovered && !expandedImage) ? 'scale(1)' : 'scale(0.8)'
                                    }}
                                  >
                                    <div className="p-0.5 bg-white/20 rounded-full backdrop-blur-sm">
                                      {icons[randomIndices[letter]?.[position] || 0]}
                                    </div>
                                  </div>
                                  
                                  <div className="absolute top-1 right-1 bg-black/40 text-white text-[9px] font-bold rounded-full w-3 h-3 flex items-center justify-center">
                                    {globalIndex}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* MOBILE LAYOUT - Single circular design */
              <div className={`relative ${getMobileContainerHeight()} flex items-center justify-center`}>
                {/* Circle Images */}
                {mobileCircleImages.map((image, index) => {
                  if (!image) return null;
                  
                  const position = getRadialPosition(index, mobileCircleImages.length);
                  const isExpanded = expandedImage?.type === 'mobile' && 
                                    expandedImage?.index === index;
                  const isHovered = hoveredMobileIndex === index;
                  
                  return (
                    <motion.div
                      key={`mobile-${image?.id || index}`}
                      className={`absolute cursor-pointer group ${
                        isExpanded 
                          ? 'z-30' 
                          : expandedImage 
                            ? 'z-10 opacity-20' 
                            : 'z-20'
                      }`}
                      initial={{ 
                        x: 0, 
                        y: 0, 
                        scale: 0.8,
                        opacity: 0 
                      }}
                      animate={{
                        x: isExpanded ? 0 : position.x,
                        y: isExpanded ? 0 : position.y,
                        scale: isExpanded ? 1 : position.scale,
                        opacity: 1,
                      }}
                      transition={{
                        type: shouldReduceMotion ? "tween" : "spring",
                        stiffness: isExpanded ? 250 : 180,
                        damping: 18,
                        delay: index * 0.02
                      }}
                      whileHover={windowWidth >= 768 && !shouldReduceMotion ? {
                        scale: expandedImage === null ? 1.2 : 1,
                        zIndex: 25,
                        transition: { 
                          type: "spring",
                          stiffness: 300,
                          damping: 15
                        }
                      } : {}}
                      onHoverStart={() => handleMobileHoverStart(index)}
                      onHoverEnd={handleMobileHoverEnd}
                      onClick={() => handleMobileImageClick(index)}
                      style={{
                        originX: 0.5,
                        originY: 0.5,
                      }}
                    >
                      <div className={`relative overflow-hidden rounded-full border-2 sm:border-3 border-white shadow-md sm:shadow-lg transition-all duration-200 ${
                        getMobileImageSize(isExpanded)
                      } ${windowWidth >= 768 && isHovered && !expandedImage ? 'ring-1 sm:ring-2 ring-white/30 ring-offset-1 sm:ring-offset-2' : ''}`}>
                        <motion.img
                          src={image?.link ? image.link : getImageUrl(image?.image)}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-full object-cover"
                          animate={{
                            scale: isExpanded ? 1.05 : 
                                   windowWidth >= 768 && isHovered ? 1.08 : 1
                          }}
                          transition={{ 
                            duration: 0.2,
                            ease: "easeOut"
                          }}
                        />
                        
                        <motion.div 
                          className="absolute inset-0 bg-linear-to-t from-black/30 sm:from-black/40 via-black/10 sm:via-black/20 to-transparent"
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: isExpanded ? 0.5 : 
                                     windowWidth >= 768 && isHovered ? 0.35 : 0.2
                          }}
                          transition={{ duration: 0.2 }}
                        />
                        
                        <motion.div 
                          className="absolute bottom-1 sm:bottom-1.5 left-1 sm:left-1.5 text-white"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: isExpanded ? 1 : 
                                     windowWidth >= 768 && isHovered ? 0.85 : 0.6,
                            scale: 1
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-0.5 sm:p-1 bg-white/15 sm:bg-white/20 rounded-full backdrop-blur-sm">
                            {icons[mobileRandomIndices[index] || index % icons.length]}
                          </div>
                        </motion.div>
                        
                        <div className="absolute top-1 sm:top-1 right-1 sm:right-1 bg-black/30 sm:bg-black/40 text-white text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-4 sm:h-4 flex items-center justify-center">
                          {index + 1}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                
                {/* Center circle - only show if we have images */}
                {mobileCircleImages.length > 1 && expandedImage === null && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: shouldReduceMotion ? 0 : 0.2, 
                      type: shouldReduceMotion ? "tween" : "spring" 
                    }}
                    className="absolute inset-0 m-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-linear-to-r from-white/10 sm:from-white/15 to-white/5 backdrop-blur-sm border border-white/15 sm:border-2 sm:border-white/20 flex items-center justify-center shadow-sm sm:shadow-md"
                  >
                    <div className="text-center p-2 sm:p-3">
                      <p className="text-white text-xs sm:text-sm font-medium">Gallery</p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryGrid;