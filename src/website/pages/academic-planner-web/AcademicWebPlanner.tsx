import { motion, type Variants } from 'framer-motion';
import decoration from '../../../assets/decoration.webp';
import { APP_URL, IMAGE_URL } from '../../../constants';
import { fadeUp, staggerContainer } from '../../comp/animation';
import useGetAcademicPlanners from '../../../pages/academic-planner/hooks/useGetAll';
import type { AcademicPlanner } from '../../../pages/academic-planner/model/PlannerModel';
import Seo from '../../../context/seo';

/* ------------------ FRAMER VARIANTS ------------------ */

const cardContainer: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
};

/* ------------------ SKELETON ------------------ */

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
    <div className="h-28 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-10 bg-gray-200 rounded-lg mt-4" />
    </div>
    <div className="h-1 bg-gray-200" />
  </div>
);

/* ------------------ SORT HELPERS ------------------ */

// Semester order
const semesterOrder = ['I', 'II', 'III', 'IV', 'V', 'VI'];

const getSemesterIndex = (semester: string) => {
  const match = semester.match(/I|II|III|IV|V|VI/);
  return match ? semesterOrder.indexOf(match[0]) : 999;
};

// Session priority (same year)
const sessionPriority: Record<string, number> = {
  January: 1,
  October: 2,
  December: 3,
};

const getSessionPriority = (session: string) => {
  const month = session.split(' ')[0];
  return sessionPriority[month] ?? 999;
};

/* ------------------ MAIN COMPONENT ------------------ */

const AcademicWebPlanner = () => {
  const { data, isLoading } = useGetAcademicPlanners();

  /* ---------- GROUP BY YEAR + SESSION ---------- */
  const groupedData = (data?.data ?? []).reduce(
    (acc: Record<string, AcademicPlanner[]>, planner) => {
      const year = planner.academicYear.year;
      const session = planner.academicYear.session;
      const key = `${year}__${session}`;

      if (!acc[key]) acc[key] = [];
      acc[key].push(planner);
      return acc;
    },
    {}
  );

  /* ---------- SORT YEAR + SESSION ---------- */
  const sortedGroups = Object.entries(groupedData).sort(([a], [b]) => {
    const [yearA, sessionA] = a.split('__');
    const [yearB, sessionB] = b.split('__');

    if (yearA !== yearB) return Number(yearB) - Number(yearA);
    return getSessionPriority(sessionA) - getSessionPriority(sessionB);
  });

  return (
    <>
      <Seo
        title="Academic Calender at LBEF | Course Structure & Semester Plans"
        description="View the academic Calender at LBEF College Nepal. Explore course-wise semester plans, intakes, and academic sessions designed for structured learning."
        url={`${APP_URL}/academic-planner`}

      />

      <div className="min-h-screen bg-gray-50">
        {/* HEADER */}
        <div className="container mx-auto sm:px-6 lg:px-8 py-4 md:py-20 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
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
                Academic Programs & Curriculum

              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              <span className="text-gray-900">Academic </span>
              <span className="relative inline-block">
                <span className="text-blue-600 relative z-10">Calender</span>
                <motion.img
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom-0 w-full h-2 md:h-3"
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }} className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay on top of your academic jourrney with our detailed calender. Plan your classes, exams, and important deadlines so that you never miss a key date in your seesion.
            </motion.p>
          </motion.div>
        </div>

        {/* CONTENT */}
        <div className="container mx-auto px-4 sm:px-16 pb-20">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}
          {!isLoading && sortedGroups.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-gray-700">
                No Academic Calender Available
              </h3>
              <p className="text-gray-500 mt-2">
                Please check back later.
              </p>
            </div>
          )}

          {!isLoading &&
            sortedGroups.map(([key, planners]) => {
              const [year, session] = key.split('__');

              /* ---------- SORT BY COURSE → SEMESTER ---------- */
              const sortedPlanners = planners.sort((a, b) => {
                if (a.plannerCourse.name !== b.plannerCourse.name) {
                  return a.plannerCourse.name.localeCompare(
                    b.plannerCourse.name
                  );
                }
                return (
                  getSemesterIndex(a.semester) -
                  getSemesterIndex(b.semester)
                );
              });

              return (
                <div key={key} className="mb-16">
                  {/* YEAR HEADING (DESIGN UNCHANGED) */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-8 md:mb-10 px-4 text-center md:text-left"
                  >
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-2">
                      <span>{year}</span>

                      <span className="text-blue-600 inline-flex flex-wrap items-center">
                        {(() => {
                          const words = session.split(' ');
                          const lastWord = words.pop();
                          return (
                            <>
                              <span className="mr-1">
                                {words.join(' ')}
                              </span>
                              <span className="relative inline-block">
                                {lastWord}
                                <img
                                  src={decoration}
                                  alt=""
                                  className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-2"
                                />
                              </span>
                            </>
                          );
                        })()}
                      </span>
                    </h3>
                  </motion.div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {sortedPlanners.map((planner) => (
                      <motion.div key={planner.id} variants={cardContainer} whileHover={{ y: -8 }} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:border-blue-200">
                        <div className="p-5">
                          <motion.h4 variants={cardItem} className="text-md font-bold text-gray-800 mb-3 line-clamp-2">
                            {planner.plannerCourse.name} – {planner.semester} – {planner.intake}
                          </motion.h4>
                          <motion.div variants={cardItem} className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-blue-50 rounded-lg p-3">
                              <p className="text-xs font-semibold text-blue-700">Semester</p>
                              <p className="text-sm font-medium text-gray-800">{planner.semester}</p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-3">
                              <p className="text-xs font-semibold text-green-700">INTAKE</p>
                              <p className="text-sm font-medium text-gray-800">{planner.intake}</p>
                            </div>
                          </motion.div>
                          <motion.button variants={cardItem} onClick={() => window.open(IMAGE_URL + planner.file, '_blank')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full py-2.5 bg-blue-500 text-white rounded-lg font-medium text-sm">
                            View Academic Plan
                          </motion.button>
                        </div>
                        <motion.div variants={cardItem} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="h-1 bg-linear-to-r from-blue-400 to-blue-600" />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
        </div>
      </div></>
  );
};

export default AcademicWebPlanner;