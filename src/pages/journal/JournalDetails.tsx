// pages/journals/JournalDetails.tsx
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import EnhancedTable from "../../template/EnhancedTable";
import { Edit, Trash2, ArrowLeft, ImageIcon } from "lucide-react";

import type { JournalDetailsPayload } from "./model/JournalModel";
import useGetJournalDetails from "./hooks/details/useGetJournalDetails";
import useDeleteJournalDetails from "./hooks/details/useDeleteJournalDetails";
import JournalDetailsWizardModal from "./detail-comp/JournalDetailWizard";
import { IMAGE_URL } from "../../constants";
import TitleBox from "../../components/layout/TitleBox";

const JournalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const navigate = useNavigate();
  const volume: string | undefined = state?.volume;
  const issue: string | undefined = state?.issue;
  const { data, isLoading } = useGetJournalDetails(id!);
  const deleteMutation = useDeleteJournalDetails();

  const [selected, setSelected] = useState<JournalDetailsPayload | null>(null);
  const [openWizard, setOpenWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 3>(1);

  const details = data?.data ?? [];

  const actions = [
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: "Edit",
      onClick: (row: JournalDetailsPayload) => {
        setSelected(row);
        setWizardStep(1);
        setOpenWizard(true);
      },
      color: "text-blue-600 hover:bg-blue-600 hover:text-white",
    },
    {
      icon: <ImageIcon className="w-5 h-5" />,
      tooltip: (row: JournalDetailsPayload) =>
        row.image ? "Change Issue Image" : "Upload Issue Image",
      onClick: (row: JournalDetailsPayload) => {
        setSelected(row);
        setWizardStep(3);
        setOpenWizard(true);
      },
      color: (row: JournalDetailsPayload) =>
        row.image
          ? "text-green-600 hover:bg-green-600 hover:text-white"
          : "text-gray-500 hover:bg-gray-600 hover:text-white",
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      tooltip: "Delete",
      onClick: (row: JournalDetailsPayload) =>
        deleteMutation.mutate({ id: row.id!, type: "CHILD" }),
      color: "text-red-600 hover:bg-red-600 hover:text-white",
    },
  ];

  const columns = [
    { label: "Title", accessor: "title" },
    { label: "Authors", accessor: "authors" },
    { label: "Pages", accessor: "pages" },
    { label: "Page No", accessor: "pageNo" },
    { label: "Country", accessor: "country" },
     {
        label: "File",
        accessor: "file" as keyof JournalDetailsPayload,
        render: (row: JournalDetailsPayload) => {
          if (!row.link) return <span className="text-gray-400">No file</span>;
    
          const fileUrl = `${IMAGE_URL}${row.link}`; // full URL to file
    
          return (
           <button
              onClick={fileUrl ? () => window.open(fileUrl, "_blank") : undefined}
              className="px-3 py-1 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 transition"
            >
              Open File
            </button>
          );
        },
      },
  ];

  return (
    <div className="p-4">
          <TitleBox title="Academic Journals Management" subtitle="Manage journals" />
   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">

        <button
          onClick={() => navigate("/app/media/journals")}
          className="px-5 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-[#1a7cd3] hover:border-[#1a7cd3] flex items-center space-x-2 shadow-sm transition-all duration-200 font-medium w-full md:w-auto justify-center dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>
            {volume && issue
              ? `Back to Issues (${volume} - ${issue})`
              : "Back to Issues"}
          </span>
        </button>

        <button
        onClick={() => {
          setSelected(null);
          setWizardStep(1);
          setOpenWizard(true);
        }}
          className="px-5 py-2.5 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-2 shadow hover:shadow-md transition-all duration-200 font-medium w-full md:w-auto justify-center cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span> Add Journal Details</span>
        </button>
      </div>
    

      <EnhancedTable
        data={details}
        columns={columns}
        actions={actions}
        loading={isLoading}
        total={details.length}
        emptyMessage="No journal details found"
      />

      {openWizard && (
        <JournalDetailsWizardModal
          isOpen={openWizard}
          onClose={() => setOpenWizard(false)}
          journalId={Number(id)}
          detailsToEdit={selected}
          volume={volume}
          issue={issue}
          initialStep={wizardStep}
        />
      )}
    </div>
  );
};

export default JournalDetails;
