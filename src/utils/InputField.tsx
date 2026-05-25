import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  field: string;
  placeholder?: string;
  icon?: React.ReactNode;
  required?: boolean;
  type?: "text" | "email" | "password" | "tel" | "url" | "number" | "textarea" | "date";
  onChange: (field: string, value: string) => void;
  isSubmitting?: boolean;
  disabled?: boolean;
  rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  label,
  value,
  field,
  placeholder = "",
  required = false,
  type = "text",
  onChange,
  isSubmitting = false,
  disabled = false,
  rows = 4,
}) => {
  const isDisabled = isSubmitting || disabled;
  const isTextarea = type === "textarea";
  return (
    <div className="space-y-2">
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {icon && <span className="text-[#135EAB]">{icon}</span>}
        <span>
          {label}
          {required && <span className="text-red-500"> *</span>}
        </span>
      </label>

      <div className="relative">
        {isTextarea ? (
          <textarea
            rows={rows}
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            placeholder={placeholder}
            required={required}
            disabled={isDisabled}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135EAB] focus:border-transparent resize-none disabled:opacity-50"
          />
        ) : (
          <>
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(field, e.target.value)}
              placeholder={placeholder}
              required={required}
              disabled={isDisabled}
              className={`w-full px-4 py-3 ${
                icon ? "pl-11" : ""
              } border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135EAB] focus:border-transparent
              ${disabled
                ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              }
              ${isSubmitting ? "opacity-50" : ""}`}
            />

            {icon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {icon}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InputField;
