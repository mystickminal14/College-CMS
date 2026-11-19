import { FaLinkedinIn } from "react-icons/fa";
import { IMAGE_URL } from "../../../../constants";
import type { TeamMember } from "../model/team-model";
import fallback from "../../../../assets/pcpslogo.webp";

// Same look as the club member card (ClubTeamCard): square photo, name and position underneath,
// LinkedIn icon on the side. Long full-body photos are cropped from the top so every square shows
// head to waist; mix-blend-multiply turns their white backgrounds into the same grey as the tile.
const TeamCard = ({ member }: { member: TeamMember }) => {
    const photo = member.portrait || member.image;

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="relative aspect-square overflow-hidden rounded-lg group bg-gray-100">
                <img
                    src={photo ? IMAGE_URL + photo : fallback}
                    alt={member.name}
                    loading="lazy"
                    className={`w-full h-full rounded-lg mix-blend-multiply transition-transform duration-500 group-hover:scale-105 ${
                        photo ? "object-cover object-top" : "object-contain p-10 opacity-60"
                    }`}
                />
            </div>

            <div className="mt-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <h3 className="text-base lg:text-lg font-bold text-gray-900 leading-snug">{member.name}</h3>
                    {member.position && (
                        <p className="text-sm text-gray-700 mt-0.5 leading-snug">{member.position}</p>
                    )}
                </div>
                {member.linkedIn && (
                    <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0A66C2] text-white text-sm hover:opacity-85 transition"
                    >
                        <FaLinkedinIn />
                    </a>
                )}
            </div>
        </div>
    );
};

export default TeamCard;
