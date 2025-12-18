
const ApplicationProcess = () => {
  const steps = [
    {
      title: "Online Application",
      description:
        "Admissions are done three times a year - Spring intake (Jan/Feb), Summer intake (June/July), and Fall intake (Aug/Sep).",
    },
    {
      title: "Document Submission",
      description:
        "To begin the process, applicants are required to fill out and submit the online application form available at our portal.",
    },
    {
      title: "In-Person Submission",
      description:
        "Once the form is submitted, applicants must visit LBEF in person and submit the necessary documents to the Admissions Office.",
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
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default ApplicationProcess;