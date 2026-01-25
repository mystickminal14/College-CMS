import decoration from '../../../assets/decoration.webp';
import { Info, CheckCircle, AlertCircle, Clock, Award } from "lucide-react";
import subfooterone from '../../../assets/six_path.webp';
import Seo from '../../../context/seo';
import { APP_URL } from '../../../constants';

const MeritScholarship = () => {
  const eligibilityCriteria = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600 mt-1" />,
      text: "Clear promotion to the next semester in first attempt with pass in all papers of the previous semester including internal examinations/tests."
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-600 mt-1" />,
      text: "Attendance should be above 85% in previous & current semester."
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-amber-600 mt-1" />,
      text: "No EC form has been submitted throughout previous and current semester."
    },
    {
      icon: <Info className="w-5 h-5 text-blue-600 mt-1" />,
      text: "There are limited numbers of Scholarships. In total, Gyandeep & Merit Scholarship will be only provided in the Tuition Fee to 20% of class Strength. One Student can opt for only one scholarship scheme."
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600 mt-1" />,
      text: "Student must have attendance higher than 85% to avail any type of scholarship/award."
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-600 mt-1" />,
      text: "On the basis of entrance examination, scholarship will be only provided in the tuition fee of first semester and from the next semester onwards overall performance in university examination and internal examinations (include midterm test, presentation, project, pre-final, group discussion etc.) will be taken into account."
    },
    {
      icon: <Award className="w-5 h-5 text-indigo-600 mt-1" />,
      text: "Average of pre-final, mid-term and University Examination will be taken into account while calculating the scholarship percentage."
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-amber-600 mt-1" />,
      text: "Student has to pass in all university theory papers, college internal examinations & internal assessment and term work. If any student fails, his scholarship will be seized without any prior notice."
    },
    {
      icon: <Info className="w-5 h-5 text-blue-600 mt-1" />,
      text: "Students will pay the whole tuition fee at the starting of second semester and once the university result is declared, student has to give a fresh application to college management; campus will refund the scholarship amount."
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-amber-600 mt-1" />,
      text: "As MBA (Weekend) is an executive education programme, no scholarship will be awarded to the students joining MBA in weekend mode."
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-amber-600 mt-1" />,
      text: "Any undisciplined/unprofessional behavior from the student can also lead to the cancellation of scholarship."
    },
    {
      icon: <Info className="w-5 h-5 text-blue-600 mt-1" />,
      text: "Decision taken by college management will be final and rules for scholarship can be changed without any notice. College will be under no obligation to continue scholarship in higher semester. College decision will be final and cannot be challenged."
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
            Rewarding academic excellence in tuition fees based on entrance and university performance.
          </p>
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
            The scholarship privileges provided by LBEF are as follows:
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
      <div className="w-full bg-gray-50 mt-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full text-center">

            <div className="w-full inline-block">
              <img
                src={subfooterone}
                alt="Illustration part one"
                className="
                w-full
                max-w-7xl
                h-auto
                object-contain
                mx-auto
                block
                rounded-xl
      
              "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeritScholarship;
