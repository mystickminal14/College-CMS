// src/pages/NotFoundPage.tsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/ContextApp";
import collegeLogo from "../assets/pcpslogo.webp";

const NotFoundPage: React.FC = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  if (!appContext) throw new Error("AppContext not found");
  const { theme } = appContext;

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 transition-all duration-500 ${theme === "dark"
        ? "bg-gray-900 text-gray-200"
        : "bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800"
        }`}
    >
      <img
        src={collegeLogo}
        alt="College Logo"
        className="w-60  mb-6 animate-bounce-slow"
      />

      <h1 className="text-6xl font-extrabold mb-4 animate-pulse">404</h1>

      <p className="text-xl mb-6 text-center animate-fade-in">
        Oops! Page Not Found
      </p>

      <button
        onClick={() => navigate("/")}
        aria-label="Open Dashboard"
        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${theme === "dark"
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFoundPage;
