import girlWithCup from "../../../../assets/gril_with_cup.png";
import girlWithThinking from "../../../../assets/girl_with_thinking.png";
import { CheckCircle, Users, Video } from "lucide-react";
import decoration from '../../../../assets/decoration.png';
import bg1 from '../../../../assets/decoration/AboutHero.jpg';



export function JoinStudents() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-20 overflow-hidden">
      {/* Background Image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg1})` }}
      />
      <div className="absolute inset-0 bg-[#474AFF] opacity-65 " />

      <div className="relative max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">

        <div className="flex justify-center gap-4">
          <div className="p-4 flex flex-col mt-10 lg:mt-20 items-center gap-10 lg:gap-0">
            <div className="inline-flex items-center gap-5 -ml-10 lg:-ml-55 bg-white rounded-full shadow-xl px-4 lg:px-6 py-2 lg:py-4 border border-purple-100">
              <div className="w-6 h-6 lg:w-15 lg:h-15 bg-[#474AFF] rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="leading-tight">
                <p className="text-xs lg:text-xl font-bold text-gray-800">
                  BEST
                </p>
                <p className="text-xs lg:text-xl text-gray-600">
                  Students
                </p>
              </div>
            </div>
            <div
              className="w-36 h-70 lg:w-60 lg:h-105 overflow-hidden shadow-2xl border-4 sm:border-8 border-white"
              style={{
                borderTopLeftRadius: "180px",
                borderBottomRightRadius: "180px",
              }}
            >
              <img
                src={girlWithThinking}
                alt="Student learning"
                className="w-full h-full object-cover object-top scale-125 sm:scale-135"
              />
            </div>
          </div>
          <div className="p-4 flex flex-col items-center -ml-20 lg:-ml-40 z-1 gap-10">
            <div
              className="w-36 h-70 lg:w-60 lg:h-105 overflow-hidden shadow-2xl border-4 sm:border-8 border-white"
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
            <div className="inline-flex items-center gap-5 -ml-10 lg:ml-40 bg-white rounded-full shadow-xl px-4 lg:px-6 py-2 lg:py-4 border border-purple-100">
              <div className="w-6 h-6 lg:w-15 lg:h-15 bg-[#474AFF] rounded-full flex items-center justify-center">
                <Video className="w-4 h-4 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="leading-tight">
                <p className="text-xs lg:text-xl font-bold text-gray-800">
                  BEST
                </p>
                <p className="text-xs lg:text-xl text-gray-600">
                  Learning
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center lg:text-left mt-2">
          <span className="inline-block px-6 py-2 text-white text-sm sm:text-base font-semibold rounded-full mb-3">
            Join LBEF
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
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

          <p className="text-white/90 text-lg max-w-3xl mx-auto lg:mx-0 mb-4 leading-relaxed">
            Become a part of our vibrant learning community and grow your skills
            with expert-led courses. Access interactive lessons, connect with global learners, and build knowledge for academic and professional success.
          </p>

          {/* Features */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-6 max-w-4xl mx-auto lg:mx-0">
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