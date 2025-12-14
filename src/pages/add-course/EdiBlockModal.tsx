// src/pages/EditBlockModal.tsx
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { BlockType, type UpdateBlockData } from "../courses/model/CourseDetailModel";
import EditListEditor from "./EditListEditor";

interface EditBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  block: UpdateBlockData | null;
  onSave: (block: UpdateBlockData) => void;
  isSaving: boolean;
}

const EditBlockModal = ({ isOpen, onClose, block, onSave, isSaving }: EditBlockModalProps) => {
  const [type, setType] = useState<BlockType>(BlockType.PARAGRAPH);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string | string[]>("");
  const [order, setOrder] = useState<number>(0);

  // Initialize form when block changes
  useEffect(() => {
    if (block) {
      setType(block.type);
      setOrder(block.order || 0);
      
      if (block.type === BlockType.HEADING || block.type === BlockType.SUBHEADING) {
        setTitle(block.title || "");
        setContent("");
      } else if (block.type === BlockType.PARAGRAPH) {
        setTitle("");
        setContent((block.content as string) || "");
      } else if (block.type === BlockType.LIST) {
        setTitle("");
        setContent(Array.isArray(block.content) ? block.content : []);
      }
    }
  }, [block]);

  const handleTypeChange = (newType: BlockType) => {
    setType(newType);
    
    // Reset fields when type changes
    if (newType === BlockType.HEADING || newType === BlockType.SUBHEADING) {
      setTitle("");
      setContent("");
    } else if (newType === BlockType.PARAGRAPH) {
      setContent("");
    } else if (newType === BlockType.LIST) {
      setContent([]);
    }
  };

  const handleSave = () => {
    if (!block) return;

    const updatedBlock: UpdateBlockData = {
      id: block.id,
      type,
      order,
    };

    // Add type-specific fields
    if (type === BlockType.HEADING || type === BlockType.SUBHEADING) {
      updatedBlock.title = title;
      updatedBlock.children = block.children || [];
    } else if (type === BlockType.PARAGRAPH) {
      updatedBlock.content = content as string;
    } else if (type === BlockType.LIST) {
      updatedBlock.content = content as string[];
    }

    onSave(updatedBlock);
  };

  // Don't render if modal is not open or no block
  if (!isOpen || !block) {
    return null;
  }

  const renderContentField = () => {
    switch (type) {
      case BlockType.HEADING:
      case BlockType.SUBHEADING:
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={content as string}
              onChange={(e) => setContent(e.target.value)}
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
              items={Array.isArray(content) ? content : []}
              onChange={(items) => setContent(items)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Block</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Block Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(BlockType).map((blockType) => (
                  <button
                    key={blockType}
                    type="button"
                    onClick={() => handleTypeChange(blockType)}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      type === blockType
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {blockType.charAt(0) + blockType.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Fields */}
            {renderContentField()}

            {/* Order Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlockModal;