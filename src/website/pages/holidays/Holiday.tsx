import React, { useState, useEffect, useContext, JSX } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  isBefore,
} from "date-fns";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../../../context/ContextApp";

import decoration from "../../../assets/decoration.png";
import calendarBg from "../../../assets/butterfiles.png";

interface EventModel {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  colorCode?: string;
  type?: string;
}

const EVENTS: EventModel[] = [
  {
    id: "1",
    title: "Spring Break",
    description: "Academic holiday for spring semester break. All classes suspended.",
    startDate: new Date().toISOString(),
    endDate: addDays(new Date(), 7).toISOString(),
    location: "Campus Wide",
    colorCode: "#3B82F6",
    type: "Holiday",
  },
  {
    id: "2",
    title: "Mid-Term Examinations",
    description: "Mid-term exams for all departments. Library open 24/7.",
    startDate: addDays(new Date(), 3).toISOString(),
    endDate: addDays(new Date(), 10).toISOString(),
    location: "Examination Halls",
    colorCode: "#EF4444",
    type: "Exam",
  },
  {
    id: "3",
    title: "Faculty Development Program",
    description: "Workshop on innovative teaching methodologies.",
    startDate: addDays(new Date(), 5).toISOString(),
    location: "Conference Center",
    colorCode: "#10B981",
    type: "Workshop",
  },
  {
    id: "4",
    title: "Sports Day",
    description: "Annual inter-department sports competition.",
    startDate: addDays(new Date(), 8).toISOString(),
    endDate: addDays(new Date(), 9).toISOString(),
    location: "University Stadium",
    colorCode: "#8B5CF6",
    type: "Event",
  },
  {
    id: "5",
    title: "Research Paper Submission Deadline",
    description: "Final date for research paper submissions for international conference.",
    startDate: addDays(new Date(), 12).toISOString(),
    location: "Online Portal",
    colorCode: "#F59E0B",
    type: "Deadline",
  },
  {
    id: "6",
    title: "Convocation Ceremony",
    description: "Annual convocation ceremony for graduating students.",
    startDate: addDays(new Date(), 15).toISOString(),
    location: "Main Auditorium",
    colorCode: "#EC4899",
    type: "Ceremony",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const HolidayWebPlanner: React.FC = () => {
  const { theme } = useContext(AppContext)!;

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvents, setSelectedEvents] = useState<EventModel[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "week">("month");

  /* ===================== HELPERS ===================== */
  const getEventsForDay = (day: Date) =>
    EVENTS.filter((e) => isSameDay(new Date(e.startDate), day));

  useEffect(() => {
    setSelectedEvents(getEventsForDay(selectedDate));
  }, [selectedDate]);

  const getDayClass = (day: Date, isCurrentMonth: boolean, isSelected: boolean, isTodayDate: boolean) => {
    const baseClasses = `
      relative w-full aspect-square flex flex-col items-center justify-center
      rounded-lg transition-all duration-200 cursor-pointer border
    `;

    if (isSelected) {
      return `${baseClasses} bg-blue-500 text-white border-blue-600`;
    }

    if (isTodayDate) {
      return `${baseClasses} ${theme === "dark" ? "bg-blue-900/30 border-blue-700" : "bg-blue-50 border-blue-200"} text-blue-600`;
    }

    if (!isCurrentMonth) {
      return `${baseClasses} ${theme === "dark" ? "text-gray-700 border-gray-800" : "text-gray-400 border-gray-200"}`;
    }

    return `${baseClasses} ${theme === "dark" ? "hover:bg-gray-800/50 text-gray-200 border-gray-700" : "hover:bg-gray-100 text-gray-800 border-gray-200"}`;
  };

  /* ===================== CALENDAR HEADER ===================== */
  const CalendarHeader = () => (
    <div className="flex items-center justify-between mb-6">
      <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className={`p-2 rounded-lg transition-colors border ${
              theme === "dark" 
                ? "hover:bg-gray-800 text-gray-400 border-gray-700" 
                : "hover:bg-gray-200 text-gray-600 border-gray-300"
            }`}
          >
            <FaChevronLeft size={14} />
          </button>
          <button
            onClick={() => {
              setCurrentMonth(new Date());
              setSelectedDate(new Date());
            }}
            className={`px-3 py-1 text-sm rounded-lg transition-colors border ${
              theme === "dark" 
                ? "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700" 
                : "bg-gray-200 hover:bg-gray-300 text-gray-700 border-gray-300"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className={`p-2 rounded-lg transition-colors border ${
              theme === "dark" 
                ? "hover:bg-gray-800 text-gray-400 border-gray-700" 
                : "hover:bg-gray-200 text-gray-600 border-gray-300"
            }`}
          >
            <FaChevronRight size={14} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("month")}
            className={`px-3 py-1 text-sm rounded-lg transition-colors border ${
              viewMode === "month"
                ? theme === "dark"
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-blue-500 text-white border-blue-600"
                : theme === "dark"
                ? "text-gray-400 hover:bg-gray-800 border-gray-700"
                : "text-gray-600 hover:bg-gray-200 border-gray-300"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setViewMode("week")}
            className={`px-3 py-1 text-sm rounded-lg transition-colors border ${
              viewMode === "week"
                ? theme === "dark"
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-blue-500 text-white border-blue-600"
                : theme === "dark"
                ? "text-gray-400 hover:bg-gray-800 border-gray-700"
                : "text-gray-600 hover:bg-gray-200 border-gray-300"
            }`}
          >
            Week
          </button>
        </div>
      </div>
    </div>
  );

  /* ===================== DAYS HEADER ===================== */
  const DaysHeader = () => (
    <div className="grid grid-cols-7 mb-2">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
        <div
          key={index}
          className={`text-center text-xs font-medium py-2 ${
            theme === "dark" ? "text-gray-500" : "text-gray-600"
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  );

  /* ===================== CALENDAR GRID ===================== */
  const CalendarGrid = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows: JSX.Element[] = [];
    let days: JSX.Element[] = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const dayEvents = getEventsForDay(cloneDay);
        const isTodayDate = isToday(cloneDay);
        const isSelected = isSameDay(cloneDay, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);
        
        days.push(
          <motion.button
            key={day.toString()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedDate(cloneDay);
              setSelectedEvents(getEventsForDay(cloneDay));
            }}
            className={getDayClass(cloneDay, isCurrentMonth, isSelected, isTodayDate)}
          >
            <span className={`text-sm font-medium ${isSelected ? "text-white" : ""}`}>
              {format(day, "d")}
            </span>
            {isTodayDate && !isSelected && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full" />
            )}
            {dayEvents.length > 0 && (
              <div className="absolute bottom-1 flex gap-0.5">
                {dayEvents.slice(0, 3).map((event, idx) => (
                  <div
                    key={idx}
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: event.colorCode || "#6B7280" }}
                  />
                ))}
              </div>
            )}
          </motion.button>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1 mb-1">
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div className="relative min-h-[400px]">
        {/* Calendar Background Image */}
        <img
          src={calendarBg}
          alt="Calendar background"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none rounded-lg"
        />
        <div className="relative z-10 p-1">{rows}</div>
      </div>
    );
  };

  /* ===================== EVENT ITEM ===================== */
  const EventItem = ({ event }: { event: EventModel }) => {
    const expanded = expandedId === event.id;
    const eventDate = new Date(event.startDate);
    const isPast = isBefore(eventDate, new Date());

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-lg p-3 mb-2 border-l-4 border ${
          theme === "dark" ? "bg-gray-800/30 border-gray-700" : "bg-gray-50 border-gray-200"
        } ${isPast ? "opacity-75" : ""}`}
        style={{ borderLeftColor: event.colorCode || "#3B82F6" }}
      >
        <div 
          className="flex items-start justify-between cursor-pointer"
          onClick={() => setExpandedId(expanded ? null : event.id)}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: event.colorCode || "#3B82F6" }}
              />
              <h3 className={`font-medium text-sm truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {event.title}
              </h3>
              <span className={`px-1.5 py-0.5 rounded text-xs border ${
                theme === "dark" ? "bg-gray-700 text-gray-300 border-gray-600" : "bg-gray-200 text-gray-600 border-gray-300"
              }`}>
                {event.type}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className={`flex items-center gap-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                <FaClock size={10} />
                <span>{format(eventDate, "h:mm a")}</span>
              </div>
              {event.location && (
                <div className={`flex items-center gap-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  <FaMapMarkerAlt size={10} />
                  <span className="truncate">{event.location}</span>
                </div>
              )}
            </div>
          </div>
          <button className={`ml-2 p-1 rounded border ${
            theme === "dark" ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-200"
          }`}>
            {expanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
          </button>
        </div>
        
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
            >
              <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                {event.description}
              </p>
              {event.endDate && (
                <div className="mt-2 text-xs text-gray-500">
                  Ends: {format(new Date(event.endDate), "MMM d, h:mm a")}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  /* ===================== RENDER ===================== */
  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* HERO SECTION */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto sm:px-6 lg:px-8 py-8 text-center"
      >
        <div className="max-w-8xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-0 sm:px-4 py-2 rounded-full bg-blue-50 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
              Holiday Planner
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900 dark:text-white">Institutional </span>
            <span className="relative inline-block sm:ml-2">
              <span className="text-blue-600 dark:text-blue-500 relative z-10">
                 Calender
              </span>
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom-0 w-full h-3"
              />
            </span>
            <br />
            <span className="text-gray-900 dark:text-white"></span>
          </h1>

          <p className="text-sm md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Plan your academic year with our comprehensive holiday schedule. 
            Stay updated with all administrative and academic holidays.
          </p>
        </div>
      </motion.div>

      {/* CONTENT SECTION */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CALENDAR SECTION */}
          <div className={`lg:col-span-2 rounded-xl p-5 border ${
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}>
            <CalendarHeader />
            <DaysHeader />
            <CalendarGrid />
          </div>

          {/* EVENTS SECTION */}
          <div className={`rounded-xl p-5 border ${theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border ${
                  theme === "dark" ? "bg-blue-900/30 border-blue-800" : "bg-blue-50 border-blue-200"
                }`}>
                  <FaCalendarAlt className="text-blue-500" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {format(selectedDate, "EEEE")}
                  </h3>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    {format(selectedDate, "MMMM d, yyyy")}
                  </p>
                </div>
              </div>
              {isSameDay(selectedDate, new Date()) && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                  theme === "dark" 
                    ? "bg-green-900/30 text-green-400 border-green-800" 
                    : "bg-green-100 text-green-700 border-green-200"
                }`}>
                  Today
                </span>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className={`font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Events
                  <span className={`ml-2 text-sm ${
                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                  }`}>
                    ({selectedEvents.length})
                  </span>
                </h4>
                
              </div>

              <div className="max-h-[300px] overflow-y-auto pr-2">
                {selectedEvents.length === 0 ? (
                  <div className={`text-center py-8 rounded-lg border ${
                    theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
                  }`}>
                    <div className="text-3xl mb-3">📅</div>
                    <p className={`font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                      No events scheduled
                    </p>
                    <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                      Add events to stay organized
                    </p>
                  </div>
                ) : (
                  selectedEvents.map((event) => (
                    <EventItem key={event.id} event={event} />
                  ))
                )}
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayWebPlanner;