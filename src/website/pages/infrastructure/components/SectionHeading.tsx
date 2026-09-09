import { motion } from "framer-motion";
import decoration from "../../../../assets/decoration.webp";

interface SectionHeadingProps {
  /** Small label above the heading — says what kind of content follows. */
  eyebrow: string;
  /** Text before the highlighted word(s). */
  title: string;
  /** Rendered in blue with the decoration underline. */
  highlightedText: string;
  /** Text after the highlighted word(s). */
  trailing?: string;
  /** Sits beside the heading on desktop, beneath it on mobile. */
  subtitle?: string;
  /** Inverts the palette for the dark ledger band. */
  tone?: "light" | "dark";
  /** Centred headings stack the eyebrow, title and subtitle down the middle. */
  align?: "left" | "center";
}

const SectionHeading = ({
  eyebrow,
  title,
  highlightedText,
  trailing,
  subtitle,
  tone = "light",
  align = "left",
}: SectionHeadingProps) => {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className={`mb-10 md:mb-14 ${centered ? "text-center" : ""}`}
    >
      <div
        className={`flex items-center mb-5 ${centered ? "justify-center" : ""}`}
      >
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
            dark ? "text-blue-300" : "text-blue-600"
          }`}
        >
          {eyebrow}
        </span>
      </div>

      <div
        className={
          centered
            ? "flex flex-col items-center gap-5"
            : "grid gap-5 md:grid-cols-12 md:gap-10 md:items-end"
        }
      >
        <h2
          className={`text-3xl md:text-[2.6rem] font-bold leading-[1.12] tracking-tight ${
            centered ? "max-w-3xl" : "md:col-span-7"
          } ${dark ? "text-white" : "text-[#0B1220]"}`}
        >
          {title}{" "}
          <span className="relative inline-block">
            <span
              className={`relative z-10 ${
                dark ? "text-blue-300" : "text-blue-600"
              }`}
            >
              {highlightedText}
            </span>
            <motion.img
              src={decoration}
              alt=""
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.45 }}
            />
          </span>
          {trailing ? ` ${trailing}` : ""}
        </h2>

        {subtitle && (
          <p
            className={`text-[15px] leading-relaxed ${
              centered ? "max-w-2xl" : "md:col-span-5"
            } ${dark ? "text-white/60" : "text-gray-600"}`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </motion.header>
  );
};

export default SectionHeading;
