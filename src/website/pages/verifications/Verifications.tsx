import { FaEnvelope, FaShieldAlt, FaUserTie } from "react-icons/fa";

import Seo from "../../../context/seo";
import { APP_URL } from "../../../constants";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";

const verificationContacts = [
  {
    id: 1,
    type: "Student Verification",
    icon: <FaShieldAlt className="h-5 w-5 text-blue-600" />,
    iconBg: "from-blue-100 to-blue-200",
    email: "verification@lbef.edu.np",
  },
  {
    id: 2,
    type: "Employee Verification",
    icon: <FaUserTie className="h-5 w-5 text-purple-600" />,
    iconBg: "from-purple-100 to-purple-200",
    email: "hrdept@lbef.edu.np",
  },
];

const VerificationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Verification Contacts | LBEF College Nepal"
        description="Contact LBEF College for student and employee verification. Find official email addresses for verification requests."
        url={`${APP_URL}/verification`}
      />

      <HeroTitleWithGif
        title="Verification"
        highlightedText="Verification"
        subtitle="Use the correct email address below for student enrollment verification or employee HR inquiries."
        badgeText="Verification"
      />

      <div className="container mx-auto flex flex-col px-4 md:px-20 pb-20">

        {/* Section Header */}
        <div className="flex items-center justify-start mb-8">
          <div>
            <h2 className="text-3xl font-bold relative text-gray-900">
              Verification{" "}
            
            </h2>
            <p className="text-gray-600 mt-2">
              Send your verification requests to the appropriate email
            </p>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mx-auto w-full mb-12">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-linear-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Email Address
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {verificationContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-gray-50 transition-colors duration-150 even:bg-gray-50/50"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="shrink-0">
                          <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${contact.iconBg} flex items-center justify-center`}>
                            {contact.icon}
                          </div>
                        </div>
                        <div className="text-md font-semibold text-gray-900">
                          {contact.type}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm flex items-center gap-2">
                        <FaEnvelope className="h-3 w-3 text-gray-400 shrink-0" />
                        {contact.email.replace("@", "(@)")}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden space-y-4 mb-12">
          {verificationContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${contact.iconBg} flex items-center justify-center`}>
                  {contact.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{contact.type}</h3>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Email Address</p>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg w-full wrap-break-word text-sm flex items-center gap-2">
                  <FaEnvelope className="h-3 w-3 text-gray-400 shrink-0" />
                  {contact.email.replace("@", "(@)")}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default VerificationPage;