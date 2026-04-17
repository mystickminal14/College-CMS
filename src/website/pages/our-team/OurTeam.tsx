import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeamCard from "./component/team-card";
import TeamCardSkeleton from "./component/team-skeleton";
import decoration from "../../../assets/decoration.webp";
import useGetTeamsByDept from "./hook/useGetDepartment";
import type { TeamMember } from "./model/team-model";
import { fadeUp, staggerContainer } from "../../comp/animation";
import Seo from "../../../context/seo";
import { APP_URL, IMAGE_URL } from "../../../constants";
import type { DeptAll } from "../../../pages/our-team-dept/model/DeptModel";

import { X } from "lucide-react";

import butterflyGif from "../../../assets/butter.gif";

interface GroupedDept {
  department: DeptAll;
  members: TeamMember[];
}

const OurTeamWeb = () => {
  const { data, isLoading } = useGetTeamsByDept();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const members: TeamMember[] = data?.data
    ? Object.values(data.data).flat().filter((m) => m.status === "ENABLED")
    : [];

  const groupedDepartments: GroupedDept[] = (() => {
    const map = new Map<number, GroupedDept>();

    members.forEach((member) => {
      const dept = member.department;
      if (!dept) return;

      if (!map.has(dept.id)) {
        map.set(dept.id, {
          department: {
            id: dept.id,
            name: dept.name,
            order: dept.order,
            status: dept.status,
          },
          members: [],
        });
      }

      map.get(dept.id)!.members.push(member);
    });

    map.forEach((group) => {
      group.members.sort((a, b) => a.order - b.order);
    });

    return Array.from(map.values()).sort(
      (a, b) => a.department.order - b.department.order
    );
  })();

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Meet LBEF College Team | Leadership & Academic Excellence"
        description="Meet the dedicated team at LBEF College, including leadership, administration, and computing department experts driving excellence in education."
        url={`${APP_URL}/our-team`}
      />

      {/* ================= HERO WITH GIF BACKGROUND ================= */}
      <div className="relative">

        {/* GIF BACKGROUND (ONLY ADDITION) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={butterflyGif}
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-8xl mx-auto text-center"
          >

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-3 mb-6 relative"
              style={{ padding: "10px 24px 10px 12px" }}
            >
              {/* wavy blue dashed lines — matches page's blue-600 theme */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 300 52" preserveAspectRatio="none">
                <path d="M0 51 Q50 44 100 49 Q150 54 200 47 Q250 41 300 51"
                  fill="none" stroke="#2563eb" strokeWidth="0.8" strokeDasharray="5 4" opacity="0.25" />
                <path d="M0 1 Q50 8 100 3 Q150 -2 200 5 Q250 11 300 1"
                  fill="none" stroke="#2563eb" strokeWidth="0.8" strokeDasharray="5 4" opacity="0.25" />
                <circle cx="55" cy="50" r="1.8" fill="#3b82f6" opacity="0.4" />
                <circle cx="160" cy="48" r="1.4" fill="#6366f1" opacity="0.35" />
                <circle cx="265" cy="50" r="1.8" fill="#3b82f6" opacity="0.4" />
                <circle cx="100" cy="2" r="1.4" fill="#3b82f6" opacity="0.35" />
                <circle cx="220" cy="3" r="1.8" fill="#6366f1" opacity="0.4" />
              </svg>

              {/* butterfly in blue/indigo */}
              <svg width="46" height="46" viewBox="0 0 52 52" fill="none">
                <path d="M26 28 C20 10,2 6,2 18 C2 26,14 28,26 28Z" fill="#bfdbfe" stroke="#2563eb" strokeWidth="0.7" />
                <path d="M26 28 C16 34,4 46,8 50 C12 53,22 44,26 28Z" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.5" />
                <path d="M26 28 C32 10,50 6,50 18 C50 26,38 28,26 28Z" fill="#bfdbfe" stroke="#2563eb" strokeWidth="0.7" />
                <path d="M26 28 C36 34,48 46,44 50 C40 53,30 44,26 28Z" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.5" />
                <ellipse cx="26" cy="28" rx="2" ry="11" fill="#1e40af" />
                <path d="M25 17 C22 9,17 5,15 2" fill="none" stroke="#1e40af" strokeWidth="0.9" strokeLinecap="round" />
                <circle cx="15" cy="2" r="1.8" fill="#1e40af" />
                <path d="M27 17 C30 9,35 5,37 2" fill="none" stroke="#1e40af" strokeWidth="0.9" strokeLinecap="round" />
                <circle cx="37" cy="2" r="1.8" fill="#1e40af" />
                <circle cx="17" cy="20" r="2.2" fill="#3b82f6" opacity="0.45" />
                <circle cx="35" cy="20" r="2.2" fill="#3b82f6" opacity="0.45" />
                <circle cx="13" cy="37" r="1.5" fill="#6366f1" opacity="0.35" />
                <circle cx="39" cy="37" r="1.5" fill="#6366f1" opacity="0.35" />
              </svg>

              <div className="flex flex-col gap-0.5 relative z-10">
                <span className="text-sm font-medium text-blue-900">Academic Excellence Team</span>
              </div>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold md:mt-8 leading-tight mb-8">
              <span className="text-gray-900">Meet The People </span>
              <span className="relative inline-block">
                <span className="text-blue-600 relative z-10"> Powering </span>
                <motion.img
                  src={decoration}
                  alt="Decoration"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-3"
                  loading="eager"
                />
              </span>
              <br />
              <span className="text-gray-900">LBEF’s </span>
              <span className="text-blue-600"> Bold, </span>
              <span className="text-gray-900"> Futuristic Journey</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              LBEF’s team brings together academic excellence, visionary leadership,
              and a future-focused mindset to deliver effective, globally relevant
              education.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto">
          {groupedDepartments.map((group, index) => (
            <Section
              key={group.department.id}
              title={group.department.name}
              badge={group.department.name}
              color={
                index % 3 === 0
                  ? "blue"
                  : index % 3 === 1
                    ? "purple"
                    : "green"
              }
              members={group.members}
              isLoading={isLoading}
              onSelect={setSelectedMember}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence mode="wait">
        {selectedMember && (
          <TeamDetailModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OurTeamWeb;

/* ================= SECTION COMPONENT ================= */

const Section = ({
  title,
  badge,
  color,
  members,
  isLoading,
  onSelect,
}: {
  title: string;
  badge: string;
  color: "blue" | "green" | "purple";
  members: TeamMember[];
  isLoading: boolean;
  onSelect: (member: TeamMember) => void;
}) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="mb-20"
  >
    <div className="mb-8">
      <div
        className={`inline-flex items-center gap-2 mb-2 px-4 py-1 rounded-full bg-${color}-100 border border-${color}-200`}
      >
        <div className={`w-2 h-2 bg-${color}-500 rounded-full`} />
        <span className={`text-${color}-700 font-medium`}>{badge}</span>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
        {title}
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
        ? Array.from({ length: 4 }).map((_, i) => <TeamCardSkeleton key={i} />)
        : members.map((member) => (
          <motion.div
            key={member.id}
            whileHover={{ y: -6 }}
            onClick={() => onSelect(member)}
            className="cursor-pointer"
          >
            <TeamCard member={member} />
          </motion.div>
        ))}
    </motion.div>
  </motion.div>
);

/* ================= TEAM DETAIL MODAL ================= */

const TeamDetailModal = ({
  member,
  onClose,
}: {
  member: TeamMember;
  onClose: () => void;
}) => {

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", esc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", esc);
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      style={{
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
        >
          <X size={20} />
        </button>

        <div className="px-8 pt-10 pb-6 text-center border-b border-gray-100">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Meet <span className="text-blue-600">{member.name}</span>
          </h2>

          <p className="mt-3 text-gray-500 text-base">
            {member.position} · {member.department.name}
          </p>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="text-center">
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                src={
                  member.portrait
                    ? IMAGE_URL + member.portrait
                    : IMAGE_URL + member.image
                }
                alt={member.name}
                className="w-full h-80 object-cover object-[center_20%]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};