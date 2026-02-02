import { motion } from 'framer-motion';
import decoration from '../../../assets/decoration.webp';
import useGetAll from "./hook/useGetRecognitionAll";
import RecognitionsCardView from "./component/RecognitionCard";
import { fadeUp, staggerContainer } from '../../comp/animation';
import Seo from '../../../context/seo';
import { APP_URL } from '../../../constants';

const PermissionPageWeb = () => {
  const { data, isLoading, isError } = useGetAll({type:"PERMISSION"});
  const recognitions = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
 <Seo
    title="Official Permission Letters & Institutional Approvals | LBEF College Nepal"
    description="Explore LBEF College Nepal's recognitions and achievements over the years, showcasing excellence in academics, institutional awards, and accomplishments."
    url={`${APP_URL}/about/recognition`}
  />
      {/* ================= HERO ================= */}
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
              Permission Letters
            </span>
          </motion.div>


          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Official Permission </span>
            <span className="relative inline-block">
              <span className="text-blue-600 relative z-10"> Letters</span>
              <motion.img
                src={decoration}
                alt="Decoration"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom:0 w-full h-2 md:h-3"
              />
            </span>
            <br />
            <span className="text-blue-600">& Institutional  </span>
            <span className="text-gray-900 relative z-10"> Approvals </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Official permission letters and approvals granted to our college by authorized institutions. These documents reflect our compliance, credibility, and commitment to quality education.
          </motion.p>
        </motion.div>
      </div>

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
