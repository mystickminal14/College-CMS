import React, { useContext, useState } from "react";
import type { EventModel } from "../model/CalenderModel";
import { FaUser, FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import { AppContext } from "../../../../context/ContextApp";
import { parseDate } from "../../../../utils/ParseDate";

const EventCard: React.FC<{ event: EventModel }> = ({ event }) => {
  const [open, setOpen] = useState(false);
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("AppContext not found");
  const { theme } = appContext;

  return (
    <>
      {/* Event Card */}
      <div
        className={`border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition cursor-pointer flex gap-2 sm:gap-3 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
            : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
        }`}
        onClick={() => setOpen(true)}
      >
        <FaRegCalendarAlt
          className="text-xl sm:text-2xl mt-1 shrink-0"
          style={{ color: event.colorCode || "#3B82F6" }}
        />
        <div className="flex-1 flex flex-col min-w-0">
          {event.startDate && (
            <p
              className={`text-xs sm:text-sm font-medium ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            >
              {parseDate(event.startDate)}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
            <h3
              className={`font-bold sm:text-base text-sm ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {event.eventName ?? "Untitled Event"}
            </h3>
            {event.eventType && (
              <div
                className="px-2 py-1 rounded text-white text-[10px] sm:text-xs font-semibold whitespace-nowrap"
                style={{ backgroundColor: event.colorCode || "#3B82F6" }}
              >
                {event.eventType}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs sm:text-sm">
            {event.organizerName && (
              <span className="flex items-center">
                <FaUser
                  className={`mr-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={12}
                />
                {event.organizerName}
              </span>
            )}
            {event.location && (
              <span className="flex items-center">
                <FaMapMarkerAlt
                  className={`mr-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={12}
                />
                {event.location}
              </span>
            )}
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-2">
          <div
            className={`w-full max-w-lg sm:rounded-xl rounded-lg shadow-lg p-4 sm:p-6 relative max-h-[85vh] overflow-y-auto ${
              theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
            }`}
          >
            <button
              onClick={() => setOpen(false)}
              className={`absolute top-2 right-2 sm:top-3 sm:right-3 text-lg sm:text-xl hover:text-gray-800 ${
                theme === "dark" ? "text-gray-400 hover:text-gray-200" : "text-gray-500"
              }`}
            >
              ✖
            </button>

            <h2
              className={`text-base sm:text-lg font-bold mb-4 ${
                theme === "dark" ? "text-blue-400" : "text-blue-700"
              }`}
            >
              {event.eventName ?? "Untitled Event"}
            </h2>

            <div className="space-y-3 text-xs sm:text-sm">
              {event.eventType && <DetailRow label="Event Type" value={event.eventType} />}
              {event.startDate && <DetailRow label="Start Date" value={parseDate(event.startDate)} />}
              {event.endDate && <DetailRow label="End Date" value={parseDate(event.endDate)} />}
              {event.startTime && event.endTime && (
                <DetailRow label="Time" value={`${event.startTime} - ${event.endTime}`} />
              )}
              {event.location && <DetailRow label="Location" value={event.location} />}
              {event.organizerName && <DetailRow label="Organizer" value={event.organizerName} />}
              {event.organizerEmail && <DetailRow label="Organizer Email" value={event.organizerEmail} />}
              {event.organizerMobile && <DetailRow label="Organizer Mobile" value={event.organizerMobile} />}
              {event.eventContactName && <DetailRow label="Contact Name" value={event.eventContactName} />}
              {event.eventContactMobile && <DetailRow label="Contact Mobile" value={event.eventContactMobile} />}
              {event.eventContactEmail && <DetailRow label="Contact Email" value={event.eventContactEmail} />}
              {event.status && <DetailRow label="Status" value={event.status} />}
              {event.summary && <DetailRow label="Summary" value={event.summary} />}
              {event.description && (
                <div>
                  <p className="font-semibold">Description</p>
                  <p
                    className={`p-2 sm:p-3 rounded text-xs sm:text-sm ${
                      theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-blue-50 border-blue-100"
                    }`}
                  >
                    {event.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex text-xs sm:text-sm flex-wrap">
    <span className="w-28 sm:w-32 font-semibold">{label}</span>
    <span className="flex-1 wrap-break-word">{value}</span>
  </div>
);

export default EventCard;
