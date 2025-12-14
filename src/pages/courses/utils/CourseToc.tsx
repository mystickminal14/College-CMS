import { BlockType, type CourseDetailBlock } from "../model/CourseDetailModel";

export interface TocItem {
  id: string;
  label: string;
  order: number;
}

export const buildToc = (blocks: CourseDetailBlock[]): TocItem[] => {
  return blocks
    .filter(block => block.type === BlockType.HEADING)
    .sort((a, b) => a.order - b.order)
    .map(block => ({
      id: `heading-${block.id}`,
      label: block.title,
      order: block.order,
    }));
};
