import university_image from "../../../../assets/university_image.jpg";
export default function HeroSection() {
  return (
    <>
      <div className="mb-8 text-left text-black px-20 pt-8 ">
        <p className="text-sm md:text-base opacity-65">
          <span className="inline-block w-4 h-px bg-black align-middle mr-2"></span>
          Our University
        </p>
      </div>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${university_image})`,
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-12">
            Malaysia's Best Technology
            <br />
            University
          </h1>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#about" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 shadow-lg text-lg">
              EXPLORE
            </a>
            <a href="https://www.apu.edu.my/about-apu/" target="_blank" className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-gray-900 transition duration-300 text-lg">
              VISIT OFFICIAL WEBSITE
            </a>
          </div>
        </div>
      </div>
    </>
  );
}