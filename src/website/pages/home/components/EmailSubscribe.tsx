import { Mail } from 'lucide-react';
import background from '../../../../assets/decoration/AboutHero.jpg';

export function EmailSubscribe() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* Deep blue overlay */}
      <div className="absolute inset-0 bg-[#474AFF] opacity-80" />


      {/* Content */}
      <div className="relative z-10 px-6 text-center text-white">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Join Our Academic <br /> Community
        </h2>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Have questions about courses, eligibility, or admission process? Enquire now and our team will assist you.
        </p>

        {/* Email Form */}
        <form className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
          <div className="relative flex-1">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-200" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-14 pr-6 py-5 border-2 border-white/40 rounded-full text-white placeholder-white/70 focus:outline-none text-lg transition-all"
            />
          </div>

          <button
            type="submit"
            className="px-12 py-5 bg-white text-[#474AFF] font-bold text-lg rounded-full hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
