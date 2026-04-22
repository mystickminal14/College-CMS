import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeamCard from "./component/team-card";
import TeamCardSkeleton from "./component/team-skeleton";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";
import useGetTeamsByDept from "./hook/useGetDepartment";
import type { TeamMember } from "./model/team-model";
import { fadeUp, staggerContainer } from "../../comp/animation";
import Seo from "../../../context/seo";
import { APP_URL, IMAGE_URL } from "../../../constants";
import type { DeptAll } from "../../../pages/our-team-dept/model/DeptModel";
import { X } from "lucide-react";
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";

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
      <HeroTitleWithGif
        title="Meet The People Powering LBEF’s Bold, Futuristic Journey"
        highlightedText="Powering"
        subtitle="LBEF’s team brings together academic excellence, visionary leadership, and a future-focused mindset to deliver effective, globally relevant education."
        badgeText="Academic Excellence Team"
      />

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
            <h3 className="mt-6 text-xl font-bold text-gray-900">
              {member.name}
            </h3>

            {/* SOCIAL */}
            <div className="flex justify-center gap-3 mt-5 flex-wrap">

              {member.linkedIn && (
                <a href={member.linkedIn} target="_blank" rel="noreferrer">
                  <FaLinkedinIn size={18} />
                </a>
              )}

              {member.facebook && (
                <a href={member.facebook} target="_blank" rel="noreferrer">
                  <FaFacebookF size={18} />
                </a>
              )}

              {member.insta && (
                <a href={member.insta} target="_blank" rel="noreferrer">
                  <FaInstagram size={18} />
                </a>
              )}

              {member.email && (
                <a href={`mailto:${member.email}`}>
                  <FaEnvelope size={18} />
                </a>
              )}

              {member.phone && (
                <a href={`tel:${member.phone}`}>
                  <FaPhoneAlt size={18} />
                </a>
              )}

            </div>
          </div>

          {/* DETAILS */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h4 className="text-xl font-bold mb-6">Details</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="font-semibold">{member.position}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-semibold">{member.department.name}</p>
                </div>

                {member.email && (
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">{member.email}</p>
                  </div>
                )}
              </div>
            </div>

            {/* BIO */}
            <div>
              <h4 className="text-xl font-bold mb-4">Biography</h4>

              <div className="text-gray-700 leading-relaxed space-y-4">
                {member.bio ? (
                  member.bio
                    .split("\n\n")
                    .map((para, i) => <p key={i}>{para}</p>)
                ) : (
                  <p className="italic text-gray-500">
                    Biography information will be updated soon.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};