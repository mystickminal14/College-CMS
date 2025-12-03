import React, { useState } from "react";
import { MdWifiOff, MdContentCopy } from "react-icons/md";

const OfflinePage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleRetry = () => {
    window.location.reload();
  };

  const wifiAccess = localStorage.getItem("stu_wifi_access") || "Not available";

  const handleCopy = () => {
    navigator.clipboard.writeText(wifiAccess).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    });
  };

  return (
    <div className="font-poppins flex flex-col items-center justify-center  bg-gradient-to-b from-gray-100 to-gray-150 p-6 text-center">
      <MdWifiOff className="text-red-500 text-7xl mb-4 md:text-8xl" />
      <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
        No Internet Connection
      </h1>
      <p className="text-gray-500 mt-3 max-w-md text-sm md:text-base">
        It looks like you're offline. Please check your internet connection and try again.
      </p>

      <div className="mt-4 p-4 cursor-pointer bg-gray-200 rounded-lg flex items-center space-x-2">
        <span className="font-mono text-gray-800 break-all">{wifiAccess}</span>
        <button
          onClick={handleCopy}
          className="text-gray-600   hover:text-gray-800 transition-colors duration-200"
        >
          <MdContentCopy size={20} />
        </button>
      </div>
      {copied && <p className="text-green-600 mt-2 cursor-pointer   text-sm">Copied to clipboard!</p>}

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
