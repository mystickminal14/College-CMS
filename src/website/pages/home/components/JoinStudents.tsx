import girlWithCup from "../../../../assets/gril_with_cup.png";
import girlwithThinking from "../../../../assets/girl_with_thinking.png";
import { CheckCircle, Users, Video } from "lucide-react";
import decoration from '../../../../assets/decoration.png';
import bg1 from '../../../../assets/decoration/background.png';

export function JoinStudents() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-20 overflow-hidden bg-[#474AFF]">
      {/* Background Image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${bg1})` }}
      />
      <div className="absolute inset-0 bg-[#474AFF] opacity-90 mix-blend-multiply" />

      <div className="relative max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-40 items-center">
        {/* LEFT SIDE – IMAGES */}
        <div className="relative hidden md:flex justify-center lg:justify-end">
          {/* Top Image */}
          <div className="relative z-10">
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
            <div className="absolute -bottom-8 sm:-bottom-16 left-1/2 -translate-x-1/2 lg:left-auto lg:-right-10 bg-white rounded-full shadow-xl px-4 py-2 flex items-center gap-3 border border-purple-100">
              <div className="w-12 h-12 lg:w-20 lg:h-20 bg-[#474AFF] rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <div>
                <p className="text-xs lg:text-2xl font-bold text-gray-800">BEST</p>
                <p className="text-xs lg:text-2xl text-gray-600">Learning</p>
              </div>
            </div>
          </div>

          {/* Bottom Image */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 lg:left-auto lg:right-60">
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
            <div className="absolute -top-12 lg:-top-35 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 bg-white rounded-full shadow-xl px-4 py-2 flex items-center gap-3 border border-blue-100">
              <div className="w-12 h-12 lg:w-20 lg:h-20 bg-[#474AFF] rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <div>
                <p className="text-xs lg:text-2xl font-bold text-gray-800">BEST</p>
                <p className="text-xs lg:text-2xl text-gray-600">Students</p>
              </div>
            </div>
          </div>

          {/* Decorative Background Blur */}
          <div className="absolute top-10 sm:top-20 -left-10 sm:-left-20 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-purple-100 rounded-full opacity-30 blur-2xl md:blur-3xl -z-10"></div>
        </div>

        {/* RIGHT SIDE – CONTENT */}
        <div className="text-center lg:text-left mt-10">
          <span className="inline-block px-6 py-2 text-white text-sm sm:text-base font-semibold rounded-full mb-6">
            Join LBEF
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Join as a{" "}
            <span className="relative inline-block text-white">
              Students
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 w-full h-2 sm:h-3"
              />
            </span>{" "}
            – <br />
            <span>Start Your Learning</span><br />
            Journey Today!
          </h2>

          <p className="text-white/90 text-lg max-w-3xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            Become a part of our vibrant learning community and grow your skills
            with expert-led courses. Access interactive lessons, connect with global learners, and build knowledge for academic and professional success.
          </p>

          {/* Features */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-10 max-w-4xl mx-auto lg:mx-0">
            {[
              ["Flexible Learning Schedule", "Access to Expert Instructors"],
              ["Career-Focused Courses", "Competitive Environment"],
            ].map((column, i) => (
              <div key={i} className="space-y-4">
                {column.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-white">
                    <CheckCircle className="w-5 h-5 text-white" strokeWidth={3} />
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-center lg:justify-start">
            <a
              href="https://apply.lbef.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#474AFF] font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Join as Student
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
