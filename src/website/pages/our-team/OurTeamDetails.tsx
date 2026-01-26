// TeamDetail.tsx
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

import decoration from "../../../assets/decoration.webp";
import { fadeUp } from "../../comp/animation";
import type { TeamMember } from "./model/team-model";
import { APP_URL, IMAGE_URL } from "../../../constants";
import Seo from "../../../context/seo";

const TeamDetail = () => {
  const location = useLocation();
  const member = location.state?.member as TeamMember | undefined;

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Team Member Not Found
          </h1>
          <Link to="/team" className="text-blue-600 hover:text-blue-800">
            Go back to team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Seo
        title={`${member.name} - ${member.position} | Our Team`}
        description={`Learn about ${member.name}, ${member.position} in ${member.department}. Explore biography, contact info, and social profiles.`}
        url={`${APP_URL}/team/${member.id}`}
      />      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center"
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
              transition={{ repeat: Infinity, duration: 2 }}
            />
            Team Member Profile
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <span className="text-gray-900">Meet </span>

            {(() => {
              const nameParts = member?.name?.split(" ") ?? [];
              const lastWord = nameParts?.pop();
              const firstWords = nameParts.join(" ");
              return (
                <>
                  {firstWords && <span className="text-blue-600">{firstWords} </span>}
                  <span className="relative inline-block">
                    <span className="text-blue-600 relative z-10">{lastWord}</span>
                    <motion.img
                      src={decoration}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.25, duration: 0.5 }}
                      alt="Decoration"
                      className="absolute left-0 bottom-0 w-full h-3"
                    />
                  </span>
                </>
              );
            })()}
          </h1>


          <p className="mt-4 text-gray-600 text-lg">
            {member.position} · {member.department}
          </p>
        </motion.div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200"
        >
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* ===== PROFILE ===== */}
            <div className="text-center">
              <div className="rounded-xl overflow-hidden shadow-md border">
                <img
                  src={
                    member.portrait
                      ? IMAGE_URL + member.portrait
                      : IMAGE_URL + member.image
                  }
                  alt={member.name}
                  className="w-full h-auto object-cover"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {member.name}
              </h3>

              {/* ===== REACT ICONS ===== */}
              <div className="flex justify-center gap-4 mt-6">
                {member.linkedIn && (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full bg-blue-50 text-blue-700
                               hover:bg-blue-700 hover:text-white
                               transition-all duration-300
                               hover:scale-110 hover:shadow-lg"
                  >
                    <FaLinkedinIn size={18} />
                  </a>
                )}

                {member.facebook && (
                  <a
                    href={member.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full bg-blue-50 text-blue-600
                               hover:bg-blue-600 hover:text-white
                               transition-all duration-300
                               hover:scale-110 hover:shadow-lg"
                  >
                    <FaFacebookF size={18} />
                  </a>
                )}

                {member.insta && (
                  <a
                    href={member.insta}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full bg-pink-50 text-pink-600
                               hover:bg-linear-to-tr hover:from-pink-500 hover:to-purple-500
                               hover:text-white
                               transition-all duration-300
                               hover:scale-110 hover:shadow-lg"
                  >
                    <FaInstagram size={18} />
                  </a>
                )}

                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-3 rounded-full bg-emerald-50 text-emerald-600
                               hover:bg-emerald-600 hover:text-white
                               transition-all duration-300
                               hover:scale-110 hover:shadow-lg"
                  >
                    <FaEnvelope size={18} />
                  </a>
                )}

                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="p-3 rounded-full bg-indigo-50 text-indigo-600
                               hover:bg-indigo-600 hover:text-white
                               transition-all duration-300
                               hover:scale-110 hover:shadow-lg"
                  >
                    <FaPhoneAlt size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* ===== DETAILS + BIO ===== */}
            <div className="lg:col-span-2 space-y-10">
              {/* DETAILS */}
              <div>
                <h4 className="text-xl font-bold mb-6">Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                  <div>
                    <p className="text-sm text-gray-500">Position</p>
                    <p className="font-semibold">{member.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-semibold">{member.department}</p>
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
                    member.bio.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))
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
      </div>
    </div>
  );
};

export default TeamDetail;
