import { FaEnvelope, FaUser } from "react-icons/fa";

import decoration from "../../../assets/decoration.webp";
import useGetContactsAll from "../../../pages/contact/hooks/useGetAll";
import { motion } from 'framer-motion';
import { fadeUp } from "../../comp/animation";
import Seo from "../../../context/seo";
import { APP_URL } from "../../../constants";

const ContactListPage = () => {
  const { data, isLoading } = useGetContactsAll();
  const contacts = data?.data ?? [];

  const regularContacts = contacts.filter(
    (contact) =>
      !contact.department?.includes("COO") &&
      !contact.department?.includes("Executive Director")
  );

  const cooContact = contacts.find((contact) =>
    contact.department?.includes("COO")
  );

  const executiveContact = contacts.find((contact) =>
    contact.department?.includes("Executive Director")
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Staff Contact Directory | LBEF College Nepal"
        description="Find official contact details of LBEF College staff for academics, IT support, exams, registration, accounts, and student services."
        url={`${APP_URL}/contact-info`}
      />

      <div className="container mx-auto sm:px-6 lg:px-8 py-4 md:py-20 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >

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
              Contact Directory
            </span>
          </motion.div> */}

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Staff </span>
            <span className="relative inline-block ml-2">
              <span className="text-blue-600 relative z-10">
                Contact List
              </span>
              <motion.img
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom-0 w-full h-2 md:h-3"
              />
            </span>{" "}

          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find the right contact for academic matters, IT support, exams,
            registration, accounts, and other student services.
          </motion.p>
        </motion.div>
      </div>

      <div className="container mx-auto flex flex-col px-4 md:px-20 pb-20">

        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && contacts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700">
              No contacts available
            </h3>
            <p className="text-gray-500 mt-2">
              Please check back later. Contact information will be added soon.
            </p>
          </div>
        )}

        {!isLoading && regularContacts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-start mb-8">
              <div>
                <h2 className="text-3xl font-bold relative text-gray-900">
                  Contact{" "}
                  <span className="text-blue-600 relative z-10">
                    Directory
                    <img
                      src={decoration}
                      alt="Decoration"
                      className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-2"
                    />
                  </span>
                </h2>
                <p className="text-gray-600 mt-2">
                  Complete list with all email addresses
                </p>
              </div>
            </div>

            <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mx-auto">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-linear-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Purpose
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Email Addresses
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {regularContacts.map((contact, index) => (
                      <tr
                        key={contact.id || index}
                        className="hover:bg-gray-50 transition-colors duration-150 even:bg-gray-50/50"
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="shrink-0">
                              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                <FaUser className="h-5 w-5 text-blue-600" />
                              </div>
                            </div>
                            <div>
                              <div className="text-md font-semibold text-gray-900">
                                {contact.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="max-w-xs">
                            <div className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm wrap-break-word">
                              {contact.department || "Staff"}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="max-w-xs">
                            <div className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm wrap-break-word">
                              {contact.purpose || "General Inquiry"}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="max-w-xs">
                            <div className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm wrap-break-word">
                              {contact.email?.replace("@", "(@)") || "No email"}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden space-y-4">
              {regularContacts.map((contact, index) => (
                <div
                  key={contact.id || index}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
                >
                  {/* Contact Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <FaUser className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {contact.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {contact.department}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Purpose */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Purpose</p>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg w-full wrap-break-word">
                      {contact.purpose || "General Inquiry"}
                    </p>
                  </div>

                  {/* Email Addresses */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email Addresses</p>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg w-full wrap-break-word">
                      {contact.email || "No email"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Note Section for COO and Executive Director */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 md:p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-yellow-600">Important Note:</span>
          </h3>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-yellow-100">
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Escalation Process:</span> If
                the given officials do not reply to your email within three
                (03) working days, you can escalate to:
              </p>

              {cooContact && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3 p-3 bg-blue-50 rounded-md">
                  <div className="shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaUser className="h-5 w-5 text-blue-700" />
                  </div>
                  <div className="sm:ml-3 w-full">
                    <div className="font-semibold text-gray-900">
                      {cooContact.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {cooContact.department || "COO"}
                    </div>
                    <a
                      href={`mailto:${cooContact.email}`}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 wrap-break-word w-full"
                    >
                      <FaEnvelope className="h-3 w-3" />
                      {cooContact.email?.replace("@", "(@)") || "No email"}
                    </a>
                  </div>
                </div>
              )}

              <p className="text-gray-700 mt-4 mb-2">
                If there is no response from the COO within five (05) working
                days, you can further escalate to:
              </p>

              {executiveContact && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-purple-50 rounded-md">
                  <div className="shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaUser className="h-5 w-5 text-purple-700" />
                  </div>
                  <div className="sm:ml-3 w-full">
                    <div className="font-semibold text-gray-900">
                      {executiveContact.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {executiveContact.department || "Executive Director"}
                    </div>
                    <a
                      href={`mailto:${executiveContact.email}`}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 wrap-break-word w-full"
                    >
                      <FaEnvelope className="h-3 w-3" />
                      {executiveContact.email?.replace("@", "(@)") || "No email"}
                    </a>
                  </div>
                </div>
              )}

              {(!cooContact || !executiveContact) && (
                <div className="text-gray-600 text-sm italic">
                  Note: COO and Executive Director contact information will be
                  displayed here when available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactListPage;
