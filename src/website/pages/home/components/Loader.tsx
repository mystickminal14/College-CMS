import butterfly from "../../../../assets/butterfiles.webp";

export default function PageLoader({ text = "Loading..." }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-40 h-40 flex items-center justify-center mb-6">
          {/* Spinning ring */}
          <div 
            className="absolute inset-0 border-8 border-blue-200 border-t-blue-500 rounded-full animate-spin"
          />
          
          {/* Butterfly in center */}
          <img
            src={butterfly}
            alt="Loading"
            className="relative w-20 h-20 object-contain z-10"
          />
        </div>

        {/* Loading text */}
        <p className="text-gray-700 font-medium text-lg">{text}</p>
      </div>
    </div>
  );
}
