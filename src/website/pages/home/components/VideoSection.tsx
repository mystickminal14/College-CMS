import { Play } from "lucide-react";

export function VideoSection() {
  return (
    <section className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('src/assets/youtube_background.png')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#000538AB]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-[70vw] sm:w-[90vw] flex flex-col md:flex-row justify-between px-4 md:px-6 text-white">
        {/* Left Content */}
        <div className="flex flex-col justify-start md:w-[55%]">
          <p className="text-[16px] sm:text-[18px] font-medium mb-3 tracking-wider opacity-90">
            Join Our New Session
          </p>

          <h1 className="text-[32px] sm:text-[40px] md:text-[55px] font-bold leading-tight mb-4 sm:mb-6">
            <span className="block">25+ Years of Excellence</span>
            <span className="block mt-2">LBEE Campus</span>
          </h1>

          <div className="w-full sm:w-[250px] group relative px-6 sm:px-10 py-3 sm:py-5 bg-[#474AFF] hover:bg-[#474AFF] text-white font-medium text-lg rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-between cursor-pointer">
            Join With Us
            <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform text-[18px] sm:text-[20px]"></i>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-4 md:gap-6 justify-center items-center mt-8 md:mt-0 md:w-[40%]">
          <button className="group flex items-center gap-4 px-6 sm:px-8 py-4 sm:py-5">
            <div className="relative flex items-center justify-center">
              {/* Ripple effect */}
              <span className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white opacity-40 animate-[ripple_1s_ease-out_infinite]"></span>

              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg relative">
                <a
                  href="https://www.youtube.com/watch?v=eibpVkSHOqU"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-[#474AFF] ml-1" fill="currentColor" />
                </a>
              </div>
            </div>
          </button>
          <a
            href="https://www.youtube.com/watch?v=eibpVkSHOqU"
            target="_blank"
            className="text-base sm:text-lg font-medium"
          >
            Watch Now
          </a>
        </div>
      </div>
    </section>
  );
}
