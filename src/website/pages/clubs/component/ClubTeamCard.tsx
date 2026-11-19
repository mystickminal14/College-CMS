import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaBriefcase, FaLinkedinIn, FaTimes } from "react-icons/fa";
import { IMAGE_URL } from "../../../../constants";
import fallback from "../../../../assets/pcpslogo.webp";
import type { PublicClubMember } from "../model/club-model";
import ClubRichText from "./ClubRichText";

const MemberPhoto = ({ member, className = "" }: { member: PublicClubMember; className?: string }) => (
  <img
    src={member.image ? IMAGE_URL + member.image : fallback}
    alt={member.name}
    className={`w-full h-full ${member.image ? "object-cover object-center" : "object-contain p-10 opacity-60"} ${className}`}
    loading="lazy"
  />
);

// Portalled to <body>: the card sits inside an animated transform, which would
// otherwise trap the fixed overlay within the card.
const ExperienceModal = ({ member, onClose }: { member: PublicClubMember; onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${member.name}: past experience`}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[85vh] sm:min-h-[22rem] flex flex-col-reverse sm:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex-1 min-w-0 min-h-0 overflow-y-auto p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{member.name}</h3>
          <p className="mt-1 text-sm font-medium text-blue-700">{member.designation}</p>
          <p className="mt-5 pt-5 border-t border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Past Experience
          </p>
          <ClubRichText html={member.pastExperiences} className="mt-2 text-sm text-gray-700 leading-relaxed" />
        </div>

        {/* Below sm the photo stacks on top; absolute so it never sets the dialog's height. */}
        <div className="relative shrink-0 h-48 sm:h-auto sm:w-2/5 bg-gray-100">
          <MemberPhoto member={member} className="absolute inset-0" />
        </div>

        <button
          type="button"
          autoFocus
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 inline-flex items-center justify-center rounded-full bg-white/90 text-gray-600 shadow hover:bg-white cursor-pointer"
        >
          <FaTimes />
        </button>
      </div>
    </div>,
    document.body
  );
};

// Same look as the Our Team card: square photo, name and title underneath, LinkedIn icon on the side.
const ClubTeamCard = ({ member }: { member: PublicClubMember }) => {
  const [showExperience, setShowExperience] = useState(false);
  // The briefcase icon sits outside the photo, so hovering it can't use group-hover.
  const [iconActive, setIconActive] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative aspect-square overflow-hidden rounded-lg group bg-gray-100">
        <MemberPhoto member={member} className="rounded-lg transition-transform duration-500 group-hover:scale-105" />
        {member.pastExperiences && (
          // Mouse shortcut only: the briefcase button is the keyboard and screen reader route.
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setShowExperience(true)}
            className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-900/65 text-white text-sm font-semibold transition-opacity duration-300 cursor-pointer group-hover:opacity-100 ${
              iconActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <FaBriefcase className="text-xl" />
            View Experience
          </button>
        )}
        {member.isPresident && (
          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[11px] font-bold tracking-wide shadow">
            President
          </span>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-base lg:text-lg font-bold text-gray-900 leading-snug">{member.name}</h3>
          <p className="text-sm text-gray-700 mt-0.5 leading-snug">{member.designation}</p>
        </div>
        <div className="shrink-0 flex items-center gap-1.5">
          {member.pastExperiences && (
            <button
              type="button"
              onClick={() => setShowExperience(true)}
              onMouseEnter={() => setIconActive(true)}
              onMouseLeave={() => setIconActive(false)}
              onFocus={() => setIconActive(true)}
              onBlur={() => setIconActive(false)}
              title="Past experience"
              aria-label={`${member.name}: past experience`}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-white text-xs hover:opacity-85 transition cursor-pointer"
            >
              <FaBriefcase />
            </button>
          )}
          {member.linkedIn && (
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0A66C2] text-white text-sm hover:opacity-85 transition"
            >
              <FaLinkedinIn />
            </a>
          )}
        </div>
      </div>

      {showExperience && <ExperienceModal member={member} onClose={() => setShowExperience(false)} />}
    </div>
  );
};

export default ClubTeamCard;
