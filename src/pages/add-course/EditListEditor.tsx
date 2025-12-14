// src/components/EditListEditor.tsx
import { Plus, X } from "lucide-react";

interface EditListEditorProps {
  items: string[];
  onChange: (items: string[]) => void;
}

const EditListEditor = ({ items, onChange }: EditListEditorProps) => {
  const addItem = () => {
    onChange([...items, ""]);
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex gap-3 items-center group">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-gray-500 w-6 text-sm">{index + 1}.</span>
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter list item..."
            />
          </div>
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="p-2 text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Item
      </button>
    </div>
  );
};

export default EditListEditor;