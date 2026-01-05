// MessageDetail.tsx
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import decoration from "../../../assets/decoration.png";
import pankajImage from "../../../assets/core/jalan.jpeg";
import prakashImage from "../../../assets/core/prakash.png";
import paramjeetImage from '../../../assets/core/drparam.webp'
import hockuanImage from '../../../assets/core/prof.jpg'

import { fadeUp } from "../../comp/animation";
import {  getMessageById } from "./messagesData";

const MessageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const message = id ? getMessageById(id) : undefined;
  
  if (!message) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Message Not Found</h1>
          <Link to="/messages" className="text-blue-600 hover:text-blue-800">
            Go back to all messages
          </Link>
        </div>
      </div>
    );
  }

  // Get image based on ID
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
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-8xl mx-auto"
        >
          {/* Navigation and Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100"
            >
              <motion.span 
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
              />
              Messages
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-8">
              <span className="text-gray-900">Message from </span>
              <span className="relative inline-block">
                <span className="text-blue-600 relative z-10"> {message.position}</span>
                <motion.img
                  src={decoration}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom-0 w-full h-3"
                />
              </span>
            </h1>
          </div>

  
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
        >
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

          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Section */}
              <div className="lg:w-1/3">
                <div className="rounded-xl overflow-hidden border-4 border-white shadow-lg mb-4">
                  <img
                    src={getImage(message.id)}
                    alt={message.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{message.name}</h3>
                  <p className="text-blue-600 font-semibold text-sm">{message.position}</p>
                  <p className="text-gray-600 text-sm">{message.institution}</p>
                </div>
              </div>

              {/* Message Content */}
              <div className="lg:w-2/3">
                <div className="space-y-5 text-gray-700">
                  <p className="text-lg font-semibold text-blue-700 mb-2">
                    {message.greeting}
                  </p>
                  
                  {message.message.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  
                  {message.quote && (
                    <div className="bg-blue-50 p-5 rounded-lg mt-6 border-l-4 border-blue-500">
                      <p className="font-semibold text-gray-800 italic">
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MessageDetail;