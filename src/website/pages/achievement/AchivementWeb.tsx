import { motion } from 'framer-motion';

import decoration from '../../../assets/decoration.webp';
import useGetAchivementsAll from '../../../pages/achivement/hooks/useGetAll';
import { fadeUp } from '../../comp/animation';
import Seo from '../../../context/seo';
import { APP_URL } from '../../../constants';

const AchievementWeb = () => {
  const { data, isLoading } = useGetAchivementsAll();
  const achievements = data?.data ?? [];

  // Skeleton loader
  const SkeletonLoader = () => (
    <div className="max-w-4xl mx-auto space-y-4">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white p-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gray-200 rounded-full" />
            <div className="h-4 bg-gray-200 rounded w-full max-w-md" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Seo
        title="Achievements of LBEF College | Awards & Milestones in Nepal"
        description="Explore the achievements, awards, milestones, and recognitions of LBEF College Nepal, reflecting excellence in IT and management education over the years."
        url={`${APP_URL}/achivements`}

      />

      <div className="min-h-screen bg-gray-50">
        {/* ================= HERO / HEADING (ANIMATED) ================= */}
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
                Discover Our Achievements
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              <span className="text-gray-900">Our </span>
              <span className="relative inline-block">
                <span className="text-blue-600 relative z-10"> Achievements</span>
                <motion.img
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom-0 w-full h-2 md:h-3"
                />
              </span>{' '}
              <span className="text-gray-900">Over </span>
              <br />
              <span className="text-gray-900"> The Years </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }} className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From humble beginning, LBEF has made steady progress and today we stand as one of the leading colleges in Nepal.
            </motion.p>
          </motion.div>
        </div>

        {/* ================= ACHIEVEMENTS LIST (NO ANIMATION) ================= */}
        <div className="container mx-auto px-2 sm:px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow border border-gray-100 p-4 md:p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Achievements List
            </h2>

            {isLoading ? (
              <SkeletonLoader />
            ) : achievements.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No achievements found
              </div>
            ) : (
              <div className="space-y-1">
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.id ?? index}
                    className="flex items-start gap-2 p-3 hover:bg-gray-50 rounded"
                  >
                    <div className="shrink-0 w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full" />
                    <p className="text-gray-700">
                      {achievement.achivement || 'No description available'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>

  );
};

export default AchievementWeb;
