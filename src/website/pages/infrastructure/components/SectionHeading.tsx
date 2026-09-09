import { motion } from "framer-motion";
import decoration from "../../../../assets/decoration.webp";

interface SectionHeadingProps {
  /** Text before the highlighted word(s). */
  title: string;
  /** Rendered in blue with the decoration underline. */
  highlightedText: string;
  /** Text after the highlighted word(s). */
  trailing?: string;
  subtitle?: string;
}

const SectionHeading = ({
  title,
  highlightedText,
  trailing,
  subtitle,
}: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mb-12 text-center"
  >
    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
      {title}{" "}
      <span className="relative inline-block">
        <span className="relative z-10 text-blue-600">{highlightedText}</span>
        <motion.img
          src={decoration}
          alt="Decoration"
          className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-2"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        />
      </span>
      {trailing ? ` ${trailing}` : ""}
    </h2>
    {subtitle && (
      <p className="max-w-2xl mx-auto text-gray-600">{subtitle}</p>
    )}
  </motion.div>
);

export default SectionHeading;
