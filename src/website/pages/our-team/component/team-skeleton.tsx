// components/TeamCardSkeleton.jsx
const TeamCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-64 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-32 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-300 rounded w-20"></div>
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default TeamCardSkeleton;