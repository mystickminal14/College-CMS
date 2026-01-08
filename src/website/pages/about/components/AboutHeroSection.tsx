import HeroImages from '../../../../assets/decoration/abouthero.webp'
import butterfiles from '../../../../assets/butterfiles.webp'

const ABoutHeroSection = () => {
  return (
    <section className="py-10 bg-white md:py-15">
      <div className="max-w-8xl px-4 md:px-15 md:pl-18 mx-auto">
        <div className="flex items-center mb-4 text-sm text-gray-600">
          <span className="w-12 border-t border-gray-400"></span>
          <span className="ml-3 uppercase">About Us</span>
        </div>

        <h1 className="
  mb-6 sm:mb-8 md:mb-10
  text-2xl  md:text-4xl
  font-bold text-gray-800 uppercase
  leading-tight sm:leading-snug md:leading-tight
  flex flex-wrap items-center gap-x-2 gap-y-1
">
          Leading with Boldness,

          <span className="relative text-blue-600 inline-flex items-center">
            <span className="absolute -top-4 -left-4 w-6 h-6 sm:w-8 sm:h-8">
              <img src={butterfiles} alt="Butterflies" className="w-full h-full" />
            </span>
            Shaping an Effective
          </span>
          & Futuristic Education
        </h1>


        {/* Image Container with Rounded Left Corner */}
        <div className=" mb-5 overflow-hidden " style={{
          borderTopLeftRadius: '96px'
        }}>
          <img
            src={HeroImages} // Replace with your actual image URL
            alt="LBEF Faculty in Graduation Ceremony"
            className="object-cover w-full object-[50%_35%] h-80"
          />
        </div>

        {/* Description Text - Centered */}
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-base leading-relaxed text-gray-700 md:text-lg">
            Together with our top-notch faculty, we provide a nurturing environment to help students evolve into leaders who think boldly, make effective choices and are well-equipped with futuristic mindset and skills.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ABoutHeroSection;