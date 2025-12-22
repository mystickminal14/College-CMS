import half_diamond from '../../../../assets/half_diamond.png';
import top_mission from '../../../../assets/top_mission.jpg';
import middle_mission from '../../../../assets/middle_mission.jpg'; // Fixed typo
import bottom_mission from '../../../../assets/mission/bottom_mission.jpg';
import decoration from '../../../../assets/decoration.png';

const MissionSection = () => {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Text Content */}
          <div className="space-y-10 lg:space-y-12 order-2 lg:order-1">
            {/* Title */}
            <div className="mb-12 lg:mb-20 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold text-gray-900 inline-block">
                Our{' '}
                <span className="relative inline-block text-[#474AFF]">
                  Missions
                  <img
                    src={decoration}
                    alt="Decoration"
                    className="absolute left-1/2 -translate-x-1/2 w-full h-3"
                  />
                </span>
              </h2>
            </div>

            {/* Vision */}
            <div className="flex gap-5 sm:gap-6">
              <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Vision</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  Our vision is to be the leading educational institution that creates an environment that fosters creativity, critical thinking, and innovation to produce leaders who are equipped to tackle future challenges.
                </p>
              </div>
            </div>

            {/* Missions */}
            <div className="flex gap-5 sm:gap-6">
              <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Missions</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  Our mission is to provide an engaging and supportive learning environment that empowers our students to LEAD proactively with{' '}
                  <span className="font-bold">BOLDNESS, EFFECTIVENESS, and FUTURISTIC</span> thinking.
                </p>
              </div>
            </div>

            {/* Promise */}
            <div className="flex gap-5 sm:gap-6">
              <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Promise</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  Together with our top-notch faculty, we provide a nurturing environment to help students evolve into leaders who think boldly, make effective choices and are well-equipped with futuristic mindset and skills.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Diamond Image Collage - Exact design preserved on xl+ */}
          <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] mt-8 lg:mt-0 order-1 lg:order-2">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Image 1 - Left Middle (your original top-35 left-0) */}
              <div className="absolute top-32 sm:top-34 lg:top-35 left-0 sm:left-2 lg:left-0 w-36 sm:w-40 lg:w-44 xl:w-72 h-36 sm:h-40 lg:h-44 xl:h-72 overflow-hidden rotate-45">
                <div className="w-full h-full -rotate-45 scale-150 origin-center">
                  <img
                    src={middle_mission}
                    alt="Graduation ceremony"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Image 2 - Top Center-Right */}
              <div className="absolute -top-16 sm:-top-20 lg:-top-22 right-12 sm:right-16 lg:right-20 w-44 sm:w-52 lg:w-56 xl:w-72 h-44 sm:h-52 lg:h-56 xl:h-72 overflow-hidden rotate-45">
                <div className="w-full h-full -rotate-45 scale-150 origin-center">
                  <img
                    src={top_mission}
                    alt="Students"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Image 3 - Right Middle */}
              <div className="absolute top-80 sm:top-88 lg:top-92 xl:top-93 right-8 sm:right-12 lg:right-20 w-44 sm:w-52 lg:w-56 xl:w-72 h-44 sm:h-52 lg:h-56 xl:h-72 overflow-hidden rotate-45">
                <div className="w-full h-full -rotate-45 scale-140 origin-center">
                  <img
                    src={bottom_mission}
                    alt="Faculty"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Half Diamond Decorative Element - matches your original position */}
              <div className="absolute top-32 sm:top-34 lg:top-35 -right-28 sm:-right-32 lg:-right-36 xl:-right-35 w-44 sm:w-52 lg:w-56 xl:w-72 h-44 sm:h-52 lg:h-56 xl:h-72 overflow-hidden rotate-45">
                <div className="w-full h-full -rotate-45 scale-140 origin-center">
                  <img
                    src={half_diamond}
                    alt="Decorative half diamond"
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;