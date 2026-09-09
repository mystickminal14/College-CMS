import { useState, useEffect, useRef } from "react";
import { Briefcase, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Seo from "../../../context/seo";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";
import { APP_URL, IMAGE_URL } from "../../../constants";
import { fadeUp } from "../../comp/animation";
import useGetVacancies from "../../../pages/job-vacancy/vacancy/hooks/useGetAll";
import type { JobVacancy } from "../../../pages/job-vacancy/vacancy/model/VacancyModel";
import VacancyApplyModal from "./VacancyApplyModal";

const PAGE_LIMIT = 9;

const VacancyWeb = () => {
  const [page, setPage] = useState(1);
  const [vacancies, setVacancies] = useState<JobVacancy[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [selected, setSelected] = useState<JobVacancy | null>(null);
  const [details, setDetails] = useState<JobVacancy | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isFetching } = useGetVacancies({
    page,
    limit: PAGE_LIMIT,
    status: "OPEN",
  });

  useEffect(() => {
    if (!data?.data) return;
    const incoming = data.data;
    if (page === 1) {
      setVacancies(incoming);
    } else {
      setVacancies((prev) => {
        const seen = new Set(prev.map((v) => v.id));
        return [...prev, ...incoming.filter((v) => !seen.has(v.id))];
      });
    }
    setHasMore(Boolean(data.pagination?.hasNextPage));
  }, [data, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isFetching && !isLoading)
          setPage((p) => p + 1);
      },
      { threshold: 0.1 }
    );
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, isFetching, isLoading]);

  const formatDeadline = (dateStr?: string | null) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse shadow-sm">
      <div className="h-48 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <div className="h-5 w-12 bg-gray-200 rounded-full" />
          <div className="h-5 w-20 bg-gray-200 rounded-full" />
        </div>
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-4/5" />
        <div className="h-px bg-gray-100 my-2" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-3.5 bg-gray-100 rounded w-16" />
            <div className="h-3.5 bg-gray-200 rounded w-28" />
          </div>
          <div className="flex justify-between">
            <div className="h-3.5 bg-gray-100 rounded w-14" />
            <div className="h-3.5 bg-gray-200 rounded w-20" />
          </div>
        </div>
        <div className="h-10 bg-gray-200 rounded-xl w-full mt-2" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Job Vacancies | LBEF College Nepal"
        description="Explore current job openings at LBEF College. Apply now and join our team of dedicated educators and professionals."
        url={`${APP_URL}/vacancy`}
      />

      <HeroTitleWithGif
        title="Join Our Team at LBEF"
        highlightedText={["Team", "LBEF"]}
        subtitle="We are looking for passionate educators and professionals to join our growing team."
        badgeText="Career Opportunities"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {isLoading && page === 1 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : vacancies.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-blue-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Open Vacancies</h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto">
              There are no open positions right now. Check back later for new opportunities.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vacancies.map((vacancy) => {
                const deadline = formatDeadline(vacancy.applicationEndDate);
                return (
                  <motion.div
                    key={vacancy.id}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden"
                  >
                    {/* Poster */}
                    {vacancy.posterUrl ? (
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={`${IMAGE_URL}${vacancy.posterUrl}`}
                          alt={vacancy.designation}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                          <span className="text-[11px] font-bold bg-emerald-500 text-white px-2.5 py-0.5 rounded-full shadow">
                            Open
                          </span>
                          {vacancy.employmentType && (
                            <span className="text-[11px] font-semibold bg-white/90 text-gray-800 px-2.5 py-0.5 rounded-full shadow">
                              {vacancy.employmentType}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* Gradient banner when no poster */
                      <div className="h-20 bg-linear-to-r from-blue-600 to-indigo-600 flex items-end px-5 pb-3">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-[11px] font-bold bg-emerald-400 text-white px-2.5 py-0.5 rounded-full">
                            Open
                          </span>
                          {vacancy.employmentType && (
                            <span className="text-[11px] font-semibold bg-white/20 text-white border border-white/30 px-2.5 py-0.5 rounded-full">
                              {vacancy.employmentType}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="p-5 flex flex-col flex-1">
                      {/* Experience pill (no poster path already shows in banner) */}
                      {!vacancy.posterUrl && vacancy.experienceRequired && (
                        <span className="self-start text-[11px] font-semibold bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-0.5 rounded-full mb-3">
                          {vacancy.experienceRequired}
                        </span>
                      )}
                      {vacancy.posterUrl && vacancy.experienceRequired && (
                        <span className="self-start text-[11px] font-semibold bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-0.5 rounded-full mb-3">
                          {vacancy.experienceRequired}
                        </span>
                      )}

                      {/* Title */}
                      <h3 className="text-base font-bold text-gray-900 leading-snug mb-3 line-clamp-2 break-words">
                        {vacancy.designation}
                      </h3>

                      {/* Description */}
                      {vacancy.description && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 break-words">
                            {vacancy.description}
                          </p>
                          {vacancy.description.length > 120 && (
                            <button
                              onClick={() => setDetails(vacancy)}
                              className="text-blue-600 hover:text-blue-700 hover:underline text-xs font-semibold mt-1"
                            >
                              Read more
                            </button>
                          )}
                        </div>
                      )}

                      {/* Details */}
                      <div className="flex-1 border-t border-gray-100 pt-3 space-y-2 text-sm mb-5">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-gray-400 text-xs font-medium shrink-0">Location</span>
                          <span className="text-gray-700 font-medium text-right max-w-[58%] text-xs break-words line-clamp-2">
                            {vacancy.location}
                          </span>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-gray-400 text-xs font-medium shrink-0">Timings</span>
                          <span className="text-gray-700 font-medium text-right max-w-[58%] text-xs break-words line-clamp-2">
                            {vacancy.timings}
                          </span>
                        </div>
                        {vacancy.salary && (
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-gray-400 text-xs font-medium shrink-0">Salary</span>
                            <span className="text-gray-700 font-medium text-right max-w-[58%] text-xs break-words line-clamp-2">
                              {vacancy.salary}
                            </span>
                          </div>
                        )}
                        {deadline && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-xs font-medium">Deadline</span>
                            <span className="text-red-500 font-semibold text-xs">{deadline}</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setSelected(vacancy)}
                        className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-150"
                      >
                        View &amp; Apply
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div ref={loaderRef} className="mt-10 flex justify-center min-h-10">
              {isFetching && (
                <div className="w-7 h-7 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              )}
              {!hasMore && vacancies.length > 0 && (
                <p className="text-gray-400 text-sm">All {vacancies.length} vacancies loaded</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Description / details popup */}
      <AnimatePresence>
        {details && (
          <motion.div
            key="details-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setDetails(null)}
            />
            <motion.div
              key="details-modal"
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full sm:max-w-xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90dvh] sm:max-h-[85vh]"
            >
              {/* Header */}
              <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-0.5">
                    Job Details
                  </p>
                  <h2 className="text-xl font-bold text-gray-900 leading-snug break-words">
                    {details.designation}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {details.location} · {details.timings}
                  </p>
                </div>
                <button
                  onClick={() => setDetails(null)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition shrink-0 ml-4"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="overflow-y-auto flex-1 px-6 py-5">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {details.employmentType && (
                    <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full">
                      {details.employmentType}
                    </span>
                  )}
                  {details.experienceRequired && (
                    <span className="text-[11px] font-semibold bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-0.5 rounded-full">
                      {details.experienceRequired}
                    </span>
                  )}
                  {details.salary && (
                    <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      {details.salary}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line break-words">
                  {details.description}
                </p>

                {formatDeadline(details.applicationEndDate) && (
                  <p className="text-xs text-gray-400 mt-5">
                    Application deadline:{" "}
                    <span className="text-red-500 font-semibold">
                      {formatDeadline(details.applicationEndDate)}
                    </span>
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/80 rounded-b-2xl shrink-0 flex items-center gap-3">
                <button
                  onClick={() => setDetails(null)}
                  className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelected(details);
                    setDetails(null);
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {selected && (
        <VacancyApplyModal vacancy={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default VacancyWeb;
