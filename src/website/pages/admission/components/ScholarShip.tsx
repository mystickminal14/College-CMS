import { Award, Info, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScholarshipSection = () => {
  const navigate = useNavigate();
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
              We offer several scholarships to assist you in funding your studies. The College provides financial aid for students who demonstrate academic excellence and have financial challenges, bringing support to those throughout their academic journey. Scholarships are applied to tution fees.
            </p>
            <p className="text-gray-700">
              Scholarships are awarded to 10% of the annual intake of students, following government directives. To apply and determine eligibility, please fill out a scholarship and funding application form and submit it to the Administrative Office at the College.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {/* National ICT Scholarship - Added bg-blue-50 */}
        <section className="scroll-mt-24 bg-blue-50 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              National ICT Scholarship
            </h3>
            <p className="text-gray-700 mb-6">
              This scholarship initiative provides opportunities for family members and dependents of serving, retired, and deceased Nepal Police personnel to pursue the B.Sc. IT program at LBEF, with preference given to female candidates. <br />Additionally, scholarships are available to currently serving Nepal Police personnel for enrollment in the M.Sc. ITM and MBA programs at LBEF, facilitating advanced academic growth and professional development within the organization. </p>
            <a
              onClick={() => navigate('/ictregistration')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Register Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>


          {/* Types of Scholarships */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Types of Scholarships</h4>

            {/* First Table */}
            <div className="mb-8">
              <h5 className="text-md font-medium text-gray-700 mb-3">Female Merit ICT Scholarship for B.Sc.IT Core</h5>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">S.N.</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name of Scholarships</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship Scheme</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Toal Course Fee</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fee to be paid</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">No of Scholarship</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Scholarship amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Saraswati</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">100%</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">10,65,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">10,65,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">0</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">7</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">7,455,000</td>

                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Laxmi</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">50%</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">10,65,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">5,32,500</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">5,32,500</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">7</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">3,727,500</td>

                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">3</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Durga</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">30%</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">10,65,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">3,19,500</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">7,45,500</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">14</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">4,473,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900"> </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Total Scholarship Amount</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>

                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">15,655,500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-8">
              <h5 className="text-md font-medium text-gray-700 mb-3">ICT Merit Scholarships for B.Sc.IT Core (Open to all) </h5>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">S.N.</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name of Scholarships</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship Scheme</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Toal Course Fee</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fee to be paid</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">No of Scholarship</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Scholarship amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Shakti</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">50%</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">10,65,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">5,32,500</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">5,32,500</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">7</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">3,727,500</td>

                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Sathi</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">30%</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">10,65,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">3,19,500</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">7,45,500</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">14</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">4,473,000</td>

                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Total Scholarship Amount</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>

                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">8,200,500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-8">
              <h5 className="text-md font-medium text-gray-700 mb-3">ICT Merit Scholarships for MBA (Open to all)</h5>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">S.N.</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name of Scholarships</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship Scheme</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Toal Course Fee</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fee to be paid</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">No of Scholarship</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Scholarship amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Shakti</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">50%</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">6,60,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">3,30,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">3,30,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">5</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">1,650,000</td>

                    </tr>

                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Total Scholarship Amount</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>

                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">1,650,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* four Table */}
            <div className="mb-6">
              <h5 className="text-md font-medium text-gray-700 mb-3">ICT Merit Scholarships for M.Sc.ITM (Open to all)</h5>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">S.N.</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name of Scholarships</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship Scheme</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Toal Course Fee</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fee to be paid</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">No of Scholarship</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Scholarship amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Shakti</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">50%</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">6,60,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">3,30,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">3,30,000</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">5</td>

                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">1,650,000</td>
                    </tr>

                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Total Scholarship Amount</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>

                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">1,650,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-md font-semibold text-blue-800 mb-2">To Know more about National ICT Scholarship</h5>
                  <p className="text-sm text-gray-700 mb-2">
                    Contact the Scholarship Office or visit our administration building for detailed information about eligibility criteria, application process, and deadlines.
                  </p>
                  <a
                    href="/ict-scholarship"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Register Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                </div>
              </div>
            </div> */}
          </div>
        </section>

        {/* Gyandeep Scholarship - Added bg-green-50 */}
        <section className="scroll-mt-24 bg-green-50 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Percent className="w-5 h-5 text-green-600" />
              Gyandeep Scholarship
            </h3>
            <p className="text-gray-700 mb-6">
              This Scholarship is awarded based on the percentage achieved in the High-School Board examinations or equivalent examination. This scholarship is only awarded in the <strong>tuition fee category</strong>. The scholarship privileges provided in this category are as follows:            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd4a49-3lWEfEeQERhJrQLiqX2YBIbCMTuocah0MyZ2jsvxqg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-2 items-center gap-1 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Register Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">S.No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">% marks in highschool</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">No of Students</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Above 90%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">100%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">2</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">80%-90%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">50%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">3</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">3</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">70%-80%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">25%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">5</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">4</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Above 60%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">10%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">20</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-md font-semibold text-green-800 mb-2">To Know more about Gyandeep Scholarship</h5>
                <p className="text-sm text-gray-700">
                  For detailed information about the Gyandeep Scholarship criteria and application process, please visit the scholarship office. <br /> <a
                    href="/gyandeep-scholarship"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex mt-2 items-center gap-1 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                </p>
              </div>
            </div>
          </div> */}
        </section>

        {/* Merit Scholarship - Added bg-amber-50 */}
        <section className="scroll-mt-24 bg-amber-50 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Merit Scholarship
            </h3>
            <p className="text-gray-700 mb-6">
              Merit Scholarship is awarded on the basis of academic performance in the  conducted by LBEF Campus, internal examinations/evaluations and the End Semester examinations of the University. This scholarship is only awarded in the <strong>tuition fee category</strong> . The scholarship privileges provided in this category are as follows:            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd4a49-3lWEfEeQERhJrQLiqX2YBIbCMTuocah0MyZ2jsvxqg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-2 items-center gap-1 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              register Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">S.No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">% Obtained</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship Awarded</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">95% and above</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">50%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">91% to 95%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">40%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">3</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">86% to 90%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">30%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">4</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">81% to 85%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">25%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">5</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">76% to 80%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">20%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">6</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">71% to 75%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">10%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Merit scholarships are automatically considered based on your previous academic results. No separate application is required for these scholarships. <br />
                  <a
                    href="/merit-scholarship"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex mt-2 items-center gap-1 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </p>
              </div>
            </div>
          </div> */}
        </section>
      </div>
    </div>
  );
};

export default ScholarshipSection;