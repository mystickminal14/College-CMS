// src/pages/courses/CourseDetailRender.tsx
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { BlockType, type CourseDetailBlock } from "./model/CourseDetailModel";
import {
  Target,
  FileText,
  ListChecks,
  ChevronRight,
  BookOpen,
} from "lucide-react";

/* ---------------- VARIANTS ---------------- */

const scrollContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const scrollItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15, mass: 0.8 },
  },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -10 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 12 },
  },
};

const subheadingCardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 18, duration: 0.7 },
  },
};

/* ---------------- HELPERS ---------------- */

const getIconForType = (type: BlockType) => {
  switch (type) {
    case BlockType.PARAGRAPH:
      return <FileText className="w-4 h-4 text-blue-600" />;
    case BlockType.LIST:
      return <ListChecks className="w-4 h-4 text-emerald-600" />;
    case BlockType.SUBHEADING:
      return <Target className="w-4 h-4 text-indigo-600" />;
    default:
      return <FileText className="w-4 h-4 text-blue-600" />;
  }
};

const isShortTextList = (items: string[]) => {
  const WORD_LIMIT = 8;
  return items.every((item) => item.split(" ").length <= WORD_LIMIT);
};

/* ---------------- COMPONENT ---------------- */

interface Props {
  // Allow null / undefined so callers don't need to guard before passing
  blocks?: CourseDetailBlock[] | null;
}

const CourseDetailRenderer = ({ blocks }: Props) => {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ── KEY FIX: treat missing / null blocks as an empty array ──
  const safeBlocks: CourseDetailBlock[] = Array.isArray(blocks) ? blocks : [];

  if (safeBlocks.length === 0) return null;

  return (
    <motion.div
      className="space-y-4 sm:space-y-5"
      variants={scrollContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {safeBlocks
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((block) => {
          /* ---------------- PARAGRAPH ---------------- */
          if (block.type === BlockType.PARAGRAPH) {
            // content can be null from the API
            const text = (block.content as string | null) ?? "";

            return (
              <motion.div key={block.id} variants={scrollItemVariants} className="group">
                <div className="flex gap-3 sm:gap-4">
                  <motion.div
                    className="mt-0.5 shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-lg
                               bg-linear-to-br from-blue-50 to-blue-100
                               flex items-center justify-center"
                    variants={iconVariants}
                  >
                    {getIconForType(block.type)}
                  </motion.div>

                  <motion.p className="text-sm text-gray-700 leading-relaxed">
                    {text}
                  </motion.p>
                </div>
              </motion.div>
            );
          }

          /* ---------------- LIST ---------------- */
          if (block.type === BlockType.LIST) {
            // ── KEY FIX: content can be null; children may hold sub-blocks ──
            const items: string[] = Array.isArray(block.content)
              ? block.content
              : [];

            const children: CourseDetailBlock[] = Array.isArray(
              (block as any).children
            )
              ? (block as any).children
              : [];

            // Case A: grouped list (title + children, no flat content)
            if (items.length === 0 && children.length > 0) {
              return (
                <motion.div
                  key={block.id}
                  variants={subheadingCardVariants}
                  className="space-y-2"
                >
                  {block.title && (
                    <p className="text-sm font-semibold text-gray-700 px-1">
                      {block.title}
                    </p>
                  )}
                  <div className="pl-2 sm:pl-4 space-y-3">
                    <CourseDetailRenderer blocks={children} />
                  </div>
                </motion.div>
              );
            }

            // Case B: normal flat list (may be empty — render nothing)
            if (items.length === 0) return null;

            const shouldSplit =
              items.length > 5 && isShortTextList(items);

            return (
              <motion.div
                key={block.id}
                variants={scrollItemVariants}
                className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm"
              >
                {block.title && (
                  <div className="px-3 sm:px-4 pt-3 pb-1">
                    <p className="text-sm font-semibold text-gray-700">
                      {block.title}
                    </p>
                  </div>
                )}
                <div className="p-3 sm:p-4">
                  <motion.ul
                    className={
                      shouldSplit
                        ? "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2"
                        : "space-y-1.5 sm:space-y-2"
                    }
                    variants={scrollContainerVariants}
                  >
                    {items.map((text, i) => (
                      <motion.li
                        key={i}
                        variants={listItemVariants}
                        className="flex items-start gap-2"
                      >
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <span className="text-sm text-gray-700">{text}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            );
          }

          /* ---------------- SUBHEADING (expandable) ---------------- */
          if (block.type === BlockType.SUBHEADING) {
            const isOpen = openMap[String(block.id)];
            // ── KEY FIX: children can be null / undefined ──
            const children: CourseDetailBlock[] = Array.isArray(
              block.children
            )
              ? block.children
              : [];

            return (
              <motion.div
                key={block.id}
                variants={subheadingCardVariants}
                className="space-y-2"
              >
                {/* HEADER BUTTON */}
                <button
                  type="button"
                  onClick={() => block.id && toggle(String(block.id))}
                  className="w-full text-left p-3 sm:p-4 rounded-lg sm:rounded-xl
                             bg-linear-to-r from-blue-50 to-indigo-50
                             border border-blue-100 flex items-center gap-3"
                >
                  <motion.div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl
                               bg-linear-to-br from-blue-500 to-indigo-600
                               flex items-center justify-center shadow-md shrink-0"
                    variants={iconVariants}
                  >
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.div>

                  <span className="flex-1 text-sm sm:text-base font-semibold text-gray-900">
                    {block.title}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  >
                    <ChevronRight className="w-4 h-4 text-blue-500" />
                  </motion.div>
                </button>

                {/* COLLAPSIBLE CONTENT */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden pl-2 sm:pl-4"
                >
                  {isOpen && children.length > 0 && (
                    <div className="pt-2 space-y-3">
                      <CourseDetailRenderer blocks={children} />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          }

          return null;
        })}
    </motion.div>
  );
};

export default CourseDetailRenderer;