import appMockup from '../../../../assets/mobileapp.png';
import decoration from '../../../../assets/decoration.png';
import playstore from '../../../../assets/playstore.png';
import apple from '../../../../assets/apple.png';
import bg1 from '../../../../assets/pcpslogo.png';

export default function CollegeAppSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-20 overflow-hidden">
      {/* Background Image + Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg1})` }}
      />
      <div className="absolute inset-0 bg-[#474AFF] opacity-65" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP: Title + Paragraph */}
        <div className="text-center max-w-5xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold text-white mb-6">
            Our College{" "}
            <span className="relative inline-block text-white">
              Apps
              <img
                src={decoration}
                alt=""
                className="absolute left-1/2 -translate-x-1/2 w-full h-3"
              />
            </span>
          </h1>

          <p className="text-white text-base sm:text-lg leading-relaxed">
            LBEF Evolve is built to simplify student life. From college updates and academic resources to important notifications, everything you need is just a tap away. Stay connected, stay informed, and evolve with LBEF.
          </p>
        </div>

        {/* BOTTOM: Image Left | Store Buttons Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          {/* LEFT: Mobile Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={appMockup}
              alt="Mobile App"
              className="w-full max-w-xs sm:max-w-lg h-auto object-cover"
            />
          </div>

          {/* RIGHT: Download Section */}
          <div className="space-y-6 text-center lg:text-left">
            <h3 className="text-2xl font-bold text-white">LBEF EVOLVE</h3>

            <p className="text-xl font-semibold text-white">
              DOWNLOAD APP NOW
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* Google Play */}
              <a className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
                <img src={playstore} alt="" className="h-12 w-12" />
                <span className="text-left">
                  <span className="block text-xs">GET IT ON</span>
                  <span className="block text-base font-semibold">
                    Google Play
                  </span>
                </span>
              </a>

              {/* App Store */}
              <a className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
                <img src={apple} alt="" className="h-12 w-12" />
                <span className="text-left">
                  <span className="block text-xs">DOWNLOAD ON THE</span>
                  <span className="block text-base font-semibold">
                    App Store
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
