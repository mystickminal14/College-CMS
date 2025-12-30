import journey_background from '../../../../assets/journey_background.jpg'
import about_decoration from '../../../../assets/decoration/about_decoration.png'
import decoration from '../../../../assets/decoration.png';

const StartJourney = () => {
  return (
    <div className="relative h-150 overflow-hidden">
      {/* Background image (blurred graduates) */}
      <div className="absolute inset-0">
        {/* Original background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat "
          style={{
            backgroundImage: `url(${journey_background})`,
          }}
        />

        {/* Blue-enhancing overlay */}
        <div
          className="absolute inset-0 opacity-65"
          style={{
            backgroundColor: "#474AFF", // deep blue

          }}
        />
      </div>


      {/* Left circular striped decoration */}
      <div className="absolute left-40 top-40 -translate-y-1/2 h-0 w-0 lg:w-[200px] lg:h-[200px]">
        <img src={about_decoration} alt="" />
      </div>

      {/* Right circular striped decoration */}
      <div className=" absolute right-40 bottom-0 -translate-y-1/2 h-0 w-0 lg:w-[200px] lg:h-[200px]">
        <img src={about_decoration} alt="" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center  px-6 py-30 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl">
          Start Your Journey Toward In-Demand {' '}
          <span className="relative inline-block">
            Skill Today
            <img
              src={decoration}
              alt="Decoration"
              className="absolute left-1/2 -translate-x-1/2 w-full h-3"
            />
          </span>{' '}
        </h1>
        <p className="mt-8 text-lg md:text-xl lg:text-2xl opacity-90 max-w-2xl">
          Enroll now and learn from certified industry experts.
        </p>
        <a className="mt-12 px-8 py-4 bg-white text-indigo-700 font-semibold text-lg rounded-2xl shadow-lg hover:bg-gray-100 transition duration-300 flex items-center gap-2" href='https://apply.lbef.org/' target='_blank' >
          Get Started Now
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default StartJourney;