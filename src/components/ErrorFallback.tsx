// src/pages/ErrorFallback.tsx
import React, { useContext } from "react";
import { AppContext } from "../context/ContextApp";
import collegeLogo from "../assets/pcpslogo.webp";
import type { FallbackProps } from "react-error-boundary";

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const appContext = useContext(AppContext);
  const theme = appContext?.theme ?? "light";

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 transition-all duration-500 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800"
      }`}
    >
      <img
        src={collegeLogo}
        alt="College Logo"
        className="w-60 mb-6 opacity-80"
      />

      <div
        className={`flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
          theme === "dark" ? "bg-red-900/40" : "bg-red-100"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-red-500 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          />
        </svg>
      </div>

      <h1 className="text-5xl font-extrabold mb-4 animate-pulse">Oops!</h1>

      <p className="text-xl mb-2 text-center font-medium">
        Something went wrong
      </p>

      <p
        className={`text-sm mb-8 text-center max-w-md ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}
      >
        An unexpected error occurred. You can try reloading the page or go back
        to the homepage.
      </p>

      {(error as Error).message && (
        <div
          className={`mb-8 px-4 py-3 rounded-lg text-xs font-mono max-w-md w-full text-center wrap-break-word ${
            theme === "dark"
              ? "bg-gray-800 text-red-400 border border-red-900"
              : "bg-red-50 text-red-600 border border-red-200"
          }`}
        >
          {(error as Error).message}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={resetErrorBoundary}
          aria-label="Try Again"
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            theme === "dark"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Try Again
        </button>

        <button
          onClick={() => {
            resetErrorBoundary();
            window.location.href = "/";
          }}
          aria-label="Go to Homepage"
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 border ${
            theme === "dark"
              ? "border-gray-600 text-gray-300 hover:bg-gray-800"
              : "border-gray-300 text-gray-600 hover:bg-white"
          }`}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;