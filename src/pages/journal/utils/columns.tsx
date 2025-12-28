import type { Journals } from "../model/JournalModel";

export const PlannersColumns = [

  { label: "Session", accessor: "session" },
  {
    label: "View Files",
    accessor: "actions" as keyof Journals,
    render: () => {
      return (
        <button
          
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View
        </button>
      );
    },
    
  },
  
];
