import { FaLinkedinIn } from "react-icons/fa";
import { IMAGE_URL } from "../../../../constants";
import fallback from "../../../../assets/pcpslogo.webp";
import type { PublicClubMember } from "../model/club-model";

// Same look as the Our Team card: square photo, name and title underneath, LinkedIn icon on the side.
const ClubTeamCard = ({ member }: { member: PublicClubMember }) => (
  <div className="w-full max-w-sm mx-auto">
    <div className="relative aspect-square overflow-hidden rounded-lg group bg-gray-100">
      <img
        src={member.image ? IMAGE_URL + member.image : fallback}
        alt={member.name}
        className={`w-full h-full rounded-lg transition-transform duration-500 group-hover:scale-105 ${
          member.image ? "object-cover object-center" : "object-contain p-10 opacity-60"
        }`}
        loading="lazy"
      />
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
      {member.linkedIn && (
        <a
          href={member.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0A66C2] text-white text-sm hover:opacity-85 transition"
        >
          <FaLinkedinIn />
        </a>
      )}
    </div>
  </div>
);

export default ClubTeamCard;
