// components/HeroTitleWithGif.jsx
import { motion } from "framer-motion";
import decoration from "../assets/decoration.webp";
import butterflyGif from "../assets/butter.gif";

interface HeroTitleWithGifProps {
  title: string;
  highlightedText?: string;
  subtitle?: string;
  badgeText?: string;
  gifSrc?: string;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  showBadge?: boolean;
  showDecoration?: boolean;
  children?: React.ReactNode;
}

const HeroTitleWithGif = ({
  title,
  highlightedText,
  subtitle,
  badgeText: _badgeText = "Latest Updates & Announcements",
  gifSrc: _gifSrc = butterflyGif,
  className = "",
  containerClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  showBadge = true,
  showDecoration = true,
  children,
}: HeroTitleWithGifProps) => {

  const renderTitle = () => {
    if (highlightedText) {
      const titleParts = title.split(highlightedText);
      return (
        <>
          <span className="text-gray-900">{titleParts[0]}</span>
          <span className="relative inline-block">
            <span className="text-blue-600 relative z-10">{highlightedText}</span>
            {showDecoration && (
              <motion.img
                src={decoration}
                alt="Decoration"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-2 md:h-3"
                loading="eager"
              />
            )}
          </span>
          <span className="text-gray-900">{titleParts[1] || ""}</span>
        </>
      );
    }

    return (
      <span className="text-gray-900">{title}</span>
    );
  };

  return (
    <div className={`relative ${className}`}>
      {/* GIF BACKGROUND */}
      

      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 relative z-10 ${containerClassName}`}>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge with wavy lines and butterfly icon */}
          {showBadge && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-3 mb-6 relative"
              style={{ padding: "10px 24px 10px 12px" }}
            >
              {/* Wavy blue dashed lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 300 52"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 51 Q50 44 100 49 Q150 54 200 47 Q250 41 300 51"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="0.8"
                  strokeDasharray="5 4"
                  opacity="0.25"
                />
                <path
                  d="M0 1 Q50 8 100 3 Q150 -2 200 5 Q250 11 300 1"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="0.8"
                  strokeDasharray="5 4"
                  opacity="0.25"
                />
                <circle cx="55" cy="50" r="1.8" fill="#3b82f6" opacity="0.4" />
                <circle cx="160" cy="48" r="1.4" fill="#6366f1" opacity="0.35" />
                <circle cx="265" cy="50" r="1.8" fill="#3b82f6" opacity="0.4" />
                <circle cx="100" cy="2" r="1.4" fill="#3b82f6" opacity="0.35" />
                <circle cx="220" cy="3" r="1.8" fill="#6366f1" opacity="0.4" />
              </svg>


             
            </motion.div>
          )}

          {/* Main Title */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold md:mt-8 leading-tight mb-8 ${titleClassName}`}>
            {renderTitle()}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className={`text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed ${subtitleClassName}`}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Optional Children */}
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroTitleWithGif;