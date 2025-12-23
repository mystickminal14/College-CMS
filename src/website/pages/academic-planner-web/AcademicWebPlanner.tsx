import { motion } from 'framer-motion';

import image from '../../../assets/pcpsLogo.png';
import decoration from '../../../assets/decoration.png';
import useGetPlannerParents from '../../../pages/academic-planner/hooks/useGetPlannerParents';
import { IMAGE_URL } from '../../../constants';
import { fadeUp, staggerContainer } from '../../comp/animation';

const SkeletonCard = () => (
  <div className="group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
    <div className="h-28 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-10 bg-gray-200 rounded-lg mt-4" />
    </div>
    <div className="h-1 bg-gray-200" />
  </div>
);

const AcademicWebPlanner = () => {
  const { data, isLoading } = useGetPlannerParents();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= HERO (ANIMATED) ================= */}
      <div className="container mx-auto sm:px-6 lg:px-8 py-4 md:py-20 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-blue-600 font-medium text-sm">
              Academic Programs & Curriculum
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Academic </span>
            <span className="relative inline-block">
              <span className="text-blue-600 relative z-10">Planner</span>
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom-0 w-full h-2 md:h-3"
              />
            </span>
          </h1>

          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Plan your academic journey with our comprehensive curriculum structure.
            Explore different sessions and their corresponding academic plans.
          </p>
        </motion.div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-4 sm:px-16 lg:px-16 pb-12 md:pb-20">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : data?.data && data.data.length > 0 ? (
          data.data.map((parent) => {
            const words = parent.session?.split(' ') || [];
            const lastWord = words.at(-1) || '';
            const otherWords = words.slice(0, -1).join(' ');

            return (
              <div key={parent.id} className="mb-16">
                {/* -------- Session Heading (Animated) -------- */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mb-10 text-center md:text-left"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {otherWords}{' '}
                    <span className="relative inline-block">
                      <span className="text-blue-600 relative z-10">
                        {lastWord}
                      </span>
                      <img
                        src={decoration}
                        alt="Decoration"
                        className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-2"
                      />
                    </span>
                  </h3>

                  <p className="text-gray-600 mt-2 max-w-3xl mx-auto md:mx-0">
                    Academic plans and curriculum for{' '}
                    {parent.session?.toLowerCase()}
                  </p>
                </motion.div>

                {/* -------- Cards (Animated) -------- */}
                {parent.children && parent.children.length > 0 ? (
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {parent.children.map((child) => (
                      <motion.div
                        key={child.id}
                        variants={fadeUp}
                        className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 cursor-pointer transform hover:-translate-y-1"
                      >
                        <div className="h-28 overflow-hidden relative">
                          <img
                            src={image}
                            alt={child.course}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="p-5">
                          <h3 className="text-md font-bold text-gray-800 mb-3 line-clamp-2">
                            {child.course} - {child.semester} - {child.intake}
                          </h3>

                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-blue-50 rounded-lg p-3">
                              <p className="text-xs font-semibold text-blue-700">
                                SEMESTER
                              </p>
                              <p className="text-sm font-medium text-gray-800">
                                {child.semester}
                              </p>
                            </div>

                            <div className="bg-green-50 rounded-lg p-3">
                              <p className="text-xs font-semibold text-green-700">
                                INTAKE CODE
                              </p>
                              <p className="text-sm font-medium text-gray-800">
                                {child.intake}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              window.open(IMAGE_URL + child.file, '_blank')
                            }
                            className="w-full py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm"
                          >
                            View Academic Plan
                          </button>
                        </div>

                        <div className="h-1 bg-linear-to-r from-blue-400 to-blue-600" />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <p className="text-gray-500 italic">
                    No academic plans available for this session.
                  </p>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700">
              No Academic Plans available right now
            </h3>
            <p className="text-gray-500 mt-2">Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicWebPlanner;
