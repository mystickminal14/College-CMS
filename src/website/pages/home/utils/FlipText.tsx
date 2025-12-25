import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

type FlipTextProps = {
  text: string;
};

export const FlipText: React.FC<FlipTextProps> = ({ text }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className="relative inline-block overflow-hidden whitespace-nowrap"
      style={{ lineHeight: 0.9 }}
    >
      {/* Top */}
      <span className="block">
        {text.split("").map((char: string, i: number) => (
          <motion.span
            key={i}
            className="inline-block cursor-pointer"
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>

      {/* Bottom */}
      <span className="absolute inset-0 block">
        {text.split("").map((char: string, i: number) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
};
