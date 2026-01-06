// JournalHomeContent.tsx
import { motion } from 'framer-motion';
import { fadeUp } from '../../comp/animation';
import { useNavigate } from 'react-router-dom';
import decoration from "../../../assets/decoration.png";
import useGetJournalsGroupedByYear from '../../../pages/journal/hooks/details/useGetJournalGroupedByYear';

const SkeletonCard = () => (
  <div
    className="
      w-full
      sm:w-1/2
      md:w-1/3
      lg:w-1/4
      min-w-[280px]
      p-8
      bg-white
      border border-neutral-300
      animate-pulse
    "
  >
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
    <div className="h-10 bg-gray-300 rounded w-full"></div>
  </div>
);

const JournalHomeContent = () => {
  const { data, isLoading } = useGetJournalsGroupedByYear();
  const journalsGrouped = data?.data ?? {}; // this is { "2019": [...], "2022": [...] }
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div>
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>

        <div className="flex flex-wrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  const yearKeys = Object.keys(journalsGrouped).sort((a, b) => Number(b) - Number(a));

  if (yearKeys.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-semibold text-gray-700">No journal issue</h3>
        <p className="text-sm text-gray-500 mt-2">
          Journal issues will appear here once published.
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-0">
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          <span> Latest Journal </span>
          <span className="relative inline-block">
            <span className="text-blue-600 relative z-10"> Issues</span>
            <img
              src={decoration}
              alt="Decoration"
              className="absolute left-1/2 -translate-x-1/2 -bottom-1  w-full h-2"
            />
          </span>
        </h2>
        <p className="text-gray-600">
          Browse through our collection of research publications
        </p>
      </motion.div>

      {yearKeys.map((year) => {
        const issues = journalsGrouped[year];
        return (
          <motion.div
            key={year}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            {/* Group Header */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
              <span>{year} </span>
              <span className="relative inline-block">
                <span className="text-blue-600 relative z-10"> Issues</span>
                <img
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 -bottom-1  w-full h-2"
                />
              </span>
            </h3>

            {/* Cards */}
            {issues.length > 0 ? (
              <div className="flex flex-wrap">
                {issues.map((issue, idx) => (
                  <motion.div
                    key={issue.id ?? idx}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="
                      w-full
                      sm:w-1/2
                      md:w-1/3
                      lg:w-1/4
                      min-w-[280px]
                      p-8
                      bg-white
                      flex flex-col
                      border border-neutral-700
                      cursor-pointer
                      group
                      transition-all
                      duration-300
                      hover:-translate-y-1
                    "
                  >
                    <div className="grow">
                      <h4
                        className="
                          text-xl
                          font-bold
                          text-gray-800
                          mb-3
                          transition-transform
                          duration-300
                          group-hover:-translate-y-1
                        "
                      >
                        {issue.volume} {issue.issue && `- ${issue.issue}`}
                      </h4>

                      <div
                        className="
                          inline-flex
                          items-center
                          px-3
                          py-1
                          rounded
                          bg-neutral-800
                          mb-4
                          transition-transform
                          duration-300
                          group-hover:-translate-y-1
                        "
                      >
                        <span className="text-sm font-medium text-neutral-300">
                          {issue.month || 'ISSUE'}
                        </span>
                      </div>

                      <div
                        className="
                          mt-6
                          transition-transform
                          duration-300
                          group-hover:-translate-y-1
                        "
                      >
                        <button
                          onClick={() => navigate(`/media/journal/${issue.id}`)}
                          className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition"
                        >
                          View Issue <span className="ml-2">→</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="border border-neutral-700 p-8 text-gray-500 text-center">
                No volumes available
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default JournalHomeContent;
