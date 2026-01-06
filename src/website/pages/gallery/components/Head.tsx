import { FaImages } from "react-icons/fa";
import decoration from "../../../../assets/decoration.webp";
import { motion } from 'framer-motion';
import { fadeUp } from "../../../comp/animation";



const GalleryHeader = () => {
  return (
    <>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12  text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-8xl mx-auto">

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
            <span className="text-blue-600 font-medium text-sm">Image Gallery</span>

          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Image </span>
            <span className="relative inline-block ml-2">
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent relative z-10">
                Gallery
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Browse through our collection of images. Click on any image to view it in full size and navigate through the gallery.
          </motion.p>
        </motion.div>
      </div>
    </>
  );
};

export default GalleryHeader;