import girlWithCup from "../../../../assets/gril_with_cup.png"
import girlwithThinking from "../../../../assets/girl_with_thinking.png"
import { CheckCircle, Users, Video } from "lucide-react"
import decoration from '../../../../assets/decoration.png';

export function JoinStudents() {
  return (
    <section className="py-20 px-6 lg:px-20 bg-[#0066ff09]">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-center gap-screen">

          {/* Left Side - Images + Floating Badges */}
          <div className="hidden lg:flex relative flex mb-45 justify-center lg:justify-end">

            {/* Main Student Image (Top) */}
            <div className="relative z-10">
              <div className="w-70 h-115 overflow-hidden shadow-2xl border-8 border-white" style={{
                borderTopLeftRadius: "180px",
                borderBottomRightRadius: "180px"
              }}>
                <img
                  src={girlWithCup}
                  alt="Student learning"
                  className="w-full h-full object-cover transition-transform scale-135 object-top "
                />
              </div>

              {/* BEST Students Badge */}
              <div className="absolute -bottom-35 -right-10 bg-white rounded-full shadow-xl px-8 py-4 flex items-center gap-5 border border-purple-100">
                <div className="w-20 h-20 bg-purple-100  rounded-full flex items-center justify-center">
                  <Video />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">BEST</p>
                  <p className="text-2xl text-gray-600">Learning</p>
                </div>
              </div>
            </div>

            {/* Bottom Student Image (Offset) */}
            <div className="absolute -bottom-50 right-60 ">
              <div className="w-80 h-105 rounded-3xl overflow-hidden shadow-2xl " style={{
                borderTopLeftRadius: "200px",
                borderBottomRightRadius: "200px"
              }}>
                <img
                  src={girlwithThinking}
                  alt="Happy student"
                  className="w-full h-full object-cover transition-transform scale-125"
                />
              </div>

              {/* BEST Learning Badge */}
              <div className="absolute -top-35 -left-10 bg-white rounded-full shadow-xl px-8 py-4 flex items-center gap-5 border border-blue-100">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">BEST</p>
                  <p className="text-2xl text-gray-600">Students</p>
                </div>
              </div>
            </div>

            {/* Background Decorative Circle */}
            <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl -z-10"></div>
          </div>

          {/* Right Side - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <span className="inline-block px-6 py-2 bg-[#F5F2FF] text-[#3040E5] text-sm font-semibold rounded-full mb-6">
              Join LBEF
            </span>

            {/* Main Heading - Responsive sizing */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Join as a <span className="relative inline-block">
                Students
                <img
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 w-full h-3"
                />
              </span>{" "}–<br />
              <span>Start Your Learning</span><br />
              Journey Today!
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto lg:mx-0">
              Become a part of our vibrant learning community and grow your skills with expert-led courses.
              As a student, you'll access interactive lessons, connect with global learners, and build
              knowledge that supports your academic and professional goals.
            </p>

            {/* Features List with Checkmarks - Responsive */}
            <div className="flex flex-col sm:flex-row gap-8 lg:gap-10 justify-center lg:justify-start max-w-4xl mx-auto lg:mx-0 mb-10">
              <div className="space-y-4">
                {[
                  "Flexible Learning Schedule",
                  "Access to Expert Instructors",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 text-gray-700">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 text-blue-600" strokeWidth={3} />
                    </div>
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  "Career-Focused Courses",
                  "Competitive Environment"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 text-gray-700">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 text-blue-600" strokeWidth={3} />
                    </div>
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button - Centered on mobile, left on laptop */}
            <div className="flex justify-center lg:justify-start">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-5 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Join as Student
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}