// utils/CourseToc.ts

import { BlockType, type CourseDetailBlock } from "../courses/model/CourseDetailModel";

export interface TocItem {
  id: string;
  label: string;
  order: number;
  level: number;
}

export const buildToc = (blocks: CourseDetailBlock[] = []): TocItem[] => {
  const tocItems: TocItem[] = [];

  const processBlock = (block: CourseDetailBlock, level: number) => {
    if (block.type === BlockType.HEADING || block.type === BlockType.SUBHEADING) {
      tocItems.push({
        id: `${block.type.toLowerCase()}-${block.id}`,
        label: block.title || "Untitled",
        order: block.order,
        level,
      });
    }

    // Process children
    if (block.children && block.children.length > 0) {
      block.children.forEach(child => {
        processBlock(child, level + 1);
      });
    }
  };

  // Process all top-level blocks
  blocks.forEach(block => {
    processBlock(block, 1);
  });

  // Sort by order
  return tocItems.sort((a, b) => a.order - b.order);
};