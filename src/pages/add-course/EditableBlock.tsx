import { useEffect, useState } from "react";
import { BlockType, type CourseDetailBlock, type UpdateBlockData } from "../courses/model/CourseDetailModel";
import EditListEditor from "./EditListEditor";
import { Edit2, Save, Trash2, X } from "lucide-react";

interface EditableBlockProps {
  block: CourseDetailBlock;
  onDelete: (block: CourseDetailBlock) => void;
  onUpdate: (updated: UpdateBlockData) => void;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

export const EditableBlock = ({ block, onDelete, onUpdate, sectionRefs }: EditableBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editType, setEditType] = useState<BlockType>(block.type);
  const [editTitle, setEditTitle] = useState<string>(block.title || "");
  const [editContent, setEditContent] = useState<string | string[]>("");
  const [editOrder, setEditOrder] = useState<number>(block.order);

  useEffect(() => {
    if (isEditing) {
      setEditType(block.type);
      setEditOrder(block.order);
      if (block.type === BlockType.HEADING || block.type === BlockType.SUBHEADING) {
        setEditTitle(block.title || "");
        setEditContent("");
      } else if (block.type === BlockType.PARAGRAPH) {
        setEditTitle("");
        setEditContent(block.content as string || "");
      } else if (block.type === BlockType.LIST) {
        setEditTitle("");
        setEditContent(Array.isArray(block.content) ? block.content : []);
      }
    }
  }, [isEditing, block]);

  const handleTypeChange = (newType: BlockType) => {
    setEditType(newType);

    // Reset fields when type changes
    if (newType === BlockType.HEADING || newType === BlockType.SUBHEADING) {
      setEditTitle("");
      setEditContent("");
    } else if (newType === BlockType.PARAGRAPH) {
      setEditContent("");
    } else if (newType === BlockType.LIST) {
      setEditContent([]);
    }
  };

  const handleSave = () => {
    const updatedBlock: UpdateBlockData = {
      id: block.id,
      type: editType,
      order: editOrder,
    };

    // Add type-specific fields
    if (editType === BlockType.HEADING || editType === BlockType.SUBHEADING) {
      updatedBlock.title = editTitle;
      updatedBlock.children = block.children || [];
    } else if (editType === BlockType.PARAGRAPH) {
      updatedBlock.content = editContent as string;
    } else if (editType === BlockType.LIST) {
      updatedBlock.content = editContent as string[];
    }

    onUpdate(updatedBlock);
    setIsEditing(false);
  };

  const sectionId = block.type === "HEADING" || block.type === "SUBHEADING" 
    ? `${block.type.toLowerCase()}-${block.id}`
    : `block-${block.id}`;

  const renderDisplayContent = () => {
    switch (block.type) {
      case "HEADING":
      case "SUBHEADING":
        return (
          <div className="flex items-center gap-2">
            <h3 className={`${block.type === "HEADING" ? "text-2xl" : "text-xl"} font-bold`}>
              {block.title}
            </h3>
            {block.children && block.children.length > 0 && (
              <span className="text-sm text-gray-500">
                ({block.children.length} {block.children.length === 1 ? 'child' : 'children'})
              </span>
            )}
          </div>
        );
      case "PARAGRAPH":
        return (
          <p className="text-gray-700 whitespace-pre-wrap">
            {block.content as string}
          </p>
        );
      case "LIST":
        return (
          <ul className="list-disc pl-6 space-y-1">
            {(block.content as string[]).map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  const renderEditFields = () => {
    switch (editType) {
      case BlockType.HEADING:
      case BlockType.SUBHEADING:
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter title..."
            />
          </div>
        );

      case BlockType.PARAGRAPH:
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={editContent as string}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
              placeholder="Enter paragraph content..."
            />
          </div>
        );

      case BlockType.LIST:
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              List Items
            </label>
            <EditListEditor
              items={Array.isArray(editContent) ? editContent : []}
              onChange={(items) => setEditContent(items)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={(el) => {
        sectionRefs.current[sectionId] = el;
      }}
      className="group relative border rounded-xl p-6 hover:border-blue-300 transition-all duration-200 bg-white"
    >
      {/* Block Actions */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              title="Edit block"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(block)}
              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              title="Delete block"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
              title="Save changes"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              title="Cancel editing"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Block Type */}
      <div className="mb-3">
        {isEditing ? (
          <select
            value={editType}
            onChange={(e) => handleTypeChange(e.target.value as BlockType)}
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.values(BlockType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        ) : (
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
            {block.type}
          </span>
        )}
      </div>

      {/* Block Content */}
      <div className="pr-12">
        {isEditing ? (
          <>
            {renderEditFields()}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order
              </label>
              <input
                type="number"
                value={editOrder}
                onChange={(e) => setEditOrder(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>
          </>
        ) : (
          renderDisplayContent()
        )}
      </div>

      {/* Render Children Recursively */}
      {block.children && block.children.length > 0 && (
        <div className="ml-6 mt-6 border-l border-gray-200 pl-6 space-y-6">
          {block.children.map((child) => (
            <EditableBlock
              key={child.id}
              block={child}
              onDelete={onDelete}
              onUpdate={onUpdate}
              sectionRefs={sectionRefs}
            />
          ))}
        </div>
      )}
    </div>
  );
};