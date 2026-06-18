import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import type { CourseRegistration } from "../model/CourseRegistrationModel";

interface Props {
  registration: CourseRegistration | null;
  isOpen: boolean;
  onClose: () => void;
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      title="Copy"
      className={`ml-2 p-1 rounded transition-colors shrink-0 ${
        copied ? "text-green-600 bg-green-50" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
      }`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-4 py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide sm:w-36 shrink-0">{label}</span>
      <span className="text-sm text-gray-800 font-medium">{value}</span>
    </div>
  );
}

export default function ViewRegistrationModal({ registration: r, isOpen, onClose }: Props) {
  if (!isOpen || !r) return null;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{r.fullName}</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Interested in <span className="font-semibold text-blue-600">{r.courseName}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition ml-3 shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-4">
          <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Email</p>
                <p className="text-sm font-medium text-gray-800">{r.email}</p>
              </div>
              <CopyButton value={r.email} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Phone</p>
                <p className="text-sm font-medium text-gray-800">{r.phone}</p>
              </div>
              <CopyButton value={r.phone} />
            </div>
          </div>

          <Row label="Course" value={r.courseName} />
          <Row label="Registered On" value={formatDate(r.createdAt)} />
          {r.message && <Row label="Message" value={r.message} />}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 shrink-0">
          <button onClick={onClose} className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
