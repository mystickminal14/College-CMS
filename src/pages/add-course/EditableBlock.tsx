// src/pages/AddCourseDetailsPage/EditableBlock.tsx
import { useEffect, useState } from "react";
import { Edit2, Save, Trash2, X, Plus } from "lucide-react";
import AddSiblingBlockItem from "./components/AddSiblingItem";
import EditListEditor from "./EditListEditor";
import { BlockType as BlockTypeValues } from "../courses/model/CourseDetailModel";
import type {
  BlockType,
  ContentCategory,
  CourseDetailBlock,
  UpdateBlockData,
} from "../courses/model/CourseDetailModel";

interface EditableBlockProps {
  block: CourseDetailBlock;
  category: ContentCategory;
  courseId: number;
  onDelete: (block: CourseDetailBlock) => void;
  onUpdate: (updated: UpdateBlockData) => void;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  onChildAdded?: () => void;
}

export const EditableBlock = ({
  block,
  courseId,
  onDelete,
  onUpdate,
  sectionRefs,
  category,
  onChildAdded,
}: EditableBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editType, setEditType] = useState<BlockType>(block.type);
  const [editTitle, setEditTitle] = useState<string>(block.title ?? "");
  const [editContent, setEditContent] = useState<string | string[]>(
    block.type === BlockTypeValues.LIST
      ? Array.isArray(block.content)
        ? block.content
        : []
      : (block.content as string) ?? ""
  );
  const [editOrder, setEditOrder] = useState<number>(block.order);
  const [addingChildType, setAddingChildType] = useState<BlockType | null>(null);

  useEffect(() => {
    if (!isEditing) return;

    setEditType(block.type);
    setEditOrder(block.order);

    if (
      block.type === BlockTypeValues.HEADING ||
      block.type === BlockTypeValues.SUBHEADING
    ) {
      setEditTitle(block.title ?? "");
      setEditContent("");
    } else if (block.type === BlockTypeValues.PARAGRAPH) {
      setEditTitle("");
      setEditContent((block.content as string) ?? "");
    } else if (block.type === BlockTypeValues.LIST) {
      setEditTitle("");
      setEditContent(Array.isArray(block.content) ? block.content : []);
    }
  }, [isEditing, block]);

  /* ---------- save ---------- */
  const handleSave = () => {
    const updatedBlock: UpdateBlockData = {
      id: block.id,
      type: editType,
      category,
      order: editOrder,
    };

    if (
      editType === BlockTypeValues.HEADING ||
      editType === BlockTypeValues.SUBHEADING
    ) {
      updatedBlock.title = editTitle;
      updatedBlock.children =
        (block as HeadingLike).children ?? [];
    } else if (editType === BlockTypeValues.PARAGRAPH) {
      updatedBlock.content = editContent as string;
    } else if (editType === BlockTypeValues.LIST) {
      updatedBlock.content = editContent as string[];
    }

    onUpdate(updatedBlock);
    setIsEditing(false);
  };

  const handleChildAdded = () => {
    setAddingChildType(null);
    onChildAdded?.();
  };

  /* ---------- helpers ---------- */
  const sectionId =
    block.type === BlockTypeValues.HEADING ||
    block.type === BlockTypeValues.SUBHEADING
      ? `${block.type.toLowerCase()}-${block.id}`
      : `block-${block.id}`;

  const canHaveChildren =
    block.type === BlockTypeValues.HEADING ||
    block.type === BlockTypeValues.SUBHEADING;

  const getAllowedChildTypes = (): BlockType[] => {
    if (block.type === BlockTypeValues.HEADING)
      return [
        BlockTypeValues.SUBHEADING,
        BlockTypeValues.PARAGRAPH,
        BlockTypeValues.LIST,
      ];
    if (block.type === BlockTypeValues.SUBHEADING)
      return [BlockTypeValues.PARAGRAPH, BlockTypeValues.LIST];
    return [];
  };

  const getButtonConfig = (type: BlockType) => {
    const configs = {
      [BlockTypeValues.SUBHEADING]: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        hover: "hover:bg-blue-100",
        label: "Subheading",
      },
      [BlockTypeValues.PARAGRAPH]: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        hover: "hover:bg-green-100",
        label: "Paragraph",
      },
      [BlockTypeValues.LIST]: {
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
        hover: "hover:bg-purple-100",
        label: "List",
      },
    } as const;

    if (
      type === BlockTypeValues.SUBHEADING ||
      type === BlockTypeValues.PARAGRAPH ||
      type === BlockTypeValues.LIST
    ) {
      return configs[type];
    }
    return configs[BlockTypeValues.PARAGRAPH];
  };

  /* ---------- render display ---------- */
  const renderDisplayContent = () => {
    switch (block.type) {
      case BlockTypeValues.HEADING:
      case BlockTypeValues.SUBHEADING: {
        const allowedChildTypes = getAllowedChildTypes();
        const children = (block as HeadingLike).children ?? [];

        return (
          <>
            <div className="flex items-center gap-2">
              <h3
                className={`${
                  block.type === BlockTypeValues.HEADING
                    ? "text-2xl"
                    : "text-xl"
                } font-bold text-gray-800`}
              >
                {block.title}
              </h3>
              {children.length > 0 && (
                <span className="text-sm text-gray-500">
                  ({children.length}{" "}
                  {children.length === 1 ? "child" : "children"})
                </span>
              )}
            </div>

            {allowedChildTypes.length > 0 && (
              <div className="mt-4 mb-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-gray-600">
                    Add under this {block.type.toLowerCase()}:
                  </span>
                  {allowedChildTypes.map((type) => {
                    const config = getButtonConfig(type);
                    return (
                      <button
                        key={type}
                        onClick={() => setAddingChildType(type)}
                        className={`px-3 py-1.5 text-sm rounded-md border flex items-center gap-1 transition ${config.bg} ${config.text} ${config.border} ${config.hover}`}
                      >
                        <Plus className="w-3 h-3" /> {config.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {addingChildType && (
              <div className="mt-4">
                <AddSiblingBlockItem
                  courseId={courseId}
                  category={category}
                  parentId={block.id}
                  type={addingChildType}
                  onCancel={() => setAddingChildType(null)}
                  onSuccess={handleChildAdded}
                />
              </div>
            )}
          </>
        );
      }

      case BlockTypeValues.PARAGRAPH: {
        // content can be null from the API
        const text = (block.content as string | null) ?? "";
        return (
          <div className="text-gray-700 whitespace-pre-wrap">{text}</div>
        );
      }

      case BlockTypeValues.LIST: {
        // ── KEY FIX ──
        // The API can return a LIST block whose content is null but has
        // children (e.g. "Choose 1" / "Choose 2" grouped lists).
        // We must not call .map() on null.
        const rawContent = block.content;
        const items: string[] = Array.isArray(rawContent) ? rawContent : [];
        const children = (block as any).children as
          | CourseDetailBlock[]
          | undefined;

        // Case 1: normal flat list
        if (items.length > 0) {
          return (
            <ul className="list-disc pl-6 space-y-1">
              {items.map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        // Case 2: LIST block acting as a group (title + children)
        if (children && children.length > 0) {
          return (
            <div className="space-y-4">
              {block.title && (
                <p className="text-sm font-semibold text-gray-600">
                  {block.title}
                </p>
              )}
              <div className="ml-4 space-y-4">
                {children.map((child) => (
                  <EditableBlock
                    key={child.id}
                    block={child}
                    courseId={courseId}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    category={category}
                    sectionRefs={sectionRefs}
                    onChildAdded={onChildAdded}
                  />
                ))}
              </div>
            </div>
          );
        }

        // Case 3: empty
        return (
          <p className="text-sm text-gray-400 italic">
            Empty list block.
          </p>
        );
      }

      default:
        return null;
    }
  };

  /* ---------- render edit fields ---------- */
  const renderEditFields = () => {
    switch (editType) {
      case BlockTypeValues.HEADING:
      case BlockTypeValues.SUBHEADING:
        return (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title..."
          />
        );
      case BlockTypeValues.PARAGRAPH:
        return (
          <textarea
            value={editContent as string}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
            placeholder="Enter paragraph content..."
          />
        );
      case BlockTypeValues.LIST:
        return (
          <EditListEditor
            items={Array.isArray(editContent) ? editContent : []}
            onChange={(items) => setEditContent(items)}
          />
        );
      default:
        return null;
    }
  };

  /* ---------- JSX ---------- */
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
              title="Edit"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(block)}
              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
              title="Save"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Block Type Badge */}
      <div className="mb-3">
        {isEditing ? (
          <select
            value={editType}
            onChange={(e) => setEditType(e.target.value as BlockType)}
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300"
          >
            {Object.values(BlockTypeValues).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        ) : (
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
            ${
              block.type === BlockTypeValues.HEADING
                ? "bg-blue-100 text-blue-700"
                : block.type === BlockTypeValues.SUBHEADING
                ? "bg-blue-50 text-blue-600"
                : block.type === BlockTypeValues.PARAGRAPH
                ? "bg-green-50 text-green-600"
                : "bg-purple-50 text-purple-600"
            }`}
          >
            {block.type}
          </span>
        )}
      </div>

      {/* Block Content */}
      <div className="pr-12">
        {isEditing ? (
          <>
            {renderEditFields()}
            <div className="mt-4">
              <label className="block text-sm text-gray-600 mb-1">
                Order
              </label>
              <input
                type="number"
                value={editOrder}
                onChange={(e) =>
                  setEditOrder(parseInt(e.target.value) || 0)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        ) : (
          renderDisplayContent()
        )}
      </div>

      {/* Render Children Recursively (for HEADING / SUBHEADING) */}
      {canHaveChildren &&
        (() => {
          const children = (block as HeadingLike).children ?? [];
          return children.length > 0 ? (
            <div className="ml-6 mt-6 border-l border-gray-200 pl-6 space-y-6">
              {children.map((child) => (
                <EditableBlock
                  key={child.id}
                  block={child}
                  courseId={courseId}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                  category={category}
                  sectionRefs={sectionRefs}
                  onChildAdded={onChildAdded}
                />
              ))}
            </div>
          ) : null;
        })()}
    </div>
  );
};

// local helper type so we can safely access .children
type HeadingLike = {
  children: CourseDetailBlock[];
  title: string | null;
};