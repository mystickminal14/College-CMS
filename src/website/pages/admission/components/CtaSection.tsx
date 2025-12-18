import { FileText, Calendar } from "lucide-react";

const CTASection = () => {
  return (
    <div className="mt-16 text-center">
      <div className="bg-linear-to-r from-blue-600 to-blue-500 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Begin Your Journey?</h3>
        <p className="mb-6 text-blue-100 max-w-2xl mx-auto">
          Start your application process today and join our community of learners and innovators.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="https://apply.lbef.edu.np" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <FileText className="w-5 h-5" />
            Apply Now
          </a>
          <a 
            href="/intake-calendar"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200"
          >
            <Calendar className="w-5 h-5" />
            View Intake Calendar
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTASection;