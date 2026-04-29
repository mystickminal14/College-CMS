// utils/CourseToc.ts
import { BlockType, type CourseDetailBlock } from "../model/CourseDetailModel";

export interface TocItem {
    id: string;
    label: string;
    order: number;
    level: number; // 1 for heading, 2 for subheading
}

export const buildToc = (blocks: CourseDetailBlock[]): TocItem[] => {
    const tocItems: TocItem[] = [];

    blocks
        .filter(block => block.type === BlockType.HEADING || block.type === BlockType.SUBHEADING)
        .sort((a, b) => a.order - b.order)
        .forEach(block => {
            if (block.type === BlockType.HEADING) {
                tocItems.push({
                    id: `heading-${block.id}`,
                    label: block.title ?? "",
                    order: block.order,
                    level: 1
                });
            } else if (block.type === BlockType.SUBHEADING) {
                tocItems.push({
                    id: `subheading-${block.id}`,
                    label: block.title ?? "",
                    order: block.order,
                    level: 2
                });
            }
        });

    return tocItems;
};