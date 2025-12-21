import { FaImages } from "react-icons/fa";
import decoration from "../../../../assets/decoration.png";



const GalleryHeader = () => {
  return (
    <>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
        <div className="max-w-8xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-linear-to-r from-blue-50 to-purple-50 border border-blue-100">
            <FaImages className="text-blue-500" />
            <span className="text-blue-600 font-medium text-sm">Image Gallery</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Image </span>
            <span className="relative inline-block ml-2">
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent relative z-10">
                Gallery
              </span>
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-3"
              />
            </span>
          </h1>

          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Browse through our collection of images. Click on any image to view it in full size and navigate through the gallery.
          </p>
        </div>
      </div>
    </>
  );
};

export default GalleryHeader;