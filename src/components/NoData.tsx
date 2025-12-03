import React, { useContext } from "react";
import { format } from "date-fns";
import { FaCalendarTimes } from "react-icons/fa";
import { AppContext } from "../context/ContextApp";

interface NoDataProps {
  selectedDate: Date;
  message?: string;
}

const NoData: React.FC<NoDataProps> = ({ selectedDate, message }) => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("AppContext not found");
  const { theme } = appContext;

  return (
    <div
      className={`mx-auto h-28 rounded-md flex flex-col justify-center items-center shadow-sm border p-3 ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700 text-gray-200"
          : "bg-blue-50 border-blue-200 text-blue-gray-600"
      }`}
    >
      <FaCalendarTimes
        className={`mb-2 text-2xl ${
          theme === "dark" ? "text-gray-400" : "text-blue-500"
        }`}
      />
      <p
        className={`text-sm font-bold text-center ${
          theme === "dark" ? "text-gray-200" : "text-blue-gray-600"
        }`}
      >
        {message ?? `No event on ${format(selectedDate, "PPP")}`}
      </p>
    </div>
  );
};

export default NoData;
