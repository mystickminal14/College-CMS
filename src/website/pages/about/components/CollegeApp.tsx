import appMockup from '../../../../assets/mobileapp.png'; // Replace with your actual mockup image

export default function CollegeAppSection() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text + Download Buttons */}
          <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">
            {/* Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              Our College{' '}
              <span className="relative inline-block">
                App
                <span className="absolute left-0 -bottom-2 w-full h-1.5 bg-yellow-400 rounded-full"></span>
              </span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              LBEF Evolve is built to simplify student life. From college updates and academic resources to important notifications, everything you need is just a tap away. Stay connected, stay informed, and evolve with LBEF.
            </p>

            {/* Download Section */}
            <div className="space-y-4 lg:space-y-6">
              <div className="text-2xl sm:text-3xl font-bold text-[#474AFF]">
                LBEF EVOLVE
              </div>
              <div className="text-xl sm:text-2xl font-semibold text-gray-900">
                DOWNLOAD APP NOW
              </div>

              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {/* Google Play */}
                <a
                  href="#"
                  className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-lg hover:bg-gray-800 transition-shadow shadow-lg"
                >
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.61 2.5l9.7 9.7-9.7 9.7L2.5 3.61c-.2-.5-.3-1-.3-1.5 0-.8.3-1.6.9-2.1L3.61 2.5zM13.3 12l-9.7-9.7.8-.8c.4-.4 1-.6 1.6-.6.6 0 1.2.2 1.6.6l7.7 7.7-1.7 1.7zM22.4 12c0 .8-.2 1.6-.6 2.3l-8.4 8.4c-.4.4-1 .6-1.6.6-.6 0-1.2-.2-1.6-.6l-.8-.8 9.7-9.7 2.3 2.3zM13.3 12l9.7-9.7-2.3-2.3c-.4-.4-1-.6-1.6-.6-.6 0-1.2.2-1.6.6l-8.4 8.4 1.6 1.6 1.6-1.6z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs uppercase tracking-wider">Get it on</div>
                    <div className="text-base font-medium">Google Play</div>
                  </div>
                </a>

                {/* App Store */}
                <a
                  href="#"
                  className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-lg hover:bg-gray-800 transition-shadow shadow-lg"
                >
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.7 14.4c-.1-1.8.7-3.4 1.8-4.5-1-1.5-2.5-1.7-3-1.7-1.2.1-2.4 0.7-3 0.7-.7 0-1.7-.6-2.8-.6-1.4 0-2.8.8-3.6 2.1-1.6 2.6-.4 6.4 1.1 8.5.8 1 1.7 2.1 2.9 2.1.9 0 1.3-.6 2.6-.6 1.2 0 1.6.6 2.7.6 1.1 0 2.1-1.1 2.9-2.1.9-1.2 1.3-2.4 1.4-2.5z" />
                    <path d="M15.8 5.7c.6-.7.9-1.7.8-2.7-1 .1-2.2.7-2.9 1.5-.6.7-1.1 1.7-1 2.7 1.1.1 2.2-.4 3.1-1.5z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs uppercase tracking-wider">Download on the</div>
                    <div className="text-base font-medium">App Store</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Mobile Mockup Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <img
              src={appMockup}
              alt="LBEF Evolve App on Mobile Phones"
              className="
                w-full
                max-w-sm
                sm:max-w-md
                lg:max-w-lg
                xl:max-w-xl
                h-auto
                object-contain
                drop-shadow-2xl
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}