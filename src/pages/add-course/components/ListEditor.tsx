// src/add-course/ListEditor.tsx
interface Props {
  items: string[];
  onChange: (items: string[]) => void;
}

const ListEditor = ({ items, onChange }: Props) => {
  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            value={item}
            onChange={(e) => {
              const copy = [...items];
              copy[idx] = e.target.value;
              onChange(copy);
            }}
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            onClick={() => onChange(items.filter((_, i) => i !== idx))}
            className="text-red-600"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, ""])}
        className="text-blue-600 text-sm"
      >
        + Add Item
      </button>
    </div>
  );
};

export default ListEditor;
