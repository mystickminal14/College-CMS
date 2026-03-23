import { useState } from 'react';
import full_from from "../../../../assets/full_form_lbef.webp";
import decoration from '../../../../assets/decoration.webp';
import { useGetActiveFaqs } from '../../../../pages/Faq/hooks/FAqHooks';

const FALLBACK_FAQS = [
  {
    id: -1,
    questions: "What is your intake timings?",
    order: 1,
    children: [{ id: -1, answers: "Admissions are conducted three times a year in the months of February, July, and August.", order: 1 }],
  },
  {
    id: -2,
    questions: "Are the degrees recognized?",
    order: 2,
    children: [{ id: -2, answers: "Yes, LBEF has been permitted by the Ministry of Education, Nepal Government to run courses from APU, Malaysia. These courses are recognized by Tribhuvan University, Nepal.", order: 1 }],
  },
  {
    id: -3,
    questions: "What scholarships are available?",
    order: 3,
    children: [{ id: -3, answers: "LBEF offers merit-based scholarships, need-based financial support, and special scholarships for deserving students. Check the Scholarships page on our website for current eligibility and details.", order: 1 }],
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { data, isLoading } = useGetActiveFaqs();
  const apiFaqs = data?.data ?? [];
  const faqs = apiFaqs.length > 0 ? apiFaqs : FALLBACK_FAQS;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-12 px-4 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left Side - Image */}
          <div className="flex flex-col items-center lg:items-start">
            <img
              src={full_from}
              alt="LBEF Full Form and Vision"
              className="w-full max-w-lg object-contain"
            />
          </div>

          {/* Right Side - FAQ Accordion */}
          <div className="mt-8 lg:mt-0">
            <p className="text-center lg:text-left text-gray-600 text-lg mb-8">FAQ's</p>

            <h2 className="text-4xl font-bold text-gray-900 mb-10">
              Everything You Need to{' '}
              <span className="relative inline-block text-[#474AFF]">
                Know About
                <img
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 w-full h-3"
                />
              </span>{' '}
              LBEF
            </h2>

            {/* Loading skeleton */}
            {isLoading && (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="rounded-lg overflow-hidden animate-pulse">
                    <div className="h-14 bg-gray-200 rounded-lg" />
                  </div>
                ))}
              </div>
            )}

            {/* FAQ list — uses API data or fallback silently */}
            {!isLoading && (
              <div className="space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  const answer = faq.children?.[0]?.answers ?? '';

                  return (
                    <div key={faq.id} className="rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className={`w-full px-6 py-4 flex justify-between items-center text-left font-medium text-lg transition-all duration-200 ${
                          isOpen ? 'bg-[#474AFF] text-white' : ''
                        }`}
                      >
                        <span dangerouslySetInnerHTML={{ __html: faq.questions }} />
                        <span className="text-2xl font-bold shrink-0 ml-4">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-6 py-5 bg-gray-50 text-gray-700 border-t border-gray-200">
                          <div
                            className="leading-relaxed [&_a]:text-blue-600 [&_a]:underline [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-1 [&_li]:my-0.5 [&_p]:my-1"
                            dangerouslySetInnerHTML={{ __html: answer }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}