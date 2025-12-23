import { useState, useEffect } from "react";
import decoration from '../../../assets/decoration.png';
import { FileText, Calendar, Eye, Bell, Filter, ChevronDown } from 'lucide-react';
import lbefLogo from '../../../assets/pcpsLogo.png';
import { IMAGE_URL } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from '../../comp/animation';
import type {  ENotice, Notices } from '../../../pages/notices/model/NoticeModel';
import useGetNotices from "../../../pages/notices/hooks/useGetAll";
const PAGE_LIMIT = 10;

const NoticeWeb = () => {
  const [page, setPage] = useState(1);
  const [department, setDepartment] = useState<ENotice | "">("");
  const [notices, setNotices] = useState<Notices[]>([]);
  const [hasMore, setHasMore] = useState(true);
 
  const { data, isLoading, isFetching: isQueryFetching } = useGetNotices({
    department:department,
    page,
    limit: PAGE_LIMIT,
  });
  // Department options
  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'ADMINISTRATIVE', label: 'Administrative' },
    { value: 'ACADEMIC', label: 'Academic' },
  ];
  // Merge paginated data
  useEffect(() => {
    if (!data?.data) return;
    const newNotices = data.data ?? [];
   
    if (page === 1) {
      setNotices(newNotices);
    } else {
      setNotices(prev => {
        // Prevent duplicates by checking IDs
        const existingIds = new Set(prev.map(notice => notice.id));
        const uniqueNewNotices = newNotices.filter(notice =>
          notice.id && !existingIds.has(notice.id)
        );
        return [...prev, ...uniqueNewNotices];
      });
    }
    setHasMore(Boolean(data.pagination?.hasNextPage));
  }, [data, page]);
  // Handle department filter change
  const handleDepartmentChange = (value: ENotice) => {
    setDepartment(value);
    setPage(1);
    setNotices([]);
    setHasMore(true);
  };
  // Load more button handler
  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      setPage(prev => prev + 1);
    }
  };
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
  const SkeletonLoader = () => (
    <motion.div
      className="space-y-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {[...Array(4)].map((_, index) => (
        <motion.div
          key={index}
          className="bg-white p-4 rounded-xl border border-gray-200 animate-pulse"
          variants={fadeUp}
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
        </motion.div>
      ))}
    </motion.div>
  );
  const LoadMoreButton = () => (
    <motion.div
      className="text-center py-6"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      {isQueryFetching ? (
        <div className="inline-flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-sm">
            Loading more notices...
          </p>
        </div>
      ) : hasMore ? (
        <button
          onClick={handleLoadMore}
          className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <span>Load More Notices</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      ) : (
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-full border border-gray-200">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <p className="text-gray-600 text-sm font-medium">
            {department
              ? `All ${departmentOptions.find(opt => opt.value === department)?.label} notices loaded`
              : "All notices loaded"
            } ({notices.length} total)
          </p>
        </div>
      )}
    </motion.div>
  );
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* HERO */}
      <motion.div
        className="container mx-auto px-2 sm:px-6 lg:px-8 py-8 md:py-10 text-center"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
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
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom:0 w-full h-2 md:h-3"
              />
            </span>
          </h1>
          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest announcements, exam schedules, and important updates from LBEF Campus
          </p>
        </div>
      </motion.div>
      {/* CONTENT */}
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 pb-12">
       
        {/* Department Filter */}
        <motion.div
          className="max-w-6xl mx-auto mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Filter by Department</h3>
              </div>
             
              <div className="flex flex-wrap gap-2">
                {departmentOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleDepartmentChange(option.value as ENotice)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      department === option.value
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
           
            {department && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Showing notices from:
                  <span className="font-semibold text-blue-600 ml-1">
                    {departmentOptions.find(opt => opt.value === department)?.label}
                  </span>
                </p>
              </div>
            )}
          </div>
        </motion.div>
        {!isLoading && notices.length > 0 && (
          <div
            className="mt-6 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-linear-to-r from-blue-50 to-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-blue-200">
              <div className="bg-white p-2 rounded-lg border">
                <img src={lbefLogo} alt="LBEF Logo" className="h-8 sm:h-10 w-auto" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-bold text-gray-800 text-sm sm:text-base">
                  Showing {notices.length} of {data?.pagination?.total || 0} Notices
                  {department && ` (${departmentOptions.find(opt => opt.value === department)?.label})`}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">
                  {hasMore ? `Click "Load More" to see additional notices` : "All notices loaded"}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="max-w-6xl mt-6 mx-auto">
          {isLoading && page === 1 ? (
            <SkeletonLoader />
          ) : notices.length === 0 && !isLoading ? (
            <div
              className="text-center py-8 sm:py-12 bg-white rounded-xl shadow border border-gray-100"
            >
              <div className="bg-blue-50 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">
                No Notices Available
                {department && ` for ${departmentOptions.find(opt => opt.value === department)?.label}`}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto text-xs sm:text-sm px-4">
                {department
                  ? "There are no notices for this department at the moment. Try selecting a different department."
                  : "There are no notices at the moment. Please check back later for updates."
                }
              </p>
            </div>
          ) : (
            <>
              <div
                className="space-y-3 sm:space-y-4"
              >
                {notices.map((notice, index) => {
                  const dateInfo = formatDate(notice.date);
                  return (
                    <div
                      key={notice.id || index}
                      className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* DATE */}
                        <div className="w-full sm:w-1/4 sm:min-w-[120px] bg-linear-to-br from-blue-500 to-blue-600 text-white p-3 sm:p-4">
                          <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center sm:h-full">
                            <div className="flex items-center gap-3 sm:flex-col sm:gap-0">
                              <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
                                {dateInfo.day}
                              </div>
                              <div className="text-xs sm:text-sm uppercase tracking-wider">
                                {dateInfo.month}
                              </div>
                            </div>
                            <div className="text-base sm:text-lg font-semibold">
                              {dateInfo.year}
                            </div>
                          </div>
                        </div>
                        {/* CONTENT */}
                        <div className="flex-1 p-3 sm:p-4">
                          <div className="flex flex-col h-full">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  notice.type === 'ACADEMIC'
                                    ? 'bg-linear-to-r from-green-100 to-green-50 text-green-800 border border-green-200'
                                    : 'bg-linear-to-r from-purple-100 to-purple-50 text-purple-800 border border-purple-200'
                                }`}
                              >
                                {notice.type}
                              </span>
                              {notice.file && (
                                <div className="flex items-center gap-1 text-blue-600 text-xs sm:text-sm">
                                  <FileText className="w-4 h-4" />
                                  <span>Document</span>
                                </div>
                              )}
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                              {notice.title}
                            </h3>
                            {notice.program_name && (
                              <div className="mb-2">
                                <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1 rounded border border-gray-200">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <span className="text-gray-700 text-sm font-medium">
                                    {notice.program_name}
                                  </span>
                                </div>
                              </div>
                            )}
                            <div className="flex items-center justify-between mt-auto pt-2">
                              <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <Calendar className="w-4 h-4" />
                                <span>{dateInfo.full}</span>
                              </div>
                              {notice.file ? (
                                <button
                                  onClick={() => handleViewFile(IMAGE_URL + notice.file)}
                                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition shadow"
                                >
                                  <Eye className="w-4 h-4" />
                                  View
                                </button>
                              ) : (
                                <span className="text-sm text-gray-500 italic">
                                  No document
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Load More Button Section */}
              <LoadMoreButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default NoticeWeb;