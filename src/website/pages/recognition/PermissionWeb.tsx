import { motion } from 'framer-motion';
import useGetAll from "./hook/useGetRecognitionAll";
import RecognitionsCardView from "./component/RecognitionCard";
import { staggerContainer } from '../../comp/animation';
import Seo from '../../../context/seo';
import { APP_URL } from '../../../constants';
import HeroTitleWithGif from '../../../components/AnimatedTitleWithGif';

const PermissionPageWeb = () => {
  const { data, isLoading, isError } = useGetAll({ type: "PERMISSION" });
  const recognitions = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Official Permission Letters & Institutional Approvals | LBEF College Nepal"
        description="Explore LBEF College Nepal's recognitions and achievements over the years, showcasing excellence in academics, institutional awards, and accomplishments."
        url={`${APP_URL}/recognition`}
      />
      <HeroTitleWithGif
        title="Permission Letters"
        highlightedText="Letters"
        subtitle="Browse through our collection of permission letters. Click on any letter to view it in full size and navigate through the gallery."
        badgeText="Permission Letters"
      />
      {/* ================= CONTENT ================= */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 sm:px-6 py-5"
      >
        <RecognitionsCardView
          recognitions={recognitions}
          isLoading={isLoading}
          isError={isError}
        />
      </motion.div>
    </div>
  );
};

export default PermissionPageWeb;
