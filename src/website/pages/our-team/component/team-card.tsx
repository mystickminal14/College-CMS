import { IMAGE_URL } from "../../../../constants";
import type { TeamMember } from "../model/team-model";
import img from "../../../../assets/pcpslogo.webp";

const TeamCard = ({ member }: { member: TeamMember }) => {
    const imageSrc = member.image
        ? IMAGE_URL + member.image
        : img;

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="aspect-square overflow-hidden rounded-lg group">
                <img
                    src={imageSrc}
                    alt={member.name}
                    className="w-full h-full object-cover object-top rounded-lg transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mt-4">
                {member.name}
            </h3>
            <p className="text-sm lg:text-base text-gray-700 mt-1">
                {member.position}
            </p>
        </div>
    );
};

export default TeamCard;
