export default function Employability() {
  const steps = [
    {
      id: 1,
      number: "#1",
      title: "Design of curriculum",
      description:
        "Innovation through the design of curriculum, the module content and the learning approaches.",
      position: "top",
      alignment: "left",
    },
    {
      id: 2,
      number: "#2",
      title: "Developing your knowledge",
      description:
        "Information through developing your knowledge and also your abilities to communicate effectively and persuasively.",
      position: "bottom",
      alignment: "left",
    },
    {
      id: 3,
      number: "#3",
      title: "Developing your capability",
      description:
        "Integration through developing your competencies knowledge and to work in multi-disciplinary teams.",
      position: "top",
      alignment: "center",
    },
    {
      id: 4,
      number: "#4",
      title: "Imagination",
      description:
        "Imagination in relation to new products, ideas, applications and solutions.",
      position: "bottom",
      alignment: "center",
    },
    {
      id: 5,
      number: "#5",
      title: "Develop your teamwork",
      description:
        "Interactivity through the use of group work to develop your teamwork skills and through the use of technology to achieve interactivity of devices and people.",
      position: "top",
      alignment: "right",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-24">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Learning for <span className="underline decoration-blue-600 decoration-2 underline-offset-4">Employability</span>
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Employers look for qualified people who have the technical know-how and the ability to communicate, work in teams and other personal skills. At ALPU, our programmes are developed to provide you not only with interesting and stimulating modules to develop your mind, but also to enhance your knowledge and skills and increase your ability to compete for that dream job that you have always wanted. To learn, develop and adapt. Much of what is current knowledge will soon be out-of-date and the reality is that to succeed you need to be adaptable and innovative. We achieve this through the five "I"s Model:
          </p>
        </div>

        {/* Timeline Section */}
        <div className="max-w-5xl mx-auto">
          {/* Timeline container */}
          <div className="relative py-12">
            {/* Horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>

            {/* Dots on timeline */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
              {[1, 2, 3, 4, 5].map((dot) => (
                <div
                  key={dot}
                  className="w-3 h-3 bg-blue-600 rounded-full border-2 border-white relative z-10"
                ></div>
              ))}
            </div>

            {/* Steps container */}
            <div className="relative pt-8 pb-12">
              {/* Top row items */}
              <div className="grid grid-cols-5 gap-4 mb-32">
                {steps
                  .filter((step) => step.position === "top")
                  .map((step) => (
                    <div key={step.id} className="flex flex-col items-center">
                      <div className="text-center max-w-xs">
                        <div className="text-lg font-bold text-blue-600 mb-2">
                          {step.number}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Bottom row items */}
              <div className="grid grid-cols-5 gap-4 -mt-24">
                {steps
                  .filter((step) => step.position === "bottom")
                  .map((step) => (
                    <div key={step.id} className="flex flex-col items-center mt-32">
                      <div className="text-center max-w-xs">
                        <div className="text-lg font-bold text-blue-600 mb-2">
                          {step.number}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
