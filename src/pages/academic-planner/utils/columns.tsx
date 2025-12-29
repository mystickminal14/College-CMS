import type { Planners } from "../model/PlannerModel";

export const PlannersColumns = [

  { label: "Session", accessor: "session" },
  { label: "Year", accessor: "year" },

  {
    label: "View Files",
    accessor: "actions" as keyof Planners,
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
