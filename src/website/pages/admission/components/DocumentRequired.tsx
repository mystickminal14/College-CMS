import { CheckCircle } from "lucide-react";

const DocumentsRequired = () => {
  const staticDocs = [
    "Attested photocopy of SLC marks sheet and character certificate.",
    "Attested photocopy of 10+2 marks sheet or equivalent academic transcript, character certificate, provisional pass certificate and migration certificate.",
    "Original migration certificate.",
    "Attested photocopies of Bachelor Level marks sheet, provisional pass certificate and degree certificate (Applicable only for Master’s Level applicants).",
    "Attested photocopy of experience certificate (if applicable).",
    "Attested photocopy of proof of nationality.",
  ];

  const renderList = (list:any) => (
    <ul className="space-y-2">
      {list.map((item:any, idx:any) => (
        <li key={idx} className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
          <span className="text-sm text-slate-800 leading-snug">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="bg-blue-100 border border-blue-200 rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        Documents Required
      </h2>

      <div className="bg-blue-50/70 border border-blue-200 rounded-md p-4 space-y-3">
        <p className="text-sm text-slate-800">
          After completing the online application process, applicants are
          required to submit the following documents to the Admission Office:
        </p>

        {renderList(staticDocs)}
      </div>
    </div>
  );
};

export default DocumentsRequired;
