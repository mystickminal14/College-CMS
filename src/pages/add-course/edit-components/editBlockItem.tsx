// src/pages/AddCourseDetailsPage/edit-components/editBlockItem.tsx
import { useState, useEffect } from "react";
import {
  BlockType,
  type CourseDetailBlock,
} from "../../courses/model/CourseDetailModel";
import ListEditor from "../components/ListEditor";
import BlockEditor from "./EditBlockEditor";

interface Props {
  block: CourseDetailBlock;
  onUpdate: (block: CourseDetailBlock) => void;
  onDelete: () => void;
  onSave?: () => void;
}

const EditBlockItem = ({ block, onUpdate, onDelete, onSave }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [editOrder, setEditOrder] = useState(block.order);

  const isHeading =
    block.type === BlockType.HEADING || block.type === BlockType.SUBHEADING;
  const allowSubheadingInChild = block.type === BlockType.HEADING;

  // Sync order input with block
  useEffect(() => {
    setEditOrder(block.order);
  }, [block.order]);

  // Push order changes up
  useEffect(() => {
    if (editOrder !== block.order) {
      onUpdate({ ...block, order: editOrder });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editOrder]);

  // Safe children accessor — API may not always include it
  const children: CourseDetailBlock[] =
    isHeading ? ((block as any).children ?? []) : [];

  // Safe content accessors
  const paragraphContent =
    block.type === BlockType.PARAGRAPH
      ? ((block.content as string | null) ?? "")
      : "";

  const listContent =
    block.type === BlockType.LIST
      ? Array.isArray(block.content)
        ? block.content
        : []
      : [];

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`font-semibold px-2 py-1 rounded text-sm ${
              block.type === BlockType.HEADING
                ? "bg-blue-100 text-blue-700"
                : block.type === BlockType.SUBHEADING
                ? "bg-green-100 text-green-700"
                : block.type === BlockType.PARAGRAPH
                ? "bg-gray-100 text-gray-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {block.type}
          </span>

          {isHeading && (
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              {collapsed ? "▼" : "▲"}
            </button>
          )}
        </div>

        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 transition text-sm"
        >
          Delete
        </button>
      </div>

      {/* BODY */}
      {!collapsed && (
        <>
          {/* HEADING / SUBHEADING */}
          {isHeading && (
            <>
              <input
                placeholder="Enter title..."
                value={(block as any).title ?? ""}
                onChange={(e) =>
                  onUpdate({ ...block, title: e.target.value } as any)
                }
                className="w-full border rounded px-3 py-2 mb-3 focus:ring-1 focus:ring-blue-400"
              />

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <input
                  type="number"
                  min={1}
                  value={editOrder}
                  onChange={(e) =>
                    setEditOrder(parseInt(e.target.value) || 1)
                  }
                  className="w-24 text-center border rounded px-2 py-1 focus:ring-1 focus:ring-blue-400"
                />
              </div>
            </>
          )}

          {/* PARAGRAPH */}
          {block.type === BlockType.PARAGRAPH && (
            <textarea
              placeholder="Enter paragraph..."
              value={paragraphContent}
              onChange={(e) =>
                onUpdate({ ...block, content: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mb-3 focus:ring-1 focus:ring-blue-400"
            />
          )}

          {/* LIST */}
          {block.type === BlockType.LIST && (
            <ListEditor
              items={listContent}
              onChange={(items) => onUpdate({ ...block, content: items })}
            />
          )}

          {/* CHILDREN (only for HEADING / SUBHEADING) */}
          {isHeading && (
            <div className="ml-6 mt-4 border-l border-gray-200 pl-4">
              <BlockEditor
                category={block.category}
                blocks={children}
                onChange={(updatedChildren) =>
                  onUpdate({ ...block, children: updatedChildren } as any)
                }
                root={false}
                allowSubheading={allowSubheadingInChild}
              />
              {onSave && (
                <div className="flex justify-end mt-1">
                  <button
                    onClick={onSave}
                    className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm"
                  >
                    Add Course Block
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EditBlockItem;