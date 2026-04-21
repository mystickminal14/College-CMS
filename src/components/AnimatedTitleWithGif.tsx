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
  badgeText = "Latest Updates & Announcements",
  gifSrc = butterflyGif,
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
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={gifSrc}
          alt="background decoration"
          className="w-full h-full object-cover"
        />
      </div>

      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10 ${containerClassName}`}>
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

              {/* Butterfly icon */}
              <svg width="46" height="46" viewBox="0 0 52 52" fill="none">
                <path d="M26 28 C20 10,2 6,2 18 C2 26,14 28,26 28Z" fill="#bfdbfe" stroke="#2563eb" strokeWidth="0.7" />
                <path d="M26 28 C16 34,4 46,8 50 C12 53,22 44,26 28Z" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.5" />
                <path d="M26 28 C32 10,50 6,50 18 C50 26,38 28,26 28Z" fill="#bfdbfe" stroke="#2563eb" strokeWidth="0.7" />
                <path d="M26 28 C36 34,48 46,44 50 C40 53,30 44,26 28Z" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.5" />
                <ellipse cx="26" cy="28" rx="2" ry="11" fill="#1e40af" />
                <path d="M25 17 C22 9,17 5,15 2" fill="none" stroke="#1e40af" strokeWidth="0.9" strokeLinecap="round" />
                <circle cx="15" cy="2" r="1.8" fill="#1e40af" />
                <path d="M27 17 C30 9,35 5,37 2" fill="none" stroke="#1e40af" strokeWidth="0.9" strokeLinecap="round" />
                <circle cx="37" cy="2" r="1.8" fill="#1e40af" />
                <circle cx="17" cy="20" r="2.2" fill="#3b82f6" opacity="0.45" />
                <circle cx="35" cy="20" r="2.2" fill="#3b82f6" opacity="0.45" />
                <circle cx="13" cy="37" r="1.5" fill="#6366f1" opacity="0.35" />
                <circle cx="39" cy="37" r="1.5" fill="#6366f1" opacity="0.35" />
              </svg>

              <div className="flex flex-col gap-0.5 relative z-10">
                <span className="text-sm font-medium text-blue-900">{badgeText}</span>
              </div>
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