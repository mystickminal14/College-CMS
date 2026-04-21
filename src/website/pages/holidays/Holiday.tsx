import React, { useState, useEffect } from "react";
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
  FaClock,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
  FaCalendarAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import type { JSX } from "react/jsx-runtime";

import { useGetCalender } from "./hook/useGetCalender";
import type { EventModel } from "./model/CalenderModel";

import calendarBg from "../../../assets/butterfiles.webp";
import Seo from "../../../context/seo";
import { APP_URL } from "../../../constants";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";

const HolidayWebPlanner: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvents, setSelectedEvents] = useState<EventModel[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const { data: events = [], isLoading } = useGetCalender({
    p1: "monthly",
    p2: format(currentMonth, "yyyy-MM"),
    p3: null,
  });

  const getEventsForDay = (day: Date) =>
    events.filter((event) => {
      if (!event.startDate) return false;

      const start = new Date(event.startDate);
      const end = event.endDate ? new Date(event.endDate) : start;

      const dayOnly = new Date(day.getFullYear(), day.getMonth(), day.getDate());
      const startOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const endOnly = new Date(end.getFullYear(), end.getMonth(), end.getDate());

      return (
        dayOnly.getTime() === startOnly.getTime() ||
        dayOnly.getTime() === endOnly.getTime() ||
        (dayOnly > startOnly && dayOnly < endOnly)
      );
    });

  useEffect(() => {
    setSelectedEvents(getEventsForDay(selectedDate));
  }, [selectedDate, events]);

  /* ================= IMPROVED HEADER ================= */
  const CalendarHeader = () => (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
      >
        <FaChevronLeft className="text-gray-600" />
      </button>

      <div className="flex items-center gap-2">
        <FaCalendarAlt className="text-blue-500" />
        <h2 className="text-xl font-bold text-gray-800">{format(currentMonth, "MMMM yyyy")}</h2>
      </div>

      <button
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
      >
        <FaChevronRight className="text-gray-600" />
      </button>
    </div>
  );

  /* ================= IMPROVED DAYS HEADER ================= */
  const DaysHeader = () => (
    <div className="grid grid-cols-7 gap-1 mb-3 bg-gray-50 rounded-lg py-3">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
        <div key={d} className="text-center text-sm font-medium text-gray-600">
          {d}
        </div>
      ))}
    </div>
  );

  /* ================= IMPROVED CALENDAR GRID ================= */
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
        const isCurrentMonth = isSameMonth(cloneDay, monthStart);
        const isSelected = isSameDay(cloneDay, selectedDate);
        const isTodayDate = isToday(cloneDay);

        days.push(
          <motion.button
            key={cloneDay.toString()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedDate(cloneDay)}
            className={`
              relative aspect-square rounded-xl flex flex-col items-center justify-center text-sm
              transition-all duration-200
              ${!isCurrentMonth ? "text-gray-400" : "text-gray-800"}
              ${isSelected ? "bg-blue-500 text-white shadow-md" : "hover:bg-gray-100"}
              ${isTodayDate && !isSelected ? "bg-blue-50 border border-blue-200" : ""}
              ${isSelected && isTodayDate ? "ring-2 ring-blue-300" : ""}
            `}
          >
            <span className={`font-medium ${isSelected ? "text-white" : ""}`}>
              {format(cloneDay, "d")}
            </span>

            {dayEvents.length > 0 && (
              <div className="absolute bottom-2 flex gap-1">
                {dayEvents.slice(0, 3).map((event, idx) => (
                  <span
                    key={idx}
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: isSelected ? "#ffffff" : (event.colorCode === "Yellow" ? "#FF8C00" : event.colorCode || "#6B7280"),
                      opacity: isSelected ? 0.9 : 1
                    }}
                  />
                ))}
              </div>
            )}

            {isTodayDate && !isSelected && (
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
            )}
          </motion.button>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-2 mb-2">
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-white to-gray-50/50 border border-gray-200 p-4">
        <img
          src={calendarBg}
          alt="Calendar background"
          className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none"
        />
        <div className="relative z-10">{rows}</div>
      </div>
    );
  };

  const EventItem = ({ event }: { event: EventModel }) => {
    const expanded = expandedId === event.eventId;
    const eventDate = event.startDate ? new Date(event.startDate) : null;
    const isPast = eventDate ? isBefore(eventDate, new Date()) : false;

    return (
      <motion.div
        layout
        className={`rounded-lg p-4 mb-3 border-l-4 shadow-sm cursor-pointer ${isPast ? "opacity-70" : ""}`}
        style={{ borderLeftColor: event.colorCode === "Yellow" ? "#FF8C00" : event.colorCode || "#3B82F6" }}
        onClick={() => setExpandedId(expanded ? null : event.eventId || null)}
      >
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold">{event.eventName}</h3>

            {event.eventType && (
              <span
                className="inline-block text-xs mt-1 px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: event.colorCode === "Yellow" ? "#FF8C00" : event.colorCode || "#3B82F6" }}
              >
                {event.eventType}
              </span>
            )}

            {eventDate && (
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                <FaClock />
                {format(eventDate, "MMM d, yyyy")} {event.startTime}
              </div>
            )}

            {event.location && (
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <FaMapMarkerAlt />
                {event.location}
              </div>
            )}
          </div>

          {expanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 text-sm text-gray-600"
            >
              {event.description}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };
  return (
    <>
      <Seo
        title="Academic Calendar & Holidays | LBEF College Nepal"
        description="View the official academic calendar of LBEF College Nepal including holidays, events, examinations, and important academic dates."
        url={`${APP_URL}/administrative-holidays`}
      />

      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        {/* HERO - Unchanged */}
        <HeroTitleWithGif
          title="Institutional Calendar"
          highlightedText="Calendar"
          subtitle="Explore all upcoming events and holidays to stay prepared, participate actively, and make the most of every opportunity throughout the academic year."
          badgeText="Events & Holidays"
        />

        <div className="max-w-7xl mx-auto px-1 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
                <CalendarHeader />
                <DaysHeader />
                {isLoading ? (
                  <div className="h-[420px] flex flex-col items-center justify-center">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FaCalendarAlt className="text-blue-500 text-xl" />
                      </div>
                    </div>
                    <p className="mt-4 text-gray-600 font-medium">Loading calendar...</p>
                  </div>
                ) : (
                  <CalendarGrid />
                )}
              </div>
            </div>

            {/* Events Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 sticky top-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-lg text-gray-900">
                      {format(selectedDate, "EEEE")}
                    </h3>
                    <span className="text-sm font-medium text-gray-500">
                      {format(selectedDate, "MMM d, yyyy")}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''}
                  </div>
                </div>

                <div className="h-[500px] overflow-y-auto pr-2">
                  {selectedEvents.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <FaCalendarAlt className="text-gray-400 text-xl" />
                      </div>
                      <p className="text-gray-500 font-medium">No events scheduled</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Select another date to view events
                      </p>
                    </div>
                  ) : (
                    selectedEvents.map((event) => (
                      <EventItem key={event.eventId} event={event} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HolidayWebPlanner;