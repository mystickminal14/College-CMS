import decoration from '../../../assets/decoration.webp';
import { Info, CheckCircle, AlertCircle, Clock, Award } from "lucide-react";
import Seo from '../../../context/seo';
import { APP_URL } from '../../../constants';
import LbefSubFooter from '../home/components/LbefSubFooter';

const GyandeepScholasrhip = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Gyandeep Scholarship | LBEF College Nepal"
        description="Unlock your academic potential with the Gyandeep Scholarship, rewarding excellence in high-school performance. Check eligibility and benefits."
        url={`${APP_URL}/gyandeep-scholarship`}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 text-center">
        <div className="max-w-8xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-blue-600 font-medium text-sm">
              Scholarship
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Gyandeep </span>
            <span className="relative inline-block ml-2">
              <span className="text-blue-600 relative z-10">
                Scholarship
              </span>
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-3"
              />
            </span>
          </h1>

          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Unlock your academic potential with the Gyandeep Scholarship, rewarding excellence in high-school performance.
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

      <div className="container mx-auto px-4 sm:px-6  pb-16">
        <div className="max-w-6xl mx-auto text-left">
          {/* Description */}
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
            The <b>Gyandeep Scholarship</b> is valid for students who are eligible for
            admission to Under Graduate programs at LBEF. The Scholarship benefit
            is valid for students who submit a duly signed valid application form
            with enclosures before the entrance examination for admission to any
            of the Under Graduate programs offered.
          </p>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
            This Scholarship is awarded based on the percentage achieved in the
            High-School Board examinations or equivalent examination. The
            scholarship scheme is as follows:
          </p>

          {/* Table */}
          <div className="overflow-x-auto mb-10">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    % marks in highschool
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Scholarship
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    No of Students
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">1</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Above 90%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">100%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">2</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">2</td>
                  <td className="px-4 py-3 text-sm text-gray-700">80% - 90%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">50%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">3</td>
                  <td className="px-4 py-3 text-sm text-gray-700">70% - 80%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">25%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">5</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">4</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Above 60%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">10%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">20</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Conditions */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              Conditions
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <p className="text-gray-700">
                  This scholarship will be only provided in the tuition fee applicable
                  for every semester.
                </p>
              </li>

              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-1" />
                <p className="text-gray-700">
                  Only physical Scholarship Applications duly signed by the students
                  along with the Application for Admission form completed in all
                  respects and necessary enclosures, received by the University
                  Admissions Office within the specified period, will be considered
                  as valid applications.
                </p>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-purple-600 mt-1" />
                <p className="text-gray-700">
                  There are limited numbers of Scholarships and they will be provided
                  to eligible students on a first come, first serve basis.
                </p>
              </li>

              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-indigo-600 mt-1" />
                <p className="text-gray-700">
                  No further scholarships will be offered after exhausting the number
                  of available Scholarships in each category. Students can opt for
                  only one scholarship scheme.
                </p>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <p className="text-gray-700">
                  The continuation of Scholarship to the eligible student in the
                  second and subsequent semesters will be as per the rules and
                  regulations of the merit scholarship.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <LbefSubFooter />
    </div>
  );
};

export default GyandeepScholasrhip;
