import decoration from '../../../assets/decoration.webp';
import { Info, CheckCircle, AlertCircle, Clock, Award } from "lucide-react";
import subfooterone from '../../../assets/six_path.webp';
import logo from '../../../assets/lbefhd.webp';
import police from '../../../assets/police.webp';
import { motion } from 'framer-motion';
import { fadeUp } from '../../comp/animation';
import useGetScholarship from '../../../pages/scholarship/hooks/useGet';
import Seo from '../../../context/seo';
import { APP_URL } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const ICTScholarship = () => {
	const { data, isLoading, } = useGetScholarship();
	const schedule = data?.data;
	const navigate = useNavigate();

	return (
		<>
			<Seo
				title="National ICT Scholarship | LBEF College Nepal"
				description="Apply for the National ICT Scholarship at LBEF College Nepal. Rewarding meritorious students in Information Technology with tuition fee benefits."
				url={`${APP_URL}/ict-scholarship`}
			/>
			<div className="min-h-screen bg-gray-50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 text-center">
					<div className="max-w-8xl mx-auto">
						<div className="inline-flex items-center justify-center gap-10 mb-6 px-4 py-2 rounded-full ">
							<img src={logo} className="w-40 h-20" />
							<img src={police} className="w-20 h-20" />
						</div>
						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
							<span className="text-gray-900">National ICT </span>
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
							<br />
							<span className="text-gray-900 mt-2">Awards {schedule?.scheduleYear ?? '2083'} </span>
						</h1>

						<p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto mb-5 leading-relaxed">
							Empowering Nepal Police Families Through Education.
						</p>
						{/* <a
							onClick={() => navigate('/ictregistration')}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 bg-green-600 text-white text-xl font-medium px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
						>
							Register Now
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</a> */}
					</div>
				</div>

				<motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="container mx-auto px-4 sm:px-6 pb-16">
					<div className="max-w-6xl mx-auto text-left">
						<h3 className="text-2xl  font-bold text-gray-900 flex items-center justify-center md:justify-start mb-4">
							NEPAL POLICE WIVES ASSOCIATION (NPWA) – SCHOLARSHIP AWARDING BODY
						</h3>


						<p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
							The Nepal Police Wives Association (NPWA) is a nonprofit organization under the Nepal Police, originally established on Bhadra 4, 2041 B.S. (August 20, 1984) as the Central Police Family Women’s Association and renamed NPWA in April 2005. The association is dedicated to advancing the empowerment, education, and social welfare of police families, with particular focus on spouses and dependent members. <br />

							NPWA plays a vital role in promoting the educational and social development of police family members by administering scholarship support, skill-development initiatives, and welfare programs designed to strengthen resilience and opportunity within the community. It complements the service ethos of the Nepal Police by fostering capacity building, humanitarian assistance, and inclusive support for serving, retired, injured, and martyr personnel’s families through structured welfare activities. <br />

							NPWA serves as the official awarding body of the proposed scholarship scheme, with Lord Buddha EducationFoundation (LBEF) designated as the implementation partner.
						</p>

						<div className="mt-3">
							<h3 className="text-2xl  font-bold text-gray-900 flex items-center justify-center md:justify-start mb-4">
								<span>LORD BUDDHA EDUCATION FOUNDATION (LBEF) – SCHOLARSHIP IMPLEMENTATION PARTNER</span>

							</h3>

							<p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
								Established in 1998, Lord Buddha Education Foundation (LBEF) is the first IT college of Nepal, with over 27 years of academic operation and a strong alumni network contributing across diverse professional sectors. The institution offers undergraduate and postgraduate programs in Information Technology and Management in collaboration with Asia Pacific University of Technology and Innovation (APU), Malaysia, combining academic rigor with practical competence. <br />


								Under the proposed framework, LBEF will serve as the implementation partner for the scholarship scheme awarded by the Nepal Police Wives Association (NPWA). The scholarship will support family members and dependents of serving, retired, and deceased Nepal Police personnel, with preference given to female candidates, as well as currently serving Nepal Police personnel, for pursuing Bachelor’s and Master’s level programs at LBEF.

							</p>
						</div>

						<motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="mt-3" >
							<h3 className="text-2xl  font-bold text-gray-900 flex items-center justify-center md:justify-start mb-4">

								<span className="ml-2 relative inline-block"><span className="text-blue-600 relative z-10">SCHOLARSHIP SCOPE & BENEFICIARIES<img
									src={decoration}
									alt="Decoration"
									className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-2"
								/></span></span>

							</h3>
							<p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
								This scholarship initiative provides opportunities for family members and dependents of serving, retired, and deceased Nepal Police personnel to pursue the B.Sc. IT program at LBEF, with preference given to female candidates. <br />
								Additionally, scholarships are available to currently serving Nepal Police personnel for enrollment in the M.Sc. ITM and MBA programs at LBEF, facilitating advanced academic growth and professional development within the organization. <br />
								The scholarship is awarded in recognition and honor of the dedication, commitment, and sacrifices of Nepal Police personnel for the nation.

							</p>
						</motion.div>

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
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">10,90,000</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">10,90,000</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">0</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">7</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">76,30,000</td>

											</tr>
											<tr>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Laxmi</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">50%</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">10,90,000</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">5,45,000</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">5,45,000</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">7</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">38,15,000</td>

											</tr>
											<tr>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">3</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Durga</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">30%</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">10,90,000</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">3,27,000</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">7,63,000</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">14</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">45,78,000</td>
											</tr>
											<tr>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900"> </td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Total Scholarship Amount</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>

												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">1,60,23,000</td>
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
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">10,90,000</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">5,45,000</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">5,45,000</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">7</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">38,15,000</td>

											</tr>
											<tr>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Sathi</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">30%</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">10,90,000</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">3,27,000</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">7,63,000</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">14</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">45,78,000</td>

											</tr>
											<tr>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Total Scholarship Amount</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>

												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">83,93,000</td>
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
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">6,65,000</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">3,32,500</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">3,32,500</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">5</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">16,62,500</td>

											</tr>

											<tr>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Total Scholarship Amount</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>

												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">16,62,500</td>
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
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">6,65,000</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">3,32,500</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">3,32,500</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">5</td>

												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">16,62,500</td>
											</tr>

											<tr>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Total Scholarship Amount</td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>

												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"></td>
												<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">16,62,500</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
							<h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
								<Info className="w-5 h-5 text-blue-600" />
								Eligibility For Application
							</h3>
							<p className="text-gray-700">
								The following eligibility criteria are prescribed by the University for enrollment into the Bachelor’s and Master’s level programs at LBEF. Accordingly, the same criteria shall apply to candidates seeking consideration under the respective scholarship schemes.
							</p>
						</motion.div>
						<motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
							<h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
								<Info className="w-5 h-5 text-blue-600" />
								Eligibility Criteria for B.Sc. IT Program
							</h3>

							<ul className="space-y-4">
								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-green-600 mt-1" />
									<p className="text-gray-700">
										Successful completion of 10+2 or equivalent qualification in any discipline
									</p>
								</li>

								<li className="flex items-start gap-3">
									<AlertCircle className="w-5 h-5 text-amber-600 mt-1" />
									<p className="text-gray-700">
										A minimum of 50% marks in Mathematics at SEE (Grade X) level
									</p>
								</li>
							</ul>
						</motion.div>

						<motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
							<h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
								<Info className="w-5 h-5 text-blue-600" />
								Eligibility Criteria for M.Sc. ITM Program
							</h3>

							<ul className="space-y-4">
								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-green-600 mt-1" />
									<p className="text-gray-700">
										A Bachelor’s degree or equivalent in IT, Computer Science, or a related field
									</p>
								</li>

								<li className="flex items-start gap-3">
									<AlertCircle className="w-5 h-5 text-amber-600 mt-1" />
									<p className="text-gray-700">
										A minimum CGPA of 2.75 (or equivalent)
									</p>
								</li>
							</ul>
						</motion.div>

						<motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
							<h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
								<Info className="w-5 h-5 text-blue-600" />
								Eligibility Criteria for MBA Program
							</h3>

							<ul className="space-y-4">
								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-green-600 mt-1" />
									<p className="text-gray-700">
										A Bachelor’s degree or equivalent in any discipline
									</p>
								</li>

								<li className="flex items-start gap-3">
									<AlertCircle className="w-5 h-5 text-amber-600 mt-1" />
									<p className="text-gray-700">
										A minimum CGPA of 2.75 (or equivalent)
									</p>
								</li>
							</ul>
						</motion.div>

						<motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
							<h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
								<Info className="w-5 h-5 text-blue-600" />
								Note:
							</h3>
							<p className="text-gray-700">
								For the Bachelor’s level program, students who have appeared in all final examinations of Grade 12 and are
								awaiting results are also eligible to apply. Similarly, for the Master’s level programs, students who have appeared
								in all final examinations of their Bachelor’s degree and are awaiting results may apply. <br />
								Applicants selected for the scholarship under this category will be granted provisional admission to the respective
								program. Confirmation of admission shall be subject to fulfillment of all prescribed eligibility criteria, as outlined
								above, upon publication of the examination results and submission of all required documents prior to the University
								registration deadline. Failure to meet these requirements within the stipulated timeline shall result in cancellation of
								the provisional admission.
							</p>
						</motion.div>

						{/* SELECTION */}
						<motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
							<h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
								<Info className="w-5 h-5 text-blue-600" />
								Selection Process
							</h3>
							<p className="text-gray-700">
								A Selection Committee constituted by the Nepal Police Wives Association (NPWA) will oversee the evaluation and
								selection of candidates for the scholarship schemes. <br />
								NPWA will be responsible for the official announcement inviting applications from eligible candidates, as well as
								for the final selection and award of scholarships in accordance with the established criteria and procedures.
							</p>
						</motion.div>

						<motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-blue-50 border border-blue-100 rounded-xl p-6">
							<h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
								<Info className="w-5 h-5 text-blue-600" />
								Duration And Rules
							</h3>

							<ul className="space-y-4">
								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-green-600 mt-1" />
									<p className="text-gray-700">
										The scholarship will be granted for the entire duration of the program. However, continuation beyond the first
										semester shall be subject to fulfillment of the following academic requirements:
									</p>
								</li>

								<li className="flex items-start gap-3">
									<AlertCircle className="w-5 h-5 text-amber-600 mt-1" />
									<p className="text-gray-700">
										Eligibility Criteria 1: Clear promotion to the subsequent semester in the first attempt, with a pass in all papers of the preceding
										semester, including internal examinations and assessments.
									</p>
								</li>

								<li className="flex items-start gap-3">
									<Clock className="w-5 h-5 text-purple-600 mt-1" />
									<p className="text-gray-700">
										Eligibility Criteria 2: A minimum of 85% attendance in each course across all completed semesters.
									</p>
								</li>

								<li className="flex items-start gap-3">
									<Award className="w-5 h-5 text-indigo-600 mt-1" />
									<p className="text-gray-700">
										The scholarship will not be awarded to more than one member from the same family.
									</p>
								</li>

								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-green-600 mt-1" />
									<p className="text-gray-700">
										Any instance of undisciplined or unprofessional conduct from the student can also lead to the cancellation of scholarship.
									</p>
								</li>

								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-green-600 mt-1" />
									<p className="text-gray-700">
										Violation of any other prescribed terms and conditions may lead to withdrawal of the scholarship.
									</p>
								</li>

								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-green-600 mt-1" />
									<p className="text-gray-700">
										If a candidate is found to have secured the scholarship through false statements or forged documents, the
										scholarship will be cancelled immediately, and the awarded amount shall be recovered.
									</p>
								</li>

								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-green-600 mt-1" />
									<p className="text-gray-700">
										In the event that a student withdraws from the program before completion, no financial reimbursement or
										adjustment of the scholarship amount to another student shall be permitted.
									</p>
								</li>
							</ul>
						</motion.div>

					</div>

					{/* DOCUMENTS */}
					<motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="mt-8 max-w-6xl mx-auto">
						<div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
							<h2 className="text-md sm:text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
								<Info className="w-5 h-5 text-blue-600" />
								Documents to be uploaded at the time of submission
							</h2>

							<ul className="space-y-3">
								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-green-600 mt-1" />
									<p className="text-gray-700">Passport Size color Photographs </p>
								</li>

								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-green-600 mt-1" />
									<p className="text-gray-700">
										Recommendation letter from the local authority
									</p>
								</li>

								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-green-600 mt-1" />
									<p className="text-gray-700">Certified Copy of Birth Certificate </p>
								</li>

								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-green-600 mt-1" />
									<p className="text-gray-700">
										Certified copies of Grade X, XI & XII Marks Card (for applicants to the Bachelor's Program
									</p>
								</li>

								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-green-600 mt-1" />
									<p className="text-gray-700">
										Certified copies of Bachelor's degree mark sheet (for applicants to the Master's Program
									</p>
								</li>

								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-green-600 mt-1" />
									<p className="text-gray-700">
										Scaned copy of Admit card of Grade-XII of Bachelor's final year examination
										<i> (for students awaiting results)</i>
									</p>
								</li>
							</ul>
						</div>
					</motion.div>


				</motion.div>
				<motion.div
					variants={fadeUp}
					initial="hidden"
					whileInView="visible"
					className="mt-3 max-w-6xl mx-auto"
				>
					<h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center md:justify-start mb-4">
						<span>National ICT Scholarship</span>

						<span className="ml-2 relative inline-block">
							<span className="text-blue-600 relative z-10">
								{isLoading
									? "Schedule"
									: schedule?.scheduleYear
										? `${schedule.scheduleYear} Schedule`
										: "Schedule"}
								<img
									src={decoration}
									alt="Decoration"
									className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-2"
								/>
							</span>
						</span>
					</h3>

					<motion.div
						variants={fadeUp}
						initial="hidden"
						whileInView="visible"
						className="overflow-hidden border border-gray-200 rounded-xl bg-white"
					>
						{isLoading ? (
							<div className="p-6 text-center text-gray-600">
								Loading scholarship schedule...
							</div>
						) : !schedule ? (
							<div className="p-6 text-center text-gray-600">
								Schedule not published yet
							</div>
						) : (
							<table className="w-full border-collapse">
								<tbody>
									<tr className="bg-gray-200">
										<td className="px-5 py-4 text-gray-800 font-medium">
											Registration Opens
										</td>
										<td className="px-5 py-4 text-gray-800">
											{schedule.regisrationOpenDate}
										</td>
									</tr>

									<tr className="bg-gray-50">
										<td className="px-5 py-4 text-gray-800 font-medium">
											Last date of form submission
										</td>
										<td className="px-5 py-4 text-gray-800">
											{schedule.lastDate}
										</td>
									</tr>

									<tr>
										<td className="px-5 py-4 text-gray-800 font-medium">
											Scholarship exam
										</td>
										<td className="px-5 py-4 text-gray-800">
											{schedule.examDate}
										</td>
									</tr>
									<tr>
										<td className="px-5 py-4 text-gray-800 font-medium">
											Exam Result to NPWA
										</td>
										<td className="px-5 py-4 text-gray-800">
											{schedule.examDate}
										</td>
									</tr>
									<tr>
										<td className="px-5 py-4 text-gray-800 font-medium">
											Interview of Candidates by NPWA
										</td>
										<td className="px-5 py-4 text-gray-800">
											{schedule.examDate}
										</td>
									</tr>

									<tr className="bg-gray-50">
										<td className="px-5 py-4 text-gray-800 font-medium">
											Interview of Candidates by NPWA
										</td>
										<td className="px-5 py-4 text-gray-800">
											{schedule.canDate}
										</td>
									</tr>
									<tr className="bg-gray-50">
										<td className="px-5 py-4 text-gray-800 font-medium">
											Final result by NPWA to LBEF College for Admission
										</td>
										<td className="px-5 py-4 text-gray-800">
											{schedule.canDate}
										</td>
									</tr>

									<tr>
										<td className="px-5 py-4 text-gray-800 font-medium">
											Last Date of Admission
										</td>
										<td className="px-5 py-4 text-gray-800">
											{schedule.admissionDate}
										</td>
									</tr>
								</tbody>
							</table>
						)}
					</motion.div>
				</motion.div>


				<motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="w-full bg-gray-50 mt-10 overflow-hidden">
					<div className="w-full text-center">
						<img
							src={subfooterone}
							alt="Illustration part one"
							className="w-full max-w-full h-auto object-cover "
						/>
					</div>
				</motion.div>

			</div>
		</>
	);
};

export default ICTScholarship;