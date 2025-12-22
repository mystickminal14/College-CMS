import girlWithCup from "../../../../assets/gril_with_cup.png"
import girlwithThinking from "../../../../assets/girl_with_thinking.png"
import { CheckCircle, Users, Video } from "lucide-react"
import decoration from '../../../../assets/decoration.png';

export function JoinStudents() {
  return (
    <section className="py-20 px-6 lg:px-20 bg-[#0066ff09]">
      <div className="w-full sm:max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-center gap-screen">

          {/* LEFT SIDE – IMAGES */}
          <div className="relative mb-45 flex justify-center lg:justify-end">

            {/* Top Image */}
            <div className="relative pl-24 top-5 sm:top-0sm:pl-0 z-10">
              <div
                className="w-35 h-75 sm:w-70 sm:h-115 overflow-hidden shadow-2xl border-8 border-white"
                style={{
                  borderTopLeftRadius: "180px",
                  borderBottomRightRadius: "180px",
                }}
              >
                <img
                  src={girlWithCup}
                  alt="Student learning"
                  className="w-full h-full object-cover transition-transform scale-135 object-top"
                />
              </div>

              <div className="absolute -bottom-35 left-1/1 sm:left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-10 bg-white rounded-full shadow-xl px-4 sm:px-8 py-4 flex items-center gap-5 border border-purple-100">
                <div className="w-10 h-10 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center">
                  <Video />
                </div>
                <div>
                  <p className="text-xs md:text-2xl font-bold text-gray-800">BEST</p>
                  <p className="text-xs md:text-2xl text-gray-600">Learning</p>
                </div>
              </div>
            </div>

            {/* Bottom Image */}
            <div className="absolute -bottom-50 left-1/3 sm:left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-60">
              <div
                className="w-35 h-75 sm:w-80 sm:h-105 rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  borderTopLeftRadius: "200px",
                  borderBottomRightRadius: "200px",
                }}
              >
                <img
                  src={girlwithThinking}
                  alt="Happy student"
                  className="w-full h-full object-cover transition-transform scale-125"
                />
              </div>

              {/* BEST Students Badge */}
              <div className="absolute -top-35 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0  bg-white rounded-full shadow-xl px-8 py-4 flex items-center gap-5 border border-blue-100">
                <div className="w-10 h-10 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users />
                </div>
                <div>
                  <p className="text-xs md:text-2xl font-bold text-gray-800">BEST</p>
                  <p className="text-xs md:text-2xl text-gray-600">Students</p>
                </div>
              </div>
            </div>

            {/* Decorative Background */}
            <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl -z-10"></div>
          </div>

          {/* RIGHT SIDE – CONTENT */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <span className="inline-block px-6 py-2 bg-[#F5F2FF] text-[#474AFF] text-sm font-semibold rounded-full mb-6">
              Join LBEF
            </span>

            {/* Main Heading - Responsive sizing */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Join as a <span className="relative inline-block text-[#474AFF]">
                Students
                <img
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 w-full h-3"
                />
              </span>{" "}
              –<br />
              <span>Start Your Learning</span><br />
              Journey Today!
            </h2>

            <p className="text-sm sm:text-lg text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto lg:mx-0">
              Become a part of our vibrant learning community and grow your skills
              with expert-led courses. As a student, you'll access interactive
              lessons, connect with global learners, and build knowledge that
              supports your academic and professional goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 lg:gap-10 justify-center lg:justify-start max-w-4xl mx-auto lg:mx-0 mb-3 sm:mb-10">
              <div className="space-y-4">
                {[
                  "Flexible Learning Schedule",
                  "Access to Expert Instructors",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 text-gray-700">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#474AFF]" strokeWidth={3} />
                    </div>
                    <span className="text-sm sm:text-lg">{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  "Career-Focused Courses",
                  "Competitive Environment",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 text-gray-700">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#474AFF]" strokeWidth={3} />
                    </div>
                    <span className="text-sm sm:text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-start">
              <button className="bg-[#474AFF] hover:bg-blue-700 text-white font-bold text-lg px-10 py-5 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Join as Student
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
