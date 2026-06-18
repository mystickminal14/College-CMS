// MessagesList.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import decoration from "../../../assets/decoration.webp";
import { fadeUp } from "../../comp/animation";
import { getAllMessages } from "./messagesData";

const MessagesList = () => {
  const messages = getAllMessages();

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-8xl mx-auto text-center"
        >
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
            <span className="text-blue-600 font-medium text-sm">
              Student Access Portal
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Messages from </span>
            <span className="relative inline-block">
              <span className="text-blue-600 relative z-10"> Leadership</span>
              <motion.img
                src={decoration}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom-0 w-full h-3"
              />
            </span>
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
            Read inspiring messages from our leadership team about our vision, mission, and commitment to your success.
          </p>
        </motion.div>

        {/* Messages Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * message.id }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={`/messages/${message.id}`} className="block">
                <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{message.position}</h3>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {message.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                      {message.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{message.name}</h4>
                      <p className="text-gray-600 text-sm">{message.institution}</p>
                    </div>
                  </div>

                  <h5 className="font-semibold text-lg text-gray-800 mb-3">{message.title}</h5>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {message.message.substring(0, 150)}...
                  </p>

                  <div className="text-blue-600 font-medium flex items-center gap-2">
                    Read Full Message
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesList;