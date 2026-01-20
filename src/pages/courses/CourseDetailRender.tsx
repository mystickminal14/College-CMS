import { motion, type Variants } from "framer-motion";
import { BlockType, type CourseDetailBlock } from "./model/CourseDetailModel";
import {
  Target,
  FileText,
  ListChecks,
  ChevronRight,
} from "lucide-react";

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
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

// Icon animation variants
const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -10 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 12,
    },
  },
};

// Subheading card variants
const subheadingCardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
      duration: 0.7,
    },
  },
};

interface Props {
  blocks: CourseDetailBlock[];
}

const CourseDetailRenderer = ({ blocks }: Props) => {
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

  return (
    <motion.div 
      className="space-y-4 sm:space-y-5"
      variants={scrollContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {blocks
        .sort((a, b) => a.order - b.order)
        .map((block) => {
          if (block.type === BlockType.PARAGRAPH) {
            return (
              <motion.div
                key={block.id}
                variants={scrollItemVariants}
                className="group"
              >
                <div className="flex gap-3 sm:gap-4">
                  <motion.div 
                    className="mt-0.5 shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center"
                    variants={iconVariants}
                  >
                    {getIconForType(block.type)}
                  </motion.div>
                  <div className="flex-1">
                    <motion.p 
                      className="text-sm text-gray-700 leading-relaxed"
                      initial={{ opacity: 0.8 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      {block.content}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            );
          }

          if (block.type === BlockType.LIST) {
            return (
              <motion.div
                key={block.id}
                variants={scrollItemVariants}
                className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="p-3 sm:p-4">
                  {/* Removed header entirely */}
                  
                  <motion.ul 
                    className="space-y-1.5 sm:space-y-2"
                    variants={scrollContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {block.content.map((text, i) => (
                      <motion.li
                        key={i}
                        variants={listItemVariants}
                        className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        {/* Simple bullet point instead of check icon */}
                        <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-emerald-500"></div>
                        <motion.span 
                          className="text-sm text-gray-700 leading-relaxed flex-1"
                          initial={{ opacity: 0.7 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.02 + 0.1 }}
                        >
                          {text}
                        </motion.span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            );
          }

          if (block.type === BlockType.SUBHEADING) {
            return (
              <motion.div 
                key={block.id} 
                variants={subheadingCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-3 sm:space-y-4"
              >
                <motion.div 
                  className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100"
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md"
                      variants={iconVariants}
                    >
                      <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <motion.h4 
                        className="text-sm sm:text-base font-semibold text-gray-900"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        {block.title}
                      </motion.h4>
                    </div>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
                  </div>
                </motion.div>

                {block.children?.length > 0 && (
                  <motion.div 
                    className="pl-2 sm:pl-3 space-y-3 sm:space-y-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <CourseDetailRenderer blocks={block.children} />
                  </motion.div>
                )}
              </motion.div>
            );
          }

          return null;
        })}
    </motion.div>
  );
};

export default CourseDetailRenderer;