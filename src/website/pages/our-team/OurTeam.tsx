import { motion } from 'framer-motion';
import decoration from '../../../assets/decoration.webp';
import TeamCard from './component/team-card';
import TeamCardSkeleton from './component/team-skeleton';
import useGetTeamsByDept from './hook/useGetDepartment';
import type { TeamMember } from './model/team-model';
import { fadeUp, staggerContainer } from '../../comp/animation';
import { useNavigate } from 'react-router-dom';
import Seo from '../../../context/seo';
import { APP_URL } from '../../../constants';

const OurTeamWeb = () => {
  const { data, isLoading } = useGetTeamsByDept();
  const teamData = data?.data;

  const managementTeam = teamData?.MANAGEMENT || [];
  const administrationTeam = teamData?.ADMINISTRATION || [];
  const computingTeam = teamData?.COMPUTING || [];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
     <Seo
    title="Meet LBEF College Team | Leadership & Academic Excellence"
    description="Meet the dedicated team at LBEF College, including leadership, administration, and computing department experts driving excellence in education."
    url={`${APP_URL}/about/our-team`}
  />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-8xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100"
          >
            <motion.span
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <span className="text-blue-600 font-medium text-sm">
              Academic Excellence Team
            </span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Meet The People </span>
            <span className="relative inline-block">
              <span className="text-blue-600 relative z-10">  Powering </span>
              <motion.img
                src={decoration}
                alt="Decoration"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-3"
              />
            </span>
            <br />
            <span className="text-gray-900">LBEF’s </span>
            <span className="text-blue-600">  Bold, </span>
            <span className="text-gray-900">  Futuristic Journey</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
           LBEF’s team brings together academic excellence, visionary leadership, and a future-focused mindset to deliver effective, globally relevant education
          </motion.p>
        </motion.div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto">

          {/* ================= MANAGEMENT ================= */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-2 px-4 py-1 rounded-full bg-blue-100 border border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-blue-700 font-medium">Leadership Team</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Management
                <span className="relative inline-block ml-2">
                  <span className="text-blue-600 relative z-10">Division</span>
                  <img
                    src={decoration}
                    alt="Decoration"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-2"
                  />
                </span>
              </h3>
              <p className="text-gray-600 mt-2">
                Strategic leadership and institutional governance
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => <TeamCardSkeleton key={i} />)
                : managementTeam.map((member: TeamMember) => (
                    <motion.div
                      key={member.id}
                      variants={fadeUp}
                      whileHover={{ y: -6 }}
                      onClick={() =>
                        navigate(`/team/${member.id}`, { state: { member } })
                      }
                      className="cursor-pointer"
                    >
                      <TeamCard member={member} />
                    </motion.div>
                  ))}
            </motion.div>
          </motion.div>

          {/* ================= COMPUTING ================= */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-2 px-4 py-1 rounded-full bg-green-100 border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-green-700 font-medium">
                  Technology & Research
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Department of
                <span className="relative inline-block ml-2">
                  <span className="text-blue-600 relative z-10">Computing</span>
                  <img
                    src={decoration}
                    alt="Decoration"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-2"
                  />
                </span>
              </h3>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => <TeamCardSkeleton key={i} />)
                : computingTeam.map((member: TeamMember) => (
                    <motion.div
                      key={member.id}
                      variants={fadeUp}
                      whileHover={{ y: -6 }}
                      onClick={() =>
                        navigate(`/team/${member.id}`, { state: { member } })
                      }
                      className="cursor-pointer"
                    >
                      <TeamCard member={member} />
                    </motion.div>
                  ))}
            </motion.div>
          </motion.div>

          {/* ================= ADMINISTRATION ================= */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-2 px-4 py-1 rounded-full bg-purple-100 border border-purple-200">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-purple-700 font-medium">
                  Support & Operations
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Department of
                <span className="relative inline-block ml-2">
                  <span className="text-blue-600 relative z-10">Administration</span>
                  <img
                    src={decoration}
                    alt="Decoration"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-2"
                  />
                </span>
              </h3>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => <TeamCardSkeleton key={i} />)
                : administrationTeam.map((member: TeamMember) => (
                    <motion.div
                      key={member.id}
                      variants={fadeUp}
                      whileHover={{ y: -6 }}
                      onClick={() =>
                        navigate(`/team/${member.id}`, { state: { member } })
                      }
                      className="cursor-pointer"
                    >
                      <TeamCard member={member} />
                    </motion.div>
                  ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OurTeamWeb;
