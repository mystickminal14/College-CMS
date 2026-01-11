import { motion, AnimatePresence } from "framer-motion";
import pankajImage from "../../../assets/core/jalan.webp";
import prakashImage from "../../../assets/core/prakash.webp";
import paramjeetImage from "../../../assets/core/drparam.webp";
import hockuanImage from "../../../assets/core/prof.webp";
import { getMessageById } from "./messagesData";
import { X } from "lucide-react";
import { useEffect } from "react";

const MessageDetail = ({
  messageId,
  onClose,
}: {
  messageId: number;
  onClose: () => void;
}) => {
  const message = getMessageById(messageId);

  // ESC key close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!message) return null;

  const getImage = (id: number) => {
    switch (id) {
      case 1:
        return pankajImage;
      case 2:
        return prakashImage;
      case 3:
        return paramjeetImage;
      case 4:
        return hockuanImage;
      default:
        return pankajImage;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.95, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 30 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl mx-4 
                     bg-white rounded-2xl shadow-xl
                     max-h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20
                       p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{message.title}</h2>
                <p className="text-blue-100 text-sm mt-1">
                  From the {message.position}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{message.badge}</span>
              </div>
            </div>
          </div>
          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto flex-1">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile */}
              <div className="lg:w-1/3">
                <img
                  src={getImage(message.id)}
                  alt={message.name}
                  className="
                  mx-auto
                  w-full
                  max-w-[220px] sm:max-w-full
                  h-[220px] sm:h-auto
                  object-top
                  object-cover

                  rounded-xl
                "
                />

                <div className="text-center mt-2 sm:mt-3">

                  <h3 className="font-bold">{message.name}</h3>
                  <p className="text-sm text-blue-600">{message.position}</p>
                  <p className="text-xs text-gray-500">
                    {message.institution}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div className="lg:w-2/3 space-y-4 text-gray-700">
                <p className="font-semibold text-blue-700">
                  {message.greeting}
                </p>

                {message.message.split("\n\n").map((p, i) => (
                  <p key={i} className="leading-relaxed">
                    {p}
                  </p>
                ))}

                {message.quote && (
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="italic font-medium">
                      "{message.quote}"
                    </p>
                  </div>
                )}
                <div className="pt-6 mt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-gray-900">{message.name}</p>
                      <p className="text-gray-600 text-sm">
                        {message.position}, {message.institution}
                      </p>
                    </div>
                    <div className="text-gray-500 text-sm">
                      {new Date().toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MessageDetail;
