import { AlertCircle } from "lucide-react";

const FeePolicy = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-8">
      <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Fee Policy</h2>

      <div className="bg-red-50 border border-red-100 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
          <AlertCircle className="w-4 h-4 sm:w-6 sm:h-6 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm sm:text-lg font-semibold text-red-800 mb-2 sm:mb-3">Important Notice Regarding Fees</h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              Admission Fee and any other fee, once paid, will not be refunded under any circumstances.
            </p>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              Security deposit made by students will not be refunded if a student discontinues his/her academic pursuit before the course completion. For students successfully completing the course, the security deposit amount will be returned at the end of the course.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeePolicy;
