const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
    <div className="h-36 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-10 bg-gray-200 rounded-lg mt-4" />
    </div>
    <div className="h-1 bg-gray-200" />
  </div>
);

export default SkeletonCard;