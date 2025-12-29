import girlWithCup from "../../../../assets/gril_with_cup.png"
import girlwithThinking from "../../../../assets/girl_with_thinking.png"
import { CheckCircle, Users, Video } from "lucide-react"
import decoration from '../../../../assets/decoration.png';
import bg1 from '../../../../assets/decoration/background.png';

export function JoinStudents() {
  return (
    <section
      className="py-4 px-4 sm:px-6 lg:px-20"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${bg1})` }}
      />
      <div className="absolute inset-0 bg-[#474AFF] opacity-90 mix-blend-multiply" />

      <div className=" relative z-10 max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-40 items-center">

          {/* LEFT SIDE – IMAGES */}
          <div className="relative  flex md:hidden lg:flex justify-center lg:justify-end">
            {/* Top Image Container */}
            <div className="relative pl-16 sm:pl-20 md:pl-16 lg:pl-0 z-10">
              <div
                className="w-36 h-60 lg:w-70 lg:h-115 overflow-hidden shadow-2xl border-4 sm:border-8 border-white"
                style={{
                  borderTopLeftRadius: "180px",
                  borderBottomRightRadius: "180px",
                }}
              >
                <img
                  src={girlWithCup}
                  alt="Student learning"
                  className="w-full h-full object-cover object-top scale-125 sm:scale-135"
                />
              </div>

              {/* Video Badge */}
              <div className="absolute -bottom-8 sm:-bottom-16 left-1/1 md:left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-10 bg-white rounded-full shadow-xl px-3 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 flex items-center gap-2 sm:gap-3 md:gap-5 border border-purple-100">
                <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[#474AFF] rounded-full flex items-center justify-center">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm md:text-lg lg:text-2xl font-bold text-gray-800">BEST</p>
                  <p className="text-xs sm:text-sm md:text-lg lg:text-2xl text-gray-600">Learning</p>
                </div>
              </div>
            </div>

            {/* Bottom Image Container */}
            <div className="absolute -bottom-16 left-1/3 sm:left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-60">
              <div
                className="w-36 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-80 lg:h-105 rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
                style={{
                  borderTopLeftRadius: "180px",
                  borderBottomRightRadius: "200px",
                }}
              >
                <img
                  src={girlwithThinking}
                  alt="Happy student"
                  className="w-full h-full object-cover scale-110 sm:scale-125"
                />
              </div>

              {/* Students Badge */}
              <div className="absolute -top-12 sm:-top-16 md:-top-20 lg:-top-35 left-5 md:left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 bg-white rounded-full shadow-xl px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 flex items-center gap-2 sm:gap-3 md:gap-5 border border-blue-100">
                <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[#474AFF] rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white " />
                </div>
                <div>
                  <p className="text-xs sm:text-sm md:text-lg lg:text-2xl font-bold text-gray-800">BEST</p>
                  <p className="text-xs sm:text-sm md:text-lg lg:text-2xl text-gray-600">Students</p>
                </div>
              </div>
            </div>

            {/* Decorative Background */}
            <div className="absolute top-10 sm:top-20 -left-10 sm:-left-20 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-purple-100 rounded-full opacity-30 blur-xl sm:blur-2xl md:blur-3xl -z-10"></div>
          </div>

          {/* RIGHT SIDE – CONTENT */}
          <div className="text-center mt-10 lg:text-left">
            {/* Badge */}
            <span className="inline-block px-4 sm:px-5 md:px-6 py-1.5 sm:py-2  text-white text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">
              Join LBEF
            </span>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Join as a <span className="relative inline-block text-white">
                Students
                <img
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 w-full h-2 sm:h-3"
                />
              </span>{" "}
              –<br />
              <span>Start Your Learning</span><br />
              Journey Today!
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto lg:mx-0">
              Become a part of our vibrant learning community and grow your skills
              with expert-led courses. As a student, you'll access interactive
              lessons, connect with global learners, and build knowledge that
              supports your academic and professional goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-center lg:justify-start max-w-4xl mx-auto lg:mx-0 mb-4 sm:mb-6 md:mb-10">
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Flexible Learning Schedule",
                  "Access to Expert Instructors",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 sm:gap-4 text-white">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8  rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-sm sm:text-base md:text-lg">{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 sm:space-y-4">
                {[
                  "Career-Focused Courses",
                  "Competitive Environment",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 sm:gap-4 text-white">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8  rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-sm sm:text-base md:text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-start">
              <a
                className="bg-white text-[#474AFF] font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                href="https://apply.lbef.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join as Student
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}