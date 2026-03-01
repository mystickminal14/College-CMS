import { useState } from "react";
import ListEditor from "./ListEditor";
import BlockEditor from "./BlockEditor";
import { BlockType, type CourseDetailBlock } from "../../courses/model/CourseDetailModel";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  block: CourseDetailBlock;
  onUpdate: (block: CourseDetailBlock) => void;
  onDelete: () => void;
}

const BlockItem = ({ block, onUpdate, onDelete }: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  const isHeading = block.type === BlockType.HEADING || block.type === BlockType.SUBHEADING;

  const allowSubheadingInChild = block.type === BlockType.HEADING;

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className={`font-semibold px-2 py-1 rounded text-sm ${
            block.type === BlockType.HEADING
              ? "bg-blue-100 text-blue-700"
              : block.type === BlockType.SUBHEADING
              ? "bg-green-100 text-green-700"
              : block.type === BlockType.PARAGRAPH
              ? "bg-gray-100 text-gray-700"
              : "bg-yellow-100 text-yellow-700"
          }`}>
            {block.type}
          </span>
          {isHeading && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="ml-2 text-gray-500 hover:text-gray-700 transition"
            >
              {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          )}
        </div>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 transition"
        >
          Delete
        </button>
      </div>

      {!collapsed && (
        <>
          {isHeading && (
            <input
              placeholder="Enter title..."
              value={block.title ?? ""}
              onChange={(e) => onUpdate({ ...block, title: e.target.value })}
              className="w-full border rounded px-3 py-2 mb-3 focus:ring-1 focus:ring-blue-400"
            />
          )}

          {block.type === BlockType.PARAGRAPH && (
            <textarea
              placeholder="Enter paragraph..."
              value={block.content as string}
              onChange={(e) => onUpdate({ ...block, content: e.target.value })}
              className="w-full border rounded px-3 py-2 mb-3 focus:ring-1 focus:ring-blue-400"
            />
          )}

          {block.type === BlockType.LIST && (
            <ListEditor
              items={block.content as string[]}
              onChange={(items) => onUpdate({ ...block, content: items })}
            />
          )}

          {isHeading && (
            <div className="ml-6 mt-4 border-l border-gray-200 pl-4">
              <BlockEditor
              category={block.category}
                blocks={block.children}
                onChange={(children) => onUpdate({ ...block, children })}
                root={false}
                allowSubheading={allowSubheadingInChild}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlockItem