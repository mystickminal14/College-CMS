// src/pages/courses/model/CourseDetailModel.ts

export const BlockType = {
  HEADING: "HEADING",
  SUBHEADING: "SUBHEADING",
  PARAGRAPH: "PARAGRAPH",
  LIST: "LIST",
} as const;

export type BlockType = (typeof BlockType)[keyof typeof BlockType];

export type ContentCategory =
  | "COURSE_STRUCTURE"
  | "CAREER_OPTIONS"
  | "FEE_STRUCTURE"
  | "ELIGIBLITY_CRITERIA";

interface BaseBlock {
  id: number;
  order: number;
  type: BlockType;
  category: ContentCategory;
}

export interface HeadingBlock extends BaseBlock {
  type: typeof BlockType.HEADING;
  title: string | null;
  children: CourseDetailBlock[];
  content?: null;
}

export interface SubHeadingBlock extends BaseBlock {
  type: typeof BlockType.SUBHEADING;
  title: string | null;
  children: CourseDetailBlock[];
  content?: null;
}

export interface ParagraphBlock extends BaseBlock {
  type: typeof BlockType.PARAGRAPH;
  content: string | null;
  children?: CourseDetailBlock[];
  title?: string | null;
}

// KEY FIX: LIST blocks can have null content AND can have children
// (API returns LIST blocks with title + children instead of a flat content array)
export interface ListBlock extends BaseBlock {
  type: typeof BlockType.LIST;
  content: string[] | null;
  children?: CourseDetailBlock[];
  title?: string | null;
}

export type CourseDetailBlock =
  | HeadingBlock
  | SubHeadingBlock
  | ParagraphBlock
  | ListBlock;

export interface AddBlockPayload {
  courseId: number;
  parentId: number | null;
  type: "SUBHEADING" | "PARAGRAPH" | "LIST";
  title?: string;
  content?: string | string[];
  category: ContentCategory;
}

export interface UpdateBlockData {
  id: number;
  type: BlockType;
  title?: string | null;
  content?: string | string[] | null;
  order?: number;
  children?: CourseDetailBlock[];
  category: ContentCategory;
}