
import decoration from '../../../assets/decoration.webp';
import { Info, CheckCircle, AlertCircle, Clock, Award } from "lucide-react";
import Seo from '../../../context/seo';
import { APP_URL } from '../../../constants';
import LbefSubFooter from '../home/components/LbefSubFooter';

const MeritScholarship = () => {
  const eligibilityCriteria = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600 mt-1" />,
      text: "Students must achieve clear promotion to the next semester in the first attempt, passing all papers, including internal assessments."
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-600 mt-1" />,
      text: "A minimum of 85% attendance must be maintained in all courses in both the previous and current semesters."
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-amber-600 mt-1" />,
      text: "Students who have submitted any EC form in the previous or current semester are not eligible."
    },
    {
      icon: <Info className="w-5 h-5 text-blue-600 mt-1" />,
      text: "Scholarships are limited and awarded to up to 20% of the class strength, covering tuition fees only. Students may avail only one scholarship scheme (Gyandeep or Merit)."
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-600 mt-1" />,
      text: "For the first semester, scholarships are awarded based on entrance examination performance. From the second semester onward, continuation is based on overall academic performance, including university exams and internal evaluations such as midterms, presentations, projects, pre-finals, and group discussions."
    },
    {
      icon: <Award className="w-5 h-5 text-indigo-600 mt-1" />,
      text: "Scholarship percentages are determined based on the average of pre-final, midterm, and university examination scores."
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-amber-600 mt-1" />,
      text: "Students must pass all university theory papers, internal examinations, and assessments. Failure to do so will result in immediate cancellation of the scholarship."
    },
    {
      icon: <Info className="w-5 h-5 text-blue-600 mt-1" />,
      text: "Students are required to pay the full tuition fee at the start of the second semester. Scholarship amounts will be refunded upon declaration of university results, subject to submission of a fresh application."
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-amber-600 mt-1" />,
      text: "Scholarships are not applicable to students enrolled in the MBA (Weekend) program."
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-amber-600 mt-1" />,
      text: "Any instance of indiscipline or unprofessional conduct may lead to cancellation of the scholarship."
    },
    {
      icon: <Info className="w-5 h-5 text-blue-600 mt-1" />,
      text: "All decisions made by the college management are final. The college reserves the right to amend scholarship rules or discontinue scholarships without prior notice."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Merit Scholarship | LBEF College Nepal"
        description="Rewarding academic excellence in tuition fees based on entrance and university performance. Check eligibility criteria and scholarship benefits."
        url={`${APP_URL}/merit-scholarship`}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 text-center">
        <div className="max-w-8xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-blue-600 font-medium text-sm">Scholarship</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Merit </span>
            <span className="relative inline-block ml-2">
              <span className="text-blue-600 relative z-10">Scholarship</span>
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-3"
              />
            </span>
          </h1>

          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Awarded on the basic of academic performance.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd4a49-3lWEfEeQERhJrQLiqX2YBIbCMTuocah0MyZ2jsvxqg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-2 items-center gap-1 bg-green-600 text-white text-xl font-medium px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Register Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto text-left">
          {/* Description */}
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
            Merit Scholarship is awarded based on marks scored in the LBEF Entrance Examination, university semester-end examinations, and internal evaluations. First semester scholarships are based on entrance exam performance, while from the second semester onwards, performance in university and internal assessments is considered. This scholarship is provided only in the tuition fee.
          </p>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
            The scholarship datails are as follows:
          </p>

          {/* Table */}
          <div className="overflow-x-auto mb-10">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">S.No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">% Obtained</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship Awarded</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr><td className="px-4 py-3 text-sm text-gray-900">1</td><td className="px-4 py-3 text-sm text-gray-700">95% and above</td><td className="px-4 py-3 text-sm text-gray-700">50%</td></tr>
                <tr><td className="px-4 py-3 text-sm text-gray-900">2</td><td className="px-4 py-3 text-sm text-gray-700">91% to 95%</td><td className="px-4 py-3 text-sm text-gray-700">40%</td></tr>
                <tr><td className="px-4 py-3 text-sm text-gray-900">3</td><td className="px-4 py-3 text-sm text-gray-700">86% to 90%</td><td className="px-4 py-3 text-sm text-gray-700">30%</td></tr>
                <tr><td className="px-4 py-3 text-sm text-gray-900">4</td><td className="px-4 py-3 text-sm text-gray-700">81% to 85%</td><td className="px-4 py-3 text-sm text-gray-700">25%</td></tr>
                <tr><td className="px-4 py-3 text-sm text-gray-900">5</td><td className="px-4 py-3 text-sm text-gray-700">76% to 80%</td><td className="px-4 py-3 text-sm text-gray-700">20%</td></tr>
                <tr><td className="px-4 py-3 text-sm text-gray-900">6</td><td className="px-4 py-3 text-sm text-gray-700">71% to 75%</td><td className="px-4 py-3 text-sm text-gray-700">10%</td></tr>
              </tbody>
            </table>
          </div>

          {/* Eligibility & Rules with Icons */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              Eligibility & Rules
            </h3>
            <ul className="space-y-4 text-gray-700">
              {eligibilityCriteria.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <LbefSubFooter />
    </div>
  );
};

export default MeritScholarship;
