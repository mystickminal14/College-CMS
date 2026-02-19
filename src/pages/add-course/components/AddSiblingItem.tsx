import { useState, memo } from "react";
import { Save, X, Plus } from "lucide-react";
import EditListEditor from "../EditListEditor";
import useAddCourseBlock from "../../courses/hooks/useAddSiblingBlock";
import { BlockType as BlockTypeValues } from "../../courses/model/CourseDetailModel";
import type { BlockType } from "../../courses/model/CourseDetailModel";

interface Props {
  courseId: number;
  parentId: number;
  type: BlockType;
  onCancel: () => void;
  onSuccess?: () => void;
}

const AddSiblingBlockItemComponent = ({ 
  courseId, 
  parentId, 
  type, 
  onCancel,
  onSuccess 
}: Props) => {
  const { mutate, isPending } = useAddCourseBlock();
  
  // For subheading
  const [subheadingTitle, setSubheadingTitle] = useState("");
  const [subheadingChildren, setSubheadingChildren] = useState<
    Array<{
      type: typeof BlockTypeValues.PARAGRAPH | typeof BlockTypeValues.LIST;
      content: string | string[];
      tempId: string;
    }>
  >([]);
  
  // For direct paragraph
  const [paragraphContent, setParagraphContent] = useState("");
  
  // For direct list
  const [listItems, setListItems] = useState<string[]>([]);

  // Add a child block to subheading
  const addSubheadingChild = (
    childType: typeof BlockTypeValues.PARAGRAPH | typeof BlockTypeValues.LIST
  ) => {
    const tempId = `temp-${Date.now()}-${Math.random()}`;
    
    if (childType === BlockTypeValues.PARAGRAPH) {
      setSubheadingChildren([
        ...subheadingChildren,
        { type: BlockTypeValues.PARAGRAPH, content: "", tempId }
      ]);
    } else if (childType === BlockTypeValues.LIST) {
      setSubheadingChildren([
        ...subheadingChildren,
        { type: BlockTypeValues.LIST, content: [], tempId }
      ]);
    }
  };

  // Update a child block content
  const updateSubheadingChild = (tempId: string, content: string | string[]) => {
    setSubheadingChildren(prev =>
      prev.map(child =>
        child.tempId === tempId ? { ...child, content } : child
      )
    );
  };

  // Remove a child block from subheading
  const removeSubheadingChild = (tempId: string) => {
    setSubheadingChildren(prev =>
      prev.filter(child => child.tempId !== tempId)
    );
  };

  // Save subheading with all its children
  const saveSubheadingWithChildren = () => {
    if (!subheadingTitle.trim()) {
      alert("Please enter a title for the subheading");
      return;
    }

    // First, create the subheading
    mutate({
      courseId,
      parentId,
      type: BlockTypeValues.SUBHEADING,
      title: subheadingTitle,
      content: undefined
    }, {
      onSuccess: (subheadingRes) => {
        const createdSubheadingId = subheadingRes.data?.id;
        
        if (createdSubheadingId && subheadingChildren.length > 0) {
          // Now create each child under the subheading
          subheadingChildren.forEach((child, index) => {
            // Use setTimeout to stagger API calls
            setTimeout(() => {
              mutate({
                courseId,
                parentId: createdSubheadingId,
                type: child.type,
                title: undefined,
                content: child.type === BlockTypeValues.PARAGRAPH 
                  ? child.content as string 
                  : child.content as string[]
              });
            }, index * 100);
          });
        }
        
        // Reset form and notify success
        setSubheadingTitle("");
        setSubheadingChildren([]);
        onCancel();
        onSuccess?.();
      }
    });
  };

  // Save direct paragraph block
  const saveDirectParagraph = () => {
    if (!paragraphContent.trim()) {
      alert("Please enter paragraph content");
      return;
    }
    
    mutate({
      courseId,
      parentId,
      type: BlockTypeValues.PARAGRAPH,
      title: undefined,
      content: paragraphContent
    }, {
      onSuccess: () => {
        setParagraphContent("");
        onCancel();
        onSuccess?.();
      }
    });
  };

  // Save direct list block
  const saveDirectList = () => {
    if (listItems.length === 0 || listItems.every(item => !item.trim())) {
      alert("Please add at least one list item");
      return;
    }
    
    mutate({
      courseId,
      parentId,
      type: BlockTypeValues.LIST,
      title: undefined,
      content: listItems.filter(item => item.trim())
    }, {
      onSuccess: () => {
        setListItems([]);
        onCancel();
        onSuccess?.();
      }
    });
  };

  // RENDER FOR SUBHEADING
  if (type === BlockTypeValues.SUBHEADING) {
    return (
      <div className="mt-3 border rounded-lg p-4 bg-blue-50">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subheading Title *
          </label>
          <input
            value={subheadingTitle}
            onChange={(e) => setSubheadingTitle(e.target.value)}
            placeholder="Enter subheading title..."
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Child blocks section */}
        {subheadingTitle.trim() && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Content under this subheading:
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => addSubheadingChild(BlockTypeValues.PARAGRAPH)}
                  className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-sm hover:bg-green-100 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Paragraph
                </button>
                <button
                  onClick={() => addSubheadingChild(BlockTypeValues.LIST)}
                  className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded text-sm hover:bg-purple-100 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> List
                </button>
              </div>
            </div>

            {/* Display child blocks */}
            <div className="space-y-3">
              {subheadingChildren.map((child, index) => (
                <div key={child.tempId} className="p-3 border rounded bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100">
                      {child.type} #{index + 1}
                    </span>
                    <button
                      onClick={() => removeSubheadingChild(child.tempId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {child.type === BlockTypeValues.PARAGRAPH ? (
                    <textarea
                      value={child.content as string}
                      onChange={(e) => updateSubheadingChild(child.tempId, e.target.value)}
                      placeholder="Enter paragraph content..."
                      className="w-full border px-3 py-2 rounded text-sm min-h-20"
                    />
                  ) : (
                    <div>
                      <EditListEditor
                        items={Array.isArray(child.content) ? child.content : []}
                        onChange={(items) => updateSubheadingChild(child.tempId, items)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {subheadingChildren.length === 0 && (
              <p className="text-sm text-gray-500 italic text-center py-4">
                No content added yet. Click "Paragraph" or "List" to add.
              </p>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 pt-3 border-t">
          <button
            onClick={saveSubheadingWithChildren}
            disabled={isPending || !subheadingTitle.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-1 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" /> Save Subheading
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded flex items-center gap-1 hover:bg-gray-300"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  // RENDER FOR DIRECT PARAGRAPH
  if (type === BlockTypeValues.PARAGRAPH) {
    return (
      <div className="mt-3 border rounded-lg p-4 bg-green-50">
        <div className="mb-4">
          <label className="block text-sm font-medium text-green-700 mb-1">
            Paragraph Content *
          </label>
          <textarea
            value={paragraphContent}
            onChange={(e) => setParagraphContent(e.target.value)}
            placeholder="Enter paragraph content..."
            className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[120px]"
          />
          <p className="text-xs text-gray-500 mt-1">
            This paragraph will be added as a direct block (not under any subheading)
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={saveDirectParagraph}
            disabled={isPending || !paragraphContent.trim()}
            className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-1 hover:bg-green-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> Save Paragraph
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded flex items-center gap-1 hover:bg-gray-300"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  // RENDER FOR DIRECT LIST
  if (type === BlockTypeValues.LIST) {
    return (
      <div className="mt-3 border rounded-lg p-4 bg-purple-50">
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-700 mb-1">
            List Items *
          </label>
          <EditListEditor
            items={listItems}
            onChange={setListItems}
          />
          <p className="text-xs text-gray-500 mt-1">
            This list will be added as a direct block (not under any subheading)
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={saveDirectList}
            disabled={isPending || listItems.length === 0 || listItems.every(item => !item.trim())}
            className="px-4 py-2 bg-purple-600 text-white rounded flex items-center gap-1 hover:bg-purple-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> Save List
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded flex items-center gap-1 hover:bg-gray-300"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default memo(AddSiblingBlockItemComponent);