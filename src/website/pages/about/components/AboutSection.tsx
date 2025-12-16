import { ArrowRight, Users2 } from "lucide-react";
import decoration from '../../../../assets/decoration.png';
import { FaPeopleArrows } from "react-icons/fa";
export default function AboutSection() {
  return (
    <div className=" bg-linear-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Image with Overlaid Stats */}
          <div className="relative flex items-center justify-center">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden w-full h-full md:h-150 aspect-square max-w-md">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
                alt="LBEF Community"
                className="w-full h-full object-cover"
              />
            </div>

            <div className=" absolute top-[1vw] right-[4vw] hidden 2xl:flex flex-col gap-4 px-6 translate-y-1/2 flex-1 bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <Users2 />
              </div>
              <div className="text-gray-600 text-2xl">25+ Years</div>
              <div className="font-bold text-gray-900">Excellence</div>
            </div>

            {/* Success Stories Card */}
            <div className="absolute bottom-[10vw] left-[4vw] hidden 2xl:flex flex-col gap-4 px-6 translate-y-1/2 flex-1 bg-blue-600 text-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <Users2 />
              </div>
              <div className="text-blue-100 text-2xl">15000+</div>
              <div className="font-bold">Success Stories</div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="mt-24 lg:mt-0">
            {/* Label */}
            <div className="mb-6">
              <span className="text-sm font-medium text-blue-600">About LBEF</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              One Platform. Infinite{" "}
              <span className="relative inline-block">
                Learning
                <img
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 w-full h-3"
                />
              </span>
              <br />
              Possibilities.
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              At LBEF, we believe quality education should be accessible, engaging,
              and empowering for everyone, everywhere.
            </p>

            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Lord Buddha Education Foundation (LBEF) College, established in Midhevel,
              Kathmandu, is a non-governmental, non-profit institution within the LBEF
              Group of Institutions. Since its founding, LBEF has grown steadily, educating
              thousands of students, with over 13,000 graduates to date.
            </p>

            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Through a proud alliance with the Asia Pacific University of Technology &
              Innovation (APU), and approval from Nepal's Ministry of Education and
              recognition by Tribhuvan University, LBEF offers diverse Bachelor and
              Master-level programs. Our wide-ranging academic disciplines inspire
              students and entrepreneurs alike.
            </p>

            {/* CTA Button */}
            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
              Learn More About Us
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
