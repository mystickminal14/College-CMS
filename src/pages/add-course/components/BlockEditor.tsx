// src/add-course/BlockEditor.tsx
import { BlockType, type CourseDetailBlock } from "../../courses/model/CourseDetailModel";
import BlockItem from "./BlockItem";

interface Props {
  blocks: CourseDetailBlock[];
  onChange: (blocks: CourseDetailBlock[]) => void;
  root?: boolean; // if true, only Heading allowed
}

const BlockEditor = ({ blocks, onChange, root = true }: Props) => {
  const addBlock = (type: BlockType) => {
    onChange([
      ...blocks,
      {
        type,
        order: blocks.length,
        title: type !== BlockType.PARAGRAPH && type !== BlockType.LIST ? "" : undefined,
        content: type === BlockType.LIST ? [] : "",
        children: [],
      } as CourseDetailBlock,
    ]);
  };

  const availableBlocks = root
    ? [BlockType.HEADING]
    : [BlockType.SUBHEADING, BlockType.PARAGRAPH, BlockType.LIST];

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <BlockItem
          key={index}
          block={block}
          onUpdate={(updated) => {
            const copy = [...blocks];
            copy[index] = updated;
            onChange(copy);
          }}
          onDelete={() => onChange(blocks.filter((_, i) => i !== index))}
        />
      ))}

      <div className="flex gap-2 flex-wrap">
        {availableBlocks.map((type) => (
          <button
            key={type}
            onClick={() => addBlock(type)}
            className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition"
          >
            + {type.charAt(0) + type.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlockEditor;
