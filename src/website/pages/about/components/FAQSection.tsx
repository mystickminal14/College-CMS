import { useState } from 'react';
import full_from from "../../../../assets/full_form_lbef.png";
import decoration from '../../../../assets/decoration.png';

const faqs = [
  {
    question: "How do I enroll in a course on LBEF?",
    answer: 'Simply browse our course catalog, select a course that fits your goals, and click "Enroll Now." You\'ll be guided through a quick and secure checkout process.'
  },
  {
    question: "Are the courses self-paced or scheduled?",
    answer: "Our courses are designed to be flexible and self-paced, allowing you to learn at your own convenience."
  },
  {
    question: "Will I receive a certificate after completing a course?",
    answer: "Yes, upon successful completion of the course and assessments, you will receive a digital certificate."
  },
  {
    question: "Can I access LBEF courses on mobile devices?",
    answer: "Yes, all courses are fully responsive and accessible on mobile phones, tablets, and desktops."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

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

            <h2 className="text-4xl font-bold text-gray-900 mb-10 ">
              Everything You Need to <span className="relative inline-block">
                Know About
                <img
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 w-full h-3"
                />
              </span>{' '} LBEF
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden "
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className={`w-full px-6 py-4 flex justify-between items-center text-left font-medium text-lg transition-all duration-200 ${isOpen
                        ? 'bg-[#474AFF] text-white'
                          : ''
                        }`}
                    >
                      <span>{faq.question}</span>
                      <span className="text-2xl font-bold">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 py-5 bg-gray-50 text-gray-700 border-t border-gray-200">
                        <p className="leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}