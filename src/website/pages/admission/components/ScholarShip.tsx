import { Award, Info, Percent, BookOpen } from "lucide-react";

const ScholarshipSection = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-900">Scholarships</h2>
      </div>

      {/* Introduction */}
      <div className="bg-purple-50 border border-purple-100 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-gray-700 mb-3">
              We offer several scholarships to assist you in funding your studies. The College provides financial aid for students who demonstrate academic excellence and have financial challenges, bringing support to those throughout their academic journey. Scholarships are applied to better lives.
            </p>
            <p className="text-gray-700">
              Scholarships are awarded by the College's Scholarship Committee. To apply and determine eligibility, please fill out a scholarship application form or contact our Scholarship Administrator Officer at the College.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {/* National ICT Scholarship */}
        <section className="scroll-mt-24">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              National ICT Scholarship
            </h3>
            <p className="text-gray-700 mb-6">
              The scholarships include successful candidates in the field of Information Technology. Students who have completed their 10+2 or equivalent are eligible to apply. This scholarship supports students pursuing IT-related courses and provides special benefits for academic excellence.
            </p>
          </div>

          {/* Types of Scholarships */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Types of Scholarships</h4>
            
            {/* First Table */}
            <div className="mb-8">
              <h5 className="text-md font-medium text-gray-700 mb-3">National ICT Scholarships (Type I)</h5>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Number of Scholarships</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student Course Fee</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship Delivered</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Post-pilot Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Standard</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">100%</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹9,990,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹9,990,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">0</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹49,500,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Leaver</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">100% (No Year in Time)</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹9,990,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹4,220,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹3,720,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹29,500,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">3</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Dump</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">100% (No Year in Time)</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹9,990,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹3,000,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹4,990,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹42,000,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-3 italic">Prior Scholarship (Type I)</p>
            </div>

            {/* Second Table */}
            <div className="mb-6">
              <h5 className="text-md font-medium text-gray-700 mb-3">ICT Total Scholarships (Type II - 81)</h5>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Number of Scholarships</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student Course Fee</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship Delivered</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Post-pilot Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Shield</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">100% (No Thriller A Late Time)</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹9,990,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹4,220,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹3,720,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹29,500,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Smith</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">100% (No Thriller B Late Time)</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹9,990,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹3,000,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹4,990,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹42,000,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-3 italic">Other Scholarship (Type III)</p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-md font-semibold text-blue-800 mb-2">To Know more about National ICT Scholarship</h5>
                  <p className="text-sm text-gray-700 mb-2">
                    Contact the Scholarship Office or visit our administration building for detailed information about eligibility criteria, application process, and deadlines.
                  </p>
                  <a 
                    href="/scholarships/ict" 
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gyandeep Scholarship */}
        <section className="scroll-mt-24">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Percent className="w-5 h-5 text-green-600" />
              Gyandeep Scholarship
            </h3>
            <p className="text-gray-700 mb-6">
              This Scholarship is awarded to students with outstanding academic performance without any geographical restriction. This scholarship is only awarded in the following two categories.
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Selected Subjects</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject Course</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">% of Students</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">All Subjects</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">50%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">5</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Science Only</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">20%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">3</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">3</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Commerce Only</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">20%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">5</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">4</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Arts Only</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">10%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">20</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-md font-semibold text-green-800 mb-2">To Know more about Gyandeep Scholarship</h5>
                <p className="text-sm text-gray-700">
                  For detailed information about the Gyandeep Scholarship criteria and application process, please visit the scholarship office.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Merit Scholarship */}
        <section className="scroll-mt-24">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Merit Scholarship
            </h3>
            <p className="text-gray-700 mb-6">
              Merit Scholarship is awarded to students based on their academic performance in the previous examination. This scholarship recognizes and rewards academic excellence and is only awarded in the following categories.
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Achievement (%)</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">95% and above</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">100%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">90% to 94%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">80%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">3</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">85% to 89%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">75%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">4</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">80% to 84%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">60%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">5</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">75% to 79%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">50%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">6</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">70% to 74%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">40%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Merit scholarships are automatically considered based on your previous academic results. No separate application is required for these scholarships.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ScholarshipSection;