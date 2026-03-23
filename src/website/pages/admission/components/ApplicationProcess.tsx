

const ApplicationProcess = () => {


  const steps = [
    {
      title: "Online Application",
      description:
        "To begin the admission process, applicants are required to fill out and submit the Online Application Form.",
      link: "https://apply.lbef.org/",
    },
    {
      description:
        "After submitting the Online Application Form, applicants must visit LBEF in person and submit the necessary documents to the Admissions Office.",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
        Application Process
      </h2>

      <div className="space-y-4 sm:space-y-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
          >
            <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-2">
                {step.description}
              </p>

              {step.link && (
                <a
                  href={step.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm rounded hover:bg-blue-700 transition"
                >
                  Online Application Form
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationProcess;
