import apu from "../../../../assets/apu_logo.png";
import ranking from "../../../../assets/university_ranking.png";
import decoration from '../../../../assets/decoration.png';

export function University() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-20 bg-white overflow-hidden">
      {/* Background Decorative Shapes */}
      <div className="absolute top-[5vh] left-[10vw] w-56 h-72 bg-gray-200 rounded-3xl -rotate-15 opacity-70 hidden lg:block"></div>
      <div className="absolute bottom-[10vh] right-[6vw] w-56 h-72 bg-gray-200 rounded-3xl rotate-15 opacity-60 hidden lg:block"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Badge */}
        <div className="text-center mb-4 sm:mb-6">
          <span className="inline-block px-6 py-2 text-[20px] sm:text-[25px] bg-[#3040E5] text-white font-bold rounded-full">
            Our University
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 sm:mb-10">
          <span className="text-[#3040E5]">Gateway </span>To <span className="relative inline-block">
            Personal
            <img
              src={decoration}
              alt="Decoration"
              className="absolute left-1/2 -translate-x-1/2 w-full h-3"
            />
          </span>{" "}
          <br />
          <span className="text-gray-900">
            And Professional <span className="text-[#3040E5]">Growth</span>
          </span>
        </h1>

        {/* Description */}
        <div className="max-w-3xl sm:max-w-6xl mx-auto text-center">
          <p className="text-base sm:text-lg md:text-xl text-[#4D5756] leading-relaxed mb-8 sm:mb-12">
            The Asia Pacific University of Technology & Innovation (APU) is amongst Malaysia’s Premier Private Universities, and is where a unique fusion of technology, innovation and creativity works effectively towards transforming students into highly competent, employable and future-proof professionals. APU has earned an enviable reputation as an award-winning University through its achievements in winning a host of <span className="underline">over 400 prestigious awards at local and international levels.</span>
          </p>
        </div>

        {/* Logos & Rankings */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 mt-10 sm:mt-16">
          {/* APU Logo + Name */}
          <div className="flex items-center gap-4">
            <img src={apu} alt="APU Logo" className="h-16 sm:h-20 w-auto" />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-20 bg-gray-300"></div>

          {/* Rankings */}
          <div className="flex items-center gap-4 sm:gap-6 mt-4 md:mt-0">
            <div className="text-center">
              <img src={ranking} alt="QS 5 Star Rating" className="h-14 sm:h-16 mx-auto mb-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
