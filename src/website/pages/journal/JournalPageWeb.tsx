// JournalPageWeb.tsx
import JournalHomeContent from './JournalHome';
import JournalEditorialBoard from './JournalEditorialBoard';
import JournalIssueDetails from './JournalIssueDetails';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import JournalAbstract from '../../../pages/journal/JournalAbstract';
import ContactListPage from '../contact-list/ContactListingPage';
import Seo from '../../../context/seo';
import { APP_URL } from '../../../constants';
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";

type TabType = 'home' | 'editorial' | 'contact';

const JournalPageWeb = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // The tab lives in the URL so it survives remounts when moving between the
  // journal routes (home / issue details / abstract) and stays shareable.
  const tabParam = searchParams.get('tab') as TabType | null;
  const activeTab: TabType =
    tabParam === 'editorial' || tabParam === 'contact' ? tabParam : 'home';

  const isAbstract = location.pathname.includes('/abstract');

  // Tabs always return to the journal root, otherwise clicking one from an
  // issue/abstract route would leave the sub-route content rendered.
  const handleTabChange = (tab: TabType) => {
    navigate(tab === 'home' ? '/lrjstm' : `/lrjstm?tab=${tab}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "editorial":
        return <JournalEditorialBoard />;
      case "contact":
        return <ContactListPage />;
      default:
        if (isAbstract) return <JournalAbstract />;
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
        <HeroTitleWithGif
          title="LBEF Research Journal  of Science, Technology And Management"
          highlightedText="Journal "
          subtitle="Our quarterly research publication featuring articles by Master's level students, drawing on their final year dissertations."
          badgeText="Journal"
        />

        {/* ================= E-ISSN ================= */}
        <div className="container mx-auto px-4 sm:px-6 mb-6">
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-gray-700">
              E-ISSN: <span className="text-gray-900">2705-4748</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-gray-700">
              P-ISSN: <span className="text-gray-900">2705-4683</span>
            </div>
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
                    onClick={() => handleTabChange(tab.key)}
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
                        onClick={() => handleTabChange(tab.key)}
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
                      <button
                        onClick={() =>
                          navigate(isAbstract ? `/lrjstm/volume/view/${id}` : '/lrjstm')
                        }
                        className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors w-full"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {isAbstract ? 'Back to Articles' : 'Back to Issues'}
                      </button>
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
                        <span className="text-gray-500">P-ISSN:</span>
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
                    {activeTab === 'home' && isAbstract ? 'Abstract' :
                      activeTab === 'home' && id ? 'Issue Details' :
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