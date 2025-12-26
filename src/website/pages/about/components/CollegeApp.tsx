import appMockup from '../../../../assets/mobileapp.png';
import decoration from '../../../../assets/decoration.png';
import playstore from '../../../../assets/playstore.png'
import apple from '../../../../assets/apple.png'
import bg1 from '../../../../assets/decoration/background.png';

export default function CollegeAppSection() {
  return (
    <section className="py-4 px-4 sm:px-6 lg:px-20" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url(${bg1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP: Title + Paragraph */}
        <div className="text-center max-w-5xl mx-auto mb-5 ">
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our College{" "}
            <span className="relative inline-block text-[#474AFF]">
              Apps
              <img
                src={decoration}
                alt=""
                className="absolute left-1/2 -translate-x-1/2 w-full h-3"
              />
            </span>
          </h1>

          <p className="text-gray-600 text-base leading-relaxed">
            LBEF Evolve is built to simplify student life. From college updates and academic resources to important notifications, everything you need is just a tap away. Stay connected, stay informed, and evolve with LBEF.
          </p>
        </div>

        {/* BOTTOM: Image Left | Store Buttons Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2  items-center">

          {/* LEFT: Mobile Image */}
          <div className="flex justify-center ">
            <img
              src={appMockup}
              alt="Mobile App"
              className="w-full max-w-xs sm:max-w-lg lg:h-lg h-auto object-cover"
            />
          </div>

          {/* RIGHT: Download Section */}
          <div className="space-y-6 text-center lg:text-left">
            <h3 className="text-2xl font-bold text-[#474AFF]">
              LBEF EVOLVE
            </h3>

            <p className="text-xl font-semibold text-gray-900">
              DOWNLOAD APP NOW
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

              {/* Google Play */}
              <a className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-lg shadow-lg">
                <img src={playstore} alt="" className='h-12 w-12' />
                <span className="text-left">
                  <span className="block text-xs">GET IT ON</span>
                  <span className="block text-base font-semibold">
                    Google Play
                  </span>
                </span>
              </a>

              {/* App Store */}
              <a className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-lg shadow-lg">
                <img src={apple} alt="" className='h-12 w-12' />

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
