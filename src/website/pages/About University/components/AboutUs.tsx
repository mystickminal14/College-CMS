import graduations from '../../../../assets/graduations.jpg'
import ring from '../../../../assets/ring.png'
export default function AboutUsSection() {
  return (
    <>
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 ">
          {/* Section Header */}
          <div className="text-center mb-12 relative">
            {/* Border frame */}
            <div className="relative max-w-6xl mx-auto pt-10">
              {/* Left top border */}
              <div className="absolute hidden lg:block top-15 left-0 w-50 2xl:-left-20 2xl:w-150 h-30 border-t-2 border-l-2 border-black rounded-tl-2xl"></div>

              {/* Right top border */}
              <div className="absolute hidden lg:block top-15 right-0 w-50 2xl:-right-20 2xl:w-150 h-30 border-t-2 border-r-2 border-black rounded-tr-2xl"></div>

              {/* Heading */}
              <h2 className="inline-block px-8 bg-white text-4xl md:text-5xl font-bold text-blue-600 relative z-10">
                About Us
              </h2>
            </div>
            {/* Description */}
            <p className="mt-6 text-gray-600 text-lg max-w-4xl mx-auto">
              APU is one of Malaysia's premier private universities, where students are
              transformed into highly skilled, employable, and future-proof professionals
              via a unique blend of technology, innovation, and creativity.
            </p>
          </div>


          {/* Main Content - Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-30 items-center">
            {/* Left: Image with decorative circles */}
            <div className="relative">
              {/* Black circle - behind everything */}
              <div className="absolute hidden lg:block top-0 -left-15 w-32 h-32 rounded-full  ">
                <img src={ring} alt="decorative ring" className="h-40 w-40 object-contain" />
              </div>

              {/* Ring decoration - should appear behind the main image */}
              <div className="absolute hidden lg:block bottom-0 -right-15 w-40 h-40 pointer-events-none">
                <img src={ring} alt="decorative ring" className="h-40 w-40 object-contain" />
              </div>

              {/* Main graduation image - on top */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={graduations}
                  alt="APU graduates in academic dress during convocation"
                  className="w-full h-full md:h-[600px] object-cover" // fixed md:h-150 → use proper value
                />
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="space-y-8">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                Asia Pacific University of Technology & Innovation (APU)
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed ">
                The Asia Pacific University of Technology & Innovation (APU) is amongst Malaysia's Premier Private Universities, and is where a unique fusion of technology, innovation and creativity works effectively towards transforming students into highly competent, employable and future-proof professionals. APU has earned an enviable reputation as an award-winning University through its achievements in winning a host of over 400 prestigious awards at local and international levels.
              </p>
              <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg inline-flex items-center gap-3 text-lg">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}