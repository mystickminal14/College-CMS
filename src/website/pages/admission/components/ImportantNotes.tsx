import { AlertCircle } from "lucide-react";

const ImportantNotes = () => {
  const notes = [
    "Student must submit the original copy of the migration certificate at the time of admission. It will be returned only after successful completion of the program. In case a student discontinues without completing the program, the migration certificate will be returned only upon due clearance from all respective departments.",
    "Applicants awaiting final results must submit the required eligibility documents within the deadlines set by the Admissions Office.",
    "Application Fee of NPR 1,500 must be paid at the time of document submission.",
    "All applicants are advised to read the admission guidelines, college rules, regulations, and code of conduct thoroughly before taking admission.",
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-8">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
          Important Notes
        </h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 sm:p-6">
          <h3 className="text-sm sm:text-lg font-semibold text-amber-800 mb-3 sm:mb-4">
            Key Points to Remember:
          </h3>
          <ul className="space-y-3 sm:space-y-4">
            {notes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2 sm:gap-3">
                <div className="shrink-0 w-5 h-5 sm:w-8 sm:h-8 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm mt-0.5">
                  !
                </div>
                <span className="text-xs sm:text-base text-gray-700 leading-relaxed">
                  {note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImportantNotes;
