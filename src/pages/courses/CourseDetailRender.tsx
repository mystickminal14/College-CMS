import { motion, type Variants } from "framer-motion";
import { BlockType, type CourseDetailBlock } from "./model/CourseDetailModel";
import {
  Target,
  CheckCircle,
  FileText,
  ListChecks,
  ChevronRight,
} from "lucide-react";

// Scroll animation variants
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
  hidden: { opacity: 0, x: -20 },
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
      className="space-y-4 sm:space-y-6"
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
                <div className="p-3 sm:p-5">
                  <motion.div 
                    className="flex items-center gap-3 mb-3 sm:mb-5"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <motion.div 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-linear-to-br from-emerald-50 to-emerald-100 flex items-center justify-center"
                      variants={iconVariants}
                    >
                      <ListChecks className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    </motion.div>
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-gray-900">
                        Key Points
                      </h4>
                      <p className="text-xs text-gray-500">
                        {block.content.length} items
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.ul 
                    className="space-y-2 sm:space-y-3"
                    variants={scrollContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {block.content.map((text, i) => (
                      <motion.li
                        key={i}
                        variants={listItemVariants}
                        className="flex items-start gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <motion.div 
                          className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.03 }}
                        >
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        </motion.div>
                        <motion.span 
                          className="text-sm text-gray-700 leading-relaxed flex-1"
                          initial={{ opacity: 0.7 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.03 + 0.1 }}
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
                className="space-y-4 sm:space-y-6"
              >
                <motion.div 
                  className="p-4 sm:p-5 rounded-lg sm:rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <motion.div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md"
                      variants={iconVariants}
                    >
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <motion.h4 
                        className="text-base font-semibold text-gray-900 truncate"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        {block.title}
                      </motion.h4>
                      <motion.p 
                        className="text-xs text-blue-600 font-medium mt-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        Detailed breakdown
                      </motion.p>
                    </div>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
                  </div>
                </motion.div>

                {block.children?.length > 0 && (
                  <motion.div 
                    className="pl-2 sm:pl-4 space-y-4 sm:space-y-5"
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