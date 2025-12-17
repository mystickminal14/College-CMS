import React from "react";
import {  Calendar } from "lucide-react";
import type { Intakes } from "../model/IntakeModel";
import IntakeCard from "./IntakeCard";

interface Props {
  intakes: Intakes[] | [];
  isLoading: boolean;
  isError: boolean;
  onDelete: (intake: Intakes) => void;
}

const IntakesCardView: React.FC<Props> = ({
  intakes,
  isLoading,
  isError,
  onDelete
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow animate-pulse"
          >
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-red-600 dark:text-red-400 text-lg font-medium mb-2">
          Failed to load intakes
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Please try again later
        </p>
      </div>
    );
  }

  if (!intakes.length) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-5">
          <Calendar className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No intakes uploaded yet
        </h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {intakes.map((item) => (
        <IntakeCard
          key={item.id || item.intake}
          title={item.intake || ""}
          duration={item.duration || ""}
          date={item.lastdate || ""}
          admissionStatus={item.status || "CLOSED"}
          onDelete={() => onDelete(item)}
          intakeData={item}
        />
      ))}
    </div>
  );
};

export default IntakesCardView;