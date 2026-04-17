import { Plus, Trash2, GripVertical, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { BlogFAQ } from "../model/BlogsModel";

interface BlogFaqsProps {
  faqs: BlogFAQ[];
  onChange: (faqs: BlogFAQ[]) => void;
}

const BlogFaqs = ({ faqs, onChange }: BlogFaqsProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const add = () => {
    onChange([...faqs, { question: "", answer: "", order: faqs.length }]);
    setOpenIndex(faqs.length);
  };

  const remove = (i: number) => {
    onChange(faqs.filter((_, idx) => idx !== i).map((f, idx) => ({ ...f, order: idx })));
    setOpenIndex(null);
  };

  const update = (i: number, field: keyof BlogFAQ, value: string) => {
    onChange(faqs.map((f, idx) => idx === i ? { ...f, [field]: value } : f));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 space-y-3 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">FAQ Section</h3>
        </div>
        <button
          type="button"
          onClick={add}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
            bg-white dark:bg-gray-800
            hover:bg-gray-100 dark:hover:bg-gray-700
            text-gray-600 dark:text-gray-300
            hover:text-gray-900 dark:hover:text-white
            text-xs font-medium transition-colors
            border border-gray-200 dark:border-gray-700"
        >
          <Plus size={12} /> Add FAQ
        </button>
      </div>

      {faqs.length === 0 && (
        <div className="text-center py-6 text-gray-400 dark:text-gray-600 text-sm border border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
          No FAQs yet. 
        </div>
      )}

      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div
              className="flex items-center gap-2 px-3 py-2.5
                bg-white dark:bg-gray-800
                hover:bg-gray-50 dark:hover:bg-gray-750
                cursor-pointer transition-colors"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <GripVertical size={14} className="text-gray-300 dark:text-gray-600 shrink-0" />
              <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 truncate">
                {faq.question || <span className="text-gray-400 dark:text-gray-600 italic">Question {i + 1}</span>}
              </span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); remove(i); }}
                className="text-gray-400 dark:text-gray-600 hover:text-red-500 transition-colors p-0.5"
              >
                <Trash2 size={13} />
              </button>
              <ChevronDown
                size={14}
                className={`text-gray-400 dark:text-gray-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              />
            </div>

            {openIndex === i && (
              <div className="p-3 space-y-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-850">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => update(i, "question", e.target.value)}
                  placeholder="Enter question..."
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                    rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200
                    focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white
                    placeholder-gray-400 dark:placeholder-gray-600 transition-colors"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => update(i, "answer", e.target.value)}
                  placeholder="Enter answer..."
                  rows={3}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                    rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200
                    focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white
                    placeholder-gray-400 dark:placeholder-gray-600 resize-none transition-colors"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogFaqs;