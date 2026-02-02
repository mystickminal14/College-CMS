import { useState } from 'react';
import decoration from '../../../../assets/decoration.webp';

const faqs = [
  {
    question: "What is your intake timings?",
    answer: "Admissions are conducted three times a year in the months of Spring, Summer and Fall Session."
  },
  {
    question: "Are the degrees recognized?",
    answer: "Yes, LBEF has been permitted by the Ministry of Education, Nepal Government to run courses from APU, Malaysia. These courses are recognized by Tribhuvan University, Nepal."
  },
  {
    question: "Do you provide support after the course?",
    answer: "Yes, we have a dedicated Training & Placement cell that assists students with placements. We also conduct career counseling sessions after course completion for higher studies."
  },
  {
    question: "Mode of Study: Full Time or Part Time?",
    answer: "All courses from APU are offered in full-time regular mode. Each course is developed with employability in mind and includes input from leading employers, ensuring relevance to students' future careers."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First FAQ open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-4 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Section Heading */}
        <p className="text-center lg:text-left text-gray-600 text-lg mb-8">FAQ's</p>

        <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center lg:text-left">
          Everything You Need to Know About <span className="text-blue-600 relative inline-block">
            LBEF
            <img
              src={decoration}
              alt="Decoration"
              className="absolute left-1/2 -translate-x-1/2 w-full h-3"
            />
          </span>{' '}
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full px-6 py-4 flex justify-between items-center text-left font-medium text-lg transition-all duration-200 ${isOpen ? 'bg-[#474AFF] text-white' : 'bg-white text-gray-900'
                    }`}
                >
                  <span>{faq.question}</span>
                  <span className="text-2xl font-bold">{isOpen ? '−' : '+'}</span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <div className="px-6 py-5 bg-gray-50 text-gray-700 border-t border-gray-200">
                    <p className="leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                    {/* Add View button only for the "Are the degrees recognized?" FAQ (index 1) */}
                    {index === 1 && (
                      <a
                        href="/about/recognition"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 bg-[#474AFF] hover:bg-[#3a3dcc] text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-200"
                      >
                        View Recognitions
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}