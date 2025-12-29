import React from 'react';
import { ChevronRight, Monitor } from 'lucide-react'; // You can install lucide-react for icons: npm i lucide-react
import bg from '../../../../assets/decoration/0486986455ec0f16fba7c8910dd7158f8879713e.jpg'
import { FlipText } from '../utils/FlipText';
import decoration from '../../../../assets/decoration.png';
import { useNavigate } from 'react-router-dom';

export default function NewCourse() {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-12 px-4 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${bg})`,
        opacity: 0.8
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight mb-6 md:mb-0 text-center md:text-left">
              <span className="block text-[12px] sm:text-[14px] mb-4 font-normal uppercase tracking-wider opacity-80">
                Our Courses
              </span>

              <FlipText text="World Class Course" />{' '}
              <span className="relative text-[#474AFF] inline-block">
                <FlipText text="Students" />
                <img
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-full h-3"
                />
              </span>{' '}
              <FlipText text="Can" />

              <br className="hidden md:block" />

              <span className="mt-1 block md:inline">
                <FlipText text="Join With Us" />
              </span>
            </h2>

            <button
              className="flex items-center gap-2 px-6 py-3 border border-[#19213D] text-blue-600 bg-white  rounded-full hover:bg-gray-100 transition mt-4 md:mt-0"
              onClick={() => navigate('students-life/programs')}
            >
              Learn About Course
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-lg bg-white border-b-4 border-blue-600 shadow-md transition-all duration-500 hover:bg-blue-600 hover:shadow-2xl">
              <div className="p-6 sm:p-8 flex flex-col h-full lg:h-100">

                {/* Bachelor */}
                <p className="text-xs tracking-widest uppercase text-blue-600 font-semibold mb-4 group-hover:text-white/80 transition-colors">
                  Bachelor
                </p>
                <div className="flex-1" />
                {/* Icon + Title */}
                <div>
                  <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-blue-100 group-hover:hidden transition-colors duration-300">
                    <Monitor className="w-7 h-7 text-blue-600 group-hover:text-white" />
                  </div>

                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 leading-snug group-hover:text-white transition-colors">
                    B.sc(Hons)Information Technology
                  </h3>
                </div>

                {/* Hidden Content */}
                <p className="hover-reveal mt-4 text-sm text-white/90">
                  Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.
                  Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.
                </p>

                <span className="hover-reveal mt-6 text-sm font-semibold text-white underline underline-offset-8">
                  READ MORE
                </span>

              </div>
            </div>


            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-lg bg-white border-b-4 border-blue-600 shadow-md transition-all duration-500 hover:bg-blue-600 hover:shadow-2xl">
              <div className="p-6 sm:p-8 flex flex-col h-full lg:h-100">

                {/* Bachelor */}
                <p className="text-xs tracking-widest uppercase text-blue-600 font-semibold mb-4 group-hover:text-white/80 transition-colors">
                  Bachelor
                </p>
                <div className="flex-1" />

                {/* Icon + Title */}
                <div>
                  <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-blue-100 group-hover:hidden transition-colors duration-300">
                    <Monitor className="w-7 h-7 text-blue-600 group-hover:text-white" />
                  </div>

                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 leading-snug group-hover:text-white transition-colors">
                    B.sc(Hons)Information Technology
                  </h3>
                </div>

                {/* Hidden Content */}
                <p className="hover-reveal mt-4 text-sm text-white/90">
                  Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.
                  Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.
                </p>

                <span className="hover-reveal mt-6 text-sm font-semibold text-white underline underline-offset-8">
                  READ MORE
                </span>

              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg bg-white border-b-4 border-blue-600 shadow-md transition-all duration-500 hover:bg-blue-600 hover:shadow-2xl">
              <div className="p-6 sm:p-8 flex flex-col h-full lg:h-100">

                {/* Bachelor */}
                <p className="text-xs tracking-widest uppercase text-blue-600 font-semibold mb-4 group-hover:text-white/80 transition-colors">
                  Bachelor
                </p>
                <div className="flex-1" />

                {/* Icon + Title */}
                <div>
                  <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-blue-100 group-hover:hidden transition-colors duration-300">
                    <Monitor className="w-7 h-7 text-blue-600 group-hover:text-white" />
                  </div>

                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 leading-snug group-hover:text-white transition-colors">
                    B.sc(Hons)Information Technology
                  </h3>
                </div>

                {/* Hidden Content */}
                <p className="hover-reveal mt-4 text-sm text-white/90">
                  Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.
                  Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.
                </p>

                <span className="hover-reveal mt-6 text-sm font-semibold text-white underline underline-offset-8">
                  READ MORE
                </span>

              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg bg-white border-b-4 border-blue-600 shadow-md transition-all duration-500 hover:bg-blue-600 hover:shadow-2xl">
              <div className="p-6 sm:p-8 flex flex-col h-full lg:h-100">

                {/* Bachelor */}
                <p className="text-xs tracking-widest uppercase text-blue-600 font-semibold mb-4 group-hover:text-white/80 transition-colors">
                  Bachelor
                </p>
                <div className="flex-1" />

                {/* Icon + Title */}
                <div>
                  <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-blue-100 group-hover:hidden transition-colors duration-300">
                    <Monitor className="w-7 h-7 text-blue-600 group-hover:text-white" />
                  </div>

                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 leading-snug group-hover:text-white transition-colors">
                    B.sc(Hons)Information Technology
                  </h3>
                </div>

                {/* Hidden Content */}
                <p className="hover-reveal mt-4 text-sm text-white/90">
                  Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.
                  Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.
                </p>

                <span className="hover-reveal mt-6 text-sm font-semibold text-white underline underline-offset-8">
                  READ MORE
                </span>

              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg bg-white border-b-4 border-blue-600 shadow-md transition-all duration-500 hover:bg-blue-600 hover:shadow-2xl">
              <div className="p-6 sm:p-8 flex flex-col h-full lg:h-100">

                {/* Bachelor */}
                <p className="text-xs tracking-widest uppercase text-blue-600 font-semibold mb-4 group-hover:text-white/80 transition-colors">
                  Bachelor
                </p>
                <div className="flex-1" />

                {/* Icon + Title */}
                <div>
                  <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-blue-100 group-hover:hidden transition-colors duration-300">
                    <Monitor className="w-7 h-7 text-blue-600 group-hover:text-white" />
                  </div>

                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 leading-snug group-hover:text-white transition-colors">
                    B.sc(Hons)Information Technology
                  </h3>
                </div>

                {/* Hidden Content */}
                <p className="hover-reveal mt-4 text-sm text-white/90">
                  Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.
                  Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.
                </p>

                <span className="hover-reveal mt-6 text-sm font-semibold text-white underline underline-offset-8">
                  READ MORE
                </span>

              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg bg-white border-b-4 border-blue-600 shadow-md transition-all duration-500 hover:bg-blue-600 hover:shadow-2xl">
              <div className="p-6 sm:p-8 flex flex-col h-full lg:h-100">

                {/* Bachelor */}
                <p className="text-xs tracking-widest uppercase text-blue-600 font-semibold mb-4 group-hover:text-white/80 transition-colors">
                  Bachelor
                </p>
                <div className="flex-1" />

                {/* Icon + Title */}
                <div>
                  <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-blue-100 group-hover:hidden transition-colors duration-300">
                    <Monitor className="w-7 h-7 text-blue-600 group-hover:text-white" />
                  </div>

                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 leading-snug group-hover:text-white transition-colors">
                    B.sc(Hons)Information Technology
                  </h3>
                </div>

                {/* Hidden Content */}
                <p className="hover-reveal mt-4 text-sm text-white/90">
                  Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.
                  Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.Discover the richness of literary exploration, where classic texts and contemporary voices intersect in a critical way.
                </p>

                <span className="hover-reveal mt-6 text-sm font-semibold text-white underline underline-offset-8">
                  READ MORE
                </span>

              </div>
            </div>






            {/* Add more identical cards here to match the screenshot (total around 6-7) */}
            {/* For brevity, I've shown only 2 - copy-paste the div for more */}

          </div>
        </div>
      </div>
    </>
  );
}