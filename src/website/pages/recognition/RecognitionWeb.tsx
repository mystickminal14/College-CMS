import { motion } from 'framer-motion';
import useGetAll from "./hook/useGetRecognitionAll";
import RecognitionsCardView from "./component/RecognitionCard";
import {  staggerContainer } from '../../comp/animation';
import Seo from '../../../context/seo';
import { APP_URL } from '../../../constants';
import HeroTitleWithGif from '../../../components/AnimatedTitleWithGif';

const RecognitionPageWeb = () => {
  const { data, isLoading, isError } = useGetAll({ type: "RECOGNITION" });
  const recognitions = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="College Recognitions & Achievements | LBEF College Nepal"
        description="Explore LBEF College Nepal's recognitions and achievements over the years, showcasing excellence in academics, institutional awards, and accomplishments."
        url={`${APP_URL}/recognition`}
      />
      <HeroTitleWithGif
        title="Our College Recognitions Over the Years"
        highlightedText="Recognitions"
        subtitle="Celebrating excellence, dedication, and success. Explore the academic and
            institutional recognitions and achievements that reflect our commitment to
            growth and distinction."
        badgeText="Recognitions"
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

export default RecognitionPageWeb;
