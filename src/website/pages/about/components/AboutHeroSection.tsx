import HeroImages from '../../../../assets/decoration/AboutHero.jpg'
import butterfiles from '../../../../assets/butterfiles.png'

const ABoutHeroSection = () => {
  return (
    <section className="py-10 bg-white md:py-15">
      <div className="max-w-8xl px-4 md:px-15 md:pl-18 mx-auto">
        {/* Breadcrumb / Section Label */}
        <div className="flex items-center mb-4 text-sm text-gray-600">
          <span className="w-12 border-t border-gray-400"></span>
          <span className="ml-3 uppercase">About Us</span>
        </div>

        {/* Main Heading */}
        <h1 className="mb-10 text-3xl font-bold text-gray-800 uppercase md:text-4xl">
          Leading, Boldness, Effectiveness,   <span
            className=" relative text-blue-600"
            
          >
            <span className="absolute h-[2vh] w-[2vw] left-[-1vw] -top-[1vw]">
              <img src={butterfiles} alt="Butterflies" />
            </span>
            Futuristic
          </span> Thinking
        </h1>

        {/* Image Container with Rounded Left Corner */}
        <div className=" mb-5 overflow-hidden " style={{
          borderTopLeftRadius:'96px'
        }}>
          <img
            src={HeroImages} // Replace with your actual image URL
            alt="LBEF Faculty in Graduation Ceremony"
            className="object-cover w-full h-80 brightness-75"
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