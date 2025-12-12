import React from "react";

interface InputFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  field: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  onChange: (field: string, value: string) => void;
  isSubmitting?: boolean;
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  label,
  value,
  field,
  placeholder,
  required = false,
  type = "text",
  onChange,
  isSubmitting = false,
  readOnly = false,
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>

      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={isSubmitting}
        className={`w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-600 rounded-xl 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-[#135EAB]
                    focus:border-transparent disabled:opacity-50 ${
                      readOnly ? "cursor-not-allowed bg-gray-100 dark:bg-gray-600" : ""
                    }`}
      />
    </div>
  </div>
);

export default InputField;
