// model/CourseDetailModel.ts
export const BlockType = {
  HEADING: "HEADING",
  SUBHEADING: "SUBHEADING",
  PARAGRAPH: "PARAGRAPH",
  LIST: "LIST",
} as const;

export type BlockType = (typeof BlockType)[keyof typeof BlockType];

interface BaseBlock {
  id: number;
  order: number;
  type: BlockType;
}

export interface HeadingBlock extends BaseBlock {
  type: typeof BlockType.HEADING;
  title: string;
  children: CourseDetailBlock[];
  content?: never;
}

export interface SubHeadingBlock extends BaseBlock {
  type: typeof BlockType.SUBHEADING;
  title: string;
  children: CourseDetailBlock[];
  content?: never;
}

export interface ParagraphBlock extends BaseBlock {
  type: typeof BlockType.PARAGRAPH;
  content: string;
  children?: never;
  title?: never;
}

export interface ListBlock extends BaseBlock {
  type: typeof BlockType.LIST;
  content: string[];
  children?: never;
  title?: never;
}

export type CourseDetailBlock = HeadingBlock | SubHeadingBlock | ParagraphBlock | ListBlock;

export interface UpdateBlockData {
  id: number;
  type: BlockType;
  title?: string;
  content?: string | string[] | null;
  order?: number;
  children?: CourseDetailBlock[];
}