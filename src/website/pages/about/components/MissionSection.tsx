import half_diamond from '../../../../assets/half_diamond.png'
import top_mission from '../../../../assets/top_mission.jpg'
import midddle_mission from '../../../../assets/middle_mission.jpg'
import bottom_mission from '../../../../assets/mission/bottom_mission.jpg'
import decoration from '../../../../assets/decoration.png';

const MissionSection = () => {
  return (
    <section className="py-16 bg-white md:py-24">
      <div className="max-w-7xl px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Vision, Missions, Promise */}
          <div className="space-y-12">
            <div className="mb-20 text-center">
              <div className="flex items-center justify-center gap-4">
                <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">Our <span className="relative inline-block text-[#474AFF]">
                  Missions
                  <img
                    src={decoration}
                    alt="Decoration"
                    className="absolute left-1/2 -translate-x-1/2 w-full h-3"
                  />
                </span>{" "}</h2>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="shrink-0 w-14 h-14 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our vision is to be the leading educational institution that creates an environment that fosters creativity, critical thinking, and innovation to produce leaders who are equipped to tackle future challenges.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="shrink-0 w-14 h-14 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Missions</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our mission is to provide an engaging and supportive learning environment that empowers our students to LEAD proactively with{' '}
                  <span className="font-bold">BOLDNESS, EFFECTIVENESS, and FUTURISTIC</span> thinking.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="shrink-0 w-14 h-14 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Promise</h3>
                <p className="text-gray-700 leading-relaxed">
                  Together with our top-notch faculty, we provide a nurturing environment to help students evolve into leaders who think boldly, make effective choices and are well-equipped with futuristic mindset and skills.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Diamond-shaped image collage */}
          <div className="relative h-[600px] lg:h-[700px] mt-10 lg:mt-0">
            {/* Diamond container with clip-path */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Image 1 - Top Right */}
              <div className="absolute top-48 left-30 w-44 h-44 md:w-54 md:h-54 overflow-hidden rotate-43">
                <div className="w-full h-full -rotate-45 scale-150">
                  <img
                    src={midddle_mission} // Replace with your image
                    alt="Graduation ceremony"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Image 2 - Middle Top */}
              <div className="absolute -top-20 right-12 w-56 h-56 md:w-74 md:h-74 overflow-hidden rotate-45">
                <div className="w-full h-full origin-center -rotate-45 scale-150">
                  <img
                    src={top_mission}
                    alt="Students"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Image 3 - Middle Right */}
              <div className="absolute top-95 right-10 w-56 h-56 md:w-74 md:h-74 overflow-hidden rotate-43">
                <div className="w-full h-full origin-center -rotate-45 scale-140">
                  <img
                    src={bottom_mission}
                    alt="Faculty"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Image 4 - Bottom Left */}
              <img src={half_diamond} alt="" className="absolute -top-30 -right-80 w-56 h-56 md:w-120 md:h-205  " />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;