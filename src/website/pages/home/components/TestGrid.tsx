import { motion, AnimatePresence } from "framer-motion";
import { Mountain, Sunrise, Droplet, Sunset, MapPin, Globe, TreeDeciduous, X } from "lucide-react";
import bg1 from '../../../../assets/decoration/abouthero.webp';
import decoration from "../../../../assets/decoration.webp";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useGetGallerys from "../../../../pages/gallery/hooks/useGetAll";
import { IMAGE_URL } from "../../../../constants";

const PAGE_LIMIT = 50;
const INNER_CIRCLE_IMAGES = 8;
const OUTER_CIRCLE_IMAGES = 12;

const SkeletonLoader = () => {
  const [isDesktop, setIsDesktop] = useState(false);

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
      <div className="relative w-[320px] h-80 sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]">
        {/* Inner circle skeleton */}
        {Array.from({ length: 8 }).map((_, index) => {
          const angle = (index * 360) / 8;
          const radian = (angle * Math.PI) / 180;
          const radius = 140;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;
          
          return (
            <div
              key={`inner-skeleton-${index}`}
              className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 sm:border-3 border-white shadow-md"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
            </div>
          );
        })}
        
        {/* Outer circle skeleton - only show on desktop */}
        {isDesktop && Array.from({ length: 12 }).map((_, index) => {
          const angle = (index * 360) / 12;
          const radian = (angle * Math.PI) / 180;
          const radius = 280; // Increased from 240 to 280 for larger outer circle
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;
          
          return (
            <div
              key={`outer-skeleton-${index}`}
              className="absolute w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-white shadow-md"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
            </div>
          );
        })}
        
        {/* Center circle */}
        <div className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
      </div>
    </div>
  );
};

const GalleryGrid = () => {
  const [innerCircleImages, setInnerCircleImages] = useState<any[]>([]);
  const [outerCircleImages, setOuterCircleImages] = useState<any[]>([]);
  const [innerRandomIndices, setInnerRandomIndices] = useState<number[]>([]);
  const [outerRandomIndices, setOuterRandomIndices] = useState<number[]>([]);
  const [expandedImage, setExpandedImage] = useState<number | null>(null);
  const [expandedCircle, setExpandedCircle] = useState<'inner' | 'outer' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredCircle, setHoveredCircle] = useState<'inner' | 'outer' | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [page] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetGallerys({
    page,
    limit: PAGE_LIMIT,
  });

  const navigate = useNavigate();

  const icons = [
    <Mountain size={18} className="w-4 h-4 sm:w-5 sm:h-5" />,
    <Globe size={18} className="w-4 h-4 sm:w-5 sm:h-5" />,
    <Sunrise size={18} className="w-4 h-4 sm:w-5 sm:h-5" />,
    <TreeDeciduous size={18} className="w-4 h-4 sm:w-5 sm:h-5" />,
    <Droplet size={18} className="w-4 h-4 sm:w-5 sm:h-5" />,
    <Sunset size={18} className="w-4 h-4 sm:w-5 sm:h-5" />,
    <MapPin size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
  ];

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

  // Function to select images for both circles
  const selectImages = (images: any[]) => {
    if (!images || images.length === 0) return { inner: [], outer: [] };
    
    const totalNeeded = INNER_CIRCLE_IMAGES + OUTER_CIRCLE_IMAGES;
    
    if (images.length >= totalNeeded) {
      const shuffled = [...images].sort(() => 0.5 - Math.random());
      return {
        inner: shuffled.slice(0, INNER_CIRCLE_IMAGES),
        outer: shuffled.slice(INNER_CIRCLE_IMAGES, totalNeeded)
      };
    }
    
    if (images.length > INNER_CIRCLE_IMAGES) {
      return {
        inner: images.slice(0, INNER_CIRCLE_IMAGES),
        outer: images.slice(INNER_CIRCLE_IMAGES, images.length)
      };
    }
    
    return {
      inner: images.slice(0, Math.min(images.length, INNER_CIRCLE_IMAGES)),
      outer: []
    };
  };

  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      const { inner, outer } = selectImages(data.data);
      setInnerCircleImages(inner);
      setOuterCircleImages(outer);
      setInnerRandomIndices(Array.from({ length: inner.length }, () => Math.floor(Math.random() * icons.length)));
      setOuterRandomIndices(Array.from({ length: outer.length }, () => Math.floor(Math.random() * icons.length)));
    }
  }, [data]);

  // Function to construct full image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    
    const cleanPath = imagePath.trim();
    const formattedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    return `${IMAGE_URL}${formattedPath}`;
  };

  // Calculate radial positions
  const getRadialPosition = (index: number, total: number, circleType: 'inner' | 'outer', isExpanded = false) => {
    if (isExpanded) return { x: 0, y: 0, scale: 1 };
    
    const angle = (index * 360) / total;
    const radian = (angle * Math.PI) / 180;
    
    let radius;
    if (circleType === 'inner') {
      radius = total <= 4 
        ? 95 
        : windowWidth < 640 
          ? 100 
          : windowWidth < 768 
            ? 120 
            : windowWidth < 1024 
              ? 140 
              : 180;
    } else {
      radius = isDesktop ? 280 : 240; 
    }
    
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    
    return { x, y, scale: circleType === 'outer' ? 0.7 : 0.8 };
  };

  const handleImageClick = (index: number, circleType: 'inner' | 'outer') => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const globalIndex = circleType === 'inner' ? index : index + INNER_CIRCLE_IMAGES;
    
    if (expandedImage === globalIndex && expandedCircle === circleType) {
      setExpandedImage(null);
      setExpandedCircle(null);
    } else {
      setExpandedImage(globalIndex);
      setExpandedCircle(circleType);
    }
    
    setTimeout(() => setIsAnimating(false), 250);
  };

  const closeExpandedImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setExpandedImage(null);
    setExpandedCircle(null);
    setTimeout(() => setIsAnimating(false), 250);
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && expandedImage !== null) {
        closeExpandedImage();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [expandedImage]);

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
  }, [expandedImage]);

  // Get image size based on circle type
  const getImageSize = (circleType: 'inner' | 'outer', index: number) => {
    const isExpanded = expandedImage === (circleType === 'inner' ? index : index + INNER_CIRCLE_IMAGES) && 
                      expandedCircle === circleType;
    
    if (isExpanded) {
      return 'w-[80vw] h-[80vw] sm:w-[60vw] sm:h-[60vw] max-w-[400px] max-h-[400px]';
    }
    
    if (circleType === 'inner') {
      return 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32';
    } else {
      // Slightly larger outer circle images since the circle is bigger
      return 'w-18 h-18 md:w-22 md:h-22 lg:w-28 lg:h-28';
    }
  };

  // Get hover scale - only on non-mobile
  const getHoverScale = () => {
    if (expandedImage !== null || windowWidth < 768) return 1;
    return 1.2;
  };

  // Get container height - increased for larger outer circle
  const getContainerHeight = () => {
    if (windowWidth < 640) return 'h-[300px]';
    if (windowWidth < 768) return 'h-[350px]';
    if (windowWidth < 1024) return 'h-[420px]';
    return 'h-[650px] lg:h-[700px]'; // Increased for larger outer circle
  };

  // Check if outer circle should be shown
  const showOuterCircle = isDesktop && outerCircleImages.length > 0;

  // Get all images for debugging
  const totalImages = innerCircleImages.length + outerCircleImages.length;

  return (
    <section className="relative py-6 sm:py-8 md:py-10 overflow-hidden min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[600px]">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg1})` }}
      />
      <div className="absolute inset-0 bg-[#474AFF] opacity-65" />

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-6"> {/* Increased max-w for larger circle */}
        {/* Title section */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-4"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-5">
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
                transition={{ delay: 0.1, duration: 0.2 }}
              />
            </span>
          </h2>
          
          <button
            onClick={() => navigate("/media/photo-gallery")}
            className="bg-white cursor-pointer text-indigo-600 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-indigo-50 transition shadow-sm sm:shadow-md"
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
            className="text-center py-6 sm:py-8"
          >
            <div className="text-white text-base sm:text-lg font-medium bg-white/10 backdrop-blur-sm rounded p-4 sm:p-6 inline-block">
              <p className="mb-1 sm:mb-2">No images available</p>
              <p className="text-xs sm:text-sm text-gray-300">Check back later for student life photos</p>
            </div>
          </motion.div>
        )}

        {/* Gallery Container */}
        {!isLoading && totalImages > 0 && (
          <div ref={containerRef} className="relative">
            {/* Main radial container */}
            <div className={`relative ${getContainerHeight()} flex items-center justify-center`}>
              <AnimatePresence>
                {/* Expanded image overlay */}
                {expandedImage !== null && expandedCircle && (
                  <>
                    {/* Backdrop */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/90 z-40"
                      onClick={closeExpandedImage}
                    />
                    
                    {/* Expanded image container */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
                      onClick={closeExpandedImage}
                    >
                      <div className="relative w-full max-w-sm sm:max-w-md h-full max-h-[55vh] sm:max-h-[60vh]">
                      <motion.img
  src={
    expandedCircle === 'inner'
      ? innerCircleImages[expandedImage]?.link || getImageUrl(innerCircleImages[expandedImage]?.image)
      : outerCircleImages[expandedImage - INNER_CIRCLE_IMAGES]?.link || getImageUrl(outerCircleImages[expandedImage - INNER_CIRCLE_IMAGES]?.image)
  }
                          alt="Expanded gallery image"
                          className="w-full h-full object-contain rounded shadow-lg sm:shadow-xl"
                          initial={{ scale: 0.4 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            type: "spring", 
                            damping: 20, 
                            stiffness: 180 
                          }}
                        />
                        
                        {/* Close button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            closeExpandedImage();
                          }}
                          className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/60 text-white p-1.5 sm:p-2 rounded-full hover:bg-black/80 transition z-50"
                        >
                          <X size={16} className="sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Outer Circle Images (Desktop only) */}
              {showOuterCircle && outerCircleImages.map((image, index) => {
                if (!image) return null;
                
                const position = getRadialPosition(
                  index, 
                  outerCircleImages.length, 
                  'outer',
                  expandedCircle === 'outer' && expandedImage === index + INNER_CIRCLE_IMAGES
                );
                const globalIndex = index + INNER_CIRCLE_IMAGES;
                const isExpanded = expandedCircle === 'outer' && expandedImage === globalIndex;
                
                return (
                  <motion.div
                    key={`outer-${image?.id || index}`}
                    className={`absolute cursor-pointer group ${
                      isExpanded 
                        ? 'z-30' 
                        : expandedImage !== null 
                          ? 'z-10 opacity-20' 
                          : 'z-15'
                    } ${!isDesktop ? 'hidden' : ''}`}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      scale: 0.7,
                      opacity: 0 
                    }}
                    animate={{
                      x: isExpanded ? 0 : position.x,
                      y: isExpanded ? 0 : position.y,
                      scale: isExpanded ? 1 : position.scale,
                      opacity: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: isExpanded ? 250 : 180,
                      damping: 18,
                      delay: index * 0.015
                    }}
                    whileHover={isDesktop ? {
                      scale: expandedImage === null ? 1.1 : 1,
                      zIndex: 20,
                      transition: { 
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                      }
                    } : {}}
                    onHoverStart={() => {
                      if (isDesktop && expandedImage === null) {
                        setHoveredIndex(index);
                        setHoveredCircle('outer');
                      }
                    }}
                    onHoverEnd={() => {
                      if (isDesktop) {
                        setHoveredIndex(null);
                        setHoveredCircle(null);
                      }
                    }}
                    onClick={() => handleImageClick(index, 'outer')}
                    style={{
                      originX: 0.5,
                      originY: 0.5,
                    }}
                  >
                    {/* Image container */}
                    <div className={`relative overflow-hidden rounded-full border-2 border-white shadow-md transition-all duration-200 ${
                      getImageSize('outer', index)
                    } ${isDesktop && hoveredIndex === index && hoveredCircle === 'outer' && expandedImage === null ? 'ring-1 ring-white/30 ring-offset-1' : ''}`}>
                      <motion.img
                        src={image?.link? image.link: getImageUrl(image?.image)}
                        alt={`Gallery image ${globalIndex + 1}`}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: isExpanded ? 1.05 : 
                                 isDesktop && hoveredIndex === index && hoveredCircle === 'outer' ? 1.05 : 1
                        }}
                        transition={{ 
                          duration: 0.2,
                          ease: "easeOut"
                        }}
                      />
                      
                      {/* Overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-linear-to-t from-black/30 via-black/20 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: isExpanded ? 0.5 : 
                                   isDesktop && hoveredIndex === index && hoveredCircle === 'outer' ? 0.25 : 0.15
                        }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      {/* Icon */}
                      <motion.div 
                        className="absolute bottom-1.5 left-1.5 text-white"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: isExpanded ? 1 : 
                                   isDesktop && hoveredIndex === index && hoveredCircle === 'outer' ? 0.8 : 0.5,
                          scale: 1
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-1 bg-white/15 rounded-full backdrop-blur-sm">
                          {icons[outerRandomIndices[index] || index % icons.length]}
                        </div>
                      </motion.div>
                      
                      {/* Number indicator */}
                      <div className="absolute top-1 right-1 bg-black/30 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {globalIndex + 1}
                      </div>
                    </div>
                    
                    {/* Connecting lines from center to outer circle */}
                    {expandedImage === null && isDesktop && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ delay: index * 0.015 + 0.1 }}
                      >
                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                          <line
                            x1="50%"
                            y1="50%"
                            x2={`${50 + position.x / 3.5}%`}
                            y2={`${50 + position.y / 3.5}%`}
                            stroke="white"
                            strokeWidth="1"
                            strokeDasharray="3"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}

              {/* Inner Circle Images */}
              {innerCircleImages.map((image, index) => {
                if (!image) return null;
                
                const position = getRadialPosition(
                  index, 
                  innerCircleImages.length, 
                  'inner',
                  expandedCircle === 'inner' && expandedImage === index
                );
                const isExpanded = expandedCircle === 'inner' && expandedImage === index;
                
                return (
                  <motion.div
                    key={`inner-${image?.id || index}`}
                    className={`absolute cursor-pointer group ${
                      isExpanded 
                        ? 'z-30' 
                        : expandedImage !== null 
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
                      type: "spring",
                      stiffness: isExpanded ? 250 : 180,
                      damping: 18,
                      delay: index * 0.02
                    }}
                    whileHover={windowWidth >= 768 ? {
                      scale: expandedImage === null ? getHoverScale() : 1,
                      zIndex: 25,
                      transition: { 
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                      }
                    } : {}}
                    onHoverStart={() => {
                      if (windowWidth >= 768 && expandedImage === null) {
                        setHoveredIndex(index);
                        setHoveredCircle('inner');
                      }
                    }}
                    onHoverEnd={() => {
                      if (windowWidth >= 768) {
                        setHoveredIndex(null);
                        setHoveredCircle(null);
                      }
                    }}
                    onClick={() => handleImageClick(index, 'inner')}
                    style={{
                      originX: 0.5,
                      originY: 0.5,
                    }}
                  >
                    {/* Image container */}
                    <div className={`relative overflow-hidden rounded-full border-2 sm:border-3 border-white shadow-md sm:shadow-lg transition-all duration-200 ${
                      getImageSize('inner', index)
                    } ${windowWidth >= 768 && hoveredIndex === index && hoveredCircle === 'inner' && expandedImage === null ? 'ring-1 sm:ring-2 ring-white/30 ring-offset-1 sm:ring-offset-2' : ''}`}>
                      <motion.img
                        src={image?.link? image.link:getImageUrl(image?.image)}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: isExpanded ? 1.05 : 
                                 windowWidth >= 768 && hoveredIndex === index && hoveredCircle === 'inner' ? 1.08 : 1
                        }}
                        transition={{ 
                          duration: 0.2,
                          ease: "easeOut"
                        }}
                      />
                      
                      {/* Overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-linear-to-t from-black/30 sm:from-black/40 via-black/10 sm:via-black/20 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: isExpanded ? 0.5 : 
                                   windowWidth >= 768 && hoveredIndex === index && hoveredCircle === 'inner' ? 0.35 : 0.2
                        }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      {/* Icon */}
                      <motion.div 
                        className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 text-white"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: isExpanded ? 1 : 
                                   windowWidth >= 768 && hoveredIndex === index && hoveredCircle === 'inner' ? 0.85 : 0.6,
                          scale: 1
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-1 sm:p-1.5 bg-white/15 sm:bg-white/20 rounded-full backdrop-blur-sm">
                          {icons[innerRandomIndices[index] || index % icons.length]}
                        </div>
                      </motion.div>
                      
                      {/* Number indicator */}
                      <div className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 bg-black/30 sm:bg-black/40 text-white text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Connecting lines from center to inner circle */}
                    {innerCircleImages.length > 1 && expandedImage === null && windowWidth >= 640 && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ delay: index * 0.02 + 0.1 }}
                      >
                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                          <line
                            x1="50%"
                            y1="50%"
                            x2={`${50 + position.x / (windowWidth < 768 ? 3 : 2.5)}%`}
                            y2={`${50 + position.y / (windowWidth < 768 ? 3 : 2.5)}%`}
                            stroke="white"
                            strokeWidth={windowWidth < 768 ? "1" : "1.5"}
                            strokeDasharray={windowWidth < 768 ? "3" : "4"}
                            className="opacity-50"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
              
              {/* Center circle */}
              {(innerCircleImages.length > 1 || showOuterCircle) && expandedImage === null && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-linear-to-r from-white/10 sm:from-white/15 to-white/5 backdrop-blur-sm border border-white/15 sm:border-2 sm:border-white/20 flex items-center justify-center shadow-sm sm:shadow-md"
                >
                  <div className="text-center p-2 sm:p-3">
                    <p className="text-white text-xs sm:text-sm font-medium">Click</p>
                    <p className="text-white/70 text-[10px] sm:text-xs mt-0.5">to expand</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryGrid;