import { Award, Briefcase, GraduationCap, Users } from "lucide-react";
// import arrow_down from "../../../../assets/arrow_down.png"
// import arrow_up from "../../../../assets/arrow_top.png"
import lbef_bufferfly from "../../../../assets/pcpsLogo.png"
import decoration from '../../../../assets/decoration.png';

export function WhyChooseLBEF() {

  const features = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      topTitle: "100% ",
      title: "Internship Assured",
      position: "top-left",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      topTitle: "World Class ",
      title: "Degree",
      position: "top-right",
    },
    {
      icon: <Users className="w-6 h-6" />,
      topTitle: "Employment ",
      title: " Opportunities",
      position: "right",
    },
    {
      icon: <Award className="w-6 h-6" />,
      topTitle: "100% ",
      title: "Up to Scholarship",
      position: "bottom-right",
    },
    {
      icon: <Award className="w-6 h-6" />,
      topTitle: "100%  ",
      title: "Up to Scholarship",
      position: "bottom-left",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      topTitle: "100% ",
      title: "Internship Assured",
      position: "left",

    },
  ];
  return (
    <>
      <section className="hidden lg:block py-5 sm:py-20 px-2 md:px-6 bg-linear-to-br from-blue-50 via-white to-purple-50">

        <div className="w-full sm:max-w-7xl mx-auto text-center">

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why <span className="relative inline-block text-[#474AFF]">
              Choose
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 w-full h-3"
              />
            </span>{" "} LBEF ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock your true potential and discover a world of opportunities<br />
            that align with your skills, interests, and aspirations
          </p>

          {/* Circular Layout */}
          <div className="relative h-[80vh]  flex justify-center items-center">
            {/* Outer Rings */}
            {/* Ring 1 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="
              w-[70vw] h-[70vw]
              max-w-[24rem] max-h-96
              md:w-96 md:h-96
              rounded-full border-4 border-blue-100 opacity-30
              "
              />
            </div>

            {/* Ring 2 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="
              w-[80vw] h-[80vw]
              max-w-lg max-h-128
              md:w-[500px] md:h-[500px]
              rounded-full border-4 border-blue-100 opacity-20
              "
              />
            </div>

            {/* Ring 3 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="
              w-[90vw] h-[90vw]
              max-w-152 max-h-152
              md:w-[600px] md:h-[600px]
              rounded-full border-4 border-blue-100 opacity-20
    "
              />
            </div>


            {/* Planet Orbit Animation */}
            <div
              className="absolute w-96 h-96"
              style={{
                animation: "orbit 2s linear infinite",
              }}
            >
              {/* Small Circle / Planet */}
              <div className="w-6 h-6 bg-[#474AFF] rounded-full absolute -top-3 left-1/2 -translate-x-1/2 shadow-xl"></div>
            </div>
            <div
              className="absolute w-[600px] h-[600px]"
              style={{
                animation: "orbit 10s linear infinite",
              }}
            >
              {/* Small Circle / Planet */}
              <div className="w-6 h-6 bg-[#474AFF] rounded-full absolute -top-3 left-1/2 -translate-x-1/2 shadow-xl"></div>
            </div>
            <div
              className="absolute w-[500px] h-[500px]"
              style={{
                animation: "orbit 5s linear infinite",
              }}
            >
              {/* Small Circle / Planet */}
              <div className="w-6 h-6 bg-[#474AFF] rounded-full absolute -top-3 left-1/2 -translate-x-1/2 shadow-xl"></div>
            </div>


            {/* Center Logo */}
            <div
              className="
            flex justify-center items-center z-20
            h-28 w-28
            sm:h-36 sm:w-36
            md:h-[15vw] md:w-[15vw]
            bg-white rounded-full shadow-2xl
            p-2 border border-gray-100
          "
            >
              <img
                src={lbef_bufferfly}
                alt="LBEF Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* {images.map((feature, index) => {
              const positions = {
                "top-left": "top-10 left-10 md:top-30 md:left-80",
                "top-right": "top-10 right-10 md:top-30 md:right-80",
                "right": "top-25 right-0 md:right-65 md:top-95",
                "bottom-right": "bottom-10 right-10 md:bottom-30 md:right-80",
                "bottom-left": "bottom-10 left-10 md:bottom-30 md:left-80",
                "left": "top-25 left-0 md:left-65 md:top-95",
              };

              return (
                <div
                  key={index}
                  className={`absolute ${positions[feature.position as keyof typeof positions]}`}
                >
                  <img
                    src={feature.src}
                    alt=""
                    style={{
                      width: feature.width,
                      height: feature.height,
                      transform: feature.flip === "horizontal"
                        ? "scaleX(-1)"            // horizontal flip
                        : feature.rotate          // rotate if rotate is defined
                          ? `rotate(${feature.rotate})`
                          : "none",
                    }}
                    className="object-contain"
                  />
                </div>
              );
            })} */}


            {/* Feature Cards with Curved Arrows */}
            {features.map((feature, index) => {
              const positions = {
                "top-left": "top-10 left-10 md:top-40 md:left-20",
                "top-right": "top-10 right-10 md:top-40 md:right-35",
                "right": "top-25  right-0 md:right-10 md:top-90",
                "bottom-right": "bottom-10 right-10 md:bottom-45 md:right-22",
                "bottom-left": "bottom-10 left-10 md:bottom-45 md:left-22",
                "left": "top-25  left-0 md:-left-0 md:top-90",
              };

              return (
                <div
                  key={index}
                  className={`absolute ${positions[feature.position as keyof typeof positions]}`}
                >
                  {/* Feature Card */}
                  <div className="bg-white rounded-3xl flex items-center  gap-3 shadow-xl border border-gray-200 px-6 py-4 min-w-48 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-blue-100 rounded-full text-[#474AFF]">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="text-sm md:text-base font-bold text-gray-800 whitespace-nowrap">
                      <p>{feature.topTitle}</p>
                      <p>{feature.title}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="block lg:hidden py-4 mt-4 px-2 bg-linear-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-md mx-auto text-center">

          {/* Heading */}
          <h2 className="text-3xl font-bold text-gray-900 mb-5">
            Why <span className="relative text-blue-500 inline-block">
              Choose
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 w-full h-3"
              />
            </span>{" "}  LBEF ?
          </h2>
          <p className="text-sm  text-gray-600 mb-5">
            Unlock your true potential and discover a world of opportunities
            that align with your skills, interests, and aspirations
          </p>

          {/* Small Radial Layout */}
          <div className="relative flex items-center justify-center h-[420px]">

            {/* Center Logo */}
            <div className="z-10 flex items-center justify-center  w-[20vw] h-[20vw] bg-white rounded-full shadow-xl">
              <img
                src={lbef_bufferfly}
                alt="LBEF"
                className=" object-contain"
              />
            </div>

            {/* Feature Cards */}
            <MobileFeatureCard className="top-15 left-1/2 -translate-x-1/2" icon={<Briefcase className="w-4 h-4" />} topTitle="100%" title="Internship Assured" />
            <MobileFeatureCard className="top-35 right-2" icon={<GraduationCap className="w-4 h-4" />} topTitle="World Class " title="Degree" />
            <MobileFeatureCard className="top-65 right-2 -translate-y-1/2" icon={<GraduationCap className="w-4 h-4" />} topTitle="Employment" title="Opportunities" />
            <MobileFeatureCard className="bottom-15 left-1/2 -translate-x-1/2" icon={<GraduationCap className="w-4 h-4" />} topTitle="100%" title="Up to Scholarship" />
            <MobileFeatureCard className="bottom-35 left-2" icon={<GraduationCap className="w-4 h-4" />} topTitle="100%" title="Up to Scholarship" />
            <MobileFeatureCard className="top-40 left-0 -translate-y-1/2" icon={<GraduationCap className="w-4 h-4" />} topTitle="100%" title="Internship Assured" />

          </div>
        </div>
      </section>

    </>
  )
}
function MobileFeatureCard({ className, icon, topTitle, title }: { className: string; icon: React.ReactNode; topTitle: string, title: string }) {
  return (
    <div
      className={`absolute flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow-md ${className}`}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-[#474AFF]">
        {icon}
      </div>

      <div className="text-left leading-tight">
        <p className="text-sm font-bold text-gray-800">{topTitle}</p>
        <p className="text-xs text-gray-500 whitespace-nowrap">
          {title}
        </p>
      </div>
    </div>
  );
}
