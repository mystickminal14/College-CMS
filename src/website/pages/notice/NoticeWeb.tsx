import CustomBreadcrumb from "../../comp/bread-crump";
import bgImage from '../../../assets/OurTeam.jpg';
import decoration from '../../../assets/decoration.png';
import { FileText, Calendar, Eye, Bell } from 'lucide-react';
import lbefLogo from '../../../assets/pcpsLogo.png';
import useGetNoticesAll from "../../../pages/notices/hooks/useGetnotices";
import { IMAGE_URL } from "../../../constants";

const NoticeWeb = () => {
  const { data, isLoading } = useGetNoticesAll();
  const notices = data?.data || [];

  // Format date to readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) {
      return {
        day: '--',
        month: '---',
        year: '----',
        full: 'N/A',
      };
    }

    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear(),
      full: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
  };

  const handleViewFile = (fileUrl?: string) => {
    if (fileUrl) {
      window.open(fileUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[...Array(4)].map((_, index) => (
        <div 
          key={index} 
          className="bg-white p-4 rounded-xl border border-gray-200 animate-pulse"
        >
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="pt-1">
                <div className="h-8 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <CustomBreadcrumb
        bgImage={bgImage}
        title="Notices"
        objectPosition="50%_40%"
        breadcrumbs={[
          { label: "Home" },
          { label: "Notices" },
        ]}
      />
      
      <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-8 md:py-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-blue-600 font-medium text-sm">
              Latest Updates & Announcements
            </span>
          </div>
                   <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Notice </span>
            <span className="relative inline-block">
              <span className="text-blue-600 relative z-10"> Board</span>
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-3"
              />
            </span>{" "}
          </h1>
          <p className="text-sm md:text-base lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Stay informed with the latest announcements, exam schedules, and important updates from LBEF Campus
          </p>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-6 lg:px-8 pb-12">
        {!isLoading && notices.length > 0 && (
          <div className="mt-6 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-linear-to-r from-blue-50 to-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-blue-200">
              <div className="bg-white p-2 rounded-lg border">
                <img 
                  src={lbefLogo} 
                  alt="LBEF Logo" 
                  className="h-8 sm:h-10 w-auto"
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-bold text-gray-800 text-sm sm:text-base">
                  {notices.length} Official Notices
                </p>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">
                  Issued by LBEF Campus administration
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Notices List */}
        <div className="max-w-6xl mt-6 mx-auto">
          {isLoading ? (
            <SkeletonLoader />
          ) : notices.length === 0 ? (
            <div className="text-center py-8 sm:py-12 bg-white rounded-xl shadow border border-gray-100">
              <div className="bg-blue-50 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">
                No Notices Available
              </h3>
              <p className="text-gray-500 max-w-md mx-auto text-xs sm:text-sm px-4">
                There are no notices at the moment. Please check back later for updates.
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {notices.map((notice, index) => {
                const dateInfo = formatDate(notice.date);
                return (
                  <div 
                    key={notice.id || index} 
                    className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Blue Banner with Date - Mobile: Top, Desktop: Left */}
                      <div className="w-full sm:w-1/4 sm:min-w-[120px] bg-linear-to-br from-blue-500 to-blue-600 text-white p-3 sm:p-4">
                        <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center sm:h-full">
                          {/* Date in mobile - horizontal layout */}
                          <div className="flex items-center gap-3 sm:gap-0 sm:flex-col">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
                              {dateInfo.day || '--'}
                            </div>
                            <div className="text-xs sm:text-sm uppercase tracking-wider">
                              {dateInfo.month || 'MON'}
                            </div>
                          </div>
                          <div className="text-base sm:text-lg font-semibold sm:mt-1">
                            {dateInfo.year || '----'}
                          </div>
                        </div>
                      </div>

                      {/* Notice Content */}
                      <div className="flex-1 p-3 sm:p-4">
                        <div className="flex flex-col h-full">
                          {/* Top row: Type badge and file indicator */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${notice.type === 'ACADEMIC' 
                              ? 'bg-linear-to-r from-green-100 to-green-50 text-green-800 border border-green-200' 
                              : 'bg-linear-to-r from-purple-100 to-purple-50 text-purple-800 border border-purple-200'}`}>
                              {notice.type === 'ACADEMIC' ? 'ACADEMIC' : 'ADMINISTRATIVE'}
                            </span>
                            {notice.file && (
                              <div className="flex items-center gap-1 text-blue-600 text-xs sm:text-sm">
                                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Document</span>
                              </div>
                            )}
                          </div>

                          {/* Notice Title */}
                          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                            {notice.title || 'Untitled Notice'}
                          </h3>

                          {/* Program Name */}
                          {notice.program_name && (
                            <div className="mb-2">
                              <div className="inline-flex items-center gap-2 bg-gray-50 px-2 sm:px-3 py-1 rounded border border-gray-200">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-700 text-xs sm:text-sm font-medium">
                                  {notice.program_name}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Bottom row: Date and Action */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-2 gap-2 sm:gap-0">
                            <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm order-2 sm:order-1">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="line-clamp-1">{dateInfo.full}</span>
                            </div>
                            
                            <div className="flex items-center justify-between w-full sm:w-auto order-1 sm:order-2 gap-2">
                              {notice.file ? (
                                <button
                                  onClick={() => handleViewFile(IMAGE_URL + notice.file)}
                                  className="inline-flex items-center gap-1 sm:gap-2 cursor-pointer bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow hover:shadow-md"
                                >
                                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span>View</span>
                                </button>
                              ) : (
                                <div className="text-gray-500 text-xs sm:text-sm italic">
                                  No document
                                </div>
                              )}
                              
                              {/* Small LBEF logo - hide on mobile, show on sm and above */}
                              <div className="hidden sm:block ml-3">
                                <img 
                                  src={lbefLogo} 
                                  alt="LBEF Logo" 
                                  className="h-6 sm:h-8 w-auto opacity-80"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeWeb;