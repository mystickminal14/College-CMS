// components/HeroTitleWithGif.jsx
import { motion } from "framer-motion";
import decoration from "../assets/decoration.webp";

interface HeroTitleWithGifProps {
  title: string;
  /**
   * Word(s) inside `title` to pick out in blue. Pass an array to highlight
   * several — every match turns blue, and only the last one carries the
   * decoration underline (e.g. ["Stories", "Insights"] in
   * "Explore Our Stories, Ideas & Insights").
   */
  highlightedText?: string | string[];
  subtitle?: string;
  /** Accepted for call-site compatibility; no badge is rendered. */
  badgeText?: string;
  /** Accepted for call-site compatibility; no badge is rendered. */
  gifSrc?: string;
  /** Accepted for call-site compatibility; no badge is rendered. */
  showBadge?: boolean;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  showDecoration?: boolean;
  children?: React.ReactNode;
}

/** Escapes a highlight word so it can be dropped into a RegExp verbatim. */
const escapeForRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const HeroTitleWithGif = ({
  title,
  highlightedText,
  subtitle,
  className = "",
  containerClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  showDecoration = true,
  children,
}: HeroTitleWithGifProps) => {
  const renderTitle = () => {
    const highlights = (
      Array.isArray(highlightedText) ? highlightedText : [highlightedText]
    ).filter((word): word is string => Boolean(word && word.trim()));

    if (highlights.length === 0) {
      return <span className="text-gray-900">{title}</span>;
    }

    // Splitting on a capturing group keeps the matched words in the output, so
    // the title survives intact whether or not every highlight is present.
    const pattern = new RegExp(
      `(${highlights.map(escapeForRegExp).join("|")})`,
      "g"
    );
    const segments = title.split(pattern).filter((segment) => segment !== "");
    const isHighlight = (segment: string) =>
      highlights.some((word) => word === segment);
    const lastHighlightIndex = segments.reduce(
      (last, segment, index) => (isHighlight(segment) ? index : last),
      -1
    );

    if (lastHighlightIndex === -1) {
      return <span className="text-gray-900">{title}</span>;
    }

    return (
      <>
        {segments.map((segment, index) => {
          if (!isHighlight(segment)) {
            return (
              <span key={index} className="text-gray-900">
                {segment}
              </span>
            );
          }

          // Only the final highlighted word gets the brush underline.
          const underlined = index === lastHighlightIndex;

          return (
            <span key={index} className="relative inline-block">
              <span className="text-blue-600 relative z-10">{segment}</span>
              {showDecoration && underlined && (
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
          );
        })}
      </>
    );
  };

  return (
    <div className={`relative ${className}`}>
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
