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
}) => (
  <div className="space-y-2">
    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      <span className="text-[#135EAB]">{icon}</span>
      <span>{label}{required && " *"}</span>
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={isSubmitting}
        className="w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135EAB] focus:border-transparent disabled:opacity-50"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </div>
    </div>
  </div>
);

export default InputField;
