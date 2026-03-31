import decoration from '../../../assets/decoration.webp';
import { FileText, Calendar, Eye, Bell, ExternalLink } from 'lucide-react';
import lbefLogo from '../../../assets/pcpslogo.webp';
import { APP_URL, IMAGE_URL } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from '../../comp/animation';
import Seo from "../../../context/seo";

const ALL_NOTICES = [
  {
    id: 1,
    title: "Examination Schedule – 5th Semester (June 2024)",
    type: "ACADEMIC",
    date: "2024-06-01",
    program_name: "BCA / BSc CSIT",
    file: "notice/examination-schedule-5th-semester-june-2024.pdf",
  },
  {
    id: 2,
    title: "Final Exam Schedule – June 2025",
    type: "ACADEMIC",
    date: "2025-06-01",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-jun-2025-lbef.pdf",
  },
  {
    id: 3,
    title: "Final Exam Schedule – August 2024 (Updated)",
    type: "ACADEMIC",
    date: "2024-08-15",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-aug-2024-lbef-updated.pdf",
  },
  {
    id: 4,
    title: "Final Exam Schedule – November 2024 (Updated)",
    type: "ACADEMIC",
    date: "2024-11-01",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-nov-2024-lbef-updated.pdf",
  },
  {
    id: 5,
    title: "Semester I Final Exam Schedule – June 2024",
    type: "ACADEMIC",
    date: "2024-06-10",
    program_name: "Semester I",
    file: "notice/sem-I-final-exam-schedule-june-2024.pdf",
  },
  {
    id: 6,
    title: "Final Exam Schedule – December 2024 (Updated)",
    type: "ACADEMIC",
    date: "2024-12-01",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-dec-2024-lbef-updated.pdf",
  },
  {
    id: 7,
    title: "Final Exam Schedule – August 2025",
    type: "ACADEMIC",
    date: "2025-08-01",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-aug-2025-lbef.pdf",
  },
  {
    id: 8,
    title: "Supplementary Exam Notice – December 2024",
    type: "ADMINISTRATIVE",
    date: "2024-12-10",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-dec-2024-lbef-updated.pdf",
  },
  {
    id: 9,
    title: "Fee Submission Reminder – December 2024",
    type: "ADMINISTRATIVE",
    date: "2024-12-05",
    program_name: null,
    file: "notice/final-exam-schedule-dec-2024-lbef-updated.pdf",
  },
  {
    id: 10,
    title: "Re-Exam Schedule – August 2025",
    type: "ACADEMIC",
    date: "2025-08-10",
    program_name: "BCA",
    file: "notice/final-exam-schedule-aug-2025-lbef.pdf",
  },
  {
    id: 11,
    title: "Final Exam Schedule – November 2025",
    type: "ACADEMIC",
    date: "2025-11-01",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-nov-2025-lbef.pdf",
  },
  {
    id: 12,
    title: "Final Exam Schedule – December 2025",
    type: "ACADEMIC",
    date: "2025-12-01",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-dec-2025-lbef.pdf",
  },
  {
    id: 13,
    title: "Final Exam Schedule – March 2025",
    type: "ACADEMIC",
    date: "2025-03-01",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-mar-2025-lbef.pdf",
  },
  {
    id: 14,
    title: "Final Exam Schedule – August 2025 (CPS)",
    type: "ACADEMIC",
    date: "2025-08-05",
    program_name: "CPS",
    file: "notice/final-exam-schedule-aug-2025-cps.pdf",
  },
  {
    id: 15,
    title: "Final Exam Schedule – May 2025",
    type: "ACADEMIC",
    date: "2025-05-01",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-may-2025-lbef.pdf",
  },
  {
    id: 16,
    title: "Final Exam Schedule – January 2026",
    type: "ACADEMIC",
    date: "2026-01-01",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-jan-2026-lbef.pdf",
  },
  {
    id: 17,
    title: "Final Exam Schedule – August 2024 (CPS)",
    type: "ACADEMIC",
    date: "2024-08-01",
    program_name: "CPS",
    file: "notice/final-exam-schedule-aug-2024-cps.pdf",
  },
  {
    id: 18,
    title: "Final Exam Schedule – January 2025",
    type: "ACADEMIC",
    date: "2025-01-01",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-jan-2025-lbef.pdf",
  },
  {
    id: 19,
    title: "Final Exam Schedule – May 2024",
    type: "ACADEMIC",
    date: "2024-05-01",
    program_name: "All Programs",
    file: "notice/may-2024-final-exam-schedule.pdf",
  },
  {
    id: 20,
    title: "Final Exam Schedule – December 2024",
    type: "ACADEMIC",
    date: "2024-12-01",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-dec-2024-lbef.pdf",
  },
  {
    id: 21,
    title: "Final Exam Schedule – November 2025 (Original)",
    type: "ADMINISTRATIVE",
    date: "2025-11-05",
    program_name: null,
    file: "notice/final-exam-schedule-nov-2025-lbef-original.pdf",
  },
  {
    id: 22,
    title: "Final Exam Schedule – November 2024 (Previous Version)",
    type: "ADMINISTRATIVE",
    date: "2024-11-10",
    program_name: null,
    file: "notice/final-exam-schedule-nov-2024-lbef-updated-old.pdf",
  },
  {
    id: 23,
    title: "Final Exam Schedule – September 2025",
    type: "ACADEMIC",
    date: "2025-09-01",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-sep-2025-lbef.pdf",
  },
  {
    id: 24,
    title: "Final Exam Schedule – April 2025",
    type: "ACADEMIC",
    date: "2025-04-01",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-apr-2025-lbef.pdf",
  },
  {
    id: 25,
    title: "Final Exam Schedule – August 2024",
    type: "ACADEMIC",
    date: "2024-08-01",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-aug-2024-lbef.pdf",
  },
  {
    id: 26,
    title: "Final Exam Schedule – November 2024",
    type: "ACADEMIC",
    date: "2024-11-01",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-nov-2024-lbef.pdf",
  },
  {
    id: 27,
    title: "Final Exam Schedule – March 2025 (CPS)",
    type: "ACADEMIC",
    date: "2025-03-05",
    program_name: "CPS",
    file: "notice/final-exam-schedule-mar-2025-cps.pdf",
  },
  {
    id: 28,
    title: "Final Exam Schedule – April 2026",
    type: "ACADEMIC",
    date: "2026-04-01",
    program_name: "All Programs",
    file: "notice/final-exam-schedule-apr-2026-lbef.pdf",
  },
];

const NoticeWeb = () => {
  const formatDate = (dateString?: string) => {
    if (!dateString) {
      return { day: "--", month: "---", year: "----", full: "N/A" };
    }
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      year: date.getFullYear(),
      full: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  };

  const handleViewFile = (fileUrl?: string) => {
    if (fileUrl) window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Seo
        title="Notice Board | LBEF College"
        description="Stay informed with the latest announcements, exam schedules, and important updates from LBEF College."
        url={`${APP_URL}/notices`}
      />

      {/* HERO */}
      <motion.div
        className="container mx-auto px-2 sm:px-6 lg:px-8 py-8 md:py-10 text-center"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100"
          >
            <motion.span
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" as const }}
            />
            <span className="text-blue-600 font-medium text-sm">
              Latest Updates & Announcements
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Notice </span>
            <span className="relative inline-block">
              <span className="text-blue-600 relative z-10"> Board</span>
              <motion.img
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom:0 w-full h-2 md:h-3"
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Stay informed with the latest announcements, exam schedules, and
            important updates from LBEF College
          </motion.p>
        </div>
      </motion.div>

      {/* CONTENT */}
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 pb-12">

        {/* Summary bar */}
        {ALL_NOTICES.length > 0 && (
          <div className="max-w-6xl mx-auto mb-6 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-linear-to-r from-blue-50 to-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-blue-200">
              <div className="bg-white p-2 rounded-lg border">
                <img src={lbefLogo} alt="LBEF Logo" className="h-8 sm:h-10 w-auto" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-bold text-gray-800 text-sm sm:text-base">
                  {ALL_NOTICES.length} Notices
                </p>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">
                  All notices are listed below
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="max-w-6xl mx-auto mb-6">
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 sm:px-5 sm:py-4">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 mt-0.5 shrink-0" />
            <p className="text-amber-800 text-xs sm:text-sm leading-relaxed">
              <span className="font-semibold">Disclaimer:</span> Students are encouraged to visit{" "}
              <a
                href="https://evolve.lbef.info"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-amber-700 underline underline-offset-2 hover:text-amber-900 transition-colors"
              >
                evolve.lbef.info
                <ExternalLink className="w-3 h-3" />
              </a>{" "}
              for the most up-to-date notices and official announcements.
            </p>
          </div>
        </div>
        {/* Notice List */}
        <div className="max-w-6xl mx-auto">
          {ALL_NOTICES.length === 0 ? (
            <div className="text-center py-8 sm:py-12 bg-white rounded-xl shadow border border-gray-100">
              <div className="bg-blue-50 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
            <motion.div
              className="space-y-3 sm:space-y-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {[...ALL_NOTICES]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((notice, index) => {
                  const dateInfo = formatDate(notice.date);
                  return (
                    <motion.div
                      key={notice.id || index}
                      variants={fadeUp}
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
                                className={`px-3 py-1 rounded-full text-xs font-bold ${notice.type === "ACADEMIC"
                                  ? "bg-linear-to-r from-green-100 to-green-50 text-green-800 border border-green-200"
                                  : "bg-linear-to-r from-purple-100 to-purple-50 text-purple-800 border border-purple-200"
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
                                  onClick={() => handleViewFile(`${IMAGE_URL}/public/${notice.file}`)}
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
                    </motion.div>
                  );
                })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeWeb;