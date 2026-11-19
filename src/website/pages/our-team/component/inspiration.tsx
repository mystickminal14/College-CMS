import bgImage from '../../../../assets/inspiration/sir.webp';
import decoration from '../../../../assets/decoration.webp';

const Inspiration = () => {
  return (
    <div className="bg-linear-to-b from-white to-blue-50 py-8 md:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-100 border border-blue-200">
              <span className="text-blue-700 font-medium">Our Guiding Light</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Source of <span className="relative inline-block text-[#474AFF]">
                Inspiration
                <img
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 w-full h-3"
                />
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Visionary leader who laid the foundation for educational excellence in Nepal
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
            {/* Founder Profile Card */}
            <div className="w-full max-w-xs mx-auto lg:mx-0 lg:w-72 shrink-0">
              <div className="aspect-square overflow-hidden rounded-lg group bg-gray-100">
                <img
                  src={bgImage}
                  alt="Late Mr. Parmanand Kejriwal"
                  className="w-full h-full object-cover object-top mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-base lg:text-lg font-bold text-gray-900 leading-snug mt-3">
                Late Mr. Parmanand Kejriwal
              </h3>
              <p className="text-sm text-gray-700 mt-0.5 leading-snug">
                Founder of LBEF Group of Institutions
              </p>
              <p className="text-sm font-medium text-blue-600 mt-1">
                July 12, 1955 – June 20, 2021
              </p>
            </div>

            <div className="flex-1">
              {/* Foundation Story */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 mb-4 text-xl">Founder</h4>
                <p className="text-gray-600">
                  An esteemed educationist and social worker, who
                  conceived the LBEF Group of Institutions with a revolutionary vision to
                  transform education in Nepal.
                </p>
              </div>

              {/* Quote Box */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 lg:p-8 rounded-r-lg">
                <span className="block text-5xl leading-none text-blue-300 font-serif mb-2">&ldquo;</span>
                <blockquote className="text-base lg:text-md italic text-gray-700 mb-4">
                  "True education must be rooted in ethics. Guided by this belief, LBEF advances skill-based learning, embraces futuristic thinking to prepare industry-ready graduates, and recognizes women’s empowerment through ICT as vital to nation building."
                </blockquote>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <footer className="text-blue-600 font-medium">
                      — Late Mr. Parmanand Kejriwal
                    </footer>
                    <p className="text-sm text-gray-500 mt-1">Founder, LBEF Group of Institutions</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-blue-600 font-medium">Est. 1998</div>
                    <div className="text-xs text-gray-500">Legacy Continues</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inspiration
