import { motion } from "framer-motion";
import { Mountain, Sunrise, Droplet, Sunset, MapPin, Globe, TreeDeciduous } from "lucide-react";
import img from '../../../../assets/images/home2.webp'
import img2 from '../../../../assets/images/home1.webp'
import img3 from '../../../../assets/images/home3.webp'
import img4 from '../../../../assets/images/image-11.webp'
import img5 from '../../../../assets/images/image10.webp'
import img6 from '../../../../assets/eating.webp'
import img7 from '../../../../assets/images/home8.webp'
import bg1 from '../../../../assets/decoration/abouthero.webp';
import decoration from "../../../../assets/decoration.webp";
import { useNavigate } from "react-router-dom";

const GalleryGrid = () => {
  const images = [img, img2, img3, img4, img5, img6, img7];
  const navigate = useNavigate()
  const icons = [
    <Mountain size={24} />,
    <Globe size={24} />,
    <Sunrise size={24} />,
    <TreeDeciduous size={24} />,
    <Droplet size={24} />,
    <Sunset size={24} />,
    <MapPin size={24} />
  ];

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
            <span>                Student </span>
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
          <button onClick={() => {
            navigate("/media/photo-gallery")
          }} className="bg-white mt-2 cursor-pointer text-indigo-600 text-xs sm:text-md lg:text-lg font-semibold px-4 py-2 rounded-md hover:bg-indigo-50 transition">
            Open Gallery
          </button>
        </motion.div>

        {/* Gallery Grid Container - Centered with max-w-6xl */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
          {/* Column 1: Left */}
          <div className="flex flex-col gap-4 md:gap-6 w-full md:w-[30%]">
            {[0, 1].map((index) => (
              <motion.div
                key={index}
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
                className={`w-full overflow-hidden rounded-xl shadow-2xl relative group ${index === 0 ? 'h-40 sm:h-48 md:h-58 ' : 'h-60 sm:h-72 md:h-110 '
                  }`}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={images[index]}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                  {icons[index]}
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
                src={images[2]}
                alt="Gallery image 3"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                {icons[2]}
              </div>
            </motion.div>

            <div className="flex gap-4 md:gap-6">
              {[3, 4].map((index, i) => (
                <motion.div
                  key={index}
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
                    src={images[index]}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                    {icons[index]}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 3: Right */}
          <div className="flex flex-col gap-4 md:gap-6 w-full md:w-[30%]">
            {[5, 6].map((index) => (
              <motion.div
                key={index}
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
                className={`w-full overflow-hidden rounded-xl shadow-2xl relative group ${index === 5 ? 'h-60 sm:h-72 md:h-110' : 'h-40 sm:h-48 md:h-58'
                  }`}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={images[index]}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                  {icons[index]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GalleryGrid;