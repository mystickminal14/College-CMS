import React from "react";

const EventCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm animate-pulse flex items-start gap-3">
      {/* Icon Placeholder */}
      <div className="w-8 h-8 rounded-full bg-gray-300" />

      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-300 rounded w-1/3" />
        <div className="h-4 bg-gray-300 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-3 bg-gray-200 rounded w-1/6" />
      </div>

      <div className="w-16 h-6 bg-gray-300 rounded" />
    </div>
  );
};

export default EventCardSkeleton;
