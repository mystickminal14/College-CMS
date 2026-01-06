import { motion } from "framer-motion";
import decoration from "../../../assets/decoration.webp";
import { fadeUp } from "../../comp/animation";
import lbef from '../../../assets/lbef_access.webp'
import springer from '../../../assets/e-library/springerlink.webp'
import access from '../../../assets/e-library/access.webp'
import acm from '../../../assets/e-library/acm.webp'
import cljlaw from '../../../assets/e-library/cljlaw.webp'
import ebsco from '../../../assets/e-library/ebsco.webp'
import emerald from '../../../assets/e-library/emerald.webp'
import ieee from '../../../assets/e-library/ieee.webp'
import monetary from '../../../assets/e-library/monetary.webp'
import proquest from '../../../assets/e-library/proquest.webp'
import sciencedirect from '../../../assets/e-library/sciencedirect.webp'
import unwto from '../../../assets/e-library/unwto.webp'
import evolveAppIcon from '../../../assets/butterfiles.webp'
import evolveWebIcon from '../../../assets/butterfiles.webp'
import evolveLibraryIcon from '../../../assets/butterfiles.webp'
import playStoreIcon from '../../../assets/playstore.webp'
import webIcon from '../../../assets/butterfiles.webp'

const StudentAccess = () => {
  const databases = [
    { name: "Access Engineering", logo: access, description: "Engineering resources and references" },
    { name: "ACM Digital Library", logo: acm, description: "Computer science publications" },
    { name: "UNWTO eLibrary", logo: unwto, description: "World Tourism Organization resources" },
    { name: "EBSCOhost", logo: ebsco, description: "Academic research databases" },
    { name: "ScienceDirect", logo: sciencedirect, description: "Scientific & medical research" },
    { name: "Emerald Insight", logo: emerald, description: "Business and management research" },
    { name: "SpringerLink", logo: springer, description: "Scientific publications" },
    { name: "ProQuest Central", logo: proquest, description: "Multidisciplinary research" },
    { name: "IEEE Xplore", logo: ieee, description: "Engineering & technology research" },
    { name: "CLJ Law", logo: cljlaw, description: "Legal resources and journals" },
    { name: "Monetary Authority", logo: monetary, description: "Financial regulations and research" },
  ];

  // Evolve Apps data - Updated with only Play Store
  const evolveApps = [
    {
      name: "Evolve Mobile App",
      type: "mobile",
      icon: evolveAppIcon,
      description: "Access course materials, submit assignments, and track progress on your mobile device.",
      stores: [
        { name: "Google Play Store", icon: playStoreIcon, url: "https://play.google.com/store/apps/details?id=com.lbef.edu.np.lbef" }
      ]
    },
    {
      name: "Evolve Web Portal",
      type: "web",
      icon: evolveWebIcon,
      description: "Full-featured web portal for accessing all academic resources and tools.",
      url: "https://evolve.lbef.info/",
      iconType: webIcon
    },
    {
      name: "Evolve Library",
      type: "library",
      icon: evolveLibraryIcon,
      description: "Digital library with e-books, journals, and research papers accessible through Evolve.",
      url: "https://elibrary.lbef.info"
    }
  ];

  const accessSteps = [
    {
      step: 1,
      title: "Visit APU Library",
      description: "Go to the APU library page and select E-Resources",
      url: "https://library.apu.edu.my/",
      action: "Select 'APU E-Databases'"
    },
    {
      step: 2,
      title: "Choose Off-Campus Access",
      description: "Select 'Off Campus Access' for the database you want to use",
      action: "Click on Off-Campus Access button"
    },
    {
      step: 3,
      title: "Login via APKey",
      description: "Use your APU credentials (same as Moodle) to access the resources",
      credentials: "Username & Password (Moodle login)"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-8xl mx-auto text-center"
        >
          <motion.div
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
              Student Access Portal
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Student Access & </span>
            <span className="relative inline-block">
              <span className="text-blue-600 relative z-10"> Digital</span>
              <motion.img
                src={decoration}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom-0 w-full h-3"

              />
            </span>
            <br />
            <span className="text-gray-900"> Learning</span>
            <span className="text-blue-600"> Resources</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >  Access comprehensive academic databases, digital libraries, and learning platforms
            to support your research and studies at LBEF through APU's partnership.
          </motion.p>
        </motion.div>
      </div>


      {/* Main Content - Evolve Learning moved to top */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">


        {/* Evolve Apps Section - Moved to top */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Evolve Learning {" "}
                <span className="relative inline-block">
                  <span className="text-blue-600 relative z-10"> Platform</span>
                  <motion.img
                    src={decoration}
                    alt="Decoration"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-2"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  />
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Access course materials, submit assignments, and connect with faculty through the Evolve platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {evolveApps.map((app, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  whileHover={{ y: -8 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.1
                  }}
                  className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-8"
                >
                  <motion.div
                    className="flex items-center mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-100 to-blue-50 flex items-center justify-center mr-4"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-10 h-10"
                      />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{app.name}</h3>
                      <motion.div
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mt-2"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", delay: index * 0.1 + 0.2 }}
                      >
                        {app.type === 'mobile' ? 'Mobile App' :
                          app.type === 'web' ? 'Web Portal' : 'Digital Library'}
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.p
                    className="text-gray-600 mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {app.description}
                  </motion.p>

                  {app.stores && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      <p className="text-sm font-medium text-gray-700 mb-3">Download from:</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        {app.stores.map((store, idx) => (
                          <motion.a
                            key={idx}
                            href={store.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg p-3 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.img
                              src={store.icon}
                              alt={store.name}
                              className="w-6 h-6 mr-2"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            />
                            <span className="text-sm font-medium">{store.name}</span>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {app.url && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <p className="text-sm font-medium text-gray-700 mb-3">Access from:</p>
                      <motion.a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full mt-4 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg py-3 text-center font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {app.type === 'web' ? 'Access Web Portal' : 'Visit Library Portal'}
                      </motion.a>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 120, damping: 12 }}
          className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-10 mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How to Access E-Libraries of APU
          </h3>

          {/* MAIN TWO COLUMN LAYOUT */}
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* LEFT SIDE IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <img
                src={lbef} // <-- replace with your image path
                alt="E-Library Access"
                className="w-full max-w-md rounded-xl shadow-lg"
              />
            </motion.div>

            <motion.div className="flex flex-col gap-6">
              {accessSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ x: 40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.1,
                  }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <motion.div className="flex items-center mb-4">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-4"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.step}
                    </motion.div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {step.title}
                    </h4>
                  </motion.div>

                  <p className="text-gray-600 mb-3">{step.description}</p>

                  {step.url && (
                    <motion.a
                      href={step.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      Visit Site →
                    </motion.a>
                  )}

                  {step.action && (
                    <div className="mt-3 px-3 py-2 bg-blue-50 rounded-lg text-blue-700 text-sm">
                      {step.action}
                    </div>
                  )}

                  {step.credentials && (
                    <div className="mt-3 text-sm text-gray-500">
                      <span className="font-medium">Login:</span> {step.credentials}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* BUTTON */}
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="https://library.apu.edu.my/apu-e-databases/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </motion.svg>
              Go to APU E-Databases Portal
            </motion.a>
          </motion.div>
        </motion.div>
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                E-Library {" "}
                <span className="relative inline-block">
                  <span className="text-blue-600 relative z-10"> Databases</span>
                  <motion.img
                    src={decoration}
                    alt="Decoration"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-2"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  />
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                LBEF students enrolled in APU's programmes have access to 11 online databases and libraries through the APU E-Databases portal.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12"
            >
              {databases.map((db, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 100,
                    damping: 12,
                    delay: index * 0.05
                  }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <motion.div
                    className="flex flex-col items-center text-center"
                  >
                    <motion.div
                      className="w-16 h-16 mb-4 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <img
                        src={db.logo}
                        alt={db.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                      {db.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {db.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>



            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl border border-blue-100 p-6"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Additional Access Information</h4>
              <p className="text-gray-600">
                LBEF students can access all 11 online databases which are accessible to APU Malaysia students.
                They can also use the APres (APU Institutional Repository) which contains research papers,
                FVPs and dissertations. For technical assistance, contact APU Library Support at
                <a href="mailto:support.lbef.info" className="text-blue-600 hover:text-blue-800 ml-1">
                  support.lbef.info
                </a>
              </p>
            </motion.div>
          </motion.div>
        </section>

        <section>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Additional Resources
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore more tools and platforms to enhance your learning experience.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Moodle Access */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring" as const,
                  stiffness: 100,
                  damping: 12
                }}
                className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm"
              >
                <motion.div
                  className="flex items-center mb-6"
                >
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900">Moodle LMS</h3>
                </motion.div>
                <p className="text-gray-600 mb-6">
                  Access course materials, participate in forums, submit assignments, and check grades through Moodle Learning Management System.
                </p>
                <motion.a
                  href="https://lms2.apiit.edu.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
                  whileHover={{ x: 10 }}
                >
                  Login to Moodle
                  <motion.svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </motion.a>
              </motion.div>

              {/* Student Email */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring" as const,
                  stiffness: 100,
                  damping: 12,
                  delay: 0.1
                }}
                className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm"
              >
                <motion.div
                  className="flex items-center mb-6"
                >
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mr-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900">Student Email</h3>
                </motion.div>
                <p className="text-gray-600 mb-6">
                  Access your institutional email for official communications, library notifications, and academic updates.
                </p>
                <motion.a
                  href="https://office.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
                  whileHover={{ x: 10 }}
                >
                  Access Student Email
                  <motion.svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </motion.a>
              </motion.div>
            </div>

            {/* Support Information */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring" as const, stiffness: 120, damping: 12 }}
              className="mt-12 bg-linear-to-r from-gray-50 to-white rounded-2xl p-8 border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">Technical Support</h4>
                  <p className="text-gray-600 mb-4">
                    For technical issues with Evolve, Moodle, or database access.
                  </p>
                  <motion.a
                    href="mailto:support.lbef.info"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    whileHover={{ x: 5 }}
                  >
                    support.lbef.info
                  </motion.a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">Library Assistance</h4>
                  <p className="text-gray-600 mb-4">
                    For research assistance and database access queries.
                  </p>
                  <motion.a
                    href="mailto:support.lbef.info"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    whileHover={{ x: 5 }}
                  >
                    support.lbef.info
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default StudentAccess;