// JournalPageWeb.tsx
import { motion } from 'framer-motion';
import decoration from "../../../assets/decoration.webp";
import { useState } from 'react';
import { fadeUp } from '../../comp/animation';
import JournalHomeContent from './JournalHome';
import JournalEditorialBoard from './JournalEditorialBoard';
import JournalIssueDetails from './JournalIssueDetails';
import { useParams } from 'react-router-dom';
import JournalAbstract from '../../../pages/journal/JournalAbstract';
import ContactListPage from '../contact-list/ContactListingPage';
import Seo from '../../../context/seo';
import { APP_URL } from '../../../constants';

type TabType = 'home' | 'editorial' | 'contact';

const JournalPageWeb = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const { id } = useParams<{ id?: string }>();

  const renderContent = () => {
    const isAbstract = window.location.pathname.includes("/abstract");

    if (isAbstract) {
      return <JournalAbstract />;
    }

    switch (activeTab) {
      case "home":
        return id ? <JournalIssueDetails /> : <JournalHomeContent />;
      case "editorial":
        return <JournalEditorialBoard />;
      case "contact":
        return <ContactListPage />;
      default:
        return id ? <JournalIssueDetails /> : <JournalHomeContent />;
    }
  };


  const tabs: { key: TabType; label: string }[] = [
    { key: 'home', label: 'Home' },
    { key: 'editorial', label: 'Editorial Board' },
    { key: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <Seo
        title="LBEF Research Journal | Science, Technology & Management"
        description="Explore the LBEF Research Journal featuring peer-reviewed issues in science, technology, and management. Browse volumes, editorial board, and published research."
        url={`${APP_URL}/lrjstm`}

      />

      <div className="min-h-screen bg-gray-50">
        {/* ================= HERO ================= */}
        <div className="container mx-auto sm:px-6 lg:px-8 py-4 md:py-10 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-8xl mx-auto"
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
                Journal
              </span>
            </motion.div> */}

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-snug">
              <span>LBEF Research </span>
              <span className="relative inline-block text-blue-600">
                Journal
                <motion.img
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-2"
                />
              </span>
              <span> of</span>
              <br />
              <span className="relative inline-block text-blue-600">
                Science,
                <img
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-2"
                />
              </span>
              Technology And Management
            </h1>
          </motion.div>
        </div>

        {/* ================= E-ISSN ================= */}
        <div className="container mx-auto px-4 sm:px-6 mb-6">
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-gray-700">
              E-ISSN: <span className="text-gray-900">2705-4748</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-gray-700">
              E-ISSN: <span className="text-gray-900">2705-4683</span>
            </div>
          </div>
        <div className="mt-4 flex justify-center ">
  <p className="max-w-xl mx-auto text-center text-base md:text-lg mt-4 text-gray-600 leading-relaxed">
    Our quarterly research publication featuring articles by Master's level
    students, drawing on their final year dissertations.
  </p>
</div>
        </div>


        {/* ================= MOBILE TABS (Hidden on desktop) ================= */}
        <div className="lg:hidden mb-6">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex justify-center">
              <div className="inline-flex bg-white rounded-lg shadow border border-gray-200 overflow-hidden w-full max-w-md">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`
                    px-4 py-2
                    sm:px-6 sm:py-2.5
                    text-xs sm:text-sm
                    font-medium
                    transition
                    flex-1 text-center
                    ${activeTab === tab.key
                        ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-50'
                      }
                  `}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= MAIN LAYOUT ================= */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 max-w-8xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT SIDEBAR - STICKY TABS (Hidden on mobile, shown on desktop) */}
            <div className="hidden lg:block lg:w-56">
              <div className="sticky top-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
                  <h3 className="text-base font-semibold text-gray-800 mb-3 px-1">
                    Navigation
                  </h3>
                  <div className="space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`
                        w-full text-left px-3 py-2.5
                        text-sm font-medium
                        rounded-md
                        transition-all duration-150
                        flex items-center
                        ${activeTab === tab.key
                            ? 'bg-blue-50 text-blue-600 border-l-3 border-blue-500'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }
                      `}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mr-2.5 ${activeTab === tab.key ? 'bg-blue-500' : 'bg-gray-300'
                          }`} />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Back to Issues link if viewing issue details */}
                  {id && activeTab === 'home' && (
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle navigation back to issues list
                          window.history.back();
                        }}
                        className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Issues
                      </a>
                    </div>
                  )}

                  {/* E-ISSN Info */}
                  <div className="mt-5 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-700 text-xs mb-2">JOURNAL INFO</h4>
                    <div className="space-y-1.5 text-xs">
                      <div>
                        <span className="text-gray-500">E-ISSN:</span>
                        <span className="font-medium ml-1">2705-4748</span>
                      </div>
                      <div>
                        <span className="text-gray-500">E-ISSN:</span>
                        <span className="font-medium ml-1">2705-4683</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT AREA */}
            <div className="flex-1">
              {/* Current page indicator (Hidden on mobile) */}
              <div className="hidden lg:block mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-gray-400">Journal</span>
                  <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-medium text-gray-800">
                    {activeTab === 'home' && id ? 'Issue Details' :
                      activeTab === 'home' ? 'Home' :
                        activeTab === 'editorial' ? 'Editorial Board' : 'Contact'}
                  </span>
                </div>
              </div>

              {/* Main Content */}
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JournalPageWeb;