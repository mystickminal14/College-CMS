import { motion, type Variants } from "framer-motion";
import { BlockType, type CourseDetailBlock } from "./model/CourseDetailModel";

interface Props {
  blocks: CourseDetailBlock[];
}

/* Child animation */
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
};

const CourseDetailRenderer = ({ blocks }: Props) => {
  return (
    <div className="space-y-4">
      {blocks
        .sort((a, b) => a.order - b.order)
        .map((block) => {
          if (block.type === BlockType.PARAGRAPH) {
            return (
              <motion.p
                key={block.id}
                variants={item}
                className="text-sm text-gray-700 leading-relaxed"
              >
                {block.content}
              </motion.p>
            );
          }

          if (block.type === BlockType.LIST) {
            return (
              <motion.ul
                key={block.id}
                variants={item}
                className="list-disc pl-5 space-y-2 text-sm text-gray-700"
              >
                {block.content.map((text, i) => (
                  <li key={i}>{text}</li>
                ))}
              </motion.ul>
            );
          }

          if (block.type === BlockType.SUBHEADING) {
            return (
              <motion.div key={block.id} variants={item} className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">
                  {block.title}
                </h4>

                {block.children?.length > 0 && (
                  <CourseDetailRenderer blocks={block.children} />
                )}
              </motion.div>
            );
          }

          return null;
        })}
    </div>
  );
};

export default CourseDetailRenderer;
