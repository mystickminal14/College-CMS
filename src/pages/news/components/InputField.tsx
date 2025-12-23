import React from "react";

interface InputFieldProps {
  label: string;
  field: string;
  value: string;
  onChange: (field: string, value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: string;
  readOnly?: boolean;
  required?: boolean;
  isSubmitting?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  field,
  value,
  onChange,
  placeholder,
  icon,
  type = "text",
  readOnly = false,
  required = false,
  isSubmitting = false,
}) => (
  <div className="flex flex-col">
    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      {icon} <span>{label}</span>
    </label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      disabled={isSubmitting}
      onChange={(e) => onChange(field, e.target.value)}
      className={`w-full px-4 py-3 border rounded-xl 
                  ${readOnly ? "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700" : 
                  "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"} 
                  text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135EAB] disabled:opacity-50`}
    />
  </div>
);

export default InputField;
