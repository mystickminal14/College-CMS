import { FaExclamationTriangle } from "react-icons/fa";
import decoration from "../../assets/decoration.png";

const CodeOfConduct = () => {
  return (
    <div className="min-h-screen bg-gray-50">


      <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="max-w-6xl mx-auto">

          <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-6  text-center">
            <div className="max-w-8xl mx-auto">
              <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span className="text-blue-600 font-medium text-sm">                Student Code of Conduct
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                <span className="text-gray-900">Student  </span>
                <span className="relative inline-block ml-2">
                  <span className="text-blue-600 relative z-10"> Code </span>
                  <img
                    src={decoration}
                    alt="Decoration"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-2 sm:bottom-0 w-full h-3"
                  />
                </span><span>  of Conduct</span>
              </h1>

              <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Guidelines and expectations for student behavior to maintain a respectful and productive learning environment.

              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-3 md:p-8">

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Policy Overview</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  This Policy covers all students of the College. Students are independent adults with legal and social responsibilities and are accountable for their actions and behaviour.
                </p>
                <p>
                  Students are expected to conduct themselves in accordance with these principles. They should show proper concern in their behaviour for the reputation of the University /College and the student body.
                </p>
              </div>
            </div>

            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-lg">
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="text-red-600" />
                <h3 className="text-lg font-semibold text-red-800">Definition of Misconduct</h3>
              </div>
              <p className="text-gray-800 mt-2 text-sm">
                Misconduct is behaviour which interferes with the proper functioning of the University/College and its activities, or which has the potential to damage the reputation of the University/College or the student body.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                  15
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Acts That Violate Conduct Rules</h2>
              </div>
              <p className="text-gray-600 mb-6">The following are examples of what might constitute misconduct:</p>

              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center justify-center font-medium">
                    1
                  </span>
                  <span className="text-gray-700">Disruption of, or improper interference with the academic, administrative, sporting, social or other activities of the University/College;</span>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center justify-center font-medium">
                    2
                  </span>
                  <span className="text-gray-700">Obstruction of, or improper interference with the activities, functions or duties of any student, staff member or visitor to the University/College;</span>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center justify-center font-medium">
                    3
                  </span>
                  <span className="text-gray-700">Violent, disorderly, threatening, indecent or offensive behaviour or language whilst on College premises or elsewhere;</span>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center justify-center font-medium">
                    4
                  </span>
                  <span className="text-gray-700">Falsification or misuse of University/College records, including degree, diploma or other certificates, and of University/College equipment, systems and processes;</span>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center justify-center font-medium">
                    5
                  </span>
                  <span className="text-gray-700">False pretences or deception relating to academic assessments and examinations;</span>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center justify-center font-medium">
                    6
                  </span>
                  <span className="text-gray-700">Fraud, deceit or dishonesty in relation to the University/College or its staff or in connection with registering as a student, being a student;</span>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center justify-center font-medium">
                    7
                  </span>
                  <span className="text-gray-700">Actions which might cause injury or put at risk the health or safety of people on College premises or whilst on University/College activities;</span>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center justify-center font-medium">
                    8
                  </span>
                  <span className="text-gray-700">Harassment or bullying in any form including via social media of any student, member of staff, or visitor to the University /College on grounds of their perceived race, nationality, gender, disability, religion, belief, age, other personal characteristics or for any other reason;</span>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center justify-center font-medium">
                    9
                  </span>
                  <span className="text-gray-700">Breach of the provisions of the University /College's policy on Freedom of Speech or Freedom of Expression or other similar policy;</span>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center justify-center font-medium">
                    10
                  </span>
                  <span className="text-gray-700">Theft, damage to or defacement of University/College property, or the property of other members of the University/College, whether caused intentionally or recklessly;</span>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center justify-center font-medium">
                    11
                  </span>
                  <span className="text-gray-700">Attending classes or entering any other learning environment whilst under the influence of alcohol or drugs;</span>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center justify-center font-medium">
                    12
                  </span>
                  <span className="text-gray-700">Misuse or unauthorized use of College premises or items of property, including computer misuse, or breaches of the University code on acceptable network use;</span>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center justify-center font-medium">
                    13
                  </span>
                  <span className="text-gray-700">Conduct which constitutes a criminal offence, including possession of offensive weapons, possession of implements that are intended for use as weapons and possession of illegal substances on College premises;</span>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center justify-center font-medium">
                    14
                  </span>
                  <span className="text-gray-700">Failure to comply with a previously imposed penalty under the disciplinary procedures;</span>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center justify-center font-medium">
                    15
                  </span>
                  <span className="text-gray-700">Bringing the University/College into disrepute;</span>
                </li>
              </ol>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Disciplinary Procedures</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  Students of the University studying at partner colleges will normally be subject to the disciplinary procedures of the partner college in the first instance.
                </p>
                <p>
                  Where the alleged misconduct has the potential to damage the reputation of the University or the University's student body, the University will liaise with the partner college as necessary to determine the appropriate procedures to be followed.
                </p>
                <p className="font-medium text-gray-900 mt-4">
                  All students are responsible for familiarizing themselves with this Code of Conduct. Violations may result in disciplinary action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeOfConduct;