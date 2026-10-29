import React from "react";
import { X } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
  tone?: "blue" | "red";
  wide?: boolean;
}

const ModalShell: React.FC<Props> = ({ title, subtitle, onClose, children, tone = "blue", wide }) => (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3 sm:p-4">
    <div
      className={`w-full ${wide ? "max-w-2xl" : "max-w-md"} max-h-[90vh] flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden`}
    >
      <div
        className={`p-5 flex items-center justify-between shrink-0 ${
          tone === "red" ? "bg-red-600" : "bg-linear-to-r from-[#125DAA] to-[#1a7cd3]"
        }`}
      >
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          {subtitle && <p className="text-white/90 text-sm mt-1">{subtitle}</p>}
        </div>
        <button type="button" onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      <div className="overflow-y-auto p-5 sm:p-6">{children}</div>
    </div>
  </div>
);

export default ModalShell;
