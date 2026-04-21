
import useGetAchivementsAll from '../../../pages/achivement/hooks/useGetAll';
import Seo from '../../../context/seo';
import { APP_URL } from '../../../constants';
import HeroTitleWithGif from '../../../components/AnimatedTitleWithGif';

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

        <HeroTitleWithGif
          title="Our Achievements Over the Years"
          highlightedText="Achievements"
          subtitle="From humble beginning, LBEF has made steady progress and today we stand as one of the leading colleges in Nepal."
          badgeText="Achievements"
        />

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
