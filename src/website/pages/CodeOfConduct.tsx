import { FaExclamationTriangle } from "react-icons/fa";
import decoration from "../../assets/decoration.webp";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../comp/animation";
import Seo from "../../context/seo";
import { APP_URL } from "../../constants";

const CodeOfConduct = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Student Code of Conduct | LBEF College Nepal"
        description="Learn about the student code of conduct at LBEF College Nepal, including guidelines, misconduct definitions, violations, and disciplinary procedures to ensure a respectful and productive learning environment."
        url={`${APP_URL}/student-code-of-conduct`}
      />
      <motion.div
        className="container mx-auto px-2 sm:px-6 lg:px-8 py-6 md:py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="max-w-6xl mx-auto">

          {/* HERO */}
          <motion.div
            className="container mx-auto px-2 sm:px-6 lg:px-8 py-6 text-center"
            variants={fadeUp}
          >
            <div className="max-w-8xl mx-auto">
              {/* <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100"
              >
                <motion.span
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut" as const
                  }}
                />
                <span className="text-blue-600 font-medium text-sm">
                  Student Code of Conduct
                </span>
              </motion.div> */}



              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                <span className="text-gray-900">Student </span>
                <span className="relative inline-block ml-2">
                  <span className="text-blue-600 relative z-10"> Code </span>
                  <motion.img
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    src={decoration}
                    alt="Decoration"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-2 sm:bottom-0 w-full h-3"
                  />
                </span>
                <span> of Conduct</span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }} className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Guidelines and expectations for student behavior to maintain a respectful and productive learning environment.
              </motion.p>
            </div>
          </motion.div>

          {/* CONTENT CARD */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-3 md:p-8"
            variants={staggerContainer}
          >

            {/* POLICY OVERVIEW */}
            <motion.div className="mb-8" variants={fadeUp}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Policy Overview
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  This Policy covers all students of the College. Students are independent adults with legal and social responsibilities and are accountable for their actions and behaviour.
                </p>
                <p>
                  Students are expected to conduct themselves in accordance with these principles. They should show proper concern in their behaviour for the reputation of the University /College and the student body.
                </p>
              </div>
            </motion.div>

            {/* MISCONDUCT */}
            <motion.div
              className="mb-8 p-4 bg-red-50 border border-red-100 rounded-lg"
              variants={fadeUp}
            >
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="text-red-600" />
                <h3 className="text-lg font-semibold text-red-800">
                  Definition of Misconduct
                </h3>
              </div>
              <p className="text-gray-800 mt-2 text-sm">
                Misconduct is behaviour which interferes with the proper functioning of the University/College and its activities, or which has the potential to damage the reputation of the University/College or the student body.
              </p>
            </motion.div>

            {/* VIOLATIONS */}
            <motion.div className="mb-8" variants={fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                  15
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Acts That Violate Conduct Rules
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
                The following are examples of what might constitute misconduct:
              </p>

              <motion.ol
                className="space-y-4"
                variants={staggerContainer}
              >
                {[
                  "Disruption of, or improper interference with the academic, administrative, sporting, social or other activities of the University/College;",
                  "Obstruction of, or improper interference with the activities, functions or duties of any student, staff member or visitor to the University/College;",
                  "Violent, disorderly, threatening, indecent or offensive behaviour or language whilst on College premises or elsewhere;",
                  "Falsification or misuse of University/College records, including degree, diploma or other certificates, and of University/College equipment, systems and processes;",
                  "False pretences or deception relating to academic assessments and examinations;",
                  "Fraud, deceit or dishonesty in relation to the University/College or its staff or in connection with registering as a student, being a student;",
                  "Actions which might cause injury or put at risk the health or safety of people on College premises or whilst on University/College activities;",
                  "Harassment or bullying in any form including via social media of any student, member of staff, or visitor to the University /College;",
                  "Breach of the provisions of the University /College's policy on Freedom of Speech or Freedom of Expression;",
                  "Theft, damage to or defacement of University/College property;",
                  "Attending classes or entering any other learning environment whilst under the influence of alcohol or drugs;",
                  "Misuse or unauthorized use of College premises or items of property;",
                  "Conduct which constitutes a criminal offence;",
                  "Failure to comply with a previously imposed penalty;",
                  "Bringing the University/College into disrepute;"
                ].map((text, index) => (
                  <motion.li
                    key={index}
                    className="flex gap-4"
                    variants={fadeUp}
                  >
                    <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{text}</span>
                  </motion.li>
                ))}
              </motion.ol>
            </motion.div>

            {/* DISCIPLINE */}
            <motion.div
              className="mt-10 pt-8 border-t border-gray-200"
              variants={fadeUp}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Disciplinary Procedures
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  Students will normally be subject to LBEF's disciplinary procedures in the first instance.
                </p>
                <p>
                  Where the alleged misconduct could affect the reputation of the University or its student body, the University will liaise with LBEF as necessary to initiate the disciplinary procedures.
                </p>
                <p className="font-medium text-gray-900 mt-4">
                  All students are responsible for familiarizing themselves with this Code of Conduct. Violations may result in disciplinary action.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CodeOfConduct;
