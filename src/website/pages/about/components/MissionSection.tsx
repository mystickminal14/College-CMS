import React from 'react';

const MissionSection = () => {
  return (
    <section className="py-16 bg-white md:py-24">
      <div className="max-w-7xl px-4 mx-auto">
        {/* Title with blue diamonds */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-blue-600 rotate-45" />
              ))}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">Our Mission</h2>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-blue-600 rotate-45" />
              ))}
            </div>
          </div>
          <div className="w-32 h-px bg-blue-600 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Vision, Missions, Promise */}
          <div className="space-y-12">
            {/* Vision */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center shadow-sm">
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

            {/* Missions */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center shadow-sm">
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

            {/* Promise */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center shadow-sm">
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
              <div className="absolute top-0 -right-50 w-64 h-64 md:w-122 md:h-122 overflow-hidden rotate-12 shadow-2xl">
                <div className="w-full h-full rotate-45 scale-150">
                  <img
                    src="/images/mission1.jpg" // Replace with your image
                    alt="Graduation ceremony"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Image 2 - Middle Top */}
              <div className="absolute top-16 left-10 w-56 h-56 md:w-64 md:h-64 overflow-hidden -rotate-6 shadow-2xl">
                <div className="w-full h-full origin-center rotate-6 scale-150">
                  <img
                    src="/images/mission2.jpg"
                    alt="Students"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Image 3 - Middle Right */}
              <div className="absolute top-40 right-4 w-56 h-56 md:w-64 md:h-64 overflow-hidden rotate-12 shadow-2xl">
                <div className="w-full h-full origin-center rotate-[-12deg] scale-150">
                  <img
                    src="/images/mission3.jpg"
                    alt="Faculty"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Image 4 - Bottom Left */}
              <div className="absolute bottom-0 left-0 w-64 h-64 md:w-72 md:h-72 overflow-hidden -rotate-12 shadow-2xl">
                <div className="w-full h-full origin-center rotate-12 scale-150">
                  <img
                    src="/images/mission4.jpg"
                    alt="Graduate close-up"
                    className="w-full h-full object-cover"
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