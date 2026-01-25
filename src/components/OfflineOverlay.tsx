import React from "react";
import { MdWifiOff, } from "react-icons/md";

const OfflinePage: React.FC = () => {

  const handleRetry = () => {
    window.location.reload();
  };




  return (
    <div className="font-poppins flex flex-col items-center justify-center  bg-linear-to-b from-gray-100 to-gray-150 p-6 text-center">
      <MdWifiOff className="text-red-500 text-7xl mb-4 md:text-8xl" />
      <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
        No Internet Connection
      </h1>
      <p className="text-gray-500 mt-3 max-w-md text-sm md:text-base">
        It looks like you're offline. Please check your internet connection and try again.
      </p>

      

      <button
        onClick={handleRetry}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 text-sm md:text-base"
      >
        Retry
      </button>
    </div>
  );
};

export default OfflinePage;
