// import { IMAGE_URL } from "../../../constants";
// import type { Planners } from "../model/PlannerModel";

// export const ViewPlannersColumns = [

//   { label: "Course", accessor: "session" },
//   { label: "Session", accessor: "session",
//       render: (row: Planners) => {
 
//        const name = `${row.course}-${row.semester}-${row.intake}`; // full URL to file
 
//        return (
        
//          <>{name}</>
//        );
//      },
//    },

//  {
//      label: "File",
//      accessor: "file" as keyof Planners,
//      render: (row: Planners) => {
//        if (!row.file) return <span className="text-gray-400">No file</span>;
 
//        const fileUrl = `${IMAGE_URL}${row.file}`; // full URL to file
 
//        return (
//         <button
//            onClick={fileUrl ? () => window.open(fileUrl, "_blank") : undefined}
//            className="px-3 py-1 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 transition"
//          >
//            Open File
//          </button>
//        );
//      },
//    },
// ];
