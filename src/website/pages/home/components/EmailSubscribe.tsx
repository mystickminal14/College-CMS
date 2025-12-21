import { Mail } from 'lucide-react';

import leftSideGirl from "../../../../assets/girl_left_side.png"
import rightSideGirl from "../../../../assets/right_side_girl.png"

export function EmailSubscribe() {
  return (
    <section className="py-20 px-6 lg:px-40">
      <div className="max-w-8xl mx-auto">
        {/* Main CTA Card */}
        <div className="relative bg-[#474AFF] rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Students - Hidden below 1300px */}
          <div className="absolute inset-0 flex justify-between items-center pointer-events-none max-[1299px]:hidden">
            {/* Left Student */}
            <img
              src={leftSideGirl}
              alt="Happy student"
              className="-ml-50 w-150 h-full left-0 object-cover object-center"
            />

            {/* Right Student */}
            <img
              src={rightSideGirl}
              alt="Confident student"
              className="-mr-20 w-150 h-full object-cover object-center"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 py-16 lg:py-24 px-8 lg:px-16 text-center">
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Join us now with great<br />
              lorem ipsum
            </h2>

            {/* Subheading */}
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Stay informed with the latest news, insights, and updates<br />
              delivered straight to your inbox
            </p>

            {/* Email Form */}
            <form className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative flex-1">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-200" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-14 pr-6 py-5 border-2 border-[#FFFFFF66] rounded-full text-white placeholder-white/70 focus:outline-none transition-all text-lg"
                />
              </div>

              <button
                type="submit"
                className="px-15 py-5 bg-white text-[#474AFF] font-bold text-lg rounded-full hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Submit
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}