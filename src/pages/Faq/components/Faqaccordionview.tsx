import React, { useState } from "react";
import {
  ChevronDown,
  Trash2,
  Pencil,
  Power,
  ArrowUpDown,
  HelpCircle,
} from "lucide-react";
import type { FAQ } from "../model/FAQmodel";

interface Props {
  faqs: FAQ[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (faq: FAQ) => void;
  onToggle: (faq: FAQ) => void;
  onDelete: (faq: FAQ) => void;
  onChangeOrder: (faq: FAQ) => void;
}

const FaqAccordionView: React.FC<Props> = ({
  faqs,
  isLoading,
  isError,
  onEdit,
  onToggle,
  onDelete,
  onChangeOrder,
}) => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
              </div>
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ── Error ───────────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-red-600 dark:text-red-400 text-lg font-medium">Failed to load FAQs</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Please try again later</p>
      </div>
    );
  }

  // ── Empty ───────────────────────────────────────────────────────────────────
  if (!faqs.length) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-5">
          <HelpCircle className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No FAQs yet</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Add your first question and answer to get started.
        </p>
      </div>
    );
  }

  // ── Accordion list ──────────────────────────────────────────────────────────
  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        const answer = faq.children?.[0]?.answers ?? "";

        return (
          <div
            key={faq.id}
            className={`bg-white dark:bg-gray-800 rounded-xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "border-blue-300 dark:border-blue-700 shadow-md"
                : "border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm"
            }`}
          >
            {/* ── Accordion Header ── */}
            <div className="flex items-center gap-3 px-5 py-4">
              {/* Order badge */}
              <span className="shrink-0 w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center">
                {faq.order}
              </span>

              {/* Question — clickable to expand */}
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                title="Click to expand"
                className="flex-1 text-left text-sm font-medium text-gray-800 dark:text-gray-100 leading-snug cursor-pointer [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_u]:underline [&_a]:text-blue-600 [&_a]:underline [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded [&_code]:text-xs [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4"
                dangerouslySetInnerHTML={{ __html: faq.questions }}
              />

              {/* Status badge */}
              <span
                className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  faq.status === "ENABLED"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                }`}
              >
                {faq.status === "ENABLED" ? "Enabled" : "Disabled"}
              </span>

              {/* Chevron */}
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                title={isOpen ? "Collapse" : "Expand"}
                className="shrink-0 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
              >
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* ── Accordion Body ── */}
            <div
              className={`transition-all duration-200 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="px-5 pb-4">
                {/* Answer */}
                <div className="pl-10 mb-4">
                  {answer ? (
                    <div
                      className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed [&_p]:my-1 [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_u]:underline [&_h1]:text-lg [&_h1]:font-bold [&_h1]:mb-1 [&_h2]:text-base [&_h2]:font-bold [&_h2]:mb-1 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-1 [&_li]:my-0.5 [&_a]:text-blue-600 [&_a]:dark:text-blue-400 [&_a]:underline [&_code]:bg-gray-100 [&_code]:dark:bg-gray-700 [&_code]:px-1 [&_code]:rounded [&_code]:text-xs [&_blockquote]:border-l-2 [&_blockquote]:border-blue-400 [&_blockquote]:pl-3 [&_blockquote]:text-gray-500 [&_blockquote]:italic [&_hr]:border-gray-200 [&_hr]:dark:border-gray-600 [&_hr]:my-2"
                      dangerouslySetInnerHTML={{ __html: answer }}
                    />
                  ) : (
                    <p className="text-sm italic text-gray-400">No answer provided.</p>
                  )}
                </div>

                {/* Divider + Action buttons */}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-3 pl-10">
                  <div className="flex items-center gap-2">

                    {/* Edit */}
                    <button
                      onClick={() => onEdit(faq)}
                      title="Edit this FAQ"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200 cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </button>

                    {/* Change Order */}
                    <button
                      onClick={() => onChangeOrder(faq)}
                      title="Change display order"
                      className="p-1.5 rounded-lg border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 cursor-pointer"
                    >
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Toggle Status */}
                    <button
                      onClick={() => onToggle(faq)}
                      title={faq.status === "ENABLED" ? "Disable this FAQ" : "Enable this FAQ"}
                      className={`p-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                        faq.status === "ENABLED"
                          ? "border-yellow-200 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-600 hover:text-white hover:border-yellow-600"
                          : "border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white hover:border-green-600"
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => onDelete(faq)}
                      title="Delete this FAQ"
                      className="p-1.5 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Created date pushed right */}
                    <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">
                      {new Date(faq.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordionView;