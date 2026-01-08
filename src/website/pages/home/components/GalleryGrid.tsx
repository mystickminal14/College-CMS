import { motion } from "framer-motion";
import { Mountain, Sunrise, Droplet, Sunset, MapPin, Globe, TreeDeciduous } from "lucide-react";
import bg1 from '../../../../assets/decoration/abouthero.webp';
import decoration from "../../../../assets/decoration.webp";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useGetGallerys from "../../../../pages/gallery/hooks/useGetAll";
import { IMAGE_URL } from "../../../../constants";

const PAGE_LIMIT = 50;

const SkeletonLoader = () => {
  const skeletonLayout = [
    { height: 'h-40 sm:h-48 md:h-58' }, // Image 1
    { height: 'h-60 sm:h-72 md:h-110' }, // Image 2
    { height: 'h-48 sm:h-56 md:h-64' },  // Image 8
    { height: 'h-60 sm:h-72 md:h-80 lg:h-96' }, // Image 3
    { height: 'h-48 sm:h-56 md:h-64 lg:h-72' }, // Image 4
    { height: 'h-48 sm:h-56 md:h-64 lg:h-72' }, // Image 5
    { height: 'h-40 sm:h-48 md:h-56' }, // Image 9
    { height: 'h-60 sm:h-72 md:h-110' }, // Image 6
    { height: 'h-40 sm:h-48 md:h-58' }, // Image 7
    { height: 'h-48 sm:h-56 md:h-64' }, // Image 10
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
      {/* Column 1: Left */}
      <div className="flex flex-col gap-4 md:gap-6 w-full md:w-[30%]">
        {[0, 1, 2].map((index) => (
          <div
            key={`skeleton-${index}`}
            className={`w-full overflow-hidden rounded-xl shadow-2xl relative ${skeletonLayout[index].height}`}
          >
            <div className="absolute inset-0 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Column 2: Middle */}
      <div className="flex flex-col gap-4 md:gap-6 w-full md:w-[40%]">
        {[3, 4, 5, 6].map((index) => (
          <div
            key={`skeleton-${index}`}
            className={`w-full overflow-hidden rounded-xl shadow-2xl relative ${index === 3 ? skeletonLayout[3].height :
              index === 4 || index === 5 ? skeletonLayout[4].height :
                skeletonLayout[6].height
              } ${index === 4 || index === 5 ? 'w-1/2' : ''}`}
          >
            <div className="absolute inset-0 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
            {index === 4 && <div className="absolute right-2" />}
          </div>
        ))}
        <div className="flex gap-4 md:gap-6">
          {[4, 5].map((index) => (
            <div
              key={`skeleton-sub-${index}`}
              className="w-1/2 h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-xl shadow-2xl relative"
            >
              <div className="absolute inset-0 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Column 3: Right */}
      <div className="flex flex-col gap-4 md:gap-6 w-full md:w-[30%]">
        {[7, 8, 9].map((index) => (
          <div
            key={`skeleton-${index}`}
            className={`w-full overflow-hidden rounded-xl shadow-2xl relative ${skeletonLayout[index].height}`}
          >
            <div className="absolute inset-0 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

const GalleryGrid = () => {
  const [randomImages, setRandomImages] = useState<any[]>([]);
  const [randomIndices, setRandomIndices] = useState<number[]>([]);
  const [page] = useState(1);

  const { data, isLoading } = useGetGallerys({
    page,
    limit: PAGE_LIMIT,
  });

  const navigate = useNavigate();

  const icons = [
    <Mountain size={24} />,
    <Globe size={24} />,
    <Sunrise size={24} />,
    <TreeDeciduous size={24} />,
    <Droplet size={24} />,
    <Sunset size={24} />,
    <MapPin size={24} />
  ];

  // Function to get random images from API response
  const getRandomImages = (images: any, count: number | undefined) => {
    if (!images || images.length === 0) return [];

    // Shuffle the array and take first 'count' items
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Function to get random indices for icon assignment
  const getRandomIndices = (count: number) => {
    const indices = [];
    for (let i = 0; i < count; i++) {
      // Simply get a random index from 0-6 for each position
      indices.push(Math.floor(Math.random() * icons.length));
    }
    return indices;
  };

  // Effect to update random images when data changes
  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      // Get 10 random images from API response
      const randomSelectedImages = getRandomImages(data.data, 10);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRandomImages(randomSelectedImages);

      // Get random indices for icons
      setRandomIndices(getRandomIndices(10));
    }
  }, [data]);

  // Function to construct full image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';

    // Trim any whitespace from the image path
    const cleanPath = imagePath.trim();

    // Check if path already starts with slash, add if not
    const formattedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

    // Construct URL without space between BASE_URL and path
    return `${IMAGE_URL}${formattedPath}`;
  };

  // Static fallback images if API is loading or fails
  const staticImages = [
    '/public/gallery/placeholder1.jpg',
    '/public/gallery/placeholder2.jpg',
    '/public/gallery/placeholder3.jpg',
    '/public/gallery/placeholder4.jpg',
    '/public/gallery/placeholder5.jpg',
    '/public/gallery/placeholder6.jpg',
    '/public/gallery/placeholder7.jpg',
    '/public/gallery/placeholder8.jpg',
    '/public/gallery/placeholder9.jpg',
    '/public/gallery/placeholder10.jpg',
  ];

  // Use random images from API or fallback to static
  const displayImages = randomImages.length > 0 ? randomImages : staticImages.map((img, index) => ({
    id: index,
    image: img
  }));

  // Use random indices or default sequential indices
  const displayIndices = randomIndices.length > 0 ? randomIndices : [0, 1, 2, 3, 4, 5, 6, 0, 1, 2];


  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg1})` }}
      />
      <div className="absolute inset-0 bg-[#474AFF] opacity-65" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            <span>Student </span>
            <span className="relative inline-block">
              <span className="text-white relative z-10"> Life </span>
              <motion.img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-2"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
              />
            </span>
          </h2>
          <p className="text-gray-200 text-xs sm:text-md md:text-lg max-w-2xl mx-auto">
            The roots of education are bitter, but the fruit is sweet.
          </p>
          <button
            onClick={() => navigate("/media/photo-gallery")}
            className="bg-white mt-2 cursor-pointer text-indigo-600 text-xs sm:text-md lg:text-lg font-semibold px-4 py-2 rounded-md hover:bg-indigo-50 transition"
          >
            Open Gallery
          </button>
        </motion.div>

        {/* Loading state with skeleton */}
        {isLoading && (
          <div className="space-y-6">
            <SkeletonLoader />
          </div>
        )}

        {/* Gallery Grid Container - Only show when not loading */}
        {!isLoading && (
          <>
            {/* Main 3-column grid */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
              {/* Column 1: Left */}
              <div className="flex flex-col gap-4 md:gap-6 w-full md:w-[30%]">
                {[0, 1, 7].map((index) => (
                  <motion.div
                    key={displayImages[index]?.id || index}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.05, rotateZ: 1 }}
                    whileTap={{ scale: 0.95 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring" as const,
                      stiffness: 100,
                      damping: 15,
                      delay: index * 0.15
                    }}
                    className={`w-full overflow-hidden rounded-xl shadow-2xl relative group ${index === 0 ? 'h-40 sm:h-48 md:h-58' :
                      index === 1 ? 'h-60 sm:h-72 md:h-110' :
                        'h-48 sm:h-56 md:h-64'}`}
                  >
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <img
                      src={getImageUrl(displayImages[index]?.image)}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 cursor-pointer"

                    />
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                      {icons[displayIndices[index] || index % icons.length]}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Column 2: Middle */}
              <div className="flex flex-col gap-4 md:gap-6 w-full md:w-[40%]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.05, rotateZ: 1 }}
                  whileTap={{ scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 100,
                    damping: 15,
                    delay: 0.3
                  }}
                  className="w-full h-60 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-xl shadow-2xl relative group"
                >
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={getImageUrl(displayImages[2]?.image)}
                    alt="Gallery image 3"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 cursor-pointer"

                  />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                    {icons[displayIndices[2] || 2 % icons.length]}
                  </div>
                </motion.div>

                <div className="flex gap-4 md:gap-6">
                  {[3, 4].map((index, i) => (
                    <motion.div
                      key={displayImages[index]?.id || index}
                      initial={{ opacity: 0, scale: 0.8, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      whileHover={{ scale: 1.05, rotateZ: 1 }}
                      whileTap={{ scale: 0.95 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring" as const,
                        stiffness: 100,
                        damping: 15,
                        delay: 0.45 + i * 0.15
                      }}
                      className="w-1/2 h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-xl shadow-2xl relative group"
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <img
                        src={getImageUrl(displayImages[index]?.image)}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 cursor-pointer"

                      />
                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                        {icons[displayIndices[index] || index % icons.length]}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Additional image in middle column */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.05, rotateZ: 1 }}
                  whileTap={{ scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 100,
                    damping: 15,
                    delay: 0.6
                  }}
                  className="w-full h-40 sm:h-48 md:h-56 overflow-hidden rounded-xl shadow-2xl relative group"
                >
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={getImageUrl(displayImages[8]?.image)}
                    alt="Gallery image 9"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 cursor-pointer"

                  />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                    {icons[displayIndices[8] || 8 % icons.length]}
                  </div>
                </motion.div>
              </div>

              {/* Column 3: Right */}
              <div className="flex flex-col gap-4 md:gap-6 w-full md:w-[30%]">
                {[5, 6, 9].map((index) => (
                  <motion.div
                    key={displayImages[index]?.id || index}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.05, rotateZ: 1 }}
                    whileTap={{ scale: 0.95 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring" as const,
                      stiffness: 100,
                      damping: 15,
                      delay: 0.75 + (index - 5) * 0.15
                    }}
                    className={`w-full overflow-hidden rounded-xl shadow-2xl relative group ${index === 5 ? 'h-60 sm:h-72 md:h-110' :
                      index === 6 ? 'h-40 sm:h-48 md:h-58' :
                        'h-48 sm:h-56 md:h-64'}`}
                  >
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <img
                      src={getImageUrl(displayImages[index]?.image)}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 cursor-pointer"
                    />
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                      {icons[displayIndices[index] || index % icons.length]}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GalleryGrid;