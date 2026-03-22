import { useState } from 'react';
import decoration from '../../../../assets/decoration.webp';
import { useGetActiveFaqs } from '../../../../pages/Faq/hooks/FAqHooks';

const FALLBACK_FAQS = [
  {
    id: -1,
    questions: "What is your intake timings?",
    order: 1,
    children: [{ id: -1, answers: "Admissions are conducted three times a year in the months of Spring, Summer and Fall Session.", order: 1 }],
  },
  {
    id: -2,
    questions: "Are the degrees recognized?",
    order: 2,
    children: [{ id: -2, answers: "Yes, LBEF has been permitted by the Ministry of Education, Nepal Government to run courses from APU, Malaysia. These courses are recognized by Tribhuvan University, Nepal.", order: 1 }],
  },
  {
    id: -3,
    questions: "Do you provide support after the course?",
    order: 3,
    children: [{ id: -3, answers: "Yes, we have a dedicated Training & Placement cell that assists students with placements. We also conduct career counseling sessions after course completion for higher studies.", order: 1 }],
  },
  {
    id: -4,
    questions: "Mode of Study: Full Time or Part Time?",
    order: 4,
    children: [{ id: -4, answers: "All courses from APU are offered in full-time regular mode. Each course is developed with employability in mind and includes input from leading employers, ensuring relevance to students' future careers.", order: 1 }],
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
    <div className="bg-white py-4 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Section Heading */}
        <p className="text-center lg:text-left text-gray-600 text-lg mb-8">FAQ's</p>

        <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center lg:text-left">
          Everything You Need to Know About{' '}
          <span className="text-blue-600 relative inline-block">
            LBEF
            <img
              src={decoration}
              alt="Decoration"
              className="absolute left-1/2 -translate-x-1/2 w-full h-3"
            />
          </span>{' '}
        </h2>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-gray-200 animate-pulse">
                <div className="h-14 bg-gray-200" />
              </div>
            ))}
          </div>
        )}

        {/* FAQ Items */}
        {!isLoading && (
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const answer = faq.children?.[0]?.answers ?? '';

              return (
                <div key={faq.id} className="rounded-lg overflow-hidden border border-gray-200">
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`w-full px-6 py-4 flex justify-between items-center text-left font-medium text-lg transition-all duration-200 ${
                      isOpen ? 'bg-[#474AFF] text-white' : 'bg-white text-gray-900'
                    }`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: faq.questions }} />
                    <span className="text-2xl font-bold shrink-0 ml-4">{isOpen ? '−' : '+'}</span>
                  </button>

                  {/* Answer */}
                  {isOpen && (
                    <div className="px-6 py-5 bg-gray-50 text-gray-700 border-t border-gray-200">
                      <div
                        className="leading-relaxed text-sm sm:text-base [&_a]:text-blue-600 [&_a]:underline [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-1 [&_li]:my-0.5 [&_p]:my-1"
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
  );
}