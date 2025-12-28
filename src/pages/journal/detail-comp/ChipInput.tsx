// components/ChipInputField.tsx
import React, { useState } from "react";
import { X } from "lucide-react";

interface ChipInputFieldProps {
  icon: React.ReactNode;
  label: string;
  field: string;
  value: string[];
  placeholder: string;
  required?: boolean;
  isSubmitting?: boolean;
  onChange: (field: string, value: string[]) => void;
}

const ChipInputField: React.FC<ChipInputFieldProps> = ({
  icon,
  label,
  field,
  value,
  placeholder,
  required = false,
  isSubmitting = false,
  onChange,
}) => {
  const [input, setInput] = useState("");

  const addChip = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed || value.includes(trimmed)) return;
    onChange(field, [...value, trimmed]);
    setInput("");
  };

  const removeChip = (index: number) => {
    onChange(
      field,
      value.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <span className="text-[#135EAB]">{icon}</span>
        <span>
          {label}
          {required && " *"}
        </span>
      </label>

      <div className="relative">
        <div className="flex flex-wrap gap-2 w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus-within:ring-2 focus-within:ring-[#135EAB] focus-within:border-transparent disabled:opacity-50">
          {value.map((chip, i) => (
            <span
              key={i}
              className="flex items-center gap-1 bg-[#135EAB]/10 text-[#135EAB] px-3 py-1 rounded-full text-sm"
            >
              {chip}
              <button
                type="button"
                onClick={() => removeChip(i)}
                disabled={isSubmitting}
              >
                <X size={14} />
              </button>
            </span>
          ))}

          <input
            value={input}
            placeholder={placeholder}
            disabled={isSubmitting}
            className="flex-1 min-w-[120px] outline-none bg-transparent"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                addChip(input);
              }
            }}
            onBlur={() => addChip(input)}
          />
        </div>

        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default ChipInputField;
