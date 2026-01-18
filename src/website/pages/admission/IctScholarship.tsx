import decoration from '../../../assets/decoration.webp';
import { Info, CheckCircle, AlertCircle, Clock, Award } from "lucide-react";
import subfooterone from '../../../assets/six_path.webp';
import { motion } from 'framer-motion';
import { fadeUp } from '../../comp/animation';
import useGetScholarship from '../../../pages/scholarship/hooks/useGet';

const ICTScholarship = () => {
    const { data, isLoading, } = useGetScholarship();
    const schedule = data?.data;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 text-center">
                <div className="max-w-8xl mx-auto">
                    <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        <span className="text-blue-600 font-medium text-sm">
                            Scholarship
                        </span>
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
                        <span className="text-gray-900 mt-2">Awards {schedule?.scheduleYear??'2081'} </span>
                    </h1>

                    <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Unlock your academic potential with the National ICT Scholarship, rewarding excellence in high-school performance.
                    </p>
                </div>
            </div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="container mx-auto px-4 sm:px-6 pb-16">
                <div className="max-w-6xl mx-auto text-left">
                    <h3 className="text-2xl  font-bold text-gray-900 flex items-center justify-center md:justify-start mb-4">
                        <span>Fedration of </span>
                        <span className="ml-2 relative inline-block">
                            <span className="text-blue-600 relative z-10">Association of Nepal  </span>

                        </span>
                        <span className="ml-2 relative inline-block"><span className="text-blue-600 relative z-10"> (CAN Fedration)<img
                            src={decoration}
                            alt="Decoration"
                            className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-2"
                        /></span></span>

                    </h3>


                    <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                        Fedration of <b>Computer Association of Nepal (CAN Fedration)</b> was formed in May 1992 but was formally registered in December 1992 and later registered as Federation of Computer Association Nepal <b>(CAN Federation)</b> in January 2015 with the involvement of professionals, specialists, institutions and related organizations from the Information Communication Technology sector in Nepal. It is an umbrella organization with membership base ranging from ICT Institutions, Associations to Individuals working in this sector. CAN Federation works along with the lines of an autonomous, non-political, nonpartisan, nonprofitable and service oriented sector of ICT.
                    </p>

                    <div className="mt-3">
                        <h3 className="text-2xl  font-bold text-gray-900 flex items-center justify-center md:justify-start mb-4">
                            <span>Implementing Partner: </span>
                            <span className="ml-2 relative inline-block"><span className="text-blue-600 relative z-10"> LBEF College<img
                                src={decoration}
                                alt="Decoration"
                                className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-2"
                            /></span></span>

                        </h3>

                        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                            The Scholarships will be awarded to study <b>B.Sc.(Hons.) in Information Technology)</b> at LBEF College. Students who have completed 10+2 or equivalent from recognized board or Diploma in Computer Engineering from CTEVT will be benefited with this scheme. Students who have appeared for 10+2 or equivalent examination can also apply. Girl students will be most benefited by this scheme and the reason to do so is to <b>further the educational opportunities of young women of future generations.</b>
                        </p>
                    </div>

                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="mt-3" >
                        <h3 className="text-2xl  font-bold text-gray-900 flex items-center justify-center md:justify-start mb-4">

                            <span className="ml-2 relative inline-block"><span className="text-blue-600 relative z-10">Scope<img
                                src={decoration}
                                alt="Decoration"
                                className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-2"
                            /></span></span>

                        </h3>
                        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                            The objective of the scheme is to award scholarships to meritorious students belonging to economically weaker sections of the community so as to provide them better opportunities for higher education, increase their rate of attainment in higher education and enhance their employability.
                        </p>
                    </motion.div>

                    {/* SELECTION */}
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
                        <h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
                            <Info className="w-5 h-5 text-blue-600" />
                            Selection Process
                        </h3>
                        <p className="text-gray-700">
                            A committee has been formed by CAN Federations to select the right candidate. CAN Federation will be responsible for the announcement of Scholarships and select students for scholarships.
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
                                    Scholarship will be provided for the entire course. The continuation of Scholarship to the eligible student in the second and subsequent semesters will be as per the rules and regulations.
                                </p>
                            </li>

                            <li className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-600 mt-1" />
                                <p className="text-gray-700">
                                    Eligibility Criteria 1: Clear promotion to the next semester in first attempt.
                                </p>
                            </li>

                            <li className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-purple-600 mt-1" />
                                <p className="text-gray-700">
                                    Eligibility Criteria 2: Attendance should be above 85%.
                                </p>
                            </li>

                            <li className="flex items-start gap-3">
                                <Award className="w-5 h-5 text-indigo-600 mt-1" />
                                <p className="text-gray-700">
                                    Scholarships will not be given to more than one student in a family.
                                </p>
                            </li>

                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                                <p className="text-gray-700">
                                    Any undisciplined/unprofessional behavior may lead to cancellation.
                                </p>
                            </li>

                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                                <p className="text-gray-700">
                                    If a student violates any other term and condition of the scholarship, the scholarship may be suspended or cancelled.
                                </p>
                            </li>

                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                                <p className="text-gray-700">
                                    If a student is found to have obtained a scholarship by false statement/certificates, his/her scholarship will be cancelled forthwith and the amount of the scholarship provided shall be recovered.
                                </p>
                            </li>

                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                                <p className="text-gray-700">
                                    In case any student leaves the course in-between, no cash will be reimbursed or adjusted with any other student's fee.
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
                                <p className="text-gray-700">Photo</p>
                            </li>

                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                                <p className="text-gray-700">
                                    Recommendation letter from the local authority
                                </p>
                            </li>

                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                                <p className="text-gray-700">Birth Certificate</p>
                            </li>

                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                                <p className="text-gray-700">
                                    Scanned copy of Grade-XI & XII Marks Card
                                </p>
                            </li>

                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                                <p className="text-gray-700">
                                    Scanned copy of Grade-X Marks Card
                                </p>
                            </li>

                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                                <p className="text-gray-700">
                                    Scanned copy of Admit card of Grade-XII{" "}
                                    <i>(In case of appearing students)</i>
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

          <tr className="bg-gray-50">
            <td className="px-5 py-4 text-gray-800 font-medium">
              Final result by CAN Federation
            </td>
            <td className="px-5 py-4 text-gray-800">
              {schedule.canDate}
            </td>
          </tr>

          <tr>
            <td className="px-5 py-4 text-gray-800 font-medium">
              Last date of admission
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
    );
};

export default ICTScholarship;
