import logo from '../../../assets/lbefhd.webp';
import police from '../../../assets/police.png';
import { motion } from 'framer-motion';
import { fadeUp } from '../../comp/animation';
import Seo from '../../../context/seo';
import { APP_URL } from '../../../constants';
import LbefSubFooter from '../home/components/LbefSubFooter';

const ICTRegistration = () => {
  const particularDate = new Date('2026-02-18');
  const currentDate = new Date();

  const isOpen = currentDate >= particularDate;

  return (
    <>
      <Seo
        title="National ICT Scholarship | LBEF College Nepal"
        description="Apply for the National ICT Scholarship at LBEF College Nepal. Rewarding meritorious students in Information Technology with tuition fee benefits."
        url={`${APP_URL}/ict-scholarship`}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 text-center">
          <div className="max-w-8xl mx-auto">
            <div className="inline-flex items-center justify-center gap-10 mb-6 px-4 py-2 rounded-full">
              <img src={logo} className="w-40 h-20" alt="LBEF Logo" />
              <img src={police} className="w-20 h-20" alt="Police Logo" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              <span className="text-gray-900">
                ICT Scholarship-{new Date().getFullYear()} Registration
              </span>
            </h1>

            <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto mb-5 leading-relaxed">
              Apply for the National ICT Scholarship at LBEF College Nepal.
              Rewarding meritorious students in Information Technology with tuition fee benefits.
            </p>
          </div>
        </div>

        {/* Conditional Rendering */}
        <div className="container mx-auto px-4">
          {isOpen ? (
            <iframe
              src="https://student.lbef.info/index.php?p1=canscholarship&v2=form"
              width="100%"
              height="800px"
              className="rounded-lg shadow-md"
              title="ICT Scholarship Form"
            />
          ) : (
            <h1 className="text-2xl font-semibold text-center text-red-600 mt-10">
              The Registration for ICT Scholarship-2082 will open on
              {` ${particularDate.toDateString()}`}
            </h1>
          )}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="w-full bg-gray-50 mt-10 overflow-hidden"
        >
          <LbefSubFooter />

        </motion.div>
      </div>
    </>
  );
};

export default ICTRegistration;