import { Play } from "lucide-react";
import image from '../../../../assets/youtube_background.png'
export function VideoSection() {
  return (
    <section className="relative h-[45vh] sm:h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="absolute inset-0 bg-[#000538AB]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 text-white">
        <div className="flex flex-col md:flex-row items-center  justify-between gap-10">

          {/* Left Content */}
          <div className="flex flex-col text-center md:text-left md:w-[55%]">
            <p className="text-xs sm:text-sm md:text-base font-medium mb-2 tracking-wider opacity-90">
              The First IT College of Nepal
            </p>

            <h1 className="text-2xl sm:text-3xl md:text-[55px] font-bold leading-snug md:leading-tight mb-4">
              <span className="block">25+ Years of Excellence</span>
              <span className="block mt-1 sm:mt-2">LBEE Campus</span>
            </h1>

            {/* <button className="mx-auto md:mx-0 w-fit px-6 sm:px-10 py-3 sm:py-5 bg-[#3040E5] text-white font-medium text-sm sm:text-lg rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-3">
              Watch Now
              <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-2" />
            </button> */}
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-center justify-center gap-3 md:gap-6 md:w-[40%]">
            <a
              href="https://www.youtube.com/watch?v=eibpVkSHOqU"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center"
            >
              <div className="relative flex items-center justify-center">
                {/* Ripple */}
                <span className="absolute w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white opacity-40 animate-[ripple_1.2s_ease-out_infinite]" />

                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600 ml-1" fill="currentColor" />
                </div>
              </div>
            </a>

            <span className="text-sm md:top-20 sm:text-lg font-medium">
              Watch Now
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
