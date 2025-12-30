import Mission from "../../../../assets/mission_vission.jpg";
import arrow from '../../../../assets/mission_arrow.png'
export default function MissionVisionSection() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${Mission}")`,
          }}
        >
          {/* Dark overlay to enhance text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 lg:px-16 xl:px-24">

          {/* Section Title */}
          <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold mb-20">
            Mission & Vision
          </h2>

          <div className="relative grid grid-cols-1 gap-28">

            {/* Our Mission (LEFT) */}
            <div className="max-w-2xl space-y-6 text-left">
              <h3 className="text-3xl md:text-4xl font-bold">Our Mission</h3>
              <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                We provide high quality, affordable, innovative and internationally
                benchmarked education and research in a professional, ethical and
                student-centred manner by designing and delivering a range of enriching
                and distinctive learning experiences.
              </p>
            </div>

            {/* Curved Arrow */}
            <div className="hidden lg:flex absolute rotate-45 top-55 -left-125 inset-0 justify-center items-center pointer-events-none">
              <img
                src={arrow}
                alt="Curved Arrow"
                className="w-[25vw] h-auto"
              />
            </div>

            {/* Our Vision (RIGHT) */}
            <div className="max-w-2xl space-y-6 text-left ml-auto">
              <h3 className="text-3xl md:text-4xl font-bold">Our Vision</h3>
              <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                To be a leading university of technology and innovation transforming
                students into highly employable, competent and future-proof professionals.
              </p>
            </div>

          </div>
        </div>

      </section>
    </>
  );
}