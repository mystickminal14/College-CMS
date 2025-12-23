import { motion } from 'framer-motion';

import decoration from '../../../assets/decoration.png';
import Inspiration from './component/inspiration';
import TeamCard from './component/team-card';
import TeamCardSkeleton from './component/team-skeleton';
import useGetTeamsByDept from './hook/useGetDepartment';
import type { TeamMember } from './model/team-model';
import { fadeUp, staggerContainer } from '../../comp/animation';


const OurTeamWeb = () => {

     const { data, isLoading } = useGetTeamsByDept();
    const teamData = data?.data;
    const managementTeam = teamData?.MANAGEMENT || [];
    const administrationTeam = teamData?.ADMINISTRATION || [];
    const computingTeam = teamData?.COMPUTING || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-8xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-blue-600 font-medium text-sm">
              Academic Excellence Team
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Meet The </span>
            <span className="relative inline-block">
              <span className="text-blue-600 relative z-10"> Minds</span>
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom-0 w-full h-3"
              />
            </span>
            <br />
            <span className="text-gray-900">Behind</span>
            <span className="text-blue-600"> Academic </span>
            <span className="text-gray-900">Excellence</span>
          </h1>

          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet the dedicated educators, administrators, and visionaries who
            transform our institution into a beacon of quality education in
            Nepal.
          </p>
        </motion.div>
      </div>

      <Inspiration />

      {/* ================= TEAM SECTIONS ================= */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
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
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Management Division
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
                ? Array.from({ length: 3 }).map((_, i) => (
                    <TeamCardSkeleton key={i} />
                  ))
                : managementTeam.map((member: TeamMember) => (
                    <motion.div
                      key={member.id}
                      variants={fadeUp}
                      whileHover={{ y: -6 }}
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
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Department of Computing
              </h3>
              <p className="text-gray-600 mt-2">
                Technology education, research, and innovation
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
                ? Array.from({ length: 3 }).map((_, i) => (
                    <TeamCardSkeleton key={i} />
                  ))
                : computingTeam.map((member: TeamMember) => (
                    <motion.div
                      key={member.id}
                      variants={fadeUp}
                      whileHover={{ y: -6 }}
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
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Department of Administration
              </h3>
              <p className="text-gray-600 mt-2">
                Support services and operational excellence
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
                ? Array.from({ length: 3 }).map((_, i) => (
                    <TeamCardSkeleton key={i} />
                  ))
                : administrationTeam.map((member: TeamMember) => (
                    <motion.div
                      key={member.id}
                      variants={fadeUp}
                      whileHover={{ y: -6 }}
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
