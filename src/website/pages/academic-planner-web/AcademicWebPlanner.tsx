import { motion, type Variants } from 'framer-motion';

import image from '../../../assets/pcpslogo.webp';
import decoration from '../../../assets/decoration.webp';
import useGetPlannerParents from '../../../pages/academic-planner/hooks/useGetPlannerParents';
import { IMAGE_URL } from '../../../constants';
import { fadeUp, staggerContainer } from '../../comp/animation';


const cardContainer: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
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
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
    },
  },
};


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

const AcademicWebPlanner = () => {
  const { data, isLoading } = useGetPlannerParents();

  return (
    <div className="min-h-screen bg-gray-50">

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
              <span className="text-blue-600 relative z-10">Planner</span>
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
            Plan your academic journey with our comprehensive curriculum structure.
            Explore different sessions and their corresponding academic plans.
          </motion.p>
        </motion.div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-4 sm:px-16 pb-12 md:pb-20">

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Data */}
        {!isLoading && data?.data && data.data.length > 0 ? (
          data.data.map((parent) => (
            <div key={parent.id} className="mb-16">

              {/* Session Heading */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-10 text-center md:text-left"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center md:justify-start">
                  <span>{parent.session}</span>
                  <span className="ml-2 relative inline-block">
                    <span className="text-blue-600 relative z-10">
                      {parent.year}
                    </span>
                    <img
                      src={decoration}
                      alt="Decoration"
                      className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-2"
                    />
                  </span>
                </h3>

                <p className="text-gray-600 mt-2">
                  Academic plans and curriculum for{' '}
                  {parent.session?.toLowerCase()}
                </p>
              </motion.div>

              {/* Cards (SAME AS FEE PLANNER) */}
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
                      variants={cardContainer}
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:border-blue-200"
                    >
                      {/* Image */}
                      <motion.div
                        variants={cardItem}
                        className="h-28 relative overflow-hidden"
                      >
                        <motion.img
                          src={image}
                          alt={child.course}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                      </motion.div>

                      {/* Content */}
                      <div className="p-5">
                        <motion.h4
                          variants={cardItem}
                          className="text-md font-bold text-gray-800 mb-3 line-clamp-2"
                        >
                          {child.course} – {child.semester} – {child.intake}
                        </motion.h4>

                        <motion.div
                          variants={cardItem}
                          className="grid grid-cols-2 gap-3 mb-4"
                        >
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
                              INTAKE
                            </p>
                            <p className="text-sm font-medium text-gray-800">
                              {child.intake}
                            </p>
                          </div>
                        </motion.div>

                        <motion.button
                          variants={cardItem}
                          onClick={() =>
                            window.open(IMAGE_URL + child.file, '_blank')
                          }
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-2.5 bg-blue-500 text-white rounded-lg font-medium text-sm"
                        >
                          View Academic Plan
                        </motion.button>
                      </div>

                      {/* Accent bar */}
                      <motion.div
                        variants={cardItem}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="h-1 bg-linear-to-r from-blue-400 to-blue-600"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-gray-500 italic">
                  No academic plans available for this session.
                </p>
              )}
            </div>
          ))
        ) : (
          !isLoading && (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-gray-700">
                No Academic Plans available right now
              </h3>
              <p className="text-gray-500 mt-2">Please check back later.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AcademicWebPlanner;
