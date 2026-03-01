import { BlockType, type ContentCategory, type CourseDetailBlock } from "../../courses/model/CourseDetailModel";
import BlockItem from "./BlockItem";

interface Props {
  blocks: CourseDetailBlock[];
  onChange: (blocks: CourseDetailBlock[]) => void;
  root?: boolean; // if true, only Heading allowed
  allowSubheading?: boolean;
   category: ContentCategory; // 
}

const BlockEditor = ({ blocks, onChange, root = true, allowSubheading = true ,category}: Props) => {
  const addBlock = (type: BlockType) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const order = blocks.length;

    let newBlock: CourseDetailBlock;
     if (type === BlockType.HEADING) {
      newBlock = { id, type, order, title: "", children: [], category };
    } else if (type === BlockType.SUBHEADING) {
      newBlock = { id, type, order, title: "", children: [], category };
    } else if (type === BlockType.PARAGRAPH) {
      newBlock = { id, type, order, content: "", category };
    } else {
      newBlock = { id, type, order, content: [], category };
    }

    onChange([...blocks, newBlock]);
  };

  const availableBlocks = root
    ? [BlockType.HEADING]
    : allowSubheading
      ? [BlockType.SUBHEADING, BlockType.PARAGRAPH, BlockType.LIST]
      : [BlockType.PARAGRAPH, BlockType.LIST];

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