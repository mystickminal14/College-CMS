import React from "react";
import { Edit, Trash2 } from "lucide-react";
import type { Teams } from "../model/TeamsModel";
import img from "../../../assets/applogo.png";
import { IMAGE_URL } from "../../../constants";

interface TeamsCardViewProps {
    teams: Teams[];
    isLoading: boolean;
    isError: boolean;
    onEdit: (team: Teams) => void;
    onDelete: (team: Teams) => void;
}

const TeamsCardView: React.FC<TeamsCardViewProps> = ({
    teams,
    isLoading,
    isError,
    onEdit,
    onDelete,
}) => {

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow animate-pulse h-60"
                    ></div>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <p className="text-red-600 dark:text-red-400 text-center py-8">
                Failed to load Teams
            </p>
        );
    }

    if (teams.length === 0) {
        return (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No Teams found
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teams.map((team) => (
                <div
                    key={team.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full"
                >
                    <div className="relative w-full overflow-hidden rounded-lg group">

                        <div className="aspect-square cursor-pointer overflow-hidden rounded-lg">
                            <img
                                src={team.image != null ? `${IMAGE_URL}${team.image}` : img}
                                alt={team.name}
                                className="w-full h-full object-cover object-top rounded-lg transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        {/* Action Buttons - Always Visible */}
                        <div className="absolute bottom-3 right-3 flex space-x-3 z-10">

                            <button
                                className="p-3 bg-white/95 dark:bg-gray-800/95 rounded-lg shadow hover:bg-white dark:hover:bg-gray-700 transition"
                                onClick={() => onEdit(team)}
                            >
                                <Edit size={24} className="text-blue-600 dark:text-blue-400" />
                            </button>

                            <button
                                className="p-3 bg-white/95 dark:bg-gray-800/95 rounded-lg shadow hover:bg-white dark:hover:bg-gray-700 transition"
                                onClick={() => onDelete(team)}
                            >
                                <Trash2 size={24} className="text-red-600 dark:text-red-400" />
                            </button>

                        </div>
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">
                        {team.name}
                    </h3>

                    {/* Position */}
                    <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">
                        {team.position}
                    </p>

                    {/* Department */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {team.department}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default TeamsCardView;
